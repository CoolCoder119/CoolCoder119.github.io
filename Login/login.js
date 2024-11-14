function Submit() {
    var username = document.getElementById("username");
    var login = document.getElementById("login");
    alert(username.textContent);
    alert(login.textContent);
}
window.onload = function() {
    var submit = document.getElementById("submit");
    submit.addEventListener("click", Submit);
}
