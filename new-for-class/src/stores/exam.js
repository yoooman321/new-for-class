import { defineStore } from 'pinia'

export const useExamStore = defineStore('exam', {
	state: () => {
		return {
			examData: {
				examTitle: '',
				questionList: [
					{
						limitedTime: 20,
						answerType: 'singleAnswer',
						questionTitle: '',
						options: [
							{
								optionValue: '',
								isAnswer: false,
							},
							{ optionValue: '', isAnswer: false },
							{ optionValue: '', isAnswer: false },
							{ optionValue: '', isAnswer: false },
						],
					},
				],
			},

			oldExamList: [],
		}
	},

	actions: {
		setQuestionData(index, propertyName, propertyValue) {
			this.examData.questionList[index][propertyName] = propertyValue

			if (propertyName === 'answerType') {
				const singleAnswerDefaultOptions = [
					{
						optionValue: '',
						isAnswer: false,
					},
					{ optionValue: '', isAnswer: false },
					{ optionValue: '', isAnswer: false },
					{ optionValue: '', isAnswer: false },
				]

				const statisticsDefaultOptions = [
					{
						optionValue: '',
						isAnswer: true,
					},
					{ optionValue: '', isAnswer: true },
					{ optionValue: '', isAnswer: true },
					{ optionValue: '', isAnswer: true },
				]

				switch (propertyValue) {
					case 'shortAnswer':
						this.setQuestionData(index, 'options', null)
						break

					case 'statistics':
						this.setQuestionData(index, 'options', statisticsDefaultOptions)
						break

					case 'singleAnswer':
						this.setQuestionData(index, 'options', singleAnswerDefaultOptions)
						break

					default:
						break
				}
			}
		},

		setExamTitle(title) {
			this.examData.examTitle = title
		},

		setOptionsData(questionIndex, optionIndex, propertyName, propertyValue) {
			this.examData.questionList[questionIndex].options[optionIndex][
				propertyName
			] = propertyValue

			if (propertyName === 'isAnswer' && propertyValue) {
				this.changeCorrectAnswerInSingleAnswer(questionIndex, optionIndex)
			}
		},

		changeCorrectAnswerInSingleAnswer(questionIndex, correctIndex) {
			this.examData.questionList[questionIndex].options =
				this.examData.questionList[questionIndex].options.map(
					(option, index) => {
						return { ...option, isAnswer: correctIndex === index }
					}
				)
		},

		deleteQuestion(questionIndex) {
			this.examData.questionList.splice(questionIndex, 1)
		},

		addQuestion() {
			const defaultQuestionData = {
				limitedTime: 20,
				answerType: 'singleAnswer',
				questionTitle: '',
				options: [
					{
						optionValue: '',
						isAnswer: false,
					},
					{ optionValue: '', isAnswer: false },
					{ optionValue: '', isAnswer: false },
					{ optionValue: '', isAnswer: false },
				],
			}
			this.examData.questionList.push(defaultQuestionData)
		},

		cleanExamData() {
			this.examData = {
				examTitle: '',
				questionList: [
					{
						limitedTime: 20,
						answerType: 'singleAnswer',
						questionTitle: '',
						options: [
							{
								optionValue: '',
								isAnswer: false,
							},
							{ optionValue: '', isAnswer: false },
							{ optionValue: '', isAnswer: false },
							{ optionValue: '', isAnswer: false },
						],
					},
				],
			}
		},

		// old Exam
		setOldExamList(examList) {
			this.oldExamList = examList
		},

		// edit Exam
		getExamDataInOldExamList(targetExamId) {
			const targetExamData = this.oldExamList.find(
				({ examId }) => examId === targetExamId
			)

			return targetExamData
		},

		setTargetExamDataInExamData(targetExamData) {
			this.examData = JSON.parse(JSON.stringify(targetExamData))
		},
	},
})
