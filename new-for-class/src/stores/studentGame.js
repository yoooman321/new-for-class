import { defineStore } from 'pinia'

export const useStudentGameStore = defineStore('studentGame', {
	state: () => {
		return {
			questionList: [],
			lobbyComponent: 'EnterGame',
			playerInformation: {},
			isSentAnswer: false,
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
