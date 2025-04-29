var form = document.getElementById("login-form");

async function handleForm(event) { 
    event.preventDefault(); 

    const login_info = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    };

    const response = await fetch("/account/authenticate", {
        method: "POST",
        body: new URLSearchParams(login_info)
    });

    if(response.ok) {
        const results = await response.json();
        // save token to localstorage (results.token)
        console.log("token " + results.token);
        localStorage.setItem("username", results.token);

        alert("Successfully logged in");
        
        // redirect to home page
        window.location.href = "/home"
    } else {
        console.log(response);
        alert("Could not log in"); // TODO
    }
}

form.addEventListener('submit', handleForm);