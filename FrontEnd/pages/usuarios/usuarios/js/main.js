import '../css/style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'iconify-icon';
import Users from './usersConfig.js';

var dbUrl = '/api';
let charInput = false;
const chPasswordButton = document.querySelector("#changePassword");
const passInput = document.querySelector("#inputChgPassword");
const divInput = document.querySelector("#labelInputPassword");
const passLabels = document.querySelector(".password-labels");

const rowShowPass = `<div class="container" id="labelsShowPassword">
                            <input class="form-check-input" type="checkbox" id="showPassword" onclick="showpassword()">
                            <label class="form-check-label" for="showPassword"> Mostrar Senha</label>
                        </div>`

function ShPass() {
    if (document.querySelector("#showPassword").checked){
        passInput.type = "text";
    } else {
        passInput.type ="password";
    }
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
            passLabels.removeChild(document.querySelector("#labelsShowPassword"));
        } catch{}
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

async function checkUsers() {
    const url = `${dbUrl}/Users`;
    const usersData = await ( await fetch(url) ).json();
    return usersData;
}

const teste = await checkUsers();
console.log(teste);
window.showpassword = ShPass;
window.confirmModal = Users.confirmModal;
window.addUser = Users.addUserForm;