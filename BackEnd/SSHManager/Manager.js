process.on('uncaughtException', (err) => {
  // console.error('Exceção não tratada:', err.message);
  // console.error('Tipo de Erro:', err.name);
  // console.error('Mensagem de Erro:', err.message);
  // console.error('Stack Trace:', err.stack);
});

// require('custom-env').env('config')
import dotenv from 'dotenv';
import { Client } from 'ssh2';

dotenv.config();
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

  addToQueue(comandos) {
    return new Promise((resolve, reject) => {
      const regInterfaceCommand = 'interface gpon [0-9]{1,}\/.{1,}';
      const preComand = 'en\nconfig\n';
      const posComand = ' | no-more\n\n';
      let command = '';
      command += preComand;
  
      if (comandos[0].match(regInterfaceCommand)) {
        command += '\n' + comandos[0] + '\n';
        comandos.shift();
      }
  
      for (let cmd = 0; cmd < comandos.length; cmd++) {
        command += comandos[cmd] + posComand;
        this.regex.push(comandos[cmd]);
      }
  
      if (this.connected) {
        this.conn.on('ready', () => {
          // console.log('Conexão Estabelecida');
          // Chama o método interno que retorna uma Promise
          this._processCommandQueue(command)
            .then((output) => resolve(output))
            .catch((error) => reject(error));
        });
      }
    });
  }
  
  _processCommandQueue(command) {
    return new Promise((resolve, reject) => {
      this.conn.shell((error, stream) => {
        if (error) {
          reject(error);
          return;
        }
  
        var output = [];
        let preout = '';
  
        stream.on('data', (data) => {
          preout = 'OUTPUT: ' + String(data);
  
          if (preout.match(this.commandError)) {
            const errorSaida = 'Comando não encontrado';
            output.push(errorSaida);
            this.regex.shift();
            this.matchCommand = 0;
            if (this.regex.length === 0) {
              this.endComands = 1;
            }
          }
  
          if (this.matchCommand == 1) {
            let saida = String(data).replace(/-{2,}(?![^\(]*\))/g, '') + 'END!';
  
            const regexOut = `\r\n${this.hostname}`;
            const regexOut2 = '(^ {1,}\r\nEND!)|(^ {1,}END!)';
            const regexOut3 = ' {1,}';
            if (!saida.match(regexOut) && !saida.match(regexOut2)) {
              saida = saida.replace('\r\nEND!', '');
              saida = saida.replace('END!', '');
              if (saida != '') {
                output.push(saida);
              }
            }
  
            if (preout.match(this.hostname + '.{1,}')) {
              this.regex.shift();
              this.matchCommand = 0;
              if (this.regex.length == 0) {
                this.endComands = 1;
              }
            }
          }
  
          if (this.regex[0] && preout.match(this.regex[0])) {
            this.matchCommand = 1;
            this.commandCounter += 1;
          }
          if (
            preout.match(this.hostname + '.{1,}') &&
            this.regex.length == 0 &&
            this.endComands == 1
          ) {
            this.endComands = 0;
            this.disconnect();
            resolve(output);
          }
        });
  
        stream.on('end', () => {
          // Resolve a Promise com o output quando o stream termina
          resolve(output);
        });
  
        stream.end(command);
      });
    });
  }
  
}

// Configurações da OLT:
const olt_config = {
  host: process.env.OLT_Address,
  port: process.env.OLT_Port,
  username: process.env.OLT_User,
  password: process.env.OLT_Password,
};

export async function executeCommands (comandos){
  
  const olt = new SSHManager ( olt_config );
  olt.connect();
  const result = await olt.addToQueue(comandos);
  olt.disconnect();
  return result;

}