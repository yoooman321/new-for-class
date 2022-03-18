<template>
	<div class="show-final-ranking">
		<div class="show-final-ranking__header fw-800">Thank you!</div>
		<div class="show-final-ranking__content">
			<div class="top3">
				<div class="two item" v-if="playerList.length >= 2">
					<img
						src="@/assets/images/teacher/exam/SliverCrown.png"
						alt=""
						class="pic"
					/>
					<div class="pos">2</div>
					<div class="name">{{ playerList[1].playerName }}</div>
					<div class="score">{{ playerList[1].score }}</div>
				</div>

				<div class="one item" v-if="playerList.length >= 1">
					<img
						src="@/assets/images/teacher/exam/goldCrown.png"
						alt=""
						class="pic"
					/>
					<div class="pos">1</div>
					<div class="name">{{ playerList[0].playerName }}</div>
					<div class="score">{{ playerList[0].score }}</div>
				</div>

				<div class="three item" v-if="playerList.length >= 3">
					<img
						src="@/assets/images/teacher/exam/bronzeCrown.png"
						alt=""
						class="pic"
					/>
					<div class="pos">3</div>
					<div class="name">{{ playerList[2].playerName }}</div>
					<div class="score">{{ playerList[2].score }}</div>
				</div>
			</div>

			<div class="list">
				<div
					class="item"
					v-for="(player, index) in otherPlayer"
					:key="player.playerName"
				>
					<div class="pos">{{ index + 4 }}</div>
					<div class="name">{{ player.playerName }}</div>
					<div class="score">{{ player.score }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { onBeforeMount, inject, ref } from 'vue'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'

export default {
	setup() {
		const playerList = inject('playerList')
		const examId = inject('examId')
		const otherPlayer = ref([])

		if (playerList.length >= 4) {
			otherPlayer.value = playerList.slice(3, 10)
		}

		// hook
		const { deleteRoomsInformation } = useTeacherGame()
		onBeforeMount(() => {
			deleteRoomsInformation(examId)
		})

		return { playerList, otherPlayer }
	},
}
</script>

<style lang="scss">
.show-final-ranking {
	height: 100%;
	width: 100%;
	overflow: hidden;
	color: #fff;

	&__header {
		text-align: center;
		padding: 10px 0;
	}

	&__content {
		width: 500px;
		margin: 0 auto;
		padding-top: 40px;
	}

	.center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.top3 {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		color: #4b4168;

		.item {
			box-sizing: border-box;
			position: relative;
			background: white;
			width: 9rem;
			height: 10rem;
			text-align: center;
			padding: 2.8rem 0 0;
			margin: 1rem 1rem 2rem;
			border-radius: 0.5rem;
			transform-origin: bottom;
			cursor: pointer;
			transition: transform 200ms ease-in-out;
			box-shadow: 0 0 4rem 0 rgba(black, 0.1),
				0 1rem 2rem -1rem rgba(black, 0.3);

			.pic {
				position: absolute;
				top: -2rem;
				left: 2.5rem;
				width: 4rem;
				height: 4rem;
				background-size: cover;
				background-position: center;
				margin-right: 1rem;
			}

			.pos {
				font-weight: 900;
				font-size: 1.5rem;
				margin-bottom: 0.5rem;
			}

			.name {
				font-size: 1.1rem;
				margin-bottom: 0.5rem;
			}

			.score {
				opacity: 0.5;
			}

			&.one {
				width: 10rem;
				height: 11rem;
				padding-top: 3.5rem;

				.pic {
					width: 5rem;
					height: 5rem;
					left: 2.5rem;
				}
			}
		}
	}

	.list {
		padding-left: 2rem;
		margin: 0 auto;
		// width: fit-content;

		.item {
			position: relative;
			display: flex;
			align-items: center;
			background: white;
			height: 3rem;
			// width: fit-content;
			padding-left: 10px;
			border-radius: 4rem;
			margin-bottom: 2rem;
			background: #eaa786;
			transform-origin: left;
			cursor: pointer;
			transition: transform 200ms ease-in-out;
			box-shadow: 0 0 4rem 0 rgba(black, 0.1),
				0 1rem 2rem -1rem rgba(black, 0.3);

			.pos {
				font-weight: 900;
				position: absolute;
				left: -2rem;
				text-align: center;
				font-size: 1.25rem;
				width: 1.5rem;
				color: white;
				opacity: 0.6;
				transition: opacity 200ms ease-in-out;
			}

			.pic {
				width: 4rem;
				height: 4rem;
				border-radius: 50%;
				background-size: cover;
				background-position: center;
				margin-right: 1rem;
				box-shadow: 0 0 1rem 0 rgba(black, 0.2),
					0 1rem 1rem -0.5rem rgba(black, 0.3);
			}

			.name {
				color: #040034;
				flex-grow: 2;
				flex-basis: 10rem;
				font-size: 1.1rem;
			}

			.score {
				margin-right: 1.5rem;
				opacity: 0.5;
			}
		}
	}
}
</style>
