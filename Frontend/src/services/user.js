import axios from 'axios'
import { config } from './config'

export async function registerUser(
  firstName,
  lastName,
  email,
  password,
  phone
) {
  try {
    // create the API url
    const url = `${config.serverUrl}/user/register`

    // create the request body
    const body = {
      firstName,
      lastName,
      email,
      password,
      phone,
    }

    // make the POST /user/register API call
    const response = await axios.post(url, body)

    // return the response body to the caller
    return response.data
  } catch (ex) {
    console.log(`exception occurred: `, ex)
  }
}

export async function loginUser(email, password) {
  try {
    // create url
    const url = `${config.serverUrl}/user/login`

    // create body
    // const body = {
    //   email: email,
    //   password: password,
    // }
    const body = { email, password }

    // make the api call
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}
