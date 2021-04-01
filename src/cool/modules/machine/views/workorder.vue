<!--
 * @Author: Chenxu
 * @Date: 2021-03-24 09:57:57
 * @LastEditTime: 2021-04-01 17:16:27
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
				<template #column-status="{ scope }">
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

				<template #slot-check="{ scope }">
					<el-button
						v-if="
							scope.row.status === 3 &&
							($store.getters.userInfo.id === scope.row.userId ||
								$store.getters.userInfo.id === 1)
						"
						type="text"
						size="mini"
						@click="checkFun(scope.row, 1)"
						>审核</el-button
					>
				</template>
				<template #slot-over="{ scope }">
					<el-button
						v-if="
							scope.row.status === 1 &&
							($store.getters.userInfo.id === scope.row.maintainerId ||
								$store.getters.userInfo.id === 1)
						"
						type="text"
						size="mini"
						@click="checkFun(scope.row, 2)"
						>修复</el-button
					>
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
            'show-overflow-tooltip': true,
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
            prop: "maintainerName",
            width: 120
          },
          {
            label: "审核人",
            prop: "userName",
            width: 120
          },
          {
            label: "处理说明",
            'show-overflow-tooltip': true,
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
            width: 100,
            buttons: ["slot-check", "slot-over"]
          }
        ]
      }
    };
  },
  methods: {
    checkFun (row, type) {
      const tempCrud = this.$crud.openForm({
        title: type === 1 ? '审核' : '修复',
        width: "600px",
        op: {
          buttons: [
            "close",
            "save",
            type === 1 ? <el-button onClick={async () => {
              try {
                await this.$service.workorder.update({
                  ...row,
                  status: 1
                })
                console.log(tempCrud)
                this.$message.success("驳回成功");
                this.$refs["crud"].refresh();
                tempCrud.close()
              } catch (error) {
                console.log(error)
              }
            }} size="small" type="danger">驳回</el-button> : null
          ]
        },
        items: [
          {
            label: "处理说明",
            prop: "remark",
            value: row.remark,
            component: {
              name: "el-input",
              props: {
                disabled: type === 1,
                type: 'textarea'
              }
            }
          }
        ],
        on: {
          submit: async (data, { close, done }) => {
            try {
              await this.$service.workorder.update({
                ...row,
                ...data,
                status: type === 1 ? 4 : 3
              })
              this.$message.success("保存成功");
              this.$refs["crud"].refresh();
              close();
            } catch (error) {
              console.log(error)
            }
          }
        }
      });
    },
    onLoad ({ ctx, app }) {
      ctx.service(this.$service.workorder).done();
      app.refresh();
    }
  }
};
</script>
