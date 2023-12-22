import '../css/style.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'iconify-icon'

const chPasswordButton = document.querySelector("#changePassword");
const activeUserButton = document.querySelector("#activeUser")
let activeEye = false;

const eyePasswordIcon = `<span class="eyepassword">
                            <iconify-icon icon="mdi:eye-off-outline" width="25" height="25" id="eyeIcon"></iconify-icon>
                        </span>`

const eyePasswordIconShow = `<span class="eyepassword">
                                <iconify-icon icon="fa-regular:eye" width="25" height="25" id="eyeIcon"></iconify-icon>
                            </span>`
              
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
        activeEye = false;
        try {
            const eyePassword = document.querySelector(".eyepassword");
            divInput.removeChild(eyePassword);
        } catch {}
    }
    passInput.addEventListener("input", () => {
        var input = passInput.value
        if ((input.length == 1) && (activeEye == false)){
            activeEye = true;
            divInput.insertAdjacentHTML("beforeend",eyePasswordIcon);

        }
        if ( (activeEye == true) && (input.length == 0) ){
            activeEye = false;
            const eyePassword = document.querySelector(".eyepassword");
            divInput.removeChild(eyePassword);
        }

    if (activeEye = true){
        const eyeIcon = document.querySelector(".eyepassword");
        eyeIcon.addEventListener("click", () => {
            if (passInput.type == "password") {
                passInput.type = "text";
            } else {
                // passInput.type = "password";
                console.log("Algo");
            }
            // eyeIcon.removeChild(document.querySelector("#eyeIcon"));
            // eyeIcon.insertAdjacentHTML("beforeend", eyePasswordIconShow);
        });
    }
    });
});


// activeUserButton.addEventListener("click", () => {
//     if (activeUserButton.checked) {
//         activeUserButton.value = "true";
//     } else {
//         activeUserButton.value = "false";
//     }
// });