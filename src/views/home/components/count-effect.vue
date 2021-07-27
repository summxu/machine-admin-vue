<template>
	<div class="count-effect">
		<div class="card">
			<div class="card__header">
				<span class="label">总客户量</span>
				<span class="value">1549</span>
			</div>

			<div class="card__container">
				<el-progress :percentage="50" :stroke-width="8"></el-progress>
			</div>

			<div class="card__footer">
				<span class="label">本月新增</span>
				<span class="value">12</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.count-effect {
	&__cop {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		li {
			display: flex;
			list-style: none;
			flex: 1;
			color: #d8d8d8;

			.fall,
			.rise {
				display: flex;
				align-items: center;
				margin-left: 10px;
			}

			.fall {
				color: #13ae7c;
			}

			.rise {
				color: #f21e37;
			}
		}
	}

	.card__container {
		padding-top: 15px;
		padding-right: 10px;
		box-sizing: border-box;
	}
}
</style>
