function LoginAccount (url, credentials) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
    mode: 'cors'
  }
  //   retornar la promesa
  return fetch(URL, options)
}

export default LoginAccount
