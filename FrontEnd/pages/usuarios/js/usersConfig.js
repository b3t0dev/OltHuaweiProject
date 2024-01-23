var urlDB = '/api';

function refreshPage (){
    window.location.reload();
}

function get_FormUserConfig(){
    const modal = document.getElementById("configModal");
    const name = modal.querySelector("#user_input").value;
    const privilege = Number(modal.querySelector("#nivelUser").value);
    const password = modal.querySelector("#inputChgPassword").value;
    let active = modal.querySelector("#activeUser");

    if (active.checked){
        active = true;
    } else {
        active = false;
    }
    
    const form_values = { name, password, active, privilege };
    return form_values
}

function addUserForm() {
    const passInput = document.querySelector("#inputChgPassword");
    document.querySelector("#configModalLabel").innerHTML = "Cadastrar Usuario";
    const modal = document.getElementById("submitModal");
    modal.querySelector("#user_input").removeAttribute("disabled","");
    modal.setAttribute("onsubmit","confirmModal(event,1)");
    passInput.placeholder = "Inserir Senha";
    
}

async function addUsertodB (user_data) {
    user_data['lastLogin'] = '-';

    const configRequest = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_data),
    }

    const newUser = await( await fetch(`${urlDB}/Users`, configRequest) ).json();
    return newUser;
}

async function chgUsersCfg (user_data) {
    let user = user_data.split('-');
    
    const modal = document.getElementById("configModal");
    const name = modal.querySelector("#user_input");
    const privilege = modal.querySelector("#nivelUser");
    const active = modal.querySelector("#activeUser");
    const submitModal = document.getElementById("submitModal");
    submitModal.setAttribute("onsubmit",`confirmModal(event,0,${user[0]})`);
    
    user = await ( await fetch(`${urlDB}/Users/${user[0]}`) ).json();

    name.value = user.name;
    privilege.value = user.privilege;
    if (user.active){
        active.setAttribute("checked","");
    } else {
        active.removeAttribute("checked");
    }
    
}

async function confirmModal(event,modalCommand,id = '') {
    event.preventDefault();
    const modal = document.getElementById("submitModal");

    const user_data = get_FormUserConfig();
    if (modalCommand == 1) {
        const newUser = await addUsertodB(user_data);
        addUser(newUser);

    } else {

        if (user_data.password == '') {
            delete user_data['password'];
        }
        console.log(user_data,id);
        const teste = await confirmChgUser(user_data, id);
        console.log(teste);
        modal.reset();
        refreshPage();
    }
}

function addUser(user_data) {
    let id = user_data.id;
    let ativo = user_data.active;
    let login = '-';
    let lastLogin = user_data.lastLogin;
    let nivel = '';
    
    if (user_data.active) {
        ativo = "Sim";
    } else {
        ativo = "Não";
    }

    if (user_data.privilege == 1) {
        nivel = "Padrão";
    } else {
        nivel = "Administrador";
    }

    const rowFront = `
        <tr id="${user_data.id}-${user_data.name}">
            <th>${id}</th>
                <td>${user_data.name}</td>
                <td>${ativo}</td>
                <td>${login}</td>
                <td>${lastLogin}</td>
                <td>${nivel}</td>
                <td>
                    <span class="clickIcon">
                        <a data-bs-toggle="modal" data-bs-target="#configModal" onclick="changeConfig('${id}-${user_data.name}')">
                            <iconify-icon icon="vscode-icons:file-type-light-config" width="27" height="22"></iconify-icon>
                        </a>
                    </span>
                </td>
                <td>
                    <span class="clickIcon clickDelete">
                        <a data-bs-toggle="modal" data-bs-target="#modalRemove" onclick="removeUser('${id}-${user_data.name}')">
                            <iconify-icon icon="bx:trash" width="27" height="22"></iconify-icon>
                        </a>
                    </span>
                </td>
        </tr>`

    const table = document.querySelector("table tbody");
    table.insertAdjacentHTML("beforeend", rowFront);
}

function delUser(user_data){
    const user = user_data.split('-');
    console.log(user);
    const modal_remove = document.getElementById('modalRemove');
    modal_remove.querySelector('h5').innerHTML = `Remover o usuario: ${user[1]}`;
    const buttonConfirm = document.getElementById('buttonDeleteConfirm');
    buttonConfirm.setAttribute('onclick', `confirmRemove("${user_data}")`);

}

async function confirmDelUser(user_data){
    const user = user_data.split('-');
    const id = user[0];

    const configRequest = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
    };

    await fetch(`${urlDB}/Users/${id}`, configRequest);

    const rowRemove = document.getElementById(user_data);
    rowRemove.remove();
    refreshPage();
}

async function confirmChgUser(user_data, id){
    
    const configRequest = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_data),
      };

    const logged = await (await fetch(`${urlDB}/users/${id}`, configRequest)).json();
    return logged;
}

export default { addUserForm, chgUsersCfg, confirmModal, addUser, delUser, confirmDelUser };