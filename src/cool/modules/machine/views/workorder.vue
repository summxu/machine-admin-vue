<!--
 * @Author: Chenxu
 * @Date: 2021-03-24 09:57:57
 * @LastEditTime: 2021-03-30 17:10:56
 * @Msg: Nothing
-->
<template>
	<cl-crud ref="crud" @load="onLoad">
		<el-row type="flex" align="middle">
			<!-- 刷新按钮 -->
			<cl-refresh-btn />
			<!-- 新增按钮 -->
			<!-- <cl-add-btn /> -->
			<!-- 删除按钮 -->
			<!-- <cl-multi-delete-btn /> -->
			<cl-flex1 />
			<!-- 关键字搜索 -->
			<cl-search-key />
		</el-row>

		<el-row>
			<!-- 数据表格 -->
			<cl-table v-bind="table">
				<template #slot-status="{ scope }">
					<el-tag v-if="scope.row.status === 1" size="mini" type="danger" effect="dark">
						待处理
					</el-tag>
					<el-tag v-if="scope.row.status === 2" size="mini" type="warning" effect="dark">
						处理中
					</el-tag>
					<el-tag v-if="scope.row.status === 3" size="mini" type="warning" effect="dark">
						待审核
					</el-tag>
					<el-tag v-if="scope.row.status === 4" size="mini" type="success" effect="dark">
						已处理
					</el-tag>
					<el-tag v-if="scope.row.status === 5" size="mini" type="info" effect="dark">
						已失效
					</el-tag>
				</template>
			</cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>
	</cl-crud>
</template>

<script>
export default {
  data () {
    return {
      lowerUserList: [],
      // 表格配置
      table: {
        columns: [
          {
            type: "selection",
            align: "center",
            width: 60
          },
          {
            label: "工单号",
            prop: "orderNum",
            width: 240
          },
          {
            label: "对应设备",
            prop: "deviceName",
            width: 150
          },
          {
            label: "错误码",
            prop: "code",
            width: 100
          },
          {
            label: "错误说明",
            prop: "codeString"
          },
          {
            label: "处理人",
            prop: "maintainer",
            width: 120
          },
          {
            label: "审核人",
            prop: "user",
            width: 120
          },
          {
            label: "处理说明",
            prop: "remark"
          },
          {
            label: "工单状态",
            prop: "status",
            width: 80
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
    onLoad ({ ctx, app }) {
      ctx.service(this.$service.workorder).done();
      app.refresh();
    }
  }
};
</script>
