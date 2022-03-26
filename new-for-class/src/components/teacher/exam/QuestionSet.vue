<template>
	<div class="question-set">
		<div class="question-part">
			<div class="question-index">Question {{ selectedQuestionIndex + 1 }}</div>

			<div class="question-input">
				<div class="input__title fz-18 c-text-main fw-500">問題:</div>
				<input
					placeholder="請輸入問題"
					class="input__field"
					type="text"
					v-model="questionTitle"
				/>
			</div>

			<div v-if="answerType === 'singleAnswer'" class="show-result-page">
				<input type="checkbox" v-model="showResultPage" />
				<label class="text fw-600">是否顯示目前戰況?</label>
			</div>
		</div>

		<div class="answer-part">
			<div class="title fz-24 fw-600 c-main">答案區</div>
			<div class="answer-configurations">
				<div class="configuration configuration__type">
					<div class="input__title">答案類型:</div>
					<select name="answerType" v-model="answerType" class="input__field">
						<option value="singleAnswer">單選題</option>
						<option value="shortAnswer">問答題</option>
						<option value="statistics">統計題</option>
					</select>
				</div>
				<div class="configuration configuration__time">
					<div class="input__title">答題秒數</div>
					<input class="input__field" type="number" v-model="limitedTime" />
				</div>
			</div>

			<div class="answer-options" v-if="answerType !== 'shortAnswer'">
				<div class="input__title">
					<span>答案選項 </span>
					<span v-if="answerType === 'singleAnswer'">(請勾選正確答案)</span>
				</div>

				<div class="options">
					<template
						v-for="(option, index) in examData.questionList[
							selectedQuestionIndex
						].options"
						:key="`${selectedQuestionIndex}-option-${index}`"
					>
						<div class="input-wrapper">
							<template v-if="answerType === 'singleAnswer'">
								<input
									type="checkbox"
									class="input__checkbox"
									:checked="option.isAnswer"
								/>
								<span
									@click="changeOptionIsAnswer(index, !option.isAnswer)"
									class="real-checkmark cursor-pointer"
								></span>
							</template>
							<input
								:value="option.optionValue"
								class="input__field"
								type="text"
								@input="changeOptionValue(index, $event.target.value)"
							/>
							<div class="delete-button cursor-pointer">
								<img src="@/assets/images/teacher/icon/delete.svg" />
							</div>
						</div>
					</template>

					<div
						v-if="
							examData.questionList[selectedQuestionIndex].options.length < 4
						"
						class="add-option-button"
					>
						新增選項
					</div>
				</div>
			</div>

			<div class="short-answer" v-else>不須新增任何選項</div>
		</div>
	</div>
</template>

<script>
import { useExamStore } from '@/stores/exam'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export default {
	setup() {
		const store = useExamStore()
		const { selectedQuestionIndex, examData } = storeToRefs(store)
		const { setQuestionData } = useExamStore()

		const questionTitle = computed({
			get: () =>
				examData.value.questionList[selectedQuestionIndex.value].questionTitle,
			set: (value) => {
				setQuestionData(selectedQuestionIndex.value, 'questionTitle', value)
			},
		})

		const answerType = computed({
			get: () =>
				examData.value.questionList[selectedQuestionIndex.value].answerType,
			set: (value) => {
				setQuestionData(selectedQuestionIndex.value, 'answerType', value)
			},
		})

		const showResultPage = computed({
			get: () =>
				examData.value.questionList[selectedQuestionIndex.value].showResultPage,
			set: (value) => {
				setQuestionData(selectedQuestionIndex.value, 'showResultPage', value)
			},
		})

		const limitedTime = computed({
			get: () =>
				examData.value.questionList[selectedQuestionIndex.value].limitedTime,
			set: (value) => {
				setQuestionData(selectedQuestionIndex.value, 'limitedTime', value)
			},
		})

		const changeOptionValue = (optionIndex, value) => {
			setOptionsData(
				selectedQuestionIndex.value,
				optionIndex,
				'optionValue',
				value
			)
		}

		const changeOptionIsAnswer = (optionIndex, value) => {
			setOptionsData(
				selectedQuestionIndex.value,
				optionIndex,
				'isAnswer',
				value
			)
		}

		return {
			selectedQuestionIndex,
			questionTitle,
			answerType,
			showResultPage,
			limitedTime,
			examData,
			changeOptionValue,
			changeOptionIsAnswer,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/exam/_question-set.scss';
</style>
