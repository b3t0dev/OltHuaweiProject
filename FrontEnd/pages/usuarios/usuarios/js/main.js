import '../css/style.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'iconify-icon'

function get_FormUserConfig (){
    const modal = document.getElementById("configModal");
    const user = modal.querySelector("#user_input").value;
    const nivel = modal.querySelector("#nivelUser").value;
    const activeUser = modal.querySelector("activeUser").value;
    
}

let charInput = false;
const chPasswordButton = document.querySelector("#changePassword");
const activeUserButton = document.querySelector("#activeUser");

const passInput = document.querySelector("#inputChgPassword");
const divInput = document.querySelector("#labelInputPassword");
const passLabels = document.querySelector(".password-labels");

const rowShowPass = `<div class="container" id="labelsShowPassword">
                        <input class="form-check-input" type="checkbox" id="showPassword" onclick="showpassword()">
                        <label class="form-check-label" for="defaultCheck1">
                            Mostrar Senha
                        </label>
                    </div>`


function ShPass() {
    if (document.querySelector("#showPassword").checked){
        passInput.type = "text";
    } else {
        passInput.type ="password";
    }
}

function addUser() {
    document.querySelector("#configModalLabel").innerHTML = "Cadastrar Usuario";
    const modal = document.getElementById("submitModal");
    modal.querySelector("#user_input").removeAttribute("disabled","");
    modal.setAttribute("onsubmit","confirmModal(event,1)");
    passInput.placeholder = "Inserir Senha";
    
}

function confirmModal(event,modalCommand) {
    event.preventDefault();
    console.log(modalCommand);
    const modal = document.getElementById("submitModal");
    modal.reset();
}

function chgUsersCfg (id,user) {
    const modal = document.getElementById("configModal");
    user = modal.querySelector("#user_input");
    const nivel = modal.querySelector("#nivelUser");
    const activeUser = modal.querySelector("activeUser");
}

chPasswordButton.addEventListener("click", () => {

    if (chPasswordButton.checked){
        passInput.removeAttribute("Disabled");
        divInput.setAttribute("style","background-color: #fff;");
        passInput.setAttribute("style","background-color: #fff;");

    } else {
        passInput.value = "";
        passInput.setAttribute("Disabled","");
        divInput.removeAttribute("style");
        passInput.removeAttribute("style");
        try {
            passLabels.removeChild(document.querySelector("#labelsShowPassword"))
        } catch {}
        charInput = false;
    }
    
});

passInput.addEventListener("input", () =>{
    var chars = 0;
    chars = passInput.value;
    if ((chars.length > 0) && (charInput == false)) {
        charInput = true;
        passLabels.insertAdjacentHTML("beforeend",rowShowPass);


    } else if (chars.length == 0){
        passLabels.removeChild(document.querySelector("#labelsShowPassword"));
        charInput = false;
    }
});



window.showpassword = ShPass;
window.confirmModal = confirmModal;
window.addUser = addUser;