import http from '../utils/http';

export default {
  getDashboard: () => http.get(`/getMonitorList?page=1&_=${new Date().getTime()}`),
  getDetails: id => http.get(`/getMonitor?m=${id}&_=${new Date().getTime()}`),
};
