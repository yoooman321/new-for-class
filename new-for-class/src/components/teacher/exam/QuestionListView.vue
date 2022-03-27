<template>
	<div class="question-list-view">
		<draggable
			v-model="questionList"
			item-key="questionTitle"
			@change="changeQuestionSetIndex"
		>
			<template #item="{ element, index }">
				<div
					:class="[
						'question-card-wrapper',
						{ active: selectedQuestionIndex === index },
					]"
					@click="changeSelectedQuestionIndex(index)"
				>
					<div class="question-card__index">Quesiont {{ index + 1 }}</div>

					<div class="question-card">
						<div class="question-card__buttons">
							<div
								v-if="!checkIsValid(index)"
								class="question-card__button question-card__button--error"
							>
								<img src="@/assets/images/teacher/icon/error.svg" />
							</div>

							<div
								class="question-card__button question-card__button--delete"
								@click.stop="processDeleteQuestion(index)"
							>
								<img src="@/assets/images/teacher/icon/delete.svg" />
							</div>
						</div>

						<div
							:class="[
								'question-card-container fz-12 c-main-text',
								{ active: selectedQuestionIndex === index },
								{ invalid: !checkIsValid(index) },
							]"
						>
							{{ element.questionTitle }}
						</div>
					</div>
				</div>
			</template>
		</draggable>

		<div
			class="add-new-question cursor-pointer bgc-main"
			@click="processAddQuestion"
		>
			<img class="add-icon" src="@/assets/images/teacher/icon/add.svg" />
			<span class="add-text c-fff">新增問題</span>
		</div>
	</div>
</template>

<script>
import { useExamStore } from '@/stores/exam'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import draggable from 'vuedraggable'

export default {
	components: {
		draggable,
	},

	setup() {
		const store = useExamStore()
		const {
			changeSelectedQuestionIndex,
			addQuestion,
			deleteQuestion,
			updateList,
		} = useExamStore()
		const { examData, selectedQuestionIndex, validation } = storeToRefs(store)

		const questionList = computed({
			get: () => {
				return examData.value.questionList
			},
			set: (value) => {
				updateList(value)
			},
		})

		const dragging = ref(false)

		const processAddQuestion = () => {
			addQuestion()
			changeSelectedQuestionIndex(examData.value.questionList.length - 1)
		}

		const processDeleteQuestion = (index) => {
			if (examData.value.questionList.length === 1) {
				// 沒有辦法刪了
				return
			}

			if (index === examData.value.questionList.length - 1) {
				changeSelectedQuestionIndex(examData.value.questionList.length - 2)
				deleteQuestion(index)

				return
			}

			deleteQuestion(index)
		}

		const changeQuestionSetIndex = ({ moved }) => {
			changeSelectedQuestionIndex(moved.newIndex)
		}

		const checkIsValid = (index) => {
			let isValid = true
			Object.values(validation.value.questionList[index]).forEach((ele) => {
				if (ele.valid === false) {
					isValid = false
					return
				} else if (!ele.valid) {
					ele.forEach(({ valid }) => {
						if (!valid) {
							isValid = false
						}
					})
				}
			})

			return isValid
		}

		return {
			questionList,
			selectedQuestionIndex,
			dragging,
			checkIsValid,
			changeQuestionSetIndex,
			changeSelectedQuestionIndex,
			processAddQuestion,
			processDeleteQuestion,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/exam/_question-list-view.scss';
</style>
