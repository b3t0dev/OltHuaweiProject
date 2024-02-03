import oltFunction from './oltFunctions.js'
import Status from './states.js'
import API from './apiFunctions.js'
import OltCommands from './oltCommands.js'

async function main(ip){
    const OLTS = await checkOLTsDB(ip)

    for (const olt of OLTS) {
        const status = Status.checkStatus(olt.status);
        //console.log(olt)  // Duvida: Porque a tabela está preenchendo em ordem diferente
        oltFunction.add_olt(ip, olt);

    }
    
    window.addConfigsOLT = API.addNewOlt;
    window.changeConfigsOLT = API.changeOltConfig;
    window.deleteOlt = oltFunction.remove_olt;
    window.configsOLT = oltFunction.configsOLT;
    window.confirmRemove = oltFunction.confirmRemove;
    window.syncPon = OltCommands.checkPons;
    window.resyncOlt = OltCommands.checkOlt;
}

async function checkOLTsDB(ipDB){
    const url = `${ipDB}` + '/OLTs';
    const data = await fetch(url);
    return await data.json();
    

}

const ipDB = 'http://localhost:3000' //Duvida: Como criar variaveis ambiente para o projeto
await main(ipDB)