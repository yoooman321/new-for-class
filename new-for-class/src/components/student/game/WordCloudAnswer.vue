<template>
	<div class="student-word-cloud-answer">
		<div class="input-wrapper">
			<div class="input__title">請輸入答案(可重複輸入)</div>
			<input type="text" class="input__field" v-model="answer" />
		</div>
	</div>
</template>

<script>
import { useStudentGameStore } from '@/stores/studentGame'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export default {
	setup() {
    const store = useStudentGameStore()
		const { setPlayerAnswer, setPlayerShortAnswer } =
			useStudentGameStore()
		const { shortAnswer } = storeToRefs(store)

		setPlayerAnswer([])

		const answer = computed({
			get: () => shortAnswer.value,
			set: (value) => {
				setPlayerShortAnswer(value)
			},
		})

		return { answer }
	},
}
</script>
