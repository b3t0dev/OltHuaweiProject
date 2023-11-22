const { Client } = require('ssh2');

class SSHManager {

  constructor(olt_Config) {
    
    this.config = olt_Config;
    this.conn = new Client();
    this.connected = false;
    this.hostname = 'MA5800-X17';
    this.regex = ['display ont autofind all'];
    this.commandList = ['Comando 1'];
    this.matchCommand = 0;
    this.commandCounter = 0;

    this.conn.on('ready', () => {
      console.log('Conexão Estabelecida');
      this.connected = true;
      this._processCommandQueue(); // Processar comandos pendentes quando a conexão está pronta
    });
    
    this.commandsQueue = [];
    this.commandInProgress = false;
  }

  connect() {
    if (!this.connected) {
      this.conn.connect( this.config );
    }
  }

  // executeCommand(command, callback) {
  //   if (this.connected) {
  //     // this.commandList[0] = command;
  //     // this.regex[0] = command;
  //     this.commandsQueue.push({ command, callback });

  //     if (!this.commandInProgress) {
  //       this._processCommandQueue();
  //     }
  //   } 
  // }

  addToQueue(command, callback) {
    this.commandsQueue.push({ command, callback });

    if (this.connected) {
      this._processCommandQueue();
    }
  }

  _processCommandQueue() {
    
    const { command, callback } = this.commandsQueue.shift();
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
            this.commandList.shift();
            this.regex.shift();
            this.matchCommand = 0;
          }
        }

        if ( this.regex[0] && preout.match(this.regex[0]) ){
          this.matchCommand = 1;
          this.commandCounter += 1;
        }
        if ( preout.match(this.hostname + '.{1,}') && ( this.commandList.length == 0 ) ){
          console.log(output);
          // console.log(preout);
        }

        });
      stream.end(command);
    });
  }
  
}

// Configurações da OLT:
const oltA_config = {
  host: 'oltHost',
  port: 22,
  username: 'username',
  password: 'passwrd',
};

// Exemplo de uso:
const oltA = new SSHManager( oltA_config );
// oltA.connect();

// // Adicionar comandos à fila
oltA.addToQueue('en\nconfig\ndisplay ont autofind all | no-more\n\n | include SN', (err, output) => {
  if (err) {
    console.error('Erro ao executar comando:', err);
  } else {
    console.log('Saída do comando:', output);

  }

});

