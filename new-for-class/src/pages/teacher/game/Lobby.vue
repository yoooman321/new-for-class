<template>
	<div class="teacher-lobby-page">
		<div class="lobby__header">
			<div class="lobby__information">
				<div class="text c-fff fw-600">請掃描QRCode進入遊戲</div>

				<QRCodeVue3
					@click="showPopup = true"
					class="qrcode cursor-pointer"
					:value="link"
				/>
			</div>

			<div
				class="lobby__button fz-26 c-fff cursor-pointer"
				@click="progressPlayGame"
			>
				開始遊戲
			</div>
		</div>

		<div class="lobby__content">
			<div class="title-part">
				<div class="title fz-26">玩家列表</div>
				<div class="amount">
					<img class="icon" src="@/assets/images/teacher/icon/user.svg" />
					<div class="text fz-26 c-fff fw-600">{{ playerList.length }}</div>
				</div>
			</div>
			<div class="player-list fz-26">
				<div
					:key="player.playerName"
					v-for="player in playerList"
					class="player"
				>
					{{ player.playerName }}
				</div>
			</div>
		</div>
	</div>

	<div class="lobby__popup" v-if="showPopup" @click="closePopup">
		<QRCodeVue3
			class="qrcode"
			:value="link"
			:width="pupupQrcodeSize"
			:height="pupupQrcodeSize"
		/>
	</div>
</template>

<script>
import QRCodeVue3 from 'qrcode-vue3'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'
import { useTeacherGameStore } from '@/stores/teacherGame'
import { useSystemStore } from '@/stores/system'
import { inject, ref } from 'vue'
import { storeToRefs } from 'pinia'

export default {
	components: {
		QRCodeVue3,
	},

	setup() {
		const link = location.href

		// store
		const store = useTeacherGameStore()
		const { setQuestionIndex, setPage, setCurrentQuestionInformation } =
			useTeacherGameStore()
		const { playerList } = storeToRefs(store)
		
		const { switchLoadingFlag } = useSystemStore()

		// hooks
		const { setPageToFirebase, setHistoryDataToFirebase } = useTeacherGame()

		// inject examId
		const examId = inject('examId')

		// get QRCode Size
		const min = Math.min(
			document.documentElement.clientHeight,
			document.documentElement.clientWidth
		)
		const pupupQrcodeSize = min - 200
		const showPopup = ref(false);

		const progressPlayGame = async () => {
			switchLoadingFlag(true)
			const historyData = {
				playerAmount: playerList.value.length,
			}

			setQuestionIndex(0)
			setCurrentQuestionInformation()

			try {
				await setHistoryDataToFirebase(historyData)
				await setPageToFirebase(examId, 'QuestionDisplay')
				switchLoadingFlag(false)
				setPage('QuestionDisplay')
			} catch (e) {
				switchLoadingFlag(false)
				// Error message try again?
			}
		}

		const closePopup = () => {
			showPopup.value = false
		}

		return { pupupQrcodeSize, progressPlayGame, examId, playerList, link, showPopup, closePopup }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/teacher/_lobby.scss';
</style>
