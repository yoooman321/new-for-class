<template>
	<component :is="showComponentName"></component>
</template>

<script>
import ShowCalculating from '@/components/student/game/ShowCalculating.vue'
import ShowRanking from '@/components/student/game/ShowRanking.vue'

import { ref } from 'vue'
import useAccount from '@/hooks/use-account'
import useStudentGame from '@/hooks/student/use-student-game'

export default {
	components: {
		ShowCalculating,
		ShowRanking,
	},

	setup() {
		const showComponentName = ref('ShowCalculating')
		
		setTimeout(() => {
			showComponentName.value = 'ShowRanking'
		}, 14000)

		return { showComponentName }
	},
}
</script>

<style lang="scss">
.finish-with-ranking {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	height: 100%;

	.text {
		padding-bottom: 20px;
		color: #0b132b;
	}
	.load {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.load-dot {
		width: 25px;
		height: 25px;
		margin-top: calc(50px - 12.5px);
		margin-left: 5px;

		animation-name: loading;
		animation-duration: 1.2s;
		animation-iteration-count: infinite;
		animation-direction: alternate;

		border-radius: 50%;
		background-color: #0b132b;

		&--two {
			animation-delay: 0.4s;
		}

		&--three {
			animation-delay: 0.8s;
		}
	}
}
</style>
