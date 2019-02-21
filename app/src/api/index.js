import http from '../utils/http';

export default {
  getDashboard: async () => {
    return await http.get('/api/status/1?sort=1');
  },
  getDetails: async id => {
    return await http.get(`/api/monitor/${id}`);
  },
};
