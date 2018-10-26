async function login(name, pwd) {
  let username = name || document.querySelector("#username").value;
  let password = pwd || document.querySelector("#password").value;
  let requestBody = { username: username, password: password }

  let response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(requestBody)
  })
  .then(response => response.json())
  .catch(err => console.error(err));

  if (response.success) {
    window.location.href = "/";
  } else {
    alert("Unable to login");
  }
}

function enterLogin(event) {
  if(event.keyCode === 13) {
    login();
  }
}
