<template>
  <div class="tab-chart">
    <div class="tab-chart__header">
      <ul class="tab-chart__tab">
        <li class="active">销售额</li>
        <li>访问量</li>
      </ul>

      <span class="tab-chart__year">2020</span>
    </div>

    <div class="tab-chart__container">
      <vue-echarts :options="chartOptions" autoresize></vue-echarts>
    </div>
  </div>
</template>

<script>
import VueEcharts from "vue-echarts";
import { mapGetters } from "vuex";

export default {
	components: {
		VueEcharts
	},

	data() {
		return {
			chartOptions: {
				grid: {
					top: "20px",
					bottom: "30px",
					right: "10px",
					containLabel: true
				},
				xAxis: {
					show: false
				},
				yAxis: {
					show: false
				},

				series: [
					{
						itemStyle: {
							color: (seriesIndex, dataIndex, data, value) => {
								// console.log(seriesIndex);
								return "#36CBCB";
								// F2637B
							}
						},
						symbolSize: 15,
						type: "scatter"
					}
				],
				tooltip: {
					position: "top"
				}
			}
		};
	},

	computed: {
		...mapGetters(["browser"])
	},

	watch: {
		"browser.isMini": {
			immediate: true,
			handler(v) {
				this.chartOptions.series.map((e) => {
					e.barWidth = v ? 15 : 25;
				});
			}
		}
	},

	created() {
		this.chartOptions.series[0].data = [];

		for (let index = 0; index < 10; index++) {
			for (let j = 0; j < 2; j++) {
				this.chartOptions.series[0].data.push({
					name: j + index,
					value: [index, j]
				});
			}
		}

		console.log(this.chartOptions);
	}
};
</script>

<style lang="scss" scoped>
.tab-chart {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50px;
		padding: 0 20px;

		ul {
			li {
				list-style: none;
				float: left;
				margin-right: 20px;
				font-size: 15px;
				color: #dbdbdb;
				cursor: pointer;

				&.active {
					color: #000;
					font-weight: bold;
				}
			}
		}
	}

	&__year {
		font-size: 14px;
		position: relative;

		&::before {
			display: block;
			content: "";
			height: 8px;
			width: 8px;
			border-radius: 8px;
			background-color: #000;
			position: absolute;
			left: -15px;
			top: 4px;
		}
	}

	&__container {
		height: 300px;
		padding: 0 15px;

		.echarts {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
