<template>
	<div class="history-questions">
		<table class="history-questions-table">
			<tr class="table__title-tr">
				<th class="table__title c-fff bgc-main">問題</th>
				<th class="table__title c-fff bgc-main">問題類型</th>
				<th class="table__title c-fff bgc-main">答對率</th>
			</tr>

			<tr
				v-for="(question, index) in questionList"
				:key="question.questionTitle"
				class="table__content-tr cursor-pointer"
				@click="processOpenOpenDetail(index)"
			>
				<td class="table__content">{{ question.questionTitle }}</td>
				<td class="table__content">
					{{ getAnswerTypeText(question.answerType) }}
				</td>
				<td class="table__content">
					<CorrectPercentage
						v-if="question.answerType === 'singleAnswer'"
						:percent="getCorrectPercentage(index)"
					/>
					<div v-else class="no-correct-answer">沒有正確答案</div>
				</td>
			</tr>
		</table>
	</div>

	<QuestionDetail v-if="openDetail" @setOpenDetail="setOpenDetail" />
</template>

<script>
import CorrectPercentage from '@/components/teacher/history/CorrectPercentage.vue'
import QuestionDetail from '@/components/popup/QuestionDetail.vue'

import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export default {
	components: {
		CorrectPercentage,
		QuestionDetail,
	},
	setup() {
		const store = useHistoryStore()
		const { currentHistoryData } = storeToRefs(store)
		const { playerAmount } = currentHistoryData.value

		const getAnswerTypeText = (answerType) => {
			switch (answerType) {
				case 'singleAnswer':
					return '單選題'
				case 'shortAnswer':
					return '問答題'
				case 'statistics':
					return '統計題'

				default:
					return ''
			}
		}

		// 計算答對率
		const getCorrectPercentage = (index) => {
			const correctList = currentHistoryData.value[`question${index}`].filter(
				({ isCorrect }) => isCorrect
			)
			const percent = (correctList.length / playerAmount) * 100

			return percent
		}

		// openDetail
		const { setSelectedQuestionIndex } = useHistoryStore()
		const openDetail = ref(false)
		const setOpenDetail = (booleanData) => {
			openDetail.value = booleanData
		}
		const processOpenOpenDetail = (index) => {
			setSelectedQuestionIndex(index)
			setOpenDetail(true)
		}

		return {
			currentHistoryData,
			questionList: currentHistoryData.value.examData.questionList,
			openDetail,
			getAnswerTypeText,
			getCorrectPercentage,
			setOpenDetail,
			processOpenOpenDetail,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/history/_questions.scss';
</style>
