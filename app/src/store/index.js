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
    cd: 60,
  },
  getters: {},
  actions: {},
  mutations: {
    setShowLoading(state, showLoading) {
      if (state.showLoading && !showLoading) {
        state.cd = 60;
      }

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
    updateCD(state) {
      if (state.showLoading) {
        return;
      }

      if (state.cd === 1) {
        state.cd = 60;
        return;
      }

      state.cd--;
    },
  },
  strict: debug,
});

export default store;
