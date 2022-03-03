<template>
	<div class="student-options-answer">
		<template v-for="index in 4" :key="`student-option-${index}`">
			<div
				:class="[
					`option bgc-option-${index}`,
					{
						'option--active': index === answerIndex,
					},
				]"
				@click="chooseAnswer(index)"
			></div>
		</template>
	</div>
</template>

<script>
import { ref } from 'vue'
export default {
	setup() {
		const answerIndex = ref()
		const chooseAnswer = (index) => {
			answerIndex.value = index
		}

		return { answerIndex, chooseAnswer }
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

</style>
