async function createUser() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let query = JSON.stringify({ 
    query: `mutation Create { createUser(username: "${username}", password:"${password}") { success message } }` 
  });

  let response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: query
  })
  .then(response => response.json())
  .then(response => ({...response.data.createUser}) )
  .catch(err => console.error(err));

  if (response.success) {
    login(username, password);
  } else {
    alert(response.message);
  }
}

function enterSignup(event) {
  if (event.keyCode === 13) {
    createUser();
  }
}

let startCheckRequest = (() => {
  let requestTimer = null;

  return (username) => {
    clearTimeout(requestTimer);
    requestTimer = setTimeout(() => {
      checkUsername(username, event);
    }, 250);
  }
})();

async function checkUsername(username) {
  let query = JSON.stringify({
    query: `query userExists { userExists(username: "${escape(username)}") }`
  });

  let userExists = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: query
  })
  .then(response => response.json())
  .then(response => (response.data.userExists))
  .catch(err => {
    console.error(err);
    return null;
  });

  if (userExists === null) {
    return;
  }

  if (userExists) {
    document.querySelector("#username-check").style.opacity = 1;
  } else {
    document.querySelector("#username-check").style.opacity = 0;
  }
}
