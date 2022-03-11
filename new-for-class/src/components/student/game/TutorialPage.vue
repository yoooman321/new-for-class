<template>
	<div class="tutorial">
		<div class="tutorial-inner">
			<div class="tutorial__header">
				<div class="title fz-20 fw-600">使用教學</div>
				<div class="button c-fff fz-14">答案確定</div>
			</div>

			<div class="tutorial__content">
				<template v-for="index in 4" :key="`tutorial-${index}`">
					<div :class="`option-${index} bgc-option-${index}`"></div>
				</template>
			</div>

			<img class="finger" src="@/assets/images/student/finger.png" />

			<div class="tips fz-18">
				<div class="text">
					看老師螢幕的問題及答案，點擊答案相對應的顏色後，點擊右上角答案確定。
				</div>
				<div
					class="confirm-button c-fff fw-500"
					@click="setLobbyComponent('WaitForStart')"
				>
					我知道了
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useStudentGameStore } from '@/stores/studentGame'

export default {
	setup() {
		const { setLobbyComponent } = useStudentGameStore()

		return { setLobbyComponent }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/student/_tutorial.scss';

</style>
