// sets the value of a hidden field to the user's token so that it is sent
// with the POST request
document.addEventListener('DOMContentLoaded', function() {
    token = localStorage.getItem("username");
    console.log(token);
    document.querySelector("#username").value = token;
})
