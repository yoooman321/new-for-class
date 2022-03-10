<template>
	<div class="teacher-question-display">
		<div class="question-part">
			<div class="question-index fw-600">Question {{ questionIndex + 1 }}</div>
			<div class="question">
				{{ questionTitle }}
			</div>
			<div class="counter-part fw-600">{{ counter }}</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, onBeforeMount, inject } from 'vue'
import { useTeacherGameStore } from '@/stores/teacherGame'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'

export default {
	setup() {
		// inject examId
		const examId = inject('examId')

		// hooks
		const { setPageToFirebase, setQuestionIndexToFirebase } = useTeacherGame()

		// store
		const { questionIndex, currentQuestion, setPage } = useTeacherGameStore()

		// counter
		let counter = ref('')
		let timer = null
		const countDown = () => {
			if (counter.value === 'GO') {
				processCountDownOver()
				return
			}

			if (counter.value === 1) {
				counter.value = 'GO'

				return
			}

			counter.value--
		}

		onMounted(() => {
			setTimeout(() => {
				counter.value = 3
				timer = setInterval(countDown, 1000)
			}, 3000)
		})

		// update questionIndex to firebase
		onBeforeMount(() => {
			setQuestionIndexToFirebase(examId, questionIndex)
		})

		// hooks

		/**
		 * 倒數結束
		 * 1. vuex page
		 * 2. firebase page
		 */

		const processCountDownOver = async () => {
			clearInterval(timer)

			try {
				await setPageToFirebase(examId, 'AnswerQuestion')
				setPage('AnswerQuestion')
			} catch {
				// 重call?
			}
		}

		return {
			counter,
			questionIndex,
			questionTitle: currentQuestion.questionTitle,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/teacher/_questionDisplay.scss';
</style>
