<template>
	<div class="player-detail-wrapper">
		<div class="player-detail-container">
			<div class="player-detail__header">
				<div class="player-name">
					<img
						class="player-name__icon"
						src="@/assets/images/popup/icon/person.svg"
					/>
					<div class="player-name__text fw-600 fz-24">
						{{ selectedPlayerName }}
					</div>
				</div>

				<div class="pagination">
					<div
						:class="[
							'arrow-wrapper cursor-pointer',
							{
								'arrow-wrapper--disabled': selectedPlayerIndex === 0,
							},
						]"
						@click="processChangePlayerData(selectedPlayerIndex - 1)"
					>
						<img
							class="arrow__icon"
							src="@/assets/images/popup/icon/left-arrow.svg"
						/>
					</div>
					<div class="pages">1 of 2</div>
					<div
						:class="[
							'arrow-wrapper cursor-pointer',
							{
								'arrow-wrapper--disabled':
									selectedPlayerIndex === totalPlayerAmount - 1,
							},
						]"
						@click="processChangePlayerData(selectedPlayerIndex + 1)"
					>
						<img
							class="arrow__icon"
							src="@/assets/images/popup/icon/right-arrow.svg"
						/>
					</div>
				</div>

				<div class="close-button cursor-pointer" @click="processCloseDetail">
					<img class="close__icon" src="@/assets/images/popup/icon/close.svg" />
				</div>
			</div>

			<div class="player-detail__content">
				<div class="brief-information">
					<div class="card card--correct-percentage">
						<div class="card__title">答對率</div>
						<div class="card__content">
							<div v-if="questionIsSingleAnswerAmount.length === 0">
								沒有單選題
							</div>
							<CorrectPercentage
								v-else
								:percent="getPlayerCorrectPercentage()"
							/>
						</div>
					</div>

					<div class="card card--correct-percentage">
						<div class="card__title">答題數</div>
						<div class="card__content">
							{{ playerOptions.length }} of {{ totalQuestionAmount }}
						</div>
					</div>
				</div>

				<div class="player__detail-table-wrapper">
					<table class="player__detail-table">
						<tr class="table__title-tr">
							<th class="table__title c-fff bgc-main">問題</th>
							<th class="table__title c-fff bgc-main">問題類型</th>
							<th class="table__title c-fff bgc-main">答案</th>
							<th class="table__title c-fff bgc-main">對錯</th>
						</tr>

						<tr
							v-for="(question, index) in questionList"
							:key="`player-table-${question.questionTitle}`"
							class="table__content-tr"
						>
							<td class="table__content">{{ question.questionTitle }}</td>
							<td class="table__content">
								{{ getAnswerTypeText(question.answerType) }}
							</td>
							<td class="table__content">
								{{ getPlayerAnswer(index) }}
							</td>

							<td class="table__content">
								<div
									v-if="getPlayerAnswerIsCorrect(index) === 'noCorrectAnswer'"
								>
									沒有對錯
								</div>
								<img
									v-else-if="getPlayerAnswerIsCorrect(index)"
									src="@/assets/images/popup/icon/correct.svg"
									alt=""
								/>
								<img v-else src="@/assets/images/popup/icon/error.svg" alt="" />
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CorrectPercentage from '@/components/teacher/history/CorrectPercentage.vue'

import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export default {
	components: {
		CorrectPercentage,
	},

	emits: ['set-open-detail'],

	setup(_, context) {
		const store = useHistoryStore()
		const { setSelectedPlayerIndex, setSelectedPlayerName } = store
		const {
			currentHistoryData,
			playerData,
			selectedPlayerIndex,
			selectedPlayerName,
		} = storeToRefs(store)
		const { examData } = currentHistoryData.value
		const totalQuestionAmount = examData.questionList.length
		const totalPlayerAmount = Object.keys(playerData.value).length
		const questionIsSingleAnswerAmount = examData.questionList.filter(
			({ answerType }) => answerType === 'singleAnswer'
		)

		const playerOptions = computed(() => {
			return playerData.value[selectedPlayerName.value].options
		})

		const processCloseDetail = () => {
			context.emit('set-open-detail', false)
			setSelectedPlayerIndex(0)
		}

		const getPlayerCorrectPercentage = () => {
			const playerAnswerCorrectList = playerOptions.value.filter(
				({ isCorrect }) => isCorrect
			)
			return Math.floor(
				Number((playerAnswerCorrectList.length / totalQuestionAmount) * 100)
			)
		}

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

		const optionTitleList = ['A', 'B', 'C', 'D']
		const getPlayerAnswer = (index) => {
			const playerAnswer = playerOptions.value.find(
				({ questionIndex }) => index === questionIndex
			)

			if (!playerAnswer) {
				return '沒有作答'
			}

			if (typeof playerAnswer.playerAnswer === 'object') {
				return playerAnswer.playerAnswer.join()
			}

			return optionTitleList[playerAnswer.playerAnswer]
		}

		const getPlayerAnswerIsCorrect = (index) => {
			if (examData.questionList[index].answerType !== 'singleAnswer') {
				return 'noCorrectAnswer'
			}
			const playerAnswer = playerOptions.value.find(
				({ questionIndex }) => index === questionIndex
			)

			if (!playerAnswer) {
				return false
			}

			return playerAnswer.isCorrect
		}

		const processChangePlayerData = (index) => {
			setSelectedPlayerIndex(index)
			const playerName = Object.keys(playerData.value)[index]
			setSelectedPlayerName(playerName)
		}

		return {
			selectedPlayerName,
			totalQuestionAmount,
			playerOptions,
			questionList: examData.questionList,
			selectedPlayerIndex,
			totalPlayerAmount,
			questionIsSingleAnswerAmount,
			processCloseDetail,
			getPlayerCorrectPercentage,
			getAnswerTypeText,
			getPlayerAnswer,
			getPlayerAnswerIsCorrect,
			processChangePlayerData,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/popup/_playerDetail.scss';
</style>
