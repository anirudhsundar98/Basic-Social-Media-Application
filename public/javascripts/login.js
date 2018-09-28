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
  .then(response => response.json());

  if (response.success) {
    window.location.href = "/";
  } else {
    console.log("Unable to login");
  }
}
