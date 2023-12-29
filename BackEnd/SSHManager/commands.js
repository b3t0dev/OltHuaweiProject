import { executeCommands } from './Manager.js';

const comandos = ['display sysuptime'];
const comandos2 = ['display ont autofind all'];
const comandos3 = ['display board desc 0/18'];
const comandos4 = ['display board desc 0/19'];
const comandos5 = ['display version'];

async function main(comand) {
    const teste = await executeCommands(comand);
    console.log(teste);
    return teste;
}

(async () => {
    console.time();
    await Promise.all([
        main(comandos),
        main(comandos2),
        main(comandos3),
        main(comandos4)
        ])
    console.timeEnd();
})()