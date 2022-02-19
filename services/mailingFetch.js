import { URL_FULL } from './config'
const url = `${URL_FULL}/mail`
async function sendMail (data) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  console.log('esto es lo que se esta enviando', data)
  const response = await fetch(url, options)
  return response.json()
}

export default sendMail
