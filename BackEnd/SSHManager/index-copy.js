const { Client } = require('ssh2');

var teste = []
const conn = new Client();
conn.on('ready', () => {
  console.log('Conexão Estabelecida');
  let cont = 0;
  conn.shell((err, stream) => {
    if (err) throw err;
    stream
      .on('data', (data) => {
        out = "OUT:" + data;
        regex = 'up time';
        if (out.match(regex)) {
          console.log(out);
          teste.push('OUT:' + data);
        }
        console.log(teste);
      
        // Verificar se o comando foi concluído
        if  (data.includes('MA5800-X17>') && (teste.length != 0) ) {
          console.log('Comando concluído, encerrando conexão.');
          conn.end();   
        }
      });

    stream.end(`
        display sysuptime\n
        \n`);
  });

}).connect({
  host: '1.1.1.1',
  port: 22,
  username: 'user',
  password: 'passwrd'
});
