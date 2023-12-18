const dBServer = '/api'

var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

function login(event){
    event.preventDefault();
    const email = document.getElementById('loginEmail').value
    const pass = document.getElementById('loginPass').value
    
    data = { email, pass };
    users(data);

}

async function buscarnoBanco(){
    const url = `${dBServer}/users`
    const usuarios = await fetch(url);
    return await usuarios.json()


}

async function users(dataform) {
    const dbusers = await buscarnoBanco();
    if (validateLogin(dataform, dbusers)){
        logado()
    } else {
        erroLogin();
    }
}

function validateLogin(dataform, dbusers){

    for (const user of dbusers){
        if ((dataform.email === user.email) && (dataform.pass === user.password)){
            return true;
        }
    }
    return false;
}

function logado(){
    window.location.href= "./pages/Tela1/index.html"
}

function erroLogin(){
    const tagError = document.getElementById('loginError');

    const form = document.getElementById('loginForm');
    const loginField = document.getElementById('loginEmail');
    const passwField = document.getElementById('loginPass');
    tagError.innerHTML = "Acesso Negado";
}
function clearError(){
    const form = document.getElementById('loginError').innerText = '';

}

async function regUser(event){
    event.preventDefault()
    const name = document.getElementById('nameRegForm').value;
    const email = document.getElementById('emailRegForm').value;
    const password = document.getElementById('passRegForm').value;

    let newUser = { name, email, password };

    const teste = await newUserDB(newUser);
}

async function newUserDB(userData){

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