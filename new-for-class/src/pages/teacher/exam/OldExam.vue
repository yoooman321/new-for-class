<template>
	<div class="old-exam-page">
		<div class="old-exam-header">
			<div class="old-exam__title fz-20 fw-600 c-text-main">我的考題</div>
		</div>

		<table class="old-exam-table">
			<tr class="table__title-tr">
				<th class="table__title">考題名稱</th>
				<th class="table__title">操作</th>
			</tr>

			<tr
				:key="exam.examName"
				v-for="exam in examList"
				class="table__content-tr"
			>
				<td class="table__content">{{exam.examName}}</td>
				<td class="table__content table__buttons">
          <div class="table__button table__button--play">開始玩</div>
          <div class="table__button table__button--edit">編輯</div>
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
		const examList = reactive([{ examName: 'test1' }, { examName: 'test2' }])

		return { examList }
	},
}
</script>
