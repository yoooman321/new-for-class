<template>
	<div class="student-word-cloud-answer">
		<div class="input-wrapper">
			<div class="input__title">請輸入答案(可重複輸入)</div>
			<input v-model="answer" type="text" class="input__field fz-18" />
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
		const { setPlayerAnswer, setPlayerShortAnswer } = useStudentGameStore()
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

<style lang="scss">
.student-word-cloud-answer {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: flex-start;

	height: 100%;
	padding-top: 50px;

	.input {
		&__title {
			padding-bottom: 20px;

			text-align: center;
		}

		&__field {
			height: 30px;
		}
	}
}
</style>
