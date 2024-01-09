import '../css/style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'iconify-icon'

const dBServer = '/api'

var btnSignin = document.querySelector("#signin");
var inputLogin = document.querySelector("#formlogin");
var inputPassword = document.querySelector("#formpassword");

btnSignin.addEventListener("click", function () {
   login(); 
});

inputLogin.addEventListener("click", function () {
    clearError();
})

inputPassword.addEventListener("click", function () {
    clearError();
})

async function login(){
    // event.preventDefault();
    const name = document.getElementById('formlogin').value
    const password = document.getElementById('formpassword').value
    
    const data = { name, password };
    const url = `${dBServer}/user`
    const loginID = await buscarnoBanco(url, data);

    if ((typeof loginID) == (typeof Number())){
        logado(loginID);
    } else {
        erroLogin();
    }

}

async function buscarnoBanco(url, dataLogin){

    const configRequest = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataLogin),
      };

    const login = await (await fetch(url, configRequest)).json();
    if (login) {
        return login;
    } else {
        return false;
    }

}

async function logado(idUser){
    const date = new Date();
    const loginDate = date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
    const dataLogin = { lastLogin:loginDate }
    const configRequest = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataLogin),
      };

    const logged = await (await fetch(`${dBServer}/users/${idUser}`, configRequest)).json();
    // console.log(logged);

    window.location.href= "./pages/Tela1/index.html"
}

function erroLogin(){
    const tagError = document.getElementById('loginError');
    tagError.innerHTML = "Acesso Negado";
}
function clearError(){
    document.getElementById('loginError').innerText = '';

}

async function regUser(event){
    event.preventDefault()
    const name = document.getElementById('nameRegForm').value;
    const email = document.getElementById('emailRegForm').value;
    const password = document.getElementById('passRegForm').value;

    let newUser = { name, email, password };

    const teste = await newUserDB(newUser);
}

async function newUserDB(userData){ // Terminar..

    const url = `/api/users`;
    const config = {
        headers: {
            'Content-Type': "application/json",
        },
        method: "post",
        body: JSON.stringify(userData),
      };
    
    test = true;
    // const response = await fetch(url, config);
    // const test = await response.json();
    if (test){
        const singup = document.getElementById('second-colum');
        while (singup.firstChild){
            singup.removeChild(singup.firstChild);
        }
        const msg = `<h3>Cadastro realizado com sucesso!</h3>`
        singup.insertAdjacentHTML('beforeend', msg);

    }
    
}