import { defineStore } from 'pinia'

export const useExamStore = defineStore('exam', {
	state: () => {
		return {
			examData: {
				examTitle: '',
				showRankingPage: false,
				questionList: [
					{
						limitedTime: 20,
						answerType: 'singleAnswer',
						questionTitle: '',
						showResultPage: false,
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

			selectedQuestionIndex: 0,
			oldExamList: [],

			validation: {
				examTitle: {
					touched: false,
					valid: false,
				},
				questionList: [
					{
						limitedTime: {
							touched: true,
							valid: true,
						},

						questionTitle: {
							touched: false,
							valid: false,
						},

						options: {
							valid: false,
						},

						optionList: [
							{
								touched: false,
								valid: false,
							},
							{
								touched: false,
								valid: false,
							},
							{
								touched: false,
								valid: false,
							},
							{
								touched: false,
								valid: false,
							},
						],
					},
				],
			},
		}
	},

	actions: {
		setQuestionData(index, propertyName, propertyValue) {
			this.examData.questionList[index][propertyName] = propertyValue

			if (propertyName !== 'answerType' && propertyName !== 'showResultPage') {
				this.validation.questionList[index][propertyName].touched = true
			}

			this.validateQuestionData()

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
						this.setQuestionData(index, 'showResultPage', false)
						this.validateOptions(index)

						break

					case 'statistics':
						this.setQuestionData(index, 'options', statisticsDefaultOptions)
						this.setQuestionData(index, 'showResultPage', false)
						this.validateOptions(index)
						break

					case 'singleAnswer':
						this.setQuestionData(index, 'options', singleAnswerDefaultOptions)
						this.validateOptions(index)
						break

					default:
						break
				}

				this.validateOptionListData(index)
			}
		},

		validateQuestionData() {
			this.examData.questionList.forEach((question, index) => {
				this.validation.questionList[index].questionTitle.valid =
					question.questionTitle.length !== 0
				this.validation.questionList[index].limitedTime.valid =
					question.limitedTime > 5
			})
		},

		setExamTitle(title) {
			this.examData.examTitle = title

			this.validation.examTitle.touched = true
			this.validation.examTitle.valid = title.length > 0
		},

		setExamShowRankingPage(booleanData) {
			this.examData.showRankingPage = booleanData
		},

		setOptionsData(questionIndex, optionIndex, propertyName, propertyValue) {
			this.examData.questionList[questionIndex].options[optionIndex][
				propertyName
			] = propertyValue

			this.validation.questionList[questionIndex].optionList[
				optionIndex
			].touched = true

			if (propertyName === 'isAnswer' && propertyValue) {
				this.changeCorrectAnswerInSingleAnswer(questionIndex, optionIndex)
			}
			this.validateOptionListData(questionIndex)
			this.validateOptions(questionIndex)
		},

		validateOptions(questionIndex) {
			if (
				this.examData.questionList[questionIndex].answerType === 'singleAnswer'
			) {
				const hasCorrectAnswer = this.examData.questionList[
					questionIndex
				].options.find(({ isAnswer }) => isAnswer === true)

				if (!hasCorrectAnswer) {
					this.validation.questionList[questionIndex].options.valid = false
					return
				}
			}

			this.validation.questionList[questionIndex].options.valid = true
		},

		validateOptionListData(questionIndex) {
			if (
				this.examData.questionList[questionIndex].answerType !== 'shortAnswer'
			) {
				this.examData.questionList[questionIndex].options.forEach(
					(option, index) => {
						this.validation.questionList[questionIndex].optionList[
							index
						].valid = option.optionValue.length !== 0
					}
				)
				return
			}

			this.validation.questionList[questionIndex].optionList.forEach(
				(_, index) => {
					this.validation.questionList[questionIndex].optionList[
						index
					].valid = true
				}
			)
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
			this.validation.questionList.splice(questionIndex, 1)
		},

		deleteOption(questionIndex, optionIndex) {
			this.examData.questionList[questionIndex].options.splice(optionIndex, 1)
			this.validation.questionList[questionIndex].optionList.splice(
				optionIndex,
				1
			)
		},

		addOption(questionIndex) {
			this.examData.questionList[questionIndex].options.push({
				optionValue: '',
				isAnswer: false,
			})
			this.validation.questionList[questionIndex].optionList.push({
				touched: false,
				valid: false,
			})
		},

		addQuestion() {
			const defaultQuestionData = {
				limitedTime: 20,
				answerType: 'singleAnswer',
				questionTitle: '',
				showResultPage: false,
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
			this.addValidation()
			this.examData.questionList.push(defaultQuestionData)
		},

		addValidation() {
			const defaultValidation = {
				limitedTime: {
					touched: true,
					valid: true,
				},

				questionTitle: {
					touched: false,
					valid: false,
				},

				options: {
					valid: false,
				},

				optionList: [
					{
						touched: false,
						valid: false,
					},
					{
						touched: false,
						valid: false,
					},
					{
						touched: false,
						valid: false,
					},
					{
						touched: false,
						valid: false,
					},
				],
			}

			this.validation.questionList.push(defaultValidation)
		},

		changeSelectedQuestionIndex(index) {
			this.selectedQuestionIndex = index
		},

		cleanExamData() {
			this.examData = {
				examTitle: '',
				showRankingPage: false,
				questionList: [
					{
						limitedTime: 20,
						answerType: 'singleAnswer',
						questionTitle: '',
						showResultPage: false,
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

		cleanValidationData() {
			this.validation = {
				examTitle: {
					touched: false,
					valid: false,
				},
				questionList: [
					{
						limitedTime: {
							touched: true,
							valid: true,
						},

						questionTitle: {
							touched: false,
							valid: false,
						},

						options: {
							valid: false,
						},

						optionList: [
							{
								touched: false,
								valid: false,
							},
							{
								touched: false,
								valid: false,
							},
							{
								touched: false,
								valid: false,
							},
							{
								touched: false,
								valid: false,
							},
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

		setValidation() {
			this.validation = {
				examTitle: {
					touched: true,
					valid: true,
				},
				questionList: [],
			}

			this.examData.questionList.forEach((question) => {
				let optionList = []
				if (!question.options) {
					optionList = [
						{
							touched: true,
							valid: true,
						},
						{
							touched: true,
							valid: true,
						},
						{
							touched: true,
							valid: true,
						},
						{
							touched: true,
							valid: true,
						},
					]
				} else {
					optionList = question.options.map(() => {
						return {
							touched: true,
							valid: true,
						}
					})
				}

				this.validation.questionList.push({
					limitedTime: {
						touched: true,
						valid: true,
					},

					questionTitle: {
						touched: true,
						valid: true,
					},

					options: {
						valid: true,
					},

					optionList: optionList,
				})
			})
		},

		updateList(questionList) {
			this.examData.questionList = questionList
		},
	},
})
