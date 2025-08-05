import axios from 'axios';
import { config } from './config';

export async function registerUser(fullName, address, email, password, phoneNumber) {
  try {
    const url = `${config.serverUrl}/user/register`;

    const body = {
      fullName,
      address,
      email,
      password,
      phoneNumber,
    };

    const response = await axios.post(url, body);
    return response.data;
  } catch (ex) {
    console.error('User Registration Exception:', ex);
    return { status: 'error', error: 'Registration failed' };
  }
}

export async function loginUser(email, password) {
  try {
    const url = `${config.serverUrl}/user/login`;

    const body = {
      email,
      password,
    };

    const response = await axios.post(url, body);
    return response.data;
  } catch (ex) {
    console.error('User Login Exception:', ex);
    return { status: 'error', error: 'Login failed' };
  }
}
