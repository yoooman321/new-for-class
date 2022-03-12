import { defineStore } from 'pinia'

export const useTeacherGameStore = defineStore('teacherGame', {
	state: () => {
		return {
			questionList: [],
			questionIndex: -1,
			page: '',
			currentQuestion: {},
			playerList: [],
			historyID: ''
		}
	},

	actions: {
		setQuestionList(questionList) {
			this.questionList = questionList
		},

		setQuestionIndex(questionIndex) {
			this.questionIndex = questionIndex
		},

		setPage(page) {
			this.page = page
		},

		setCurrentQuestionInformation() {
			this.currentQuestion = this.questionList[this.questionIndex]
		},

		setPlayerList(playerList) {
			this.playerList = playerList;
		},

		setHistoryID(historyID) {
			this.historyID = historyID
		}
	},
})
