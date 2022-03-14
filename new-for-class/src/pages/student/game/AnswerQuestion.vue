<template>
	<div class="student-answer-question">
		<component :is="answerTypeComponent"></component>
	</div>
</template>

<script>
import OptionsAnswer from '@/components/student/game/OptionsAnswer.vue'
import WordCloudAnswer from '@/components/student/game/WordCloudAnswer.vue'

import { inject, ref } from 'vue'
import { useStudentGameStore } from '@/stores/studentGame'
import { storeToRefs } from 'pinia'
export default {
	components: {
		OptionsAnswer,
		WordCloudAnswer,
	},

	setup() {
		const questionIndex = inject('questionIndex')
		const store = useStudentGameStore()
		const { questionList } = storeToRefs(store)
		const answerType = questionList.value[questionIndex.value].answerType
		const answerTypeComponent = ref('')
		switch(answerType) {
			case 'singleAnswer':
			case 'statistics':
				answerTypeComponent.value = 'OptionsAnswer'
				break;
			case 'shortAnswer':
				answerTypeComponent.value = 'WordCloudAnswer'
				break;
			default:
				break;
		}

		return {answerTypeComponent}
	}
}
</script>

<style lang="scss">
.student-answer-question {
	height: 100%;
}
</style>
