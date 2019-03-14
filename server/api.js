const axios = require('axios');

const http = axios.create({
  baseURL: 'https://stats.uptimerobot.com',
  headers: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    Origin: 'https://stats.uptimerobot.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3598.0 Safari/537.36',
  },
});

module.exports = {
  getDashboard: async () => {
    return await http.get(`/api/getMonitorList/wkKGzU4zO?page=1&_=${new Date().getTime()}`);
  },
  getDetails: async id => {
    return await http.get(`/api/getMonitor/wkKGzU4zO?m=${id}&_=${new Date().getTime()}`);
  },
};
