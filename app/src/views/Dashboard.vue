<template>
  <div class="dashboard">
    <grid-table title="Server" :header="header" :data="serverData"></grid-table>
    <grid-table title="Site" :header="header" :data="siteData"></grid-table>
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
import API from '../api';
import GridTable from '../components/GridTable.vue';
import OverallUptime from '../components/OverallUptime.vue';
import LatestDowntime from '../components/LatestDowntime.vue';
import QuickStats from '../components/QuickStats.vue';
import data from '../data.json';

const serverList = data.psp.monitors
  .filter(item => ~item.friendly_name.indexOf('Server/'))
  .map(item => ({
    ...item,
    name: item.friendly_name.replace('Server/', ''),
  }));

const siteList = data.psp.monitors
  .filter(item => ~item.friendly_name.indexOf('Site/'))
  .map(item => ({
    ...item,
    name: item.friendly_name.replace('Site/', ''),
  }));

export default {
  components: { GridTable, OverallUptime, LatestDowntime, QuickStats },
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
    this.update();
  },
  methods: {
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
    update() {
      API.getDashboard()
        .then(({ data }) => {
          this.monitors = data.psp.monitors;
          this.days = data.days;
          this.ratios = data.psp.pspStats.ratios;
          this.counts = data.psp.pspStats.counts;
          this.latestDownTimeStr = data.psp.latestDownTimeStr;

          setTimeout(() => {
            this.$emit('render');
          }, 1000);
        })
        .catch(e => {
          this.$emit('error', e);

          setTimeout(() => {
            this.$emit('render');
          }, 1000);
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
