<!--
 * @Author: Chenxu
 * @Date: 2021-03-24 09:57:57
 * @LastEditTime: 2021-03-30 16:43:28
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
			<cl-table v-bind="table"></cl-table>
		</el-row>

		<el-row type="flex">
			<cl-flex1 />
			<!-- 分页控件 -->
			<cl-pagination />
		</el-row>

		<!-- 新增、编辑 -->
		<cl-upsert ref="upsert" v-bind="upsert">
			<template #slot-code="{ scope }">
				<el-input type="number" v-model="scope.code"></el-input>
			</template>
			<template #slot-codeString="{ scope }">
				<el-input v-model="scope.codeString"></el-input>
			</template>
		</cl-upsert>
	</cl-crud>
</template>

<script>
export default {
  data () {
    return {
      lowerUserList: [],
      // 新增、编辑配置
      upsert: {
        items: [
          {
            label: "错误码",
            prop: "code",
            component: {
              name: "slot-code"
            }
          },
          {
            label: "错误说明",
            prop: "codeString",
            component: {
              name: "slot-codeString"
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
            label: "错误码",
            prop: "code",
            width: 100
          },
          {
            label: "错误码说明",
            prop: "codeString"
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
      ctx.service(this.$service.workorder_code).done();
      app.refresh();
    }
  }
};
</script>
