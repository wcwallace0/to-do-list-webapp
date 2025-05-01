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
        localStorage.setItem("username", results.token);

        alert("Successfully logged in");
        
        // redirect to home page
        window.location.href = "/home"
    } else {
        const results = await response.json();
        console.log(results);
        alert("Auth Error: " + results.err);
    }
}

form.addEventListener('submit', handleForm);