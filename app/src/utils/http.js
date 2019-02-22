import axios from 'axios';

axios.defaults.baseURL = 'https://api.romachuu.com';

const http = axios.create();

export default http;
