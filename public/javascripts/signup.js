async function createUser() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector("#password").value;
  let query = JSON.stringify({ 
    query: `mutation m { createUser(username: "${username}", password:"${password}") { success message } }` 
  });

  let response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: query
  })
  .then(response => response.json())
  .then(response => ({...response.data.createUser}) ) ;

  if (response.success) {
    login(username, password);
  } else {
    console.log(response.message);
  }
}
