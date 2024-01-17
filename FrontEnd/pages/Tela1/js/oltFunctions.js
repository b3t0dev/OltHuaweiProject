import states from './states.js'

async function checkSlots(ip, olt){
    const url = `${ip}` + `/olts/${olt.id}/slots` // Aqui a variavel url recebe normalmente: http://localhost:3000/olts/1/slots
    const response = await fetch(url)
    return await response.json(); // A variavel teste ta armezando todos os ids: http://localhost:3000/olts/todososids/slots

}

function addCorret_slots(slots, OLTId){ // #Temporaria - perda de desempenho porque está buscando todos os slots ou 
  var corretSlots = new Array ();
  for (const slot of slots){
    if (slot.oltId == OLTId){
      corretSlots.push(slot)
    }
  }  
  return corretSlots
}

function add_slots(olt, slots, idtrRow){  
    
  let tableSecondaryHead = `<tr id=${idtrRow}>
    <td colspan="10" class="hiddenRow">
      <div class="collapse multi-collapse" id="${olt.OltName}">
        <table class="table table-bordered table-sm table-hover text-center">
          <thead>
            <tr>
              <th>Status</th>
              <th>Slot/Pons</th>
              <th>Board Name</th>
              <th>ONU Discovery</th>
              <th>ONU's Provisioned</th>
              <th>ONU's Online</th>
              <th>Syncronize</th>
            </tr>
          </thead>
    <tbody>\n`
  
  let tableSecondaryTbody = ''
  for (const slot of slots){
    tableSecondaryTbody += `<tr data-toggle="collapse"  class="accordion-toggle" data-target="#demo10">
            <td>${slot.status}</td>
            <td>${slot.slot}</td>
            <td>-</td>
            <td>${slot.OnuDiscovery}</td>
            <td>${slot.OnuProvisioned}</td>
            <td>${slot.OnuOnline}</td>
            <td>
              <span id="configIcon" class="clickIcon" onclick="syncPon('${slot.slot}')">
                <a>
                  <iconify-icon icon="fa-solid:sync-alt" width="15" height="15" class="" ></iconify-icon>
                </a>
              </span>
            </td>`
  }

  tableSecondaryHead += `${tableSecondaryTbody}\n
                        </tbody>\n
                      </table>\n
                    </div>\n
                  </td>
                </tr>`

  return tableSecondaryHead;
}

async function add_olt(ipDB, olt){
  
  const name = olt.OltName;
  const ip = olt.ipAddress;
  const armario = olt.Armario;
  const powerdb = olt.PowerdB;
  const maxclients = olt.maxClients;
  let config = ''
  const id = olt.OltName;
  let statusClass = ''
  let rowSlots = ''
  
  if (states.checkStatus(olt.status) === 1){
    statusClass = 'statusOnline';
    let sloters = await checkSlots(ipDB, olt);
    sloters = addCorret_slots(sloters, olt.id); // #Temporaria
    const idtrRow = `${statusClass}-${name}-${ip}`
    const oltSlots = add_slots(olt, sloters, idtrRow);
    
    rowSlots = `\n ${oltSlots}
                  </tr>`
                  
    } else{
      statusClass = 'statusOffline';
    }
                
  let rowOLT = `<tr id="${statusClass}-${name}-${ip}">
                                      <th scope="row">
                                      <div class="${statusClass}" data-bs-toggle="collapse" href="#${id}" role="button" aria-expanded="false" aria-controls="${statusClass}-${ip}" ></div>
                                      </th>
                                  
                                      <td>${name}</td>
                                      <td>${armario}</td>
                                      <td>${powerdb}</td>
                                      <td>${maxclients}</td>
                                      <td>${ip}</td>
                                      <td>
                                          <span id="${statusClass}-${ip}" class="clickIcon" onclick="configsOLT('${ipDB}','${olt.id}')">
                                              <a class="dropdown-item" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#configModal">
                                                  <iconify-icon icon="vscode-icons:file-type-light-config" width="27" height="29"></iconify-icon>
                                              </a>
                                          </span>
                                      </td>
                                      <td>
                                          <span class="clickIcon clickDelete" onclick="deleteOlt('${statusClass}-${name}-${ip}')">
                                              <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#modalRemove">
                                              <iconify-icon icon="bx:trash" width="27" height="29"></iconify-icon>
                                          </span>
                  </td>`
  
  rowOLT += rowSlots;
  const tabela = document.querySelector('table tbody');
  tabela.insertAdjacentHTML('beforeend', rowOLT);

}

function remove_olt(rmdata){
    const oltdata = rmdata.split('-', 3)
    const modal_remove = document.getElementById('modalRemove');
    modal_remove.querySelector('h5').innerHTML = "Deseja realmente remover a " + oltdata[1] + "?";
    const buttonConfirm = document.getElementById('buttonDeleteConfirm');
    buttonConfirm.setAttribute('onclick', `confirmRemove("${rmdata}")`)

}

async function confirmRemove(data){
  const oltdata = data.split('-', 3)

  const Olt = await(
    await fetch(`/api/olts/id/${oltdata[1]}`)
    ).json();

  const configRequest = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const Slots = await (
    await fetch(`/api/olts/${Olt.id}/slots`)
  ).json()

  const olt = document.getElementById(data)
  olt.remove();
  await fetch(`/api/olts/${Olt.id}`, configRequest);

  if (Slots.length != 0) {
    const oltslots = document.getElementById(data)
    oltslots.remove();
  }
  

}

async function configsOLT(ipDB, oltid){
  const url = ipDB + "/OLTS/" + oltid

  const olt = await fetch(url)
  const config = await olt.json();
  document.getElementById('modal-olt-name').value = config.OltName;
  document.getElementById('modal-olt-ip').value = config.ipAddress;
  document.getElementById('modal-olt-armario').value = config.Armario;
  document.getElementById('modal-olt-powerdb').value = config.PowerdB;
  document.getElementById('selected-maxclients-value').value = config.maxClients;
  let form = document.getElementById('formConfigModal');
  console.log(form);
  document.getElementById('formConfigModal').setAttribute("onsubmit","changeConfigsOLT(event)"); // F. Complete
  form = document.getElementById('formConfigModal');
  console.log(form);

}

export default { add_olt, remove_olt, checkSlots, confirmRemove, configsOLT };