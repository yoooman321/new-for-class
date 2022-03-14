<template>
	<div class="word-cloud-answer">
		<div class="word-cloud-canvas" id="word-cloud-canvas"></div>

		<div class="word-cloud-left-side">
			<Timer
				class="timer-wrapper"
				@processCountDownOver="processCountDownOver"
			/>
			<div v-if="showNextQuestionButton" class="times-up-part">
				<div
					class="next-button fz-40 c-fff cursor-pointer"
					@click="processNextQuestion"
				>
					下一題
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import Timer from '@/components/teacher/game/Timer.vue'

import { useTeacherGameStore } from '@/stores/teacherGame'
import { storeToRefs } from 'pinia'
import { onMounted, inject, ref, watch } from 'vue'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'

export default {
	components: {
		Timer,
	},

	setup() {
		// inject examId
		const examId = inject('examId')

		const showNextQuestionButton = ref(false)

		// store
		const store = useTeacherGameStore()
		const { playerList } = storeToRefs(store)
		const {
			setQuestionIndex,
			questionIndex,
			questionList,
			setCurrentQuestionInformation,
			setPage,
		} = store

		// hooks
		const { setPageToFirebase, setHistoryDataToFirebase } = useTeacherGame()

		const processCountDownOver = async () => {
			try {
				await setPageToFirebase(examId, 'times-up')
				showNextQuestionButton.value = true
				await processSetPlayerAnswerToHistory()
			} catch (e) {
				// DO SOMETHING
			}
		}

		const processSetPlayerAnswerToHistory = async () => {
			const historyData = {
				[`question${questionIndex}`]: playerList.value,
			}

			await setHistoryDataToFirebase(historyData)
		}

		// TODO: 命名要改
		watch(playerList, (count, prevCount) => {
			const test = count.flatMap(({ playerAnswer }) => playerAnswer)

			const g = test.reduce((acc, cur) => {
				if (acc.length === 0) {
					return [
						{
							name: cur,
							value: 1,
						},
					]
				}

				const a = acc.findIndex(({ name }) => name === cur)
				if (a === -1) {
					return [...acc, { name: cur, value: 1 }]
				}
				acc[a].value += 1
				return acc
			}, [])

			chart.setOption({
				series: [
					{
						data: g,
					},
				],
			})
		})

		const processNextQuestion = async () => {
			if (questionIndex !== questionList.length - 1) {
				setQuestionIndex(questionIndex + 1)
				try {
					setCurrentQuestionInformation()
					await setPageToFirebase(examId, 'QuestionDisplay')
					setPage('QuestionDisplay')
				} catch (w) {
					console.log('w', w)
				}

				return
			}

			try {
				await setPageToFirebase(examId, 'Finish')
				setPage('Finish')
			} catch (c) {
				console.log('c', c)
			}
		}

		// chart
		let chart = null
		const chartTextColorList = [
			'#820263',
			'#D90368',
			'#EADEDA',
			'#2E294E',
			'#FFD400',
			'#000000',
			'#758BFD',
			'#FF8600',
			'#52796F',
			'#686963',
		]

		const initChart = () => {
			chart = echarts.init(document.getElementById('word-cloud-canvas'))

			chart.setOption({
				series: [
					{
						type: 'wordCloud',
						gridSize: 20,
						sizeRange: [30, 60],
						rotationRange: [0, 0],
						shape: 'rect',
						width: '100%',
						height: '100%',
						left: 'center',
						top: 'center',
						drawOutOfBound: false,
						layoutAnimation: true,
						textStyle: {
							fontWeight: 'bold',
							color: () => {
								const randomIndex = Math.round(Math.random() * 10)
								return chartTextColorList[randomIndex]
							},
						},
						data: [],
					},
				],
			})
		}

		onMounted(() => {
			initChart()
		})

		return {
			playerList,
			processCountDownOver,
			showNextQuestionButton,
			processNextQuestion,
		}
	},
}
</script>

<style lang="scss">
.word-cloud-answer {
	display: flex;
	align-items: center;

	width: 100%;
	height: 100%;

	.word-cloud-canvas {
		flex-grow: 1;

		width: 100%;
		height: 100%;
	}

	.word-cloud-left-side {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 20%;
		height: 100%;
	}

	.next-button {
		flex-shrink: 0;

		margin-right: 15px;
		padding: 30px 15px;

		border-radius: 10px;
		background-color: #2c9f8d;

		box-shadow: 1px 6px 8px 5px rgb(16, 56, 54);
	}
}
</style>
