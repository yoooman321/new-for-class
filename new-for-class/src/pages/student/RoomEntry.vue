<template>
	<div class="room-entry">
		<div class="room-entry-container">
			<div class="room-entry__title fz-30">請輸入房間編號</div>
			<div class="room-entry__form">
				<div class="input-wrapper">
					<div class="input__title fz-20 c-text-main">房間編號</div>
					<input v-model="roomId" class="input__field" name="playerName" type="number" />
				</div>
				<div class="room-entry-button bgc-main c-fff cursor-pointer" @click="enterRoom()">進入</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const router = useRouter()

		const roomId = ref('')

		const enterRoom = () => {
			router.push(`/play/${roomId.value}`)
		}

		return { roomId, enterRoom }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/abstracts/_variables.scss';
.room-entry {
	display: flex;
	align-items: center;
	justify-content: center;

	width: 100vw;
	height: 100vh;

	background: linear-gradient(45deg, #80c2af, #30c5ff);

	&-container {
		width: 80vw;
		height: 50vh;
		padding: 20px;

		text-align: center;

		border-radius: 10px;
		background-color: rgba(255, 255, 255, 0.8);
		box-shadow: 1px 1px 8px 0 #000;
	}

	&__form {
		width: 60%;
		margin: 0 auto;
		padding-top: 40px;

		.input__title {
			margin-bottom: 10px;

			text-align: center;
		}

		.input__field {
			font-size: 16px;

			box-sizing: border-box;
			width: 100%;
			height: 35px;
			padding: 0 10px;

			border: 1px solid map-get($color-array, 'text-main');
			border-radius: 5px;

			&:focus-visible {
				border: 1px solid map-get($color-array, 'main');
				outline: initial;
			}
		}

		.room-entry-button {
			width: 150px;
			margin: 40px auto 0;
			padding: 10px 0;

			border-radius: 5px;
		}
	}
}
</style>
