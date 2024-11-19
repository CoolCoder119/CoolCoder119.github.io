function createNewText(Text) {
    var div = document.createElement("div");
    document.getElementById("chat").appendChild(div);
    div.classList.add("Message");
    var author = document.createElement("h1");
    var text = document.createElement("h1");
    div.appendChild(author);
    div.appendChild(text);
    author.classList.add("Author");
    text.classList.add("Text");
    author.innerText = "Author";
    text.innerText = Text;

}

function sendToAPI(){
    var textInput = document.getElementById("input");
    //send this to server
    if (textInput.value != "") {
        createNewText(textInput.value)
        textInput.value = "";
    }

}