import axios from "axios";

// Define as configurações padrões quando cria a instância
const axiosInstance = axios.create();
  
  function getToken() {
    try {
      const tokenJWT: any = localStorage.getItem(`JWT`);
      const { token } = JSON.parse(JSON.parse(tokenJWT).auth);
      return token;
    } catch (error: any) {
      return null;
    }
  }
  
  axiosInstance.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
//   axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
//   axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3333';

export { axiosInstance };

