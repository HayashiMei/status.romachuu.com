<template>
  <div class="dashboard">
    <dashboard-table title="Server" :header="header" :data="serverData"></dashboard-table>
    <dashboard-table title="Site" :header="header" :data="siteData"></dashboard-table>
    <div class="overview">
      <overall-uptime v-if="ratios" :ratios="ratios" class="overview__item"></overall-uptime>
      <latest-downtime :content="latestDownTimeStr" class="overview__item"></latest-downtime>
      <quick-stats
        v-if="counts"
        :up="counts.up"
        :down="counts.down"
        :paused="counts.paused"
        class="overview__item"
      ></quick-stats>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import API from '../api';
import DashboardTable from '../components/DashboardTable.vue';
import OverallUptime from '../components/OverallUptime.vue';
import LatestDowntime from '../components/LatestDowntime.vue';
import QuickStats from '../components/QuickStats.vue';
// import statusData from '../status.json';

export default {
  components: { DashboardTable, OverallUptime, LatestDowntime, QuickStats },
  data: () => ({
    monitors: [],
    days: [],
    ratios: null,
    latestDownTimeStr: '',
    counts: null,
  }),
  computed: {
    header() {
      return ['Last 7 Days', 'Name', 'Type', 'Interval', ...this.days];
    },
    serverData() {
      return this.convert(this.monitors, 'Server/');
    },
    siteData() {
      return this.convert(this.monitors, 'Site/');
    },
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
    convert(monitors, label) {
      return monitors
        .filter(item => ~item.friendly_name.indexOf(label))
        .map(item => [
          {
            label: 'Last 7 Days',
            value: item.oneWeekRange.ratio + '%',
            classes: ['text', item.oneWeekRange.label],
          },
          {
            label: 'Name',
            value: item.friendly_name.replace(label, ''),
            id: item.id,
          },
          {
            label: 'Type',
            value: item.typeStr,
          },
          {
            label: 'Interval',
            value: item.intervalMin + ' mins',
          },
          ...this.days.map((label, index) => ({
            label,
            value: item.customuptimeranges[index].ratio + '%',
            classes: ['block', item.customuptimeranges[index].label],
          })),
        ]);
    },
    fetchData() {
      // this.monitors = statusData.psp.monitors;
      // this.days = statusData.days;
      // this.ratios = statusData.psp.pspStats.ratios;
      // this.counts = statusData.psp.pspStats.counts;
      // this.latestDownTimeStr = statusData.psp.latestDownTimeStr;
      // setTimeout(() => {
      //   this.setShowLoading(false);
      // }, 500);

      API.getDashboard()
        .then(({ data }) => {
          this.monitors = data.psp.monitors;
          this.days = data.days;
          this.ratios = data.psp.pspStats.ratios;
          this.counts = data.psp.pspStats.counts;
          this.latestDownTimeStr = data.psp.latestDownTimeStr;

          setTimeout(() => {
            this.setShowLoading(false);
          }, 250);
        })
        .catch(e => {
          this.setShowMsg({
            showMsg: true,
            msgTitle: 'Error',
            msgSubTitle: e.message,
            msgContent: 'An error occurred, please try again later...',
          });

          setTimeout(() => {
            this.setShowLoading(false);
          }, 250);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px 20px 34px 20px;
}

.overview {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    width: 100%;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.12);
  }

  .overview__item {
    width: calc((100% - 40px) / 3);
  }

  @media (max-width: 720px) {
    flex-direction: column;

    .overview__item {
      width: 100%;
    }
  }
}
</style>
