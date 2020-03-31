<template>
  <div class="details">
    <monitor-table
      :server-name="name"
      :type="type"
      :data="ratios"
    />
    <response-time :data="responseTimes" />
    <monitor-log
      :server-name="name"
      :data="logs"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import MonitorTable from '../components/MonitorTable.vue';
import ResponseTime from '../components/ResponseTime.vue';
import MonitorLog from '../components/MonitorLog.vue';
import API from '../api';
// import monitorData from '../monitor.json';

export default {
  components: {
    MonitorTable,
    ResponseTime,
    MonitorLog,
  },
  data: () => ({
    name: '',
    type: '',
    ratios: [],
    responseTimes: [],
    logs: [],
  }),
  computed: {},
  beforeCreate() {
    if (!this.$route.params.id) {
      this.$router.push({ name: 'home' });
    }
  },
  mounted() {
    this.fetchData();
  },
  beforeRouteLeave(to, from, next) {
    this.setShowLoading(true);
    setTimeout(() => {
      next();
    }, 400);
  },
  methods: {
    ...mapMutations(['setShowLoading', 'setShowMsg']),
    fetchData() {
      // this.convertData(monitorData);
      // setTimeout(() => {
      //   this.setShowLoading(false);
      // }, 500);
      API.getDetails(this.$route.params.id).then(({ data }) => {
        this.convertData(data);
        setTimeout(() => {
          this.setShowLoading(false);
        }, 250);
      }).catch(e => {
        this.setShowMsg({
          showMsg: 'Error',
          msgTitle: e.message,
          msgSubTitle: e.message,
          msgContent: 'An error occurred, please try again later...',
        });

        setTimeout(() => {
          this.setShowLoading(false);
        }, 250);
      });
    },
    convertData(data) {
      const { days, monitor } = data;
      const { name, type, dailyRatios, responseTimes, logs } = monitor;

      this.name = name.split('/')[1];
      this.type = type;
      this.ratios = dailyRatios.map((item, index) => ({
        label: days[index],
        value: item.ratio + '%',
        classes: [item.label],
      }));

      let border = 0;
      for (let i = 1; i < responseTimes.length; i++) {
        if (responseTimes[i - 1].datetime > responseTimes[i].datetime) {
          border = i;
          break;
        }
      }

      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      const l24 = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const yesterday = `${l24.getFullYear()}-${l24.getMonth() + 1}-${l24.getDate()}`;

      responseTimes.forEach((item, index) => {
        item.datetime = new Date(`${index < border ? yesterday : today} ${item.datetime}`).getTime();
      });

      this.responseTimes = responseTimes.map(item => [item.datetime, item.value]);
      this.logs = logs.map(item => ({
        status: item.label,
        datetime: item.date,
        reason: item.reason,
        duration: item.duration,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  padding: 20px 20px 34px 20px;
}
</style>
