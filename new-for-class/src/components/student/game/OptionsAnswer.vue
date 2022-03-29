<template>
	<div class="student-options-answer">
		<template
			v-for="(option, index) in options"
			:key="`student-option-${index}`"
		>
			<div
				:class="[
					`option bgc-option-${index + 1}`,
					{
						'option--active': index === playerAnswer,
					},
				]"
				@click="chooseAnswer(index)"
			></div>
		</template>
	</div>

	<div v-if="isSentAnswer" class="student-loading">
		<div class="text c-fff fw-600">答案已送出，等待解答。</div>
	</div>
</template>

<script>
import { inject, onBeforeMount, ref } from 'vue'
import { useStudentGameStore } from '@/stores/studentGame'
import { storeToRefs } from 'pinia'

export default {
	setup() {
		const questionIndex = inject('questionIndex')

		const playerAnswer = ref('')

		const store = useStudentGameStore()
		const { questionList, playerInformation, isSentAnswer } = storeToRefs(store)
		const { setPlayerAnswer, setIsSentAnswer } = useStudentGameStore()

		const { options } = questionList.value[questionIndex.value]

		const chooseAnswer = (answer) => {
			playerAnswer.value = answer
			setPlayerAnswer(answer)
		}

		onBeforeMount(() => {
			const hasAnswerThisQuestion =
				questionIndex.value === playerInformation.value.questionIndex

			if (hasAnswerThisQuestion) {
				setIsSentAnswer(true)
			}
		})

		return {
			playerInformation,
			options,
			isSentAnswer,
			chooseAnswer,
			playerAnswer,
		}
	},
}
</script>

<style lang="scss">
.student-options-answer {
	display: flex;
	flex-wrap: wrap;

	height: 100%;
	width: 100%;
	flex-grow: 1;


	.option {
		border: 1px solid #fff;
		width: 50%;
		height: 50%;
		box-sizing: border-box;

		&--active {
			opacity: 0.6;
			border: 3px outset #805b0c;
		}
	}
}

.student-loading {
	position: fixed;
	z-index: 1;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: rgba(0, 0, 0, 0.7);

	.text {
		max-width: 200px;

		text-align: center;
	}
}
</style>
