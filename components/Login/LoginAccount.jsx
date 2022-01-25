function LoginAccount (url, credentials) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    mode: 'cors'
  }
  const query = fetch(url, options)
  // console.log(query)
  return query
}

export default LoginAccount
