<template>
	<div class="wait-for-start">
		<img src="@/assets/images/student/time.png" />
		<div class="text fz-20">
			{{ playerName }} 您好，
			<br />
			請靜待遊戲開始。
		</div>
	</div>
</template>

<script>
import { useStudentGameStore } from '@/stores/studentGame'
export default {
	setup() {
		const { playerInformation } = useStudentGameStore()

		return { playerName: playerInformation.playerName }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/student/_waitForStart.scss';
</style>
