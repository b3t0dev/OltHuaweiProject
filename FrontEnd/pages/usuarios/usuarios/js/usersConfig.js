function get_FormUserConfig(){
    const modal = document.getElementById("configModal");
    const user = modal.querySelector("#user_input").value;
    const nivel = modal.querySelector("#nivelUser").value;
    const password = modal.querySelector("#inputChgPassword").value;
    let activeUser = modal.querySelector("#activeUser");

    if (activeUser.checked){
        activeUser = true;
    } else {
        activeUser = false;
    }
    
    const form_values = { user, nivel, password, activeUser };
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

function chgUsersCfg (id,usuario) {
    const modal = document.getElementById("configModal");
    const user = modal.querySelector("#user_input");
    const nivel = modal.querySelector("#nivelUser");
    const activeUser = modal.querySelector("activeUser");

}

function confirmModal(event,modalCommand) {
    event.preventDefault();

    if (modalCommand == 1) {
        const user_data = get_FormUserConfig();
        addUser(user_data);
        console.log(user_data);
    }
    const modal = document.getElementById("submitModal");
    modal.reset();
}

function addUser(user_data) {
    let id = '-';
    let ativo = '-';
    let login = '-';
    let lastLogin = '-';
    let nivel = '';
    
    if (user_data.activeUser) {
        ativo = "Sim";
    } else {
        ativo = "Não";
    }

    if (user_data.nivel == 1) {
        nivel = "Padrão";
    } else {
        nivel = "Administrador";
    }

    const rowFront = `
        <tr>
            <th>${id}</th>
                <td>${user_data.user}</td>
                <td>${ativo}</td>
                <td>${login}</td>
                <td>${lastLogin}</td>
                <td>${nivel}</td>
                <td>
                    <span class="clickIcon">
                        <iconify-icon icon="vscode-icons:file-type-light-config" width="27" height="22"></iconify-icon> 
                    </span>
                </td>
                <td>
                    <span class="clickIcon clickDelete">
                        <iconify-icon icon="bx:trash" width="27" height="22"></iconify-icon>
                    </span>
                </td>
        </tr>`

    const table = document.querySelector("table tbody");
    table.insertAdjacentHTML("beforeend", rowFront);
}

export default { addUserForm, chgUsersCfg, confirmModal };