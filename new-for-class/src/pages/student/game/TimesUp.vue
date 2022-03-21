<template>
	<div class="student-times-up">
		<img src="@/assets/images/student/time.png" />

		<div class="text fz-20">時間到</div>
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
.student-times-up {
	padding-top: 20px;

	text-align: center;

	img {
		height: 150px;
	}

	.text {
		line-height: 1.4;

		padding-top: 20px;
	}
}
</style>
