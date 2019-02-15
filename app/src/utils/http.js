import axios from 'axios';

axios.defaults.baseURL = 'https://status.romachuu.com';

const http = axios.create();

export default http;
