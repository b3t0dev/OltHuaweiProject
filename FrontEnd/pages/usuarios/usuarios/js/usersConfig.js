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
    
    const form_values = { user, nivel, password, activeUser};
    return form_values
}

function addUser() {
    const passInput = document.querySelector("#inputChgPassword");
    document.querySelector("#configModalLabel").innerHTML = "Cadastrar Usuario";
    const modal = document.getElementById("submitModal");
    modal.querySelector("#user_input").removeAttribute("disabled","");
    modal.setAttribute("onsubmit","confirmModal(event,1)");
    passInput.placeholder = "Inserir Senha";
    
}

function chgUsersCfg (id,user) {
    const modal = document.getElementById("configModal");
    user = modal.querySelector("#user_input");
    const nivel = modal.querySelector("#nivelUser");
    const activeUser = modal.querySelector("activeUser");
}

function confirmModal(event,modalCommand) {
    event.preventDefault();

    if (modalCommand == 1) {
        const prpos = get_FormUserConfig();
        console.log(prpos);
    }
    const modal = document.getElementById("submitModal");
    modal.reset();
}

export default { addUser, chgUsersCfg, confirmModal };