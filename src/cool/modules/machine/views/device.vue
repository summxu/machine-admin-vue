<!--
 * @Author: Chenxu
 * @Date: 2021-03-24 09:57:57
 * @LastEditTime: 2021-03-26 00:51:11
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
					<el-tag v-if="scope.row.status === 1" size="mini" type="success" effect="dark">
						在线
					</el-tag>
					<el-tag v-if="scope.row.status === 2" size="mini" type="danger" effect="dark">
						离线
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
			<template #slot-name="{ scope }">
				<el-input v-model="scope.name"></el-input>
			</template>
			<template #slot-channelName="{ scope }">
				<el-input v-model="scope.channelName"></el-input>
			</template>
			<template #slot-mac="{ scope }">
				<el-input v-model="scope.mac"></el-input>
			</template>
			<template #slot-status="{ scope }">
				<el-select v-model="scope.status" placeholder="请选择">
					<el-option label="上线" :value="1"> </el-option>
					<el-option label="下线" :value="2"> </el-option>
				</el-select>
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script>
export default {
  data () {
    return {
      // 新增、编辑配置
      upsert: {
        items: [
          {
            label: "设备名称",
            prop: "name",
            component: {
              name: "slot-name"
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
            label: "设备状态",
            prop: "status",
            value: 1,
            component: {
              name: "slot-status"
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
            label: "设备名称",
            prop: "name"
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
            width: 140
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
  created () {
    this.getUserList()
  },
  methods: {
    onLoad ({ ctx, app }) {
      ctx.service(this.$service.device).done();
      app.refresh();
    },
    async getUserList () {
      try {
        const { data } = await this.$service.user.list()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>
