import http from '../utils/http';

export default {
  getDashboard: async () => {
    return await http.get(`https://stats.uptimerobot.com/api/getMonitorList/wkKGzU4zO?page=1&_=${new Date().getTime()}`);
  },
  getDetails: async id => {
    return await http.get(`https://stats.uptimerobot.com/api/getMonitorList/wkKGzU4zO?m=${id}&_=${new Date().getTime()}`);
  },
};
