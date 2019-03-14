import http from '../utils/http';

export default {
  getDashboard: async () => {
    return await http.get('/getMonitorList');
  },
  getDetails: async id => {
    return await http.get(`/getMonitor?m=${id}`);
  },
};
