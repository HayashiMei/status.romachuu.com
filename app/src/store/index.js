import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  state: {
    showLoading: true,
    showMsg: false,
    msgTitle: '',
    msgSubTitle: '',
    msgContent: '',
  },
  getters: {},
  actions: {},
  mutations: {
    setShowLoading(state, showLoading) {
      state.showLoading = showLoading;
    },
    setShowMsg(state, { showMsg, msgTitle, msgSubTitle, msgContent }) {
      state.showMsg = showMsg;

      if (showMsg) {
        state.msgTitle = msgTitle;
        state.msgSubTitle = msgSubTitle;
        state.msgContent = msgContent;
      } else {
        state.msgTitle = '';
        state.msgSubTitle = '';
        state.msgContent = '';
      }
    },
  },
  strict: debug,
});

export default store;
