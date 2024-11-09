var textInput;
window.onload = function() {
    textInput = document.getElementById("Input");
    var body = document.getElementById("body")
    body.clientWidth = window.innerWidth;
    body.clientHeight = window.innerHeight;
    
}


function sendToAPI(){
    alert("hihi")
    console.log('button presed')
    alert(textInput.textContent);
}


