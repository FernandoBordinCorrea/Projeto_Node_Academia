import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

// ADICIONE ESTAS LINHAS para garantir os headers
api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.put['Content-Type'] = 'application/json';
api.defaults.headers.patch['Content-Type'] = 'application/json';

export default api;