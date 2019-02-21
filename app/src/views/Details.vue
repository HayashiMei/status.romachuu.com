<template>
  <div class="details">
    <monitor-table :title="name" :data="ratios"></monitor-table>
    <response-time :data="responseTimes"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import MonitorTable from '../components/MonitorTable.vue';
import ResponseTime from '../components/ResponseTime.vue';
import API from '../api';
// import monitorData from '../monitor.json';

export default {
  components: {
    MonitorTable,
    ResponseTime,
  },
  data: () => ({
    name: '',
    ratios: [],
    responseTimes: [],
  }),
  computed: {},
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
            showMsg: true,
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
      const { friendly_name, customuptimeranges, response_times } = currentMonitor;

      this.name = friendly_name.split('/')[1];
      this.ratios = customuptimeranges.map((item, index) => ({
        label: days[index],
        value: item.ratio + '%',
        classes: [item.label],
      }));
      this.responseTimes = response_times.sort((a, b) => a.datetime - b.datetime).map(item => [item.datetime * 1000, item.value]);
    },
  },
};
</script>

<style lang="scss" scoped>
.details {
  padding: 20px 20px 34px 20px;
}
</style>
