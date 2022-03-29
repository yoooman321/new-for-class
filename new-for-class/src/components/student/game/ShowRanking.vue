<template>
	<div class="show-ranking--student">
		<img src="@/assets/images/student/thank.png" class="show-ranking__header" />
		<div class="show-ranking__content">
			<div class="title fz-20 fw-600 c-text-main">您的分數：</div>
			<div class="score-part">
				<span class="score fz-40 fw-600">{{ playerScore }}</span>
				<span>分</span>
			</div>
			<div class="statistics-part fz-20 fw-500">
				<span>題目總共</span>
				<span>{{ quesitonIsSingleAnswer.length }}</span>
				<span>單選題，您答對了</span>
				<span>{{ playerScore }}題!</span>
			</div>

			<div v-if="correctPercentage >= 0.7" class="note fw-600 fz-20">
				太厲害了！
			</div>
			<div v-else-if="correctPercentage <= 0.3" class="note fw-600 fz-20">
				再接再厲！
			</div>
			<div v-else class="note fw-600 fz-20">不錯唷！</div>
		</div>
	</div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useStudentGameStore } from '@/stores/studentGame'
import { onBeforeUnmount, inject } from 'vue'
import useAccount from '@/hooks/use-account'
import useStudentGame from '@/hooks/student/use-student-game'

export default {
	setup() {
		const examId = inject('examId')
		const store = useStudentGameStore()
		const { questionList, playerInformation } = storeToRefs(store)
		const playerScore = playerInformation.value.score

		const quesitonIsSingleAnswer = questionList.value.filter(
			({ answerType }) => answerType === 'singleAnswer'
		)
		const correctPercentage = playerScore / quesitonIsSingleAnswer.length

		const { deletePlayerAuth } = useAccount()
		const { deletePlayerInformation } = useStudentGame()

		setTimeout(async () => {
			try {
				await deletePlayerInformation(examId)
			} catch (e) {
				console.log('b', e)
			}

			try {
				await deletePlayerAuth()
			} catch (e) {
				console.log('a', e)
			}
			localStorage.removeItem('studentUid')
		}, 3000)

		onBeforeUnmount(async () => {
			try {
				await deletePlayerInformation(examId)
			} catch (e) {
				console.log('b', e)
			}

			try {
				await deletePlayerAuth()
			} catch (e) {
				console.log('a', e)
			}
			localStorage.removeItem('studentUid')
		})

		return { playerScore, quesitonIsSingleAnswer, correctPercentage }
	},
}
</script>

<style lang="scss">
.show-ranking--student {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: flex-start;

	box-sizing: border-box;
	height: 100%;
	padding-top: 20px;
	img {
		height: 20vh;
	}

	.show-ranking__content {
		padding-top: 20px;

		text-align: center;

		.score-part {
			padding-top: 20px;

			.score {
				padding-right: 10px;

				color: #d7263d;
			}
		}

		.statistics-part {
			padding-top: 20px;
		}

		.note {
			padding-top: 20px;

			color: #2f3061;
		}
	}
}
</style>
