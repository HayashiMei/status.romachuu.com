<template>
  <div class="details">
    <monitor-table :server-name="name" :type="type" :data="ratios"></monitor-table>
    <response-time :data="responseTimes"></response-time>
    <monitor-log :server-name="name" :data="logs"></monitor-log>
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
      API.getDetails(this.$route.params.id)
        .then(({ data }) => {
          this.convertData(data);
          setTimeout(() => {
            this.setShowLoading(false);
          }, 250);
        })
        .catch(e => {
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
      const { days, psp } = data;
      const currentMonitor = psp.monitors[0];
      const { friendly_name, typeStr, customuptimeranges, response_times, allLogs } = currentMonitor;

      this.name = friendly_name.split('/')[1];
      this.type = typeStr;
      this.ratios = customuptimeranges.map((item, index) => ({
        label: days[index],
        value: item.ratio + '%',
        classes: [item.label],
      }));
      this.responseTimes = response_times.sort((a, b) => a.datetime - b.datetime).map(item => [item.datetime * 1000, item.value]);
      this.logs = allLogs.map(item => ({
        status: item.statusStr,
        datetime: item.dateTimeStr,
        reason: item.reasonTitle,
        duration: item.durationStr,
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
