const recieverbox = document.getElementById("person");
const msgbox = document.getElementById("msg");

const receiver = null;

//for chat thingy
// const el = document.createElement('li');
// el.innerHTML = text;
// document.querySelector('ul').appendChild(el)

var client;
var loggedIn;

var sendingTo = null;

window.onload = getMessages;

setInterval(getMessages, 5000);

const container = document.getElementById("container");
const body = document.getElementById("body");


// while(true){
//     while(loggedIn){
//         console.log("logged in")
//     }
// }

function Client(username, password){
    this.username = username
    this.password = password
}

function createAccount(){
    const username = document.getElementById("username")
    const password = document.getElementById("password")

    fetch("https://springbootapi-1.onrender.com/api/login/register", {
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

    fetch("https://springbootapi-1.onrender.com/api/login/signin",{
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


function exitMessaging(){
    container.style.visibility='hidden';
}
function startMessaging(){

    if (recieverbox.value == ""){
        return;
    }
    container.style.visibility='visible';
    receiver = recieverbox.value;
    
}

function sendMessage(){
    /*if(loggedIn == null){
        alert("Please log in.")
        return
    }

    if(recieverbox.value == "" || msgbox.value == ""){
        alert("Please fill out both boxes before sending a message.")
        return
    }
    */
    if (msgbox.value == ""){
        return;
    }

    const newMessage = document.createElement("p");
    newMessage.innerText = msgbox.value;
    newMessage.classList.add("message");
    newMessage.classList.add("user_message");
    newMessage.classList.add("starter_message");

    body.append(newMessage)

    
    msgbox.value = "";
    

    fetch("https://springbootapi-1.onrender.com/api/msg/send", {
        method: "post",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            username: client.username,
            message: msgbox.value,
            reciever: receiver
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

function getMessages(){
    if(client == null){
        return
    }

    var answer = fetch("https://springbootapi-1.onrender.com/api/msg/get/" + client.username , {
        method: "GET"
    }).then(response => {
        try {
            console.log("Turning into object");
            console.log(response);
            return response.json();
        } catch (error) {
            console.log("This means that you have no messages.");
            return null;
        }

     })

     setTimeout(function(){
        answer.then(object => {
            try {
                console.log(object);
                var messageObject = object[0];
                var message = messageObject.Messages;   
                var messenger = messageObject.Messenger;    
                var string = "";
                for (i = 0; i < message.length; i++) {
                    var character = message[i]
                    if (character !== "[" && character !== "]") {
                        string = string+character;
                        console.log(string);
                    }
                }
                message = string;
                console.log(message," was sent by ",messenger);
                console.log(messenger[0]);        

            } catch (error) {
                console.log("This means that there was an error or everything is working.");
                console.log("The error was ",error);
            }   
    
        })
    }, 1000);

     
}