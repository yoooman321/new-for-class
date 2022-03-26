<template>
	<div class="question-detail-wrapper">
		<div class="question-detail-container">
			<div class="question-detail__header">
				<!-- 問題內容 -->
				<div class="question-name">
					<div class="question-name__text">
						<span class="fw-600 fz-24">
							Question {{ selectedQuestionIndex + 1 }}:</span
						>
						<span class="question-title">
							{{ currentQuestionData.questionTitle }}
						</span>
					</div>
				</div>

				<!-- 分頁 -->
				<div class="pagination">
					<div
						:class="[
							'arrow-wrapper cursor-pointer',
							{
								'arrow-wrapper--disabled': selectedQuestionIndex === 0,
							},
						]"
						@click="setSelectedQuestionIndex(selectedQuestionIndex - 1)"
					>
						<img
							class="arrow__icon"
							src="@/assets/images/popup/icon/left-arrow.svg"
						/>
					</div>
					<div class="pages">
						{{ selectedQuestionIndex + 1 }} of
						{{ examData.questionList.length }}
					</div>
					<div
						:class="[
							'arrow-wrapper cursor-pointer',
							{
								'arrow-wrapper--disabled':
									selectedQuestionIndex === examData.questionList.length - 1,
							},
						]"
						@click="setSelectedQuestionIndex(selectedQuestionIndex + 1)"
					>
						<img
							class="arrow__icon"
							src="@/assets/images/popup/icon/right-arrow.svg"
						/>
					</div>
				</div>

				<!-- 關閉視窗 -->
				<div class="close-button cursor-pointer" @click="processCloseDetail">
					<img class="close__icon" src="@/assets/images/popup/icon/close.svg" />
				</div>
			</div>

			<div class="question-detail__content">
				<!-- 選項列表 -->
				<div v-if="currentQuestionData.options" class="options">
					<div
						v-for="(option, index) in currentQuestionData.options"
						:key="`${currentQuestionData.questionTitle}-${index}`"
						class="option"
					>
						<div class="option__text">
							<span
								:class="`option__option-name fz-20 fw-600 c-option-${
									index + 1
								}`"
							>
								{{ optionTitleList[index] }}
							</span>
							<span class="option__option-value">
								{{ option.optionValue }}
							</span>
						</div>

						<div class="option__answer-part">
							<div
								v-if="currentQuestionData.answerType === 'singleAnswer'"
								class="option__correct"
							>
								<img :src="optionCorrectImage(option.isAnswer)" />
							</div>
							<div class="option__progress-wrapper">
								<div
									:class="`option__progress bgc-option-${index + 1}`"
									:style="{ width: `${getProgressWidth(index)}%` }"
								></div>
							</div>
							<div class="option__amount">
								{{ getAmountOfPlayerAnswerThisOption(index) }}
							</div>
						</div>
					</div>

					<!-- 沒有回答 -->
					<div class="option option--no-answer">
						<div class="option__text">No answer</div>
						<div class="option__answer-part">
							<div
								v-if="currentQuestionData.answerType === 'singleAnswer'"
								class="option__correct"
							>
								<img src="@/assets/images/popup/icon/error.svg" />
							</div>
							<div class="option__progress-wrapper">
								<div
									class="option__progress"
									:style="{
										width: `${(amountOfPlayerNoAnswer / playerAmount) * 100}%`,
									}"
								></div>
							</div>
							<div class="option__amount">
								{{ amountOfPlayerNoAnswer }}
							</div>
						</div>
					</div>
				</div>

				<!-- 資訊欄位 -->
				<div class="informations">
					<div class="information">問題類型: {{ getQuestionTypeText() }}</div>
					<div class="information">
						秒數限制: {{ currentQuestionData.limitedTime }}秒
					</div>
					<div class="information">答對率 {{ questionCorrectPercentage }}%</div>
					<div class="information">
						學生答題數 {{ playerAnswerList.length }} of
						{{ currentHistoryData.playerAmount }}
					</div>
				</div>

				<!-- 學生回答表格 -->
				<div class="question__detail-table-wrapper">
					<table class="question__detail-table">
						<tr class="table__title-tr">
							<th class="table__title c-fff bgc-main">學生名稱</th>
							<th class="table__title c-fff bgc-main">學生回答</th>
							<th class="table__title c-fff bgc-main">對錯</th>
						</tr>

						<tr
							v-for="player in playerAnswerList"
							:key="player.playerName"
							class="table__content-tr"
						>
							<td class="table__content">{{ player.playerName }}</td>
							<td class="table__content">
								<div v-if="currentQuestionData.answerType === 'shortAnswer'">
									{{ player.playerAnswer.join() }}
								</div>
								<div v-else>
									{{ optionTitleList[player.playerAnswer] }}
								</div>
							</td>
							<td class="table__content">
								<div v-if="currentQuestionData.answerType !== 'singleAnswer'">
									沒有對錯
								</div>
								<img
									v-else-if="player.isCorrect"
									src="@/assets/images/popup/icon/correct.svg"
								/>
								<img v-else src="@/assets/images/popup/icon/error.svg" />
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import correct from '@/assets/images/popup/icon/correct.svg'
import wrong from '@/assets/images/popup/icon/error.svg'

import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export default {
	emits: ['set-open-detail'],
	setup(_, context) {
		const store = useHistoryStore()
		const { currentHistoryData, selectedQuestionIndex } = storeToRefs(store)
		const { playerAmount, examData } = currentHistoryData.value
		const { setSelectedQuestionIndex } = useHistoryStore()
		const processCloseDetail = () => {
			context.emit('set-open-detail', false)
			setSelectedQuestionIndex(0)
		}

		const currentQuestionData = computed(() => {
			return examData.questionList[selectedQuestionIndex.value]
		})

		// options
		const optionTitleList = ['A', 'B', 'C', 'D']
		const optionCorrectImage = (isCorrect) => {
			if (isCorrect) {
				return correct
			}
			return wrong
		}
		// 答這個選項的玩家數量
		const getAmountOfPlayerAnswerThisOption = (index) => {
			const answerThisOptionPlayerList = playerAnswerList.value.filter(
				({ playerAnswer }) => playerAnswer === index
			)
			return answerThisOptionPlayerList.length
		}
		// 換算width百分比
		const getProgressWidth = (index) => {
			const playerAnswerAmount = getAmountOfPlayerAnswerThisOption(index)
			const widthPercent = (playerAnswerAmount / playerAmount) * 100

			return widthPercent
		}

		// playerAnswerList
		const playerAnswerList = computed(() => {
			return currentHistoryData.value[`question${selectedQuestionIndex.value}`]
		})

		const amountOfPlayerNoAnswer = computed(() => {
			return playerAmount - playerAnswerList.value.length
		})

		// 答對率
		const questionCorrectPercentage = computed(() => {
			const playerCorrectList = playerAnswerList.value.filter(
				({ isCorrect }) => isCorrect
			)

			return (playerCorrectList.length / playerAmount) * 100
		})


		const getQuestionTypeText = () => {
			switch (currentQuestionData.value.answerType) {
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

		return {
			examData,
			currentQuestionData,
			currentHistoryData,
			selectedQuestionIndex,
			optionTitleList,
			playerAnswerList,
			playerAmount,
			amountOfPlayerNoAnswer,
			questionCorrectPercentage,
			processCloseDetail,
			optionCorrectImage,
			getAmountOfPlayerAnswerThisOption,
			getProgressWidth,
			setSelectedQuestionIndex,
			getQuestionTypeText,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/popup/_questionDetail.scss';
</style>
