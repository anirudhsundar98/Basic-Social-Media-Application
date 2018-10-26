import config from "../config";

/**
 * Meant to check the session each time the user visits a new page.
 * This is to make sure that the user is forced to login again if he visits a new page after his session expires.
 * Meaningless for social media platforms as they generally have sessions that never expire too soon.
 * The fact that the cookie's expiration date in this app is one year makes it even more meaningless.
 * Implemented simply as an exercise. Component is commented out in the main app.
 * Performance can be augmented with a timeout between session checks (like once every x units of time).
 * This will also reduce the number of requests sent to the server. 
 */
async function checkSession(sendGraphQLQuery) {
  let graphQLQuery = `{ "query":
      "query getSession {
        getSession
      }"
    }`;

  let sessionId = await sendGraphQLQuery(graphQLQuery)
    .then(response => response.data.getSession)
    .catch(err => {
      console.error(err);
      return null;
    });

  if (!sessionId) {
    alert("Your session has expired. Please log back in.")
    window.location.href = config.serverRoot + "/login";
    return;
  }
}

export function SessionChecker(props) {
  checkSession(props.sendGraphQLQuery);
  return null;
}
