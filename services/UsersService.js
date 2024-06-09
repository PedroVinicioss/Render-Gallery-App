import axios from 'axios';



// export function getUsersByEmail(email){
//     return USERS.find((user) => (user.email == email));
// }

import { API_BASE_URL } from '../env.js';

const urlApi = API_BASE_URL;


export async function login(email, password) {
    try {
      const response = await axios.post(`${urlApi}/api/mobile/login`, {
        email: email,
        password: password
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
          throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
          throw new Error('Erro de rede: não foi possível conectar ao servidor');
      } else {
          throw new Error('Erro ao enviar solicitação');
      }
    }
  }

  export async function register(data) {
    try {
        const response = await axios.post(`${urlApi}/api/mobile/register`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      

          return response.data;
        } catch (error) {
          console.error("Erro ao cadastrar usuário:", error.message);
          Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.');
        }
  }

export async function getUsersById(userId){
    try {
        const response = await axios.get(`${urlApi}/api/mobile/Getuser/${userId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(JSON.stringify(error.response.data));
        } else if (error.request) {
            throw new Error('Erro de rede: não foi possível conectar ao servidor');
        } else {
            throw new Error('Erro ao enviar solicitação');
        }
    }
}
