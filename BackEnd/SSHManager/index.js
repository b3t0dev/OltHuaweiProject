process.on('uncaughtException', (err) => {
  // console.error('Exceção não tratada:', err.message);
  // console.error('Tipo de Erro:', err.name);
  // console.error('Mensagem de Erro:', err.message);
  // console.error('Stack Trace:', err.stack);
});

require('custom-env').env('config')
const { Client } = require('ssh2');

class SSHManager {

  constructor(olt_Config) {
    
    this.config = olt_Config;
    this.conn = new Client();
    this.connected = false;
    this.hostname = 'MA5800-X17';
    this.regex = [];
    this.matchCommand = 0;
    this.commandCounter = 0;  
    this.commandError = 'Unknown command, the error' 
    this.commandsQueue = [];
    this.endComands = 0;
  }

  connect() {
    if (!this.connected) {
      this.conn.connect( this.config );
      this.connected = true;
    }
  }

  disconnect() {
    if (this.connected) {
      this.connected = false;
      this.hostname = 'MA5800-X17';
      this.regex = [];
      this.matchCommand = 0;
      this.commandCounter = 0;   
      this.commandsQueue = [];
      this.conn.end();
    }
  }

  addToQueue(comandos, callback) {
    
    const regInterfaceCommand = 'interface gpon [0-9]{1,}\/.{1,}' // Regex pra verificar se existe algum comando intermed
    const preComand = 'en\nconfig\n'
    const posComand = ' | no-more\n\n'
    let command = '';
    command += preComand;
    
    if ( comandos[0].match(regInterfaceCommand) ) {
      command += '\n' + comandos[0] + '\n';
      comandos.shift();
    }  
    
    for (let cmd = 0; cmd < comandos.length; cmd++) {
      command += comandos[cmd] + posComand;
      this.regex.push(comandos[cmd]);
    }
    // console.log(this.regex)
    if (this.connected) {
      this.conn.on('ready', () => {
        console.log('Conexão Estabelecida');
        this._processCommandQueue(command, callback);
      });
    }
  }

  _processCommandQueue(command, callback) {
    
    this.conn.shell((error, stream) => {
  
      var output = [];
      let preout = ''
      stream
      .on('data', (data) => {
        preout = 'OUTPUT: ' + String(data); // O Stdout é retornado um Object()
        // console.log(preout); // Ativar para exibir todas as saidas (For DeBug)
        // console.log(output); // ||

        if (preout.match(this.commandError) ){
          const errorSaida = 'Comando não encontrado'
          output.push(errorSaida)
          this.regex.shift();
          this.matchCommand = 0;
          if (this.regex.length == 0){
            this.endComands = 1;
          }

        }

        if ( this.matchCommand == 1 ){
          let saida = String(data).replace(/-{2,}(?![^\(]*\))/g, '') + 'END!';
          
          const regexOut = `\r\n${this.hostname}`
          const regexOut2 = '(^ {1,}\r\nEND!)|(^ {1,}END!)';
          const regexOut3 = ' {1,}'
          if ( !saida.match(regexOut) && !saida.match(regexOut2) ) {
            saida = saida.replace('\r\nEND!', '');
            saida = saida.replace('END!', '');
            if (saida != '') {
              output.push(saida);
            }
          }

          if (preout.match(this.hostname + '.{1,}')){
            this.regex.shift();
            this.matchCommand = 0;
            if ( this.regex.length == 0 ) {
              this.endComands = 1;
            }
          }
        }
        
        if ( (this.regex[0] && preout.match(this.regex[0])) ){
          this.matchCommand = 1;
          this.commandCounter += 1;
        }
        if ( preout.match(this.hostname + '.{1,}') && ( this.regex.length == 0 ) && this.endComands == 1 ){
          this.endComands = 0
          this.disconnect();
          return callback(null, output);
        }

        });
        
      stream.end(command);
    });
  }
  
}

// Configurações da OLT:
const oltA_config = {
  host: process.env.OLT_Address,
  port: process.env.OLT_Port,
  username: process.env.OLT_User,
  password: process.env.OLT_Password,
};

// Criando objeto(OLT) passando as configurações para a classe executar os métodos
const oltA = new SSHManager( oltA_config );
const comandos = ['display ont autofind all', 'display erado', 'display sysuptime'];
oltA.connect();

// Executar o comando
oltA.addToQueue(comandos, (err, output) => {
  if (err) {
    console.error('Erro ao executar comando:', err);
  } else {
    console.log('Saída do comando:', output);

  }

});

