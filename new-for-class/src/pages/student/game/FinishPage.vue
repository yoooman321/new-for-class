<template>
	<div class="student-finish">
		<div class="text fw-600">
			<span>Thank You For Your Playing!</span>
		</div>
	</div>
</template>

<script>
import useAccount from '@/hooks/use-account'
import useStudentGame from '@/hooks/student/use-student-game'
import { onBeforeMount, inject } from 'vue'

export default {
	setup() {
		const examId = inject('examId')

		const { deletePlayerAuth } = useAccount()
		const { deletePlayerInformation } = useStudentGame()

		onBeforeMount(async () => {
			try {
				await deletePlayerInformation(examId)
			} catch (e) {
				console.log('b', e)
			}

			try {
				await deletePlayerAuth()
			} catch (e) {
				console.log('a', e)
			}
			localStorage.removeItem('studentUid')
		})
	},
}
</script>

<style lang="scss">
.student-finish {
	display: flex;
	align-items: center;
	justify-content: center;

	height: 100%;

	background-image: url('@/assets/images/student/finish-bg.jpg');
	background-position: top center;
	background-size: 100% auto;

	.text {
		font-size: 30px;

		padding: 0 10px;

		text-align: center;

		color: #52489c;
	}
}
</style>
