<template>
	<div class="history-questions">
		<table class="history-questions-table">
			<tr class="table__title-tr">
				<th class="table__title c-fff bgc-main">問題</th>
				<th class="table__title c-fff bgc-main">問題類型</th>
				<th class="table__title c-fff bgc-main">答對率</th>
			</tr>

			<tr
				:key="question.questionTitle"
				v-for="question in questionTestData"
				class="table__content-tr cursor-pointer"
			>
				<td class="table__content">{{ question.questionTitle }}</td>
				<td class="table__content">{{ question.type }}</td>
				<td class="table__content"><CorrectPercentage /></td>
			</tr>
		</table>
	</div>

  <QuestionDetail />
</template>

<script>
import CorrectPercentage from '@/components/teacher/history/CorrectPercentage.vue'
import QuestionDetail from '@/components/popup/QuestionDetail.vue'
export default {
	components: {
		CorrectPercentage,
    QuestionDetail,
	},
	setup() {
		const testData = [
			{
				playerName: 'test 1',
				correctPercentage: '50',
				score: '5',
				unanswerCount: '3',
				answers: [
					{
						answer: 'A',
						correct: true,
						score: '1',
					},
					{
						answer: 'B',
						correct: false,
						score: '0',
					},
				],
			},
		]

		const questionTestData = [
			{ questionTitle: 'Q1', type: 'single', answer: 'A' },
			{ questionTitle: 'Q2', type: 'single', answer: 'A' },
		]

		return { testData, questionTestData }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/history/_questions.scss';
</style>