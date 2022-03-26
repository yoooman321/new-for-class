<template>
	<div class="student-result">
		<div v-if="playerInformation.isCorrect" class="result">
			<img src="@/assets/images/student/correct.png" />
			<div class="text fz-20">恭喜答對!</div>
		</div>

		<div v-else class="result">
			<img src="@/assets/images/student/wrong.png" />
			<div class="text fz-20">答錯了，真可惜!</div>
		</div>
	</div>
</template>

<script>
import { useStudentGameStore } from '@/stores/studentGame'
import { storeToRefs } from 'pinia'

export default {
	setup() {
		const store = useStudentGameStore()
		const { playerInformation } = storeToRefs(store)

		return { playerInformation }
	},
}
</script>

<style lang="scss">
.student-result {
	padding-top: 20px;

	text-align: center;

	.result {
		img {
			width: auto;
			max-height: 200px;
		}
		.text {
			line-height: 1.4;

			padding-top: 20px;
		}
	}
}
</style>
