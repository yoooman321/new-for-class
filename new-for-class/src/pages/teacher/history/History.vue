<template>
	<div class="history-page">
		<div class="history-header">
			<div class="history__title fz-20 fw-600 c-text-main">歷史紀錄</div>
		</div>

		<table class="history-table">
			<tr class="table__title-tr">
				<th class="table__title">考題名稱</th>
				<th class="table__title">時間</th>
				<th class="table__title">備註</th>
				<th class="table__title">操作</th>
			</tr>

			<tr
				:key="exam.examName"
				v-for="exam in examList"
				class="table__content-tr"
			>
				<td class="table__content">{{ exam.examName }}</td>
				<td class="table__content">{{ exam.time }}</td>
				<td class="table__content">{{ exam.remark }}</td>
				<td class="table__content table__buttons">
					<div class="table__button table__button--edit">查看</div>
					<div class="table__button table__button--delete">刪除</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import { reactive } from 'vue'
export default {
	setup() {
		const examList = reactive([
			{ examName: 'test1', time: '2022-02-28' },
			{ examName: 'test2', time: '2022-02-27' },
		])

		return { examList }
	},
}
</script>
