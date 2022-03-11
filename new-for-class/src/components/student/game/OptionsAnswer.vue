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
						'option--active': index === playerInformation.playerAnswer,
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
import { ref, inject } from 'vue'
import { useStudentGameStore } from '@/stores/studentGame'
import { storeToRefs } from 'pinia'

export default {
	setup() {
		const questionIndex = inject('questionIndex')

		const store = useStudentGameStore()
		const { questionList, playerInformation, isSentAnswer } = storeToRefs(store)
		const { setPlayerAnswer } = useStudentGameStore()

		const { options } = questionList.value[questionIndex.value]

		const chooseAnswer = (playerAnswer) => {
			setPlayerAnswer(playerAnswer)
		}

		return { playerInformation, options, isSentAnswer, chooseAnswer }
	},
}
</script>

<style lang="scss">
.student-options-answer {
  display: grid;

  height: 100%;

  grid-template-columns: repeat(1, 1fr 1fr);

  .option {
    border: 1px solid #fff;

    &--active {
      opacity: 0.7;
      border: 1px outset #805b0c;
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
