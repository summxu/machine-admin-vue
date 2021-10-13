<template>
  <div class="tab-chart">
    <div class="tab-chart__header">
      <ul class="tab-chart__tab">
        <li class="active">设备概况</li>
      </ul>

      <ul class="tab-chart__tab">
        <li style="vertical-align: middle;" class="active">设备地点：</li>
        <el-select size="small" v-model="location" placeholder="请选择">
          <el-option v-for="(item, index) in groupList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </ul>
    </div>

    <div class="tab-chart__container">
      <div class="imgs">
        <el-tooltip v-for="(item, index) in this.deviceList" :key="index" class="item" effect="dark" placement="top-start">
          <div slot="content" v-html="itemToolTip(item)"></div>
          <div class="img-item" @click="oneClick(item)" :style="bgcPositon(item)"></div>
        </el-tooltip>
      </div>
    </div>

    <cl-dialog title="设备信息" width="650px" :visible.sync="visible">
      <vue-echarts :style="{height:'200px'}" :options="option" autoresize></vue-echarts>

      <div>
        <p class="title">红外状态</p>
        <div class="red-box">
          <div class="red-item" v-for="(item,index) in infoData.infrared" :key="index" :style="{background:redbgc(item)}"></div>
        </div>
      </div>

      <div>
        <p class="title">设备参数</p>
        <div class="red-box">
          <el-input type="textarea" :rows="4" placeholder="输入设备参数" v-model="textarea">
          </el-input>
          <el-button class="send-btn" type="text">发送</el-button>
        </div>
      </div>
    </cl-dialog>
  </div>
</template>

<script>
import VueEcharts from "vue-echarts";
import "echarts";
export default {
	components: {
		VueEcharts
	},
	data() {
		return {
			location: "",
			deviceData: [],
			infoData: {},
			groupList: [],
			deviceList: [],
			visible: false,
			currentItem: {},
			textarea: "",
			option: {
				title: {
					text: "设备电源电压显示图"
				},
				xAxis: {
					data: []
				},
				yAxis: {
					type: "category"
				},
				series: [
					{
						data: [],
						type: "line"
					}
				]
			}
		};
	},

	computed: {},
	created() {
		// 轮询请求
		this.getGroupList();
		setInterval(() => {
			if (this.currentItem && this.visible) {
				this.getGroupList(true);
				this.getInfo();
			}
		}, 30000);
	},
	watch: {
		location() {
			this.deviceList = this.deviceData.filter((item) => item.location === this.location);
		},
		visible(value) {
			if (!value) return;
			this.getInfo();
		}
	},
	methods: {
		redbgc(item) {
			if (item === 1) {
				return "#67C23A";
			} else if (item === 2) {
				return "#E6A23C";
			} else if (item === 3) {
				return "#F56C6C";
			} else if (item === 0) {
				return "#909399";
			}
		},
		async getInfo() {
			try {
				const res = await this.$service.device.info({ id: this.currentItem.id });
				this.infoData = res;
				this.option.xAxis.data = res.voltage.map((item) => item.time);
				this.option.series[0].data = res.voltage
					.map((item) => item.value)
					.sort((a, b) => a - b);

				this.option.series[0].data = this.option.series[0].data.map((item) => {
					if (item == 0) {
						item = "0V";
					} else if (item == 1) {
						item = "12V";
					} else if (item == 2) {
						item = "24V";
					}
					return item;
				});
				console.log(this.option.series[0].data);
			} catch (error) {
				console.warn(error);
			}
		},
		oneClick(item) {
			this.currentItem = item;
			this.visible = true;
		},
		itemToolTip(item) {
			var str = "";
			if (item.status === 0) {
				str = "关机";
			} else if (item.status === 2) {
				str = "一般报警";
			} else if (item.status === 3) {
				str = "严重警告";
			} else {
				str = "在线";
			}
			return `设备：${item.name}<br>
              状态：${str}`;
		},
		// 精灵图大小
		bgcPositon(item) {
			if (item.status === 0) {
				return `background-position: -567px -5px`; // 关机
			} else if (item.status === 2) {
				return `background-position: -30px -126px`; // 一般报警
			} else if (item.status === 3) {
				return `background-position: -167px -126px`; // 严重警告·
			} else {
				return `background-position: -30px 0px`;
			}
		},
		async getGroupList(isFOR) {
			try {
				const data = await this.$service.device.page({
					page: 1,
					size: 999999
				});
				this.deviceData = data.list;
				this.deviceList = this.deviceData.filter((item) => item.location === this.location);
				if (isFOR) return;
				this.groupList = this.deviceData.map((item) => item.location);
				this.groupList = Array.from(new Set(this.groupList));
				this.location = this.groupList[0];
			} catch (error) {
				console.warn(error);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	font-size: 18px;
	font-weight: 700;
	color: #333;
}
.red-box {
	padding: 30px;
	display: flex;
	flex-flow: nowrap row;
	justify-content: space-around;
}
.red-item {
	width: 35px;
	height: 35px;
	border-radius: 50%;
}
.send-btn {
	position: absolute;
	bottom: 50px;
	right: 65px;
}
.imgs {
	display: flex;
	flex-flow: wrap;
	flex-direction: row;
}
.img-item {
	// display: inline-block;
	cursor: pointer;
	background: url("../../../assets/zaji.png") no-repeat;
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
