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

    <cl-dialog :loading="loading" title="设备信息" width="650px" :visible.sync="visible">
      <vue-echarts :style="{height:'200px'}" :options="option" autoresize></vue-echarts>

      <div>
        <p class="title">红外状态</p>
        <div class="red-box">
          <div class="red-item" v-for="(item,index) in infoData.infrared" :key="index" :style="{background:redbgc(item)}"></div>
        </div>
      </div>

      <div v-if="formData.length">
        <p class="title">设备参数</p>
        <el-form size="mini" ref="form" label-width="150px">
          <el-tabs value="name1">
            <el-tab-pane label="菜单1" name="name1">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="出入口开启时长">
                    <el-input-number style="width: 100%" :min="1" :max="255" v-model="formData[0]"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="延时开闸时间">
                    <el-input-number style="width: 100%" :min="1" :max="6" v-model="formData[1]"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="延时关闸时间">
                    <el-input-number style="width: 100%" :min="1" :max="6" v-model="formData[2]"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="开门转速等级">
                    <el-select v-model="formData[3]">
                      <el-option label="低速" :value="1">低速</el-option>
                      <el-option label="高速" :value="2">高速</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="关门转速等级">
                    <el-select v-model="formData[4]">
                      <el-option label="低" :value="1">低</el-option>
                      <el-option label="高" :value="2">高</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="开门扭力等级">
                    <el-select v-model="formData[5]">
                      <el-option label="小" :value="1">小</el-option>
                      <el-option label="中" :value="2">中</el-option>
                      <el-option label="大" :value="3">大</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="菜单2" name="name2">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="关门扭力等级">
                    <el-select v-model="formData[6]">
                      <el-option label="小" :value="1">小</el-option>
                      <el-option label="中" :value="2">中</el-option>
                      <el-option label="大" :value="3">大</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否检测常开门信号">
                    <el-select v-model="formData[7]">
                      <el-option label="是" :value="1">是</el-option>
                      <el-option label="否" :value="2">否</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="刷卡是否记忆">
                    <el-select v-model="formData[8]">
                      <el-option label="不记忆" :value="1">不记忆</el-option>
                      <el-option label="记忆" :value="2">记忆</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="左向通行语音">
                    <el-select v-model="formData[9]">
                      <el-option label="取消声音" :value="1">取消声音</el-option>
                      <el-option label="欢迎光临" :value="2">欢迎光临</el-option>
                      <el-option label="一路顺风" :value="3">一路顺风</el-option>
                      <el-option label="请进入" :value="4">请进入</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="右向通行语音">
                    <el-select v-model="formData[10]">
                      <el-option label="取消声音" :value="1">取消声音</el-option>
                      <el-option label="欢迎光临" :value="2">欢迎光临</el-option>
                      <el-option label="一路顺风" :value="3">一路顺风</el-option>
                      <el-option label="请进入" :value="4">请进入</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="尾随进入语音">
                    <el-select v-model="formData[11]">
                      <el-option label="没声音" :value="1">没声音</el-option>
                      <el-option label="尾随进入" :value="2">尾随进入</el-option>
                      <el-option label="请刷卡" :value="3">请刷卡</el-option>
                      <el-option label="请勿尾随" :value="4">请勿尾随</el-option>
                      <el-option label="非法闯入" :value="5">非法闯入</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>
            </el-tab-pane>
            <el-tab-pane label="菜单3" name="name3">
              <el-row>

                <el-col :span="12">
                  <el-form-item label="非法闯入语音">
                    <el-select v-model="formData[12]">
                      <el-option label="没声音" :value="1">没声音</el-option>
                      <el-option label="非法闯入请刷卡" :value="2">非法闯入请刷卡</el-option>
                      <el-option label="请刷卡" :value="3">请刷卡</el-option>
                      <el-option label="未授权" :value="4">未授权</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="反向进入提示语音">
                    <el-select v-model="formData[13]">
                      <el-option label="取消声音" :value="1">取消声音</el-option>
                      <el-option label="反向进入" :value="2">反向进入</el-option>
                      <el-option label="请勿反向进入" :value="3">请勿反向进入</el-option>
                      <el-option label="请刷卡" :value="4">请刷卡</el-option>
                      <el-option label="非法闯入" :value="5">非法闯入</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="反向闯入处理方式">
                    <el-select v-model="formData[15]">
                      <el-option label="不处理反向进入" :value="1">不处理反向进入</el-option>
                      <el-option label="反向进入只是语音报警" :value="2">反向进入只是语音报警</el-option>
                      <el-option label="反向进入语音报警并 检测防夹是否有人，没人立即关门，防夹有人就不关门" :value="3">反向进入语音报警并 检测防夹是否有人，没人立即关门，防夹有人就不关门</el-option>
                      <el-option label="反向进入语音报警并 检测防夹是否有人，没人立即关门，防夹有人就不关门,关门后信号撤离就再开门" :value="4">反向进入语音报警并 检测防夹是否有人，没人立即关门，防夹有人就不关门,关门后信号撤离就再开门</el-option>
                      <el-option label="反向进入语音报警并强制关门，不论通道是否有人" :value="5">反向进入语音报警并强制关门，不论通道是否有人</el-option>
                      <el-option label="反向进入语音报警并强制关门后 如反向信号撤销，再开门" :value="5">反向进入语音报警并强制关门后 如反向信号撤销，再开门</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="尾随进入处理方式">
                    <el-select v-model="formData[16]">
                      <el-option label="不处理尾随" :value="1">不处理尾随</el-option>
                      <el-option label="尾随只语音报警" :value="2">尾随只语音报警</el-option>
                      <el-option label="尾随只要防夹信号没人就立即关门" :value="3">尾随只要防夹信号没人就立即关门</el-option>
                      <el-option label="尾随立即关门，不考虑防夹信号" :value="4">尾随立即关门，不考虑防夹信号</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="防夹处理方式">
                    <el-select v-model="formData[17]">
                      <el-option label="不处理防夹" :value="1">不处理防夹</el-option>
                      <el-option label="通行方向的第二对红外为防夹" :value="2">通行方向的第二对红外为防夹</el-option>
                      <el-option label="通行方向的前两对红外为防夹" :value="3">通行方向的前两对红外为防夹</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="音量调节">
                    <el-slider v-model="formData[14]"></el-slider>
                  </el-form-item>
                </el-col>

              </el-row>
            </el-tab-pane>
            <el-tab-pane label="菜单4" name="name4">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="尾随进入处理方式">
                    <el-select v-model="formData[18]">
                      <el-option label="通过第三对红外后关门" :value="1">通过第三对红外后关门</el-option>
                      <el-option label="通过防夹红外后关门（防夹功能失效，因为与防夹功能冲突）" :value="2">通过防夹红外后关门（防夹功能失效，因为与防夹功能冲突）</el-option>
                      <el-option label="触发第三队红外后关门" :value="3">触发第三队红外后关门</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="尾随进入处理方式">
                    <el-select v-model="formData[19]">
                      <el-option label="不开门" :value="1">不开门</el-option>
                      <el-option label="左开" :value="2">左开</el-option>
                      <el-option label="右开" :value="3">右开</el-option>
                      <el-option label="双开" :value="4">双开</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="断电开闸设置">
                    <el-select v-model="formData[20]">
                      <el-option label="断电不开闸" :value="1">断电不开闸</el-option>
                      <el-option label="断电左开" :value="2">断电左开</el-option>
                      <el-option label="断电右开" :value="3">断电右开</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="播放语言类型">
                    <el-select v-model="formData[21]">
                      <el-option label="中文" :value="1">中文</el-option>
                      <el-option label="英文" :value="2">英文</el-option>
                      <el-option label="阿拉伯语" :value="3">阿拉伯语</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <el-button @click="sendParams" type="primary">发送</el-button>
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
			loading: false,
			location: "",
			deviceData: [],
			infoData: {},
			groupList: [],
			deviceList: [],
			visible: false,
			currentItem: {},
			formData: [],
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
			if (this.currentItem) {
				this.getGroupList(true);
				if (this.visible) {
					this.getInfo();
				}
			}
		}, 1000);
	},
	watch: {
		location() {
			this.deviceList = this.deviceData.filter((item) => item.location === this.location);
		},
		visible(value) {
			if (!value) {
				this.formData = [];
				return;
			}
			this.getParams();
			this.getInfo();
		}
	},
	methods: {
		// 1 非法闯入（红色） 2 正常进入（绿色）3 故障（黑色） 0 未通电
		redbgc(item) {
			if (item === 1) {
				return "#F56C6C";
			} else if (item === 2) {
				return "#67C23A";
			} else if (item === 3) {
				return "black";
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
			} catch (error) {
				console.warn(error);
			}
		},
		oneClick(item) {
			if (!item.status) {
				this.$message.error("该设备不在线");
				return;
			}
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
		async getParams() {
			// const loading = this.$loading({
			// 	lock: true,
			// 	text: "Loading",
			// 	spinner: "el-icon-loading",
			// 	background: "rgba(0, 0, 0, 0.7)",
			//   customClass:"zindex"
			// });
			try {
				const data = await this.$service.device.getParams({ id: this.currentItem.id });
				// 两两分割
				const result = [];
				for (let i = 0; i < data.length; i += 2) {
					result.push(data.slice(i, i + 2));
				}
				this.formData = result.map((item) => parseInt(item, 16));
			} catch (error) {
				console.log(error);
			}
			// loading.close();
		},
		async sendParams() {
			try {
				const data = await this.$service.device.sendParams({
					id: this.currentItem.id,
					formData: this.formData
				});
			} catch (error) {
				console.log(error);
			}
			this.$message.success("设置成功");
			this.visible = false;
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
.zindex {
	z-index: 6657;
}
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
