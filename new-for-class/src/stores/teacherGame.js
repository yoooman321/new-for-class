import { defineStore } from 'pinia'

export const useTeacherGameStore = defineStore('teacherGame', {
	state: () => {
		return {
			questionList: [],
			questionIndex: 0,
			page: '',
			currentQuestion: {}
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
	},
})
