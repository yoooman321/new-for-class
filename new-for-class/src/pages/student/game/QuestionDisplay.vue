<template>
	<div class="student-question-display">
		<img src="@/assets/images/student/blackboard.png" />

		<div class="text fz-20">請先看老師螢幕上的問題</div>
	</div>
</template>

<script>
import { useStudentGameStore } from '@/stores/studentGame'

export default {
	setup() {
		// store
		const { setPlayerAnswer, setIsSentAnswer, setIsCorrect } =
			useStudentGameStore()

		setPlayerAnswer('')
		setIsSentAnswer(false)
		setIsCorrect(false)
	},
}
</script>

<style lang="scss">
.student-question-display {
	padding-top: 20px;

	text-align: center;

	img {
		width: 40%;
	}

	.text {
		line-height: 1.4;

		padding-top: 20px;
	}
}
</style>
