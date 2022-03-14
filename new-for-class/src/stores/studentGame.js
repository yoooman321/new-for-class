import { defineStore } from 'pinia'

export const useStudentGameStore = defineStore('studentGame', {
	state: () => {
		return {
			questionList: [],
			lobbyComponent: 'EnterGame',
			playerInformation: {},
			isSentAnswer: false,
			shortAnswer: '',
		}
	},

	actions: {
		setQuestionList(questionList) {
			this.questionList = questionList
		},

		setLobbyComponent(componentName) {
			this.lobbyComponent = componentName
		},

		setPlayerInformation(playerInformation) {
			this.playerInformation = playerInformation
		},

		setPlayerName(playerName) {
			this.playerInformation.playerName = playerName
		},

		// for single answer
		setPlayerAnswer(answer) {
			this.playerInformation.playerAnswer = answer
		},

		setPlayerShortAnswerList() {
			this.playerInformation.playerAnswer = [
				...this.playerInformation.playerAnswer,
				this.shortAnswer,
			]
		},

		setPlayerShortAnswer(shortAnswer) {
			this.shortAnswer = shortAnswer
		},

		setIsSentAnswer(booleanData) {
			this.isSentAnswer = booleanData
		},

		setIsCorrect(isCorrect) {
			this.playerInformation.isCorrect = isCorrect
		},

		setPlayerScore(score) {
			this.playerInformation.score = score
		},
	},
})
