<template>
  <div class="dashboard">
    <dashboard-table
      title="Server"
      :header="header"
      :data="serverData"
    />
    <dashboard-table
      title="Site"
      :header="header"
      :data="siteData"
    />
    <div class="overview">
      <overall-uptime
        v-if="uptime"
        :uptime="uptime"
        class="overview__item"
      />
      <latest-downtime
        :content="latestDownTimeStr"
        class="overview__item"
      />
      <quick-stats
        v-if="counts"
        :up="counts.up"
        :down="counts.down"
        :paused="counts.paused"
        class="overview__item"
      />
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
    uptime: null,
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
        .filter(item => ~item.name.indexOf(label))
        .map(item => [
          {
            label: 'Last 7 Days',
            value: item.weeklyRatio.ratio + '%',
            classes: ['text', item.weeklyRatio.label],
          },
          {
            label: 'Name',
            value: item.name.replace(label, ''),
            id: item.monitorId,
          },
          {
            label: 'Type',
            value: item.type,
          },
          {
            label: 'Interval',
            value: '5  mins',
          },
          ...this.days.map((label, index) => ({
            label,
            value: item.dailyRatios[index].ratio + '%',
            classes: ['block', item.dailyRatios[index].label],
          })),
        ]);
    },
    fetchData() {
      // this.monitors = data.psp.monitors;
      // this.days = data.days;
      // this.uptime = data.statistics.uptime;
      // this.counts = data.statistics.counts;
      // this.latestDownTimeStr = data.statistics.latest_downtime;
      // setTimeout(() => {
      //   this.setShowLoading(false);
      // }, 500);

      API.getDashboard().then(({ data }) => {
        this.monitors = data.psp.monitors;
        this.days = data.days;
        this.uptime = data.statistics.uptime;
        this.counts = data.statistics.counts;
        this.latestDownTimeStr = data.statistics.latest_downtime;

        setTimeout(() => {
          this.setShowLoading(false);
        }, 250);
      }).catch(e => {
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
