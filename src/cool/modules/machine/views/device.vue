<!--
 * @Author: Chenxu
 * @Date: 2021-03-24 09:57:57
 * @LastEditTime: 2021-10-06 09:04:32
 * @Msg: Nothing
-->
<template>
	<cl-crud ref="crud" @load="onLoad">
		<el-row type="flex" align="middle">
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<cl-add-btn />
			<!-- 删除按钮 -->
			<cl-multi-delete-btn />
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table v-bind="table">
				<template #column-status="{ scope }">
					<el-tag v-if="scope.row.status" size="mini" type="success" effect="dark">
						在线
					</el-tag>
					<el-tag v-else size="mini" type="danger" effect="dark"> 离线 </el-tag>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<cl-dialog title="指令" width="500px" :visible.sync="orderShow">
			<el-row v-for="item in instructList" :key="item.id">
				<el-button
					@click="sendInstruct(item.code)"
					style="width: 100%; margin-bottom: 10px"
					size="small"
					type="primary"
					>{{ item.codeString }}</el-button
				>
			</el-row>
		</cl-dialog>

		<!-- 新增、编辑 -->
		<cl-upsert :on-open="onUpsertOpen" ref="upsert" v-bind="upsert">
			<template #slot-clientid="{ scope }">
				<el-input :disabled="scope.id" v-model="scope.clientid"></el-input>
			</template>
			<template #slot-name="{ scope }">
				<el-input v-model="scope.name"></el-input>
			</template>
			<template #slot-channelName="{ scope }">
				<el-input v-model="scope.channelName"></el-input>
			</template>
			<template #slot-location="{ scope }">
				<el-input v-model="scope.location"></el-input>
			</template>
			<template #slot-mac="{ scope }">
				<el-input v-model="scope.mac"></el-input>
			</template>
			<template #slot-maintainer="{ scope }">
				<el-select clearable v-model="scope.maintainer" placeholder="请选择">
					<el-option
						v-for="item in lowerUserList"
						:key="item.id"
						:label="item.name"
						:value="item.id"
					>
					</el-option>
				</el-select>
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script>
export default {
	data() {
		return {
			orderShow: false,
			tempRow: {},
			instructList: [],
			lowerUserList: [],
			// 新增、编辑配置
			upsert: {
				items: [
					{
						label: "设备标识",
						prop: "clientid",
						component: {
							name: "slot-clientid"
						}
					},
					{
						label: "设备名称",
						prop: "name",
						component: {
							name: "slot-name"
						}
					},
					{
						label: "设备地点",
						prop: "location",
						component: {
							name: "slot-location"
						}
					},
					{
						label: "通道名称",
						prop: "channelName",
						component: {
							name: "slot-channelName"
						}
					},
					{
						label: "MAC地址",
						prop: "mac",
						component: {
							name: "slot-mac"
						}
					},
					{
						label: "指派检修员",
						prop: "maintainer",
						component: {
							name: "slot-maintainer"
						}
					}
				]
			},
			// 表格配置
			table: {
				columns: [
					{
						type: "selection",
						align: "center",
						width: 60
					},
					{
						label: "设备标识",
						prop: "clientid"
					},
					{
						label: "设备名称",
						prop: "name"
					},
					{
						label: "设备地点",
						prop: "location"
					},
					{
						label: "通道名称",
						prop: "channelName"
					},
					{
						label: "MAC地址",
						prop: "mac"
					},
					{
						label: "设备状态",
						prop: "status",
						width: 100
					},
					{
						label: "检修人员",
						prop: "maintainerName",
						width: 140
					},
					{
						label: "创建人",
						prop: "userName",
						width: 120
					},
					{
						label: "创建时间",
						prop: "createTime",
						width: 150
					},
					{
						label: "操作",
						type: "op",
						align: "center",
						buttons: [
							"edit",
							"delete",
							({ h, scope }) => {
								if (!scope.row.status) return null;
								return h(
									"el-button",
									{
										props: {
											size: "mini",
											type: "text"
										},
										on: {
											click: async () => {
												const data = await this.$service.instruct.list({
													type: 1
												});
												this.instructList = data;
												this.orderShow = true;
												this.tempRow = scope.row;
											}
										}
									},
									"指令"
								);
							}
						]
					}
				]
			}
		};
	},
	methods: {
		async sendInstruct(code) {
			try {
				const data = await this.$service.mqtt.sendmsg({
					topic: this.tempRow.clientid,
					code
				});
				this.$message.success("指令发送成功!");
				this.orderShow = false;
			} catch (error) {
				this.$message.error(error);
			}
		},
		onUpsertOpen() {
			this.getUserList();
		},
		onLoad({ ctx, app }) {
			ctx.service(this.$service.device).done();
			app.refresh();
		},
		async getUserList() {
			try {
				const data = await this.$service.system.user.list();
				this.lowerUserList = data;
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>
