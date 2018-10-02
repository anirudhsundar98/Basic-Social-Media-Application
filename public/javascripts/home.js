async function fetchUsers() {
  let source = document.getElementById("template").innerHTML;
  let template = Handlebars.compile(source);
  let graphQLQuery = `{
    "query": "query UsersQuery { getAllUsers { username } }"
  }`;

  let data = await getUserData(graphQLQuery);
  document.querySelector("#users-container").innerHTML = template(data);
};

function getUserData(query) {
  return fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: query
  })
  .then(response => response.json())
  .then(response => ({ 
    users: [...response.data.getAllUsers]
  }) );
}

async function logout() {
  let x = await fetch("/logout", {
    method: "DELETE",
    credentials: 'include'
  });

  window.location.href = "/login";
}
