<template>
  <div class="response-times">
    <h1>Response Time</h1>
    <div
      ref="chart"
      class="chart"
    />
  </div>
</template>

<script>
import ECharts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    myChart: null,
  }),
  computed: {
    options() {
      return {
        tooltip: {
          trigger: 'axis',
          formatter: p => p[0].value[1] + ' milliseconds',
          position: pt => [pt[0], '10%'],
          backgroundColor: 'hsla(0,0%,100%,.9)',
          textStyle: { color: 'rgba(0,0,0,.87)', fontSize: 12, fontWeight: 'normal' },
        },
        grid: {
          containLabel: true,
          left: 10,
          top: 20,
          right: 10,
          bottom: 10,
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: '#fff',
            showMinLabel: false,
            showMaxLabel: false,
          },
        },
        yAxis: {
          type: 'value',
          minInterval: 200,
          splitLine: {
            show: false,
          },
          axisLabel: {
            color: '#fff',
          },
        },
        series: [
          {
            name: 'ResponseTime',
            type: 'line',
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: '#f2c047',
            },
            areaStyle: {
              color: new ECharts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#f2c047',
                },
                {
                  offset: 1,
                  color: '#f1cc75',
                },
              ]),
            },
            data: this.data,
          },
        ],
      };
    },
  },
  watch: {
    data() {
      this.initChart();
    },
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initChart() {
      if (!this.myChart) {
        this.myChart = ECharts.init(this.$refs.chart);
        window.addEventListener('resize', this.handleResize);
      }
      this.myChart.setOption(this.options);
    },
    handleResize() {
      this.myChart.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
.response-times {
  overflow: hidden;

  .chart {
    height: 300px;
  }
}
</style>
