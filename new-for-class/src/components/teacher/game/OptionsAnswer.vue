<template>
	<div class="answer-question__other-features">
		<AnsweredPlayerList class="answered-player-list-wrapper" />
		<Timer class="timer-wrapper" @processCountDownOver="processCountDownOver" />
		<div v-if="showStatistics" class="times-up-part">
			<Statistics />

			<template v-if="showButton">
				<div
					class="next-button fz-40 c-fff cursor-pointer"
					@click="processNextQuestion"
					v-if="!showResultPage"
				>
					下一題
				</div>

				<div
					class="next-button fz-40 c-fff cursor-pointer"
					@click="processShowResult"
					v-else
				>
					回答狀況
				</div>
			</template>
		</div>
	</div>

	<div class="answer-question__options">
		<template v-for="(option, index) in options" :key="index">
			<div
				:class="[
					`option c-fff bgc-option-${index + 1}`,
					{
						'is-not-correct': !option.isAnswer && showStatistics,
					},
				]"
			>
				<div class="option__symbol fz-24">{{ optionTitleList[index] }}</div>
				<div class="option__text">{{ option.optionValue }}</div>
			</div>
		</template>
	</div>
</template>

<script>
import Timer from '@/components/teacher/game/Timer.vue'
import AnsweredPlayerList from '@/components/teacher/game/AnsweredPlayerList.vue'
import Statistics from '@/components/teacher/game/Statistics.vue'

import { ref, inject } from 'vue'
import { useTeacherGameStore } from '@/stores/teacherGame'
import { storeToRefs } from 'pinia'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'

export default {
	components: {
		Timer,
		AnsweredPlayerList,
		Statistics,
	},

	setup() {
		// inject examId
		const examId = inject('examId')

		// store
		const {
			currentQuestion,
			questionIndex,
			questionList,
			setQuestionIndex,
			setPage,
			setCurrentQuestionInformation,
		} = useTeacherGameStore()
		const { options, showResultPage } = currentQuestion
		const store = useTeacherGameStore()
		const { playerList, showRankingPage } = storeToRefs(store)

		// hooks
		const { setPageToFirebase, setHistoryDataToFirebase } = useTeacherGame()

		const optionTitleList = ['A', 'B', 'C', 'D']
		const showStatistics = ref(false)
		const showButton = ref(false)

		const processCountDownOver = async () => {
			let studentPage = 'result'
				if (currentQuestion.answerType === 'statistics') {
					studentPage = 'times-up'
				}
				
			try {
				await setPageToFirebase(examId, studentPage)
				showStatistics.value = true
				await processSetPlayerAnswerToHistory()
				showButton.value = true
			} catch (e) {
				console.log('eeee', e)
			}
		}

		const processSetPlayerAnswerToHistory = async () => {
			const historyData = {
				[`question${questionIndex}`]: playerList.value,
			}

			await setHistoryDataToFirebase(historyData)
		}

		const processNextQuestion = async () => {
			if (questionIndex !== questionList.length - 1) {
				try {
					setQuestionIndex(questionIndex + 1)
					setCurrentQuestionInformation()
					await setPageToFirebase(examId, 'QuestionDisplay')
					setPage('QuestionDisplay')
				} catch {}

				return
			}
			let pageName = ''
			if (showRankingPage.value) {
				pageName = 'FinishWithRanking'
			} else {
				pageName = 'Finish'
			}
			try {
				await setPageToFirebase(examId, pageName)
				setPage(pageName)
			} catch {}
		}

		const processShowResult = () => {
			setPage('Result')
		}

		return {
			optionTitleList,
			showStatistics,
			showButton,
			options,
			showResultPage,
			processCountDownOver,
			processNextQuestion,
			processShowResult,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/game/_optionsAnswer.scss';
</style>
