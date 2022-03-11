<template>
	<div class="enter-game">
		<div class="enter-game__header">
			<img src="@/assets/images/student/welcome.png" />
		</div>

		<div class="enter-game__content">
			<Form>
				<div class="input-wrapper">
					<div class="input__title fz-20">請輸入您的暱稱(最多六個字)</div>
					<input
						maxlength="6"
						v-model="playerName"
						class="input__field"
						name="playerName"
						type="text"
						autocomplete="off"
					/>
				</div>

				<div
					class="submit-button fz-16 c-fff cursor-pointer"
					@click="processSignUpForGame"
				>
					進入遊戲
				</div>
			</Form>
		</div>
	</div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { ref, inject } from 'vue'
import { useStudentGameStore } from '@/stores/studentGame'
import useStudentGame from '@/hooks/student/use-student-game'
import useAccount from '@/hooks/use-account'
export default {
	components: {
		Form,
		Field,
	},

	setup() {
		const examId = inject('examId')

		// hooks
		const { setPlayerInformationToFirebase } = useStudentGame()
		const { playerSignIn } = useAccount()

		const processSignUpForGame = async () => {
			try {
				// save player Informaiton
				const uid = await playerSignIn()
				localStorage.setItem('studentUid', uid)
				setPlayerName(playerName.value)

				setLobbyComponent('Tutorial')

				// sent player information to firebase
				const playerInformation = {
					playerName: playerName.value,
					questionIndex: -1,
					isCorrect: false,
					playerAnswer: '',
					score: 0,
				}
				setPlayerInformationToFirebase(examId, playerInformation)
			} catch (e) {
				// try again
			}
		}

		const { setPlayerName, setLobbyComponent } = useStudentGameStore()
		const playerName = ref('')

		return { processSignUpForGame, playerName }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/student/_enterGame.scss';

</style>
