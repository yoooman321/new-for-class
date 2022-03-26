<template>
	<div class="teacher-layout">
		<component :is="teacherPage"></component>
	</div>
</template>

<script>
import Lobby from '@/pages/teacher/game/LobbyPage.vue'
import QuestionDisplay from '@/pages/teacher/game/QuestionDisplay.vue'
import AnswerQuestion from '@/pages/teacher/game/AnswerQuestion.vue'
import Finish from '@/pages/teacher/game/FinishPage.vue'
import Result from '@/pages/teacher/game/ResultPage.vue'
import FinishWithRanking from '@/pages/teacher/game/FinishWithRanking.vue'

import useTeacherGame from '@/hooks/teacher/use-teacher-game'
import { useTeacherGameStore } from '@/stores/teacherGame'
import { storeToRefs } from 'pinia'
import { onBeforeMount, provide, reactive, watch } from 'vue'
import {
	getFirestore,
	collection,
	query,
	where,
	onSnapshot,
} from 'firebase/firestore'

export default {
	components: {
		Lobby,
		QuestionDisplay,
		AnswerQuestion,
		Finish,
		Result,
		FinishWithRanking,
	},

	props: {
		id: {
			type: String,
			default: '',
		},
	},

	setup(props) {
		let playerList = reactive([])
		let playerListener = null

		provide('examId', props.id)

		// store
		const store = useTeacherGameStore()
		const { page, questionIndex } = storeToRefs(store)
		const {
			setQuestionList,
			setQuestionIndex,
			setPage,
			setPlayerList,
			setHistoryID,
			setShowRankingPage,
		} = useTeacherGameStore()

		// hooks
		const { getRoomsInformation } = useTeacherGame()

		// 取得資料庫資料後存入vuex
		const processGetRoomsInformation = async () => {
			const { page, questionIndex, questionList, historyID, showRankingPage } =
				await getRoomsInformation(props.id)

			setPage(page)
			setQuestionIndex(questionIndex)
			setQuestionList(questionList)
			setHistoryID(historyID)
			setShowRankingPage(showRankingPage)
		}

		watch(questionIndex, async () => {
			playerListener()
			setPlayerList([])

			addListenerObject()
		})

		const addListenerObject = () => {
			const db = getFirestore()

			const q = query(
				collection(db, 'rooms', props.id, 'players'),
				where('questionIndex', '==', questionIndex.value)
			)
			playerListener = onSnapshot(q, (querySnapshot) => {
				let originalPlayerList = []
				querySnapshot.forEach((doc) => {
					originalPlayerList.push(doc.data())
				})
				playerList = [...new Set(originalPlayerList)]

				setPlayerList(playerList)
			})
		}

		onBeforeMount(async () => {
			try {
				processGetRoomsInformation()
			} catch (e) {
				console.log('ee', e)
			}

			// 監聽player
			addListenerObject()
		})

		return { teacherPage: page }
	},
}
</script>
