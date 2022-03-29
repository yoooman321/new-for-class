<template>
	<div class="summary">
		<div class="brief-information">
			<div class="card card--correct-percentage">
				<div class="card__title">
					<div class="text">答對率</div>
					<div class="help">
						<img
							class="icon cursor-pointer"
							src="@/assets/images/teacher/icon/help.svg"
						/>
						<div class="instruction fz-14 c-text-main">
							答對率只有計算單選題的部分
						</div>
					</div>
				</div>
				<div class="card__content">
					<div v-if="noSingleAnswerType">沒有任何單選題</div>
					<CorrectPercentage v-else :percent="correctPercent" />
				</div>
			</div>

			<div class="card card--student-amount">
				<div class="card__title">學生人數</div>
				<div class="card__content">
					<span class="value fw-600 fz-20">{{
						currentHistoryData.playerAmount
							? currentHistoryData.playerAmount
							: 0
					}}</span>
					<span class="unit fz-14">人</span>
				</div>
			</div>

			<div class="card card--question-amount">
				<div class="card__title">問題總數</div>
				<div class="card__content">
					<span class="value fw-600 fz-20">{{
						currentHistoryData.examData.questionList.length
					}}</span>
					<span class="unit fz-14">題</span>
				</div>
			</div>
		</div>

		<div class="card card--unfinish-student">
			<div class="card__title">有漏答題的學生</div>
			<div class="card__content">
				<table class="table">
					<tr class="table__title-tr">
						<th class="table__title fw-600">學生名稱</th>
						<th class="table__title fw-600">漏答題數</th>
					</tr>

					<tr>
						<td
							v-if="missAnsweredPlayer.length === 0"
							class="table__content table__content--no-student"
							colspan="2"
						>
							沒有漏答題的學生
						</td>
					</tr>

					<tr
						v-for="missPlayer in missAnsweredPlayer"
						:key="missPlayer.playerName"
					>
						<td class="table__content">{{ missPlayer.playerName }}</td>
						<td class="table__content">{{ missPlayer.missAmount }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'
import CorrectPercentage from '@/components/teacher/history/CorrectPercentage.vue'
import { ref } from 'vue'

export default {
	components: {
		CorrectPercentage,
	},

	setup() {
		const store = useHistoryStore()
		const { currentHistoryData } = storeToRefs(store)

		// 答對率
		let questionIsSingleAnswerAmount = 0
		let playerAnsertIsCorrectAmount = 0
		let totalAmountOfAnswer = 0
		const correctPercent = ref(0)

		currentHistoryData.value.examData.questionList.forEach(
			(question, index) => {
				if (question.answerType === 'singleAnswer') {
					questionIsSingleAnswerAmount++

					if (currentHistoryData.value[`question${index}`]) {
						const playerIsCorrectList = currentHistoryData.value[
							`question${index}`
						].filter(({ isCorrect }) => isCorrect)
						playerAnsertIsCorrectAmount += playerIsCorrectList.length
					}
				}
			}
		)

		totalAmountOfAnswer =
			questionIsSingleAnswerAmount * currentHistoryData.value.playerAmount
		correctPercent.value = Math.floor(Number(
			(playerAnsertIsCorrectAmount / totalAmountOfAnswer) *
			100
		))

		const noSingleAnswerType = ref(false)
		if (isNaN(correctPercent.value)) {
			noSingleAnswerType.value = true
		}
		// 漏答題
		const playerObject = {}
		const missAnsweredPlayer = ref([])
		const questionAmount = currentHistoryData.value.examData.questionList.length

		for (let index = 0; index < questionAmount; index++) {
			if (currentHistoryData.value[`question${index}`]) {
				currentHistoryData.value[`question${index}`].reduce((acc, cur) => {
					if (acc[cur.playerName]) {
						acc[cur.playerName] += 1
					} else {
						acc[cur.playerName] = 1
					}

					return acc
				}, playerObject)
			}
		}

		Object.keys(playerObject).forEach((playerName) => {
			if (playerObject[playerName] < questionAmount) {
				missAnsweredPlayer.value.push({
					playerName,
					missAmount: questionAmount - playerObject[playerName],
				})
			}
		})

		return {
			currentHistoryData,
			correctPercent,
			missAnsweredPlayer,
			noSingleAnswerType,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/history/_summary.scss';
</style>
