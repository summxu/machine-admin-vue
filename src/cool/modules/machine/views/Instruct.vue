<!--
 * @Author: Chenxu
 * @Date: 2021-03-24 09:57:57
 * @LastEditTime: 2021-04-01 13:41:01
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
			<cl-query
				field="type"
				:list="[
					{
						label: '指令',
						value: 1
					},
					{
						label: '上报',
						value: 2
					}
				]"
			></cl-query>
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table v-bind="table">
				<template #column-type="{ scope }">
					<el-tag v-if="scope.row.type === 1" size="mini" type="success" effect="dark">
						指令
					</el-tag>
					<el-tag v-if="scope.row.type === 2" size="mini" type="primary" effect="dark">
						上报
					</el-tag>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="upsert" v-bind="upsert">
			<template #slot-code="{ scope }">
				<el-input v-model="scope.code"></el-input>
			</template>
			<template #slot-codeString="{ scope }">
				<el-input v-model="scope.codeString"></el-input>
			</template>
			<template #slot-type="{ scope }">
				<el-select v-model="scope.type" placeholder="请选择">
					<el-option label="指令" :value="1"> </el-option>
					<el-option label="上报" :value="2"> </el-option>
				</el-select>
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script>
export default {
	data() {
		return {
			lowerUserList: [],
			// 新增、编辑配置
			upsert: {
				items: [
					{
						label: "指令码",
						prop: "code",
						component: {
							name: "slot-code"
						}
					},
					{
						label: "指令说明",
						prop: "codeString",
						component: {
							name: "slot-codeString"
						}
					},
					{
						label: "指令类型",
						prop: "type",
						component: {
							name: "slot-type"
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
						label: "指令码",
						prop: "code",
						width: 100
					},
					{
						label: "指令说明",
						align: "left",
						prop: "codeString"
					},
					{
						label: "指令类型",
						prop: "type",
						width: 100
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
						buttons: ["edit", "delete"]
					}
				]
			}
		};
	},
	methods: {
		onLoad({ ctx, app }) {
			ctx.service(this.$service.instruct).done();
			app.refresh();
		}
	}
};
</script>
