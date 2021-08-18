<template>
  <div class="tab-chart">
    <div class="tab-chart__header">
      <ul class="tab-chart__tab">
        <li class="active">设备概况</li>
      </ul>

      <!-- <span class="tab-chart__year">2020</span> -->
    </div>

    <div class="tab-chart__container">
      <!-- <vue-echarts :options="chartOptions" autoresize></vue-echarts> -->
      <div class="imgs">
        <div class="img-item" v-for="(item,index) in this.chartOptions.series[0].data" :key="index" :style="item.style()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import VueEcharts from "vue-echarts";
import { mapGetters } from "vuex";
var svg =
	"M136.71078,90.7149424 C135.038663,90.084817 133.319214,89.8204828 131.637995,89.8987366 C131.93792,88.5693311 132.022117,87.2371959 131.901965,85.9319035 C131.475516,81.1970909 128.414369,76.8944942 123.681104,75.0882862 C118.812669,73.2488659 113.532803,74.556888 110.072058,78.0014222 C111.44425,78.0132512 112.836467,78.2716709 114.184082,78.7876003 C120.385569,81.1311211 123.498145,88.0593162 121.156545,94.2582038 C120.289538,96.5421242 118.80038,98.4052027 116.960324,99.7405227 C113.796773,102.011704 109.591905,102.714169 105.683776,101.228711 C99.4827445,98.8915594 96.3669821,91.9606345 98.7113134,85.7581072 C99.0176102,84.9537305 99.4044636,84.2007647 99.8609505,83.4869258 L99.8545788,83.4869258 C99.8545788,83.4869258 99.8545788,83.4869258 99.8545788,83.4932953 C101.850742,80.3754255 103.561544,76.9968612 104.927364,73.3990041 C115.528966,45.4164295 101.427934,14.127175 73.4261234,3.52605368 C45.4215819,-7.07142797 14.1333382,7.02472855 3.52900521,35.0104878 C0.629425582,42.6470623 -0.42099504,50.523403 0.149272308,58.1686218 C0.16110547,58.4206719 0.185226914,58.6786366 0.209348358,58.9366014 C2.47266801,84.9182432 19.2184117,108.595036 45.2413538,118.442737 C71.7121355,128.45559 100.448968,121.413198 119.352898,102.762395 C122.585626,99.6263266 127.465895,98.4657129 131.950208,100.160455 C137.34704,102.203699 140.39954,107.712861 139.559386,113.191995 C141.579216,111.769777 143.215378,109.750646 144.163851,107.256987 C146.676122,100.628613 143.33553,93.2204304 136.71078,90.7149424 ZZ";
var decals = [
	{
		symbol: "path://" + svg
	}
];

export default {
	components: {
		VueEcharts
	},

	data() {
		return {
			chartOptions: {
				grid: {
					top: "-20px",
					// bottom: "-5px",
					right: "-135px",
					left: "-50px"
					// containLabel: true
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
							color: ({ data }) => {
								if (data.status() === 1) {
									return "#909399";
								}
								if (data.status() === 2) {
									return "#E6A23C";
								}
								if (data.status() === 3) {
									return "#F2637B";
								}
								return "#19BE6B";
							}
						},
						symbolSize: 15,
						type: "scatter"
					}
				],
				tooltip: {
					position: "top",
					formatter: ({ data }) => {
						let statusStr = "在线";
						if (data.status() === 1) {
							statusStr = "离线";
						}
						if (data.status() === 2) {
							statusStr = "有一般警告";
						}
						if (data.status() === 3) {
							statusStr = "有严重警告";
						}
						return `${data.name} ${statusStr}`;
					}
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

		const count = 20;

		for (let index = 0; index < count; index++) {
			for (let j = 0; j < count; j++) {
				this.chartOptions.series[0].data.push({
					name: `设备：no${j + index}`,
					status: () => {
						if (j + index < 8) {
							return 1; // 关机
						} else if (j + index > 30) {
							return 2; // 一般报警
						} else if (j + index > 12 && j + index < 15) {
							return 3; // 严重警告
						} else {
							return 0;
						}
					},
					style: () => {
						if (j + index < 8) {
							return `background-position: -567px -5px`; // 关机
						} else if (j + index > 30) {
							return `background-position: -30px -126px`; // 一般报警
						} else if (j + index > 12 && j + index < 15) {
							return `background-position: -167px -126px`; // 严重警告·
						} else {
							return `background-position: -30px 0px`;
						}
					},
					value: [index, j]
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.imgs {
	display: flex;
	flex-flow: wrap;
	flex-direction: row;
}
.img-item {
	display: inline-block;
	background: url('../../../assets/zaji.png') no-repeat;
	width: 120px;
	height: 115px;
}
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
		height: calc(100vh - 350px);
		padding: 0 15px;

		.echarts {
			height: 100%;
			width: 100%;
		}
	}
}
</style>
