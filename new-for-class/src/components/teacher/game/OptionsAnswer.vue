<template>
	<div class="answer-question__other-features">
		<AnsweredPlayerList class="answered-player-list-wrapper" />
		<Timer class="timer-wrapper" @processCountDownOver="processCountDownOver" />
		<div v-if="showStatistics" class="times-up-part">
			<Statistics />
			<div class="next-button fz-40 c-fff cursor-pointer" @click="processNextQuestion">下一題</div>
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
		const { currentQuestion, questionIndex, questionList, setQuestionIndex, setPage, setCurrentQuestionInformation } =
			useTeacherGameStore()
		const { options } = currentQuestion

		// hooks
		const { setPageToFirebase } = useTeacherGame()

		const optionTitleList = ['A', 'B', 'C', 'D']
		const showStatistics = ref(false)

		/**
		 * 倒數結束
		 * 1. showStatistics = true  V
		 * 2. vuex questionindex++  V
		 * 3. firebase page   V
		 * 4. history push player list
		 */
		const processCountDownOver = async () => {
			setQuestionIndex(questionIndex + 1)
			try {
				await setPageToFirebase(examId, 'result')
				showStatistics.value = true
			} catch {}
		}

		/**
		 * 按下一題:
		 * 1. 判斷vuex questionIndex === list.length V
		 * 2. same -> vuex, firebase page = finish V
		 *    diff -> page = qd V, setExam
		 */
    const processNextQuestion = async () => {
      if (questionIndex !== questionList.length - 1) {
        try {
          setCurrentQuestionInformation()
          await setPageToFirebase(examId, 'QuestionDisplay')
				  setPage('QuestionDisplay')
        } catch {

        }
        
        return 
      }

      try {
          await setPageToFirebase(examId, 'Finish')
				  setPage('Finish')
        } catch {

        }
    }

		return { optionTitleList, showStatistics, options, processCountDownOver , processNextQuestion}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/game/_optionsAnswer.scss';
</style>
