function LoginAccount (url, credentials) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    mode: 'cors'
  }
  return fetch(url, options)
}

export default LoginAccount
