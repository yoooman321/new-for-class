<template>
	<div class="student-layout">
		<div class="student-layout__header">
			<div class="title fz-20 fw-600">{{ titleText }}</div>
			<div
				v-if="
					page === 'AnswerQuestion' && playerInformation.playerAnswer !== ''
				"
				class="button c-fff fz-14 cursor-pointer"
				@click="progressSendAnswer"
			>
				答案確定
			</div>
		</div>
		<div class="student-layout__content">
			<component :is="page"></component>
		</div>
		<div class="student-layout__footer">
			<div class="player fz-16 fw-600">{{ playerInformation.playerName }}</div>
		</div>
	</div>
</template>

<script>
import Lobby from '@/pages/student/game/Lobby.vue'
import QuestionDisplay from '@/pages/student/game/QuestionDisplay.vue'
import AnswerQuestion from '@/pages/student/game/AnswerQuestion.vue'
import Result from '@/pages/student/game/Result.vue'
import Finish from '@/pages/student/game/Finish.vue'

import { useRouter } from 'vue-router'
import { useStudentGameStore } from '@/stores/studentGame'
import { computed, onBeforeMount, provide, ref } from 'vue'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'
import { storeToRefs } from 'pinia'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'
import useStudentGame from '@/hooks/student/use-student-game'

export default {
	components: {
		Lobby,
		QuestionDisplay,
		AnswerQuestion,
		Result,
		Finish,
	},

	props: {
		id: {
			type: String,
		},
	},

	setup(props) {
		const { id: examId } = props
		const page = ref('')
		const questionIndex = ref(-1)

		provide('examId', examId)
		provide('questionIndex', questionIndex)

		// router
		const router = useRouter()

		// hooks
		const {
			getPlayerInformation,
			checkAnswerIsCorrect,
			setPlayerInformationToFirebase,
		} = useStudentGame()
		const { getRoomsInformation } = useTeacherGame()

		// store
		const store = useStudentGameStore()
		const { playerInformation } = storeToRefs(store)
		const {
			setQuestionList,
			setIsSentAnswer,
			setIsCorrect,
			setPlayerInformation,
		} = useStudentGameStore()

		// 標題顯示
		const titleText = computed(() => {
			switch (page.value) {
				case 'lobby':
					return '進入遊戲'

				case 'QuestionDisplay':
					return '等待作答'

				case 'Finish':
					return '遊戲結束'

				case 'AnswerQuestion':
				case 'result':
					return `Question ${questionIndex.value + 1}`

				default:
					return ''
			}
		})

		const processGetInformationWhenRefresh = async () => {
			const uid = localStorage.getItem('studentUid')
			if (uid) {
				const playerInformation = await getPlayerInformation(examId)
				console.log('playe', playerInformation)

				if (!playerInformation) {
					deleteStudentUidFromStorage()
					return
				}

				setPlayerInformation(playerInformation)
			}
		}

		const deleteStudentUidFromStorage = () => {
			localStorage.removeItem('studentUid')
		}

		onBeforeMount(async () => {
			const hasRoomInformation = await getRoomsInformation(examId)
			if (!hasRoomInformation) {
				router.push('/noroom')
				return
			}

			processGetInformationWhenRefresh()

			// 監聽事件
			const db = getFirestore()
			const watchRoomsInformation = onSnapshot(
				doc(db, 'rooms', examId),
				(data) => {
					if (!data.data()) {
						return
					}

					// 結束監聽
					if (
						data.data().page === 'Finish' ||
						data.data().page === 'FinishWithRanking'
					) {
						watchRoomsInformation()
					}

					page.value = data.data().page
					questionIndex.value = data.data().questionIndex
					setQuestionList(data.data().questionList)
				}
			)
		})

		// 送答案
		const progressSendAnswer = async () => {
			const isCorrect = checkAnswerIsCorrect(questionIndex.value)
			setIsCorrect(isCorrect)
			const playerInformationToFirebase = {
				playerName: playerInformation.value.playerName,
				isCorrect,
				questionIndex: questionIndex.value,
				playerAnswer: playerInformation.value.playerAnswer,
				// score:
			}

			try {
				await setPlayerInformationToFirebase(
					examId,
					playerInformationToFirebase
				)
				setIsSentAnswer(true)
			} catch (e) {
				// do something
			}
		}

		return { page, titleText, playerInformation, progressSendAnswer }
	},
}
</script>
