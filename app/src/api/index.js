import http from '../utils/http';

export default {
  getDashboard: async () => {
    return await http.get('/api/1?sort=1');
  },
  getDetails: async id => {
    return await http.get(`/api/${id}`);
  },
};
