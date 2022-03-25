<template>
	<div class="teacher-answer-question-page">
		<div class="answer-question__question-part">{{ questionTitle }}</div>

		<div class="answer-question__answer-part">
			<component :is="answerTypeComponent" :timesUp="timesUp"></component>

			<div class="timer-and-next-button">
				<Timer
					class="timer-wrapper"
					@processCountDownOver="processCountDownOver"
				/>

				<template v-if="timesUp">
					<div
						v-if="!showResultPage"
						class="next-button fz-40 c-fff cursor-pointer"
						@click="processNextQuestion"
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

				<div></div>
			</div>
		</div>

		<audio ref="backgroundMusic" :src="music" controls autoplay="autoplay" :hidden="true"></audio>
	</div>
</template>

<script>
import { useTeacherGameStore } from '@/stores/teacherGame'
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia'
import OptionsAnswer from '@/components/teacher/game/OptionsAnswer.vue'
import WordCloudAnswer from '@/components/teacher/game/WordCloudAnswer.vue'
import music from '@/assets/audio/bgm.mp3'
import Timer from '@/components/teacher/game/Timer.vue'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'

export default {
	components: {
		OptionsAnswer,
		WordCloudAnswer,
		Timer,
	},

	setup() {
		// inject examId
		const examId = inject('examId')

		const backgroundMusic = ref(null)

		// store
		const {
			currentQuestion,
			questionIndex,
			questionList,
			setQuestionIndex,
			setPage,
			setCurrentQuestionInformation,
		} = useTeacherGameStore()
		const store = useTeacherGameStore()
		const { playerList, showRankingPage } = storeToRefs(store)

		// hooks
		const { setPageToFirebase, setHistoryDataToFirebase } = useTeacherGame()

		const answerTypeComponent = ref('')
		const timesUp = ref(false)

		switch (currentQuestion.answerType) {
			case 'singleAnswer':
			case 'statistics':
				answerTypeComponent.value = 'OptionsAnswer'
				break
			case 'shortAnswer':
				answerTypeComponent.value = 'WordCloudAnswer'
				break
			default:
				break
		}

		const processCountDownOverForShortAnswer = async () => {
			try {
				await setPageToFirebase(examId, 'times-up')
				await processSetPlayerAnswerToHistory()
			} catch (e) {
				// DO SOMETHING
			}
		}

		const processCountDownOverForOthers = async () => {
			let studentPage = 'result'
			if (currentQuestion.answerType === 'statistics') {
				studentPage = 'times-up'
			}

			try {
				await setPageToFirebase(examId, studentPage)
				await processSetPlayerAnswerToHistory()
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

		const processCountDownOver = () => {
			timesUp.value = true
			backgroundMusic.value.pause()
			
			if (currentQuestion.answerType === 'shortAnswer') {
				processCountDownOverForShortAnswer()
				return
			}

			processCountDownOverForOthers()
		}

		const processShowResult = () => {
			setPage('Result')
		}

		const processNextQuestion = async () => {
			if (questionIndex !== questionList.length - 1) {
				setQuestionIndex(questionIndex + 1)
				try {
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

		return {
			questionTitle: currentQuestion.questionTitle,
			showResultPage: currentQuestion.showResultPage,
			answerTypeComponent,
			music,
			timesUp,
			backgroundMusic,
			processShowResult,
			processCountDownOver,
			processNextQuestion,
		}
	},
}
</script>

<style lang="scss">
.teacher-answer-question-page {
	display: flex;
	overflow: hidden;
	flex-direction: column;

	box-sizing: border-box;
	height: 100vh;

	.answer-question {
		&__question-part {
			flex-shrink: 0;

			box-sizing: border-box;
			padding-top: 20px;

			text-align: center;
		}

		&__answer-part {
			position: relative;

			display: flex;
			flex-direction: column;
			flex-grow: 1;

			height: 100%;

			.timer-and-next-button {
				position: absolute;
				top: 10%;
				right: 10px;

				text-align: center;
			}

			.next-button {
				margin-top: 20px;
				padding: 30px 15px;

				border-radius: 10px;
				background-color: #2c9f8d;
				box-shadow: 1px 6px 8px 5px rgb(16, 56, 54);
			}
		}
	}
}
</style>
