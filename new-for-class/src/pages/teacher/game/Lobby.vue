<template>
	<div class="lobby-page">
		<div class="lobby__header">
			<div class="lobby__information">
				<div class="text c-fff fw-600">請掃描QRCode進入遊戲</div>

				<QRCodeVue3
					class="qrcode cursor-pointer"
					value="http://www.google.com"
				/>
			</div>

      <div class="lobby__button fz-26 c-fff cursor-pointer">開始遊戲</div>
		</div>

		<div class="lobby__content">
			<div class="title-part">
				<div class="title fz-26">玩家列表</div>
				<div class="amount">
					<img class="icon" src="@/assets/images/teacher/icon/user.svg" />
					<div class="text fz-26 c-fff fw-600">1</div>
				</div>
			</div>
			<div class="player-list fz-26">
				<div class="player">test</div>
			</div>
		</div>
	</div>

	<!-- <div class="lobby__popup">
		<QRCodeVue3
			class="qrcode"
			value="http://www.google.com"
			:width="pupupQrcodeSize"
			:height="pupupQrcodeSize"
		/>
	</div> -->
</template>

<script>
import QRCodeVue3 from 'qrcode-vue3'
import { onMounted } from 'vue'
export default {
	components: {
		QRCodeVue3,
	},

	setup() {
		const min = Math.min(
			document.documentElement.clientHeight,
			document.documentElement.clientWidth
		)
		const pupupQrcodeSize = min - 50

		return { pupupQrcodeSize }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/teacher/_lobby.scss';
</style>
