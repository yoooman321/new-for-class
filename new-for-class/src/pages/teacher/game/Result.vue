<template>
	<div class="teacher-result-page">
		<div class="teacher-result-page__header fw-700">回答狀況</div>
		<div class="teacher-result-page__content">
			<div class="correct-part">
				<div class="image-wrapper">
					<img src="@/assets/images/teacher/exam/correct.png" alt="" />
					<div>答對區</div>
				</div>
				<div class="player-list">
					<div
						class="player"
						v-for="(player, index) in correctPlayerList"
						:key="`${player.playerName}-${index}`"
					>
						{{ player.playerName }}
					</div>
				</div>
			</div>
			<div class="wrong-part">
				<div class="image-wrapper">
					<img src="@/assets/images/teacher/exam/wrong.png" alt="" />
					<div>答錯區</div>
				</div>
				<div class="player-list">
					<div
						class="player"
						v-for="(player, index) in worngPlayerList"
						:key="`${player.playerName}-${index}`"
					>
						{{ player.playerName }}
					</div>
				</div>
			</div>
		</div>

		<div
			class="teacher-result-page__button cursor-pointer c-fff"
			@click="processNextQuestion"
		>
			下一題
		</div>
	</div>
</template>

<script>
import { useTeacherGameStore } from '@/stores/teacherGame'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'
import { storeToRefs } from 'pinia'
import { inject } from 'vue'

export default {
	setup() {
		const examId = inject('examId')

		const store = useTeacherGameStore()
		const { playerList } = storeToRefs(store)
		const {
			setQuestionIndex,
			setCurrentQuestionInformation,
			setPage,
			questionIndex,
			questionList,
		} = useTeacherGameStore()

		// hooks
		const { setPageToFirebase } = useTeacherGame()

		const correctPlayerList = playerList.value.filter(({ isCorrect }) => {
			return isCorrect
		})

		const worngPlayerList = playerList.value.filter(({ isCorrect }) => {
			return isCorrect === false
		})

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

		return { correctPlayerList, worngPlayerList, processNextQuestion }
	},
}
</script>

<style lang="scss">
.teacher-result-page {
	display: flex;
	flex-direction: column;

	box-sizing: border-box;
	height: 100vh;
	padding: 20px;

	background-color: #c5d5e4;
	&__header {
		padding-bottom: 25px;

		text-align: center;
	}

	&__content {
		position: relative;

		display: flex;
		align-items: flex-start;
		flex-grow: 1;

		height: 100%;

		.correct-part {
			border-right: 3px dashed #1976d2;
		}

		.correct-part,
		.wrong-part {
			display: flex;
			align-items: center;
			flex-direction: column;
			flex-grow: 1;

			box-sizing: border-box;
			width: 50%;
			height: 100%;
			padding: 0 15px;

			.image-wrapper {
				position: relative;

				display: flex;
				align-items: center;
				justify-content: center;

				img {
					height: 200px;
				}
			}
			.player-list {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				justify-content: flex-start;

				.player {
					font-size: 0.5em;

					padding: 5px;
				}
			}
		}
	}

	&__button {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		justify-content: center;

		box-sizing: border-box;
		width: 250px;
		margin: 0 auto;
		padding: 10px 0;

		border-radius: 20px;
		background-color: #1c2541;
	}
}
</style>
