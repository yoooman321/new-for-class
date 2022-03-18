<template>
	<div class="teacher-finish-with-ranking">
		<component :is="showComponentName"></component>
	</div>
</template>

<script>
import ShowCalculating from '@/components/teacher/game/ShowCalculating.vue'
import ShowRanking from '@/components/teacher/game/ShowRanking.vue'
import ShowFinalRanking from '@/components/teacher/game/ShowFinalRanking.vue'

import { provide, ref } from 'vue'
import { useTeacherGameStore } from '@/stores/teacherGame'
import { storeToRefs } from 'pinia'

export default {
	components: {
		ShowCalculating,
		ShowRanking,
		ShowFinalRanking,
	},

	setup() {
		const showComponentName = ref('ShowCalculating')
		const store = useTeacherGameStore()
		const { playerList } = storeToRefs(store)
		const sortedPlayerList = ref(playerList.value)

		sortedPlayerList.value.sort((a,b) => {
      return b.score - a.score
		})

		provide('playerList', sortedPlayerList.value)

		setTimeout(() => {
			changeComponent('ShowRanking')
		}, 2000)

		const changeComponent = (componentName) => {
			showComponentName.value = componentName
		}

		provide('changeComponent', changeComponent)

		return {
			showComponentName,
		}
	},
}
</script>

<style lang="scss">
.teacher-finish-with-ranking {
	width: 100vw;
	height: 100vh;

	background-color: #0b132b;

	.number-three {
		.ranking__title {
			padding-bottom: 20px;
			opacity: 0;

			animation: show-ranking-text 4s 3;
		}

		.player-name {
			opacity: 0;
			animation: show-player-name 4s 3;
		}

		@keyframes show-ranking-text {
			0%,
			100% {
				opacity: 0;
				transform: scale(0);
			}
			25%,
			75% {
				opacity: 1;
				transform: scale(1);
			}
		}

		@keyframes show-player-name {
			0%,
			25%,
			100% {
				opacity: 0;
				transform: scale(0);
			}
			50%,
			75% {
				opacity: 1;
				transform: scale(1);
			}
		}
		.text {
		}

		.light {
			animation: top-right 5s ease-in-out alternate infinite;
			border-bottom: none;
			border-left: solid 20vh transparent;
			border-right: solid 20vh transparent;
			border-top: solid 200vh rgba(255, 255, 255, 0.5);
			bottom: 0;
			height: 0;
			left: 0;
			position: absolute;
			transform-origin: bottom;
			width: 0;
		}

		.light + .light {
			animation: top-left 4s ease-in-out alternate infinite;
			left: auto;
			right: 0;
		}

		@keyframes top-right {
			0% {
				transform: rotate(-10deg);
			}
			100% {
				transform: rotate(70deg);
			}
		}

		@keyframes top-left {
			0% {
				transform: rotate(10deg);
			}
			100% {
				transform: rotate(-70deg);
			}
		}
	}
}
</style>
