const recieverbox = document.getElementById("person");
const msgbox = document.getElementById("msg");

//for chat thingy
// const el = document.createElement('li');
// el.innerHTML = text;
// document.querySelector('ul').appendChild(el)

var client;
var loggedIn;

while(true){
    while(loggedIn){
        console.log("logged in")
    }
}

function Client(username, password){
    this.username = username
    this.password = password
}

function createAccount(){
    const username = document.getElementById("username")
    const password = document.getElementById("password")

    fetch("http://localhost:8080/api/login/register", {
        method: "post",
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            "username": username.value,
            "password": password.value
        })
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Server is down")
        }
        return response.text();
    })
    .then((dataStr) =>{
        if(dataStr == "User already existent"){
            alert("Username taken, try again.")
        }
    })
    .catch((error) =>{
        alert("Server is down.")
    });
    
}

function login(){
    const username = document.getElementById("login")
    const password = document.getElementById("pass")

    fetch("http://localhost:8080/api/login/signin",{
        method: "post",
        headers: {
            'Content-type': "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            username : username.value,
            password : password.value
        })
    })
    .then(response =>{
        if(!response.ok){
            throw new Error("Server is down");
        }
        return response.text();
    })
    .then((responseText) =>{
        if(responseText == "Welcome!"){
            client = new Client(username.value, password.value)
            username.value = "";
            password.value = "";
            loggedIn = true
            alert("logged in")
        }else{
            alert("Incorrect Password. Try again")
            username.value = "";
            password.value = "";
        }
    })
    .catch((error) =>{
        alert(error)
    });

   
}

function sendMessage(){
    if(loggedIn == null){
        alert("Please log in.")
        return
    }

    if(recieverbox.value == "" || msgbox.value == ""){
        alert("Please fill out both boxes before sending a message.")
        return
    }

    fetch("http://localhost:8080/api/msg/send", {
        method: "post",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            username: client.username,
            message: document.getElementById("msg").value,
            reciever: document.getElementById("person").value
        })
    })
    .then(response =>{
        if(!response.ok){
            throw new Error("Server is down")
        }
    })
    .catch((error) =>{
        alert(error)
    })
}