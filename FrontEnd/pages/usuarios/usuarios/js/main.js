import '../css/style.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'iconify-icon'

const chPasswordButton = document.querySelector("#changePassword");
const activeUserButton = document.querySelector("#activeUser")

const eyePasswordIcon = `<span class="eyepassword">
                            <iconify-icon icon="mdi:eye-off-outline" width="25" height="25"></iconify-icon>
                        </span>`

// eyePasswordIconShow = <iconify-icon icon="fa-regular:eye"></iconify-icon>

              
const passInput = document.querySelector("#inputChgPassword");
const divInput = document.querySelector("#labelInputPassword");

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
        const eyePassword = document.querySelector(".eyepassword");
        divInput.removeChild(eyePassword);
    }
});

passInput.addEventListener("input", () => {
    var input = passInput.value
    if (input.length < 2){
        divInput.insertAdjacentHTML("beforeend",eyePasswordIcon);
    }
});

// activeUserButton.addEventListener("click", () => {
//     if (activeUserButton.checked) {
//         activeUserButton.value = "true";
//     } else {
//         activeUserButton.value = "false";
//     }
// });