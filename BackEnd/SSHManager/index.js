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
    this.commandsQueue = [];
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

    const preComand = 'en\nconfig\n'
    const posComand = ' | no-more\n\n'
    let command = '';
    command += preComand;

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

        if ( this.matchCommand == 1 ){
          output.push(`Saida do Comando [${this.commandCounter}]: ` + data);
          if (preout.match(this.hostname + '.{1,}')){
            this.regex.shift();
            this.matchCommand = 0;
          }
        }

        if ( this.regex[0] && preout.match(this.regex[0]) ){
          this.matchCommand = 1;
          this.commandCounter += 1;
        }
        if ( preout.match(this.hostname + '.{1,}') && ( this.regex.length == 0 ) ){
          // console.log(output);
          callback(null, output);
          this.disconnect();
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
const comandos = ['display ont autofind all','display sysuptime'];
oltA.connect();

// Executar o comando
oltA.addToQueue(comandos, (err, output) => {
  if (err) {
    console.error('Erro ao executar comando:', err);
  } else {
    console.log('Saída do comando:', output);

  }

});


// setTimeout(function (){
//   console.log("Iniciando o 2° Comando");
//   oltA.connect();
// // Executar abaixo o comando
//   oltA.addToQueue('en\nconfig\ndisplay ont autofind all | no-more\n\n ', (err, output) => {
//     if (err) {
//       console.error('Erro ao executar comando:', err);
//     } else {
//       console.log('Saída do comando:', output);
//       // oltA.disconnect();

//   }

//   });

// },10000);
