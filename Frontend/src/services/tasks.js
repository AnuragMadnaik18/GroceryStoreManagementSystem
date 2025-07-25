import axios from 'axios'
import { config } from './config'

export async function createTask(title, description) {
  try {
    // create url
    const url = `${config.serverUrl}/task/`

    // create body
    const body = { title, description }

    // get the token
    const token = sessionStorage.getItem('token')

    // make the API call
    const response = await axios.post(url, body, {
      headers: {
        token, // sending the token here
      },
    })

    // send response
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function getTasks() {
  try {
    // create url
    const url = `${config.serverUrl}/task/`

    // get the token
    const token = sessionStorage.getItem('token')

    // make the API call
    const response = await axios.get(url, {
      headers: {
        token,
      },
    })

    // send the response
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function deleteTask(id) {
  try {
    // create url
    const url = `${config.serverUrl}/task/${id}`

    // get the token
    const token = sessionStorage.getItem('token')

    // make the API call
    const response = await axios.delete(url, {
      headers: {
        token,
      },
    })

    // send the response
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}
