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

      <!-- <span class="tab-chart__year">2020</span> -->
    </div>

    <div class="tab-chart__container">
      <div class="imgs">
        <el-tooltip v-for="(item, index) in this.deviceList" :key="index" class="item" effect="dark"  placement="top-start">
          <div slot="content" v-html="itemToolTip(item)"></div>
          <div class="img-item" :style="bgcPositon(item)"></div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			location: "",
			deviceData: [],
			groupList: [],
			deviceList: []
		};
	},

	computed: {},
	created() {
    this.getGroupList()
  },
	watch: {
		location() {
			this.deviceList = this.deviceData.filter((item) => item.location === this.location);
		}
	},
	methods: {
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
		async getGroupList() {
			try {
				const data = await this.$service.device.list();
				this.deviceData = data;
				this.groupList = this.deviceData.map((item) => item.location);
				this.groupList = Array.from(new Set(this.groupList));

				this.location = this.groupList[0];
				this.deviceList = this.deviceData.filter((item) => item.location === this.location);
				console.log(this.deviceList);
			} catch (error) {
				console.warn(error);
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
