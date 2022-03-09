import { defineStore } from 'pinia'

export const useTeacherGameStore = defineStore('teacherGame', {
	state: () => {
		return {
			gameExamData: {},
			currentQuestionData: {},
		}
	},

	actions: {
		setGameExamData(examData) {
			this.gameExamData = examData
		},

		setCurrentQuestionData(questionIndex) {
			const currentQuestionData = JSON.parse(
				JSON.stringify(this.gameExamData[questionIndex])
			)

			currentQuestionData.questionIndex = questionIndex
			this.currentQuestionData = currentQuestionData
		},
	},
})
