<template>
	<div class="teacher-layout">
		<component :is="teacherPage"></component>
	</div>
</template>

<script>
import Lobby from '@/pages/teacher/game/Lobby.vue'
import QuestionDisplay from '@/pages/teacher/game/QuestionDisplay.vue'
import AnswerQuestion from '@/pages/teacher/game/AnswerQuestion.vue'
import Finish from '@/pages/teacher/game/Finish.vue'

import useTeacherGame from '@/hooks/teacher/use-teacher-game'
import { useTeacherGameStore } from '@/stores/teacherGame'
import { storeToRefs } from 'pinia'
import { onBeforeMount, provide } from 'vue'

export default {
	components: {
		Lobby,
		QuestionDisplay,
		AnswerQuestion,
		Finish,
	},

	props: {
		id: {
			type: String,
		},
	},

	setup(props) {
		
		const { id: examId } = props

		provide('examId', examId)
		// 還要provide playerlist

		// store
		const store = useTeacherGameStore()
		const { page } = storeToRefs(store)
		const { setQuestionList, setQuestionIndex, setPage } = useTeacherGameStore()

		// hooks
		const { getRoomsInformation } = useTeacherGame()

		// TODO: watch vuex裡的QuestionIndex, 有變動就移除監聽, -> 清空playerlist建立新的監聽
		onBeforeMount(async () => {
			// 分兩個function, 1個取資料,另外一個監聽player, 監聽QuestionIndex
			try {
				// 取得資料庫資料後存入vuex
				const { page, questionIndex, questionList } = await getRoomsInformation(
					examId
				)

				setPage(page)
				setQuestionIndex(questionIndex)
				setQuestionList(questionList)
			} catch (e) {
				console.log('ee', e)
			}
		})

		return { teacherPage: page }
	},
}
</script>
