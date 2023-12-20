import oltFunction from './oltFunctions.js';
import states from './states.js';

const urlDB = '/api'

async function addOltConfigForm(event){
    event.preventDefault();

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

    const olt = { status, OltName, Armario, PowerdB, maxClients, ipAddress };

    oltFunction.add_olt(urlDB, olt);
    const configsform = document.getElementById('formConfigModal');
    configsform.reset();

    const configRequest = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(olt),
    };
    
    const newOlt = await fetch(`${urlDB}/olts`, configRequest);

}

function changeOltConfigForm(event){
    event.preventDefault();
    const configsform = document.getElementById('formConfigModal');
    configsform.reset();
    configsform.setAttribute("onsubmit","addConfigsOLT(event)");
}

export default { addOltConfigForm, changeOltConfigForm };