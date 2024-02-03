import oltFunction from './oltFunctions.js';
import states from './states.js';

const urlDB = '/api'

function getFormOltConfig(){

    const OltName = document.getElementById('modal-olt-name').value;
    const ipAddress = document.getElementById('modal-olt-ip').value;
    const Armario = document.getElementById('modal-olt-armario').value;
    const PowerdB = document.getElementById('modal-olt-powerdb').value;
    const maxClients = document.getElementById('selected-maxclients-value').value;
    let status = states.checkStatus(document.getElementById('flexSwitchCheckChecked').checked)
    if (status == 1){
        status = true;
    } else {
        status = false;
    }
    const lastUpdate = ''

    const oltForm = { status, OltName, Armario, PowerdB, maxClients, ipAddress };
    
    const configsform = document.getElementById('formConfigModal');
    configsform.reset();
    
    return oltForm;
}

async function add_Olt_todB(olt_data){

    olt_data['lastUpdate'] = '';

    const configRequest = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(olt_data),
    };
    
    const newOlt = await (await fetch(`${urlDB}/olts`, configRequest)).json();
    return newOlt;
        
}

async function changeOltConfig(event,olt_id){
    event.preventDefault();
    const olt_data = getFormOltConfig();
    
    const configRequest = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(olt_data),
    };

    const oltUpdated = await (await fetch(`${urlDB}/olts/${olt_id}`, configRequest)).json();
    window.location.reload();
}

async function addNewOlt(event){

    event.preventDefault();
    const olt_data = getFormOltConfig();
    const newOlt = await add_Olt_todB(olt_data);
    oltFunction.add_olt(urlDB, newOlt);

}

export default { getFormOltConfig, changeOltConfig, addNewOlt };