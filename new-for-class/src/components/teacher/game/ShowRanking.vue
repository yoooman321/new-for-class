<template>
	<div class="ranking-animation">
		<div class="ranking-animation__title c-fff fw-800">
			<div class="ranking">{{ rankList[index] }}</div>
			<div class="player-name">{{ playerList[index] ? playerList[index].playerName : '' }}</div>
		</div>
		<div class="light"></div>
		<div class="light"></div>
	</div>
</template>

<script>
import { inject, ref } from 'vue'
export default {
	setup() {
		const playerList = inject('playerList')
		const changeComponent = inject('changeComponent')

		const rankList = ['第一名', '第二名', '第三名']
		const index = ref(2)
		let timer = null

		setTimeout(() => {
			timer = setInterval(() => {
				index.value -= 1
				if (index.value === 0) {
					clearInterval(timer)
					waitToChangeComponent()
				}
			}, 3200)
		}, 1000)

		const waitToChangeComponent = () => {
			setTimeout(() => {
				changeComponent('ShowFinalRanking')
			}, 4500)
		}

		return { playerList, rankList, index }
	},
}
</script>

<style lang="scss">
.ranking-animation {
	position: relative;

	overflow: hidden;

	width: 100%;
	height: 100%;
	&__title {
		position: absolute;
		top: 50%;
		left: 50%;

		transform: translate(-50%, -50%);
		text-align: center;

		color: #fff;

		.ranking {
			font-size: 15vh;
			padding-bottom: 20px;

			animation: show-ranking-text 4s 3;

			opacity: 0;
		}
		.player-name {
			font-size: 15vh;
			animation: show-player-name 4s 3;

			opacity: 0;
		}
	}

	@keyframes show-ranking-text {
		0%,
		100% {
			transform: scale(0);

			opacity: 0;
		}
		25%,
		75% {
			transform: scale(1);

			opacity: 1;
		}
	}

	@keyframes show-player-name {
		0%,
		25%,
		100% {
			transform: scale(0);

			opacity: 0;
		}
		50%,
		75% {
			transform: scale(1);

			opacity: 1;
		}
	}

	.light {
		position: absolute;
		bottom: 0;
		left: 0;

		width: 0;
		height: 0;

		transform-origin: bottom;
		animation: top-right 5s ease-in-out alternate infinite;

		border-top: solid 200vh rgba(255, 255, 255, 0.5);
		border-right: solid 20vh transparent;
		border-bottom: none;
		border-left: solid 20vh transparent;
	}

	.light + .light {
		right: 0;
		left: auto;

		animation: top-left 4s ease-in-out alternate infinite;
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
</style>
