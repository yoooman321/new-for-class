<template>
	<div class="teacher-answer-question-page">
		<div class="answer-question__question-part">{{ questionTitle }}</div>

		<component :is="answerTypeComponent"></component>
		<!-- <audio
      ref="audio"
      autoplay
      loop
    >
    <source  src="@/assets/audio/bgm.mp3" type="audio/mpeg">
    </audio> -->
	</div>
</template>

<script>
import { useTeacherGameStore } from '@/stores/teacherGame'
import { ref } from 'vue'
import OptionsAnswer from '@/components/teacher/game/OptionsAnswer.vue'
import WordCloudAnswer from '@/components/teacher/game/WordCloudAnswer.vue'
import music from '@/assets/audio/bgm.mp3'

export default {
	components: {
		OptionsAnswer,
		WordCloudAnswer,
	},

	setup() {
		// store
		const { currentQuestion } = useTeacherGameStore()

		const answerTypeComponent = ref('')

		switch (currentQuestion.answerType) {
			case 'singleAnswer':
			case 'statistics':
				answerTypeComponent.value = 'OptionsAnswer'
				break
			case 'shortAnswer':
				answerTypeComponent.value = 'WordCloudAnswer'
				break
			default:
				break
		}
		// const audio = ref(null);
		// const aaa = ref(null);
		// onMounted(() => {
		//   console.log(aaa.value);
		//   setTimeout(() => {

		//     aaa.value.click();
		//   }, 1000)
		//   //@ts-ignore
		// });

		// const test = () => {
		//   console.log('jjjj');

		//   audio.value.play()
		// }

		// return {
		//   audio,test,aaa
		// };

		return { questionTitle: currentQuestion.questionTitle, answerTypeComponent }
	},
}
</script>

<style lang="scss">
.teacher-answer-question-page {
	display: flex;
	flex-direction: column;

	height: 100vh;
	box-sizing: border-box;
	overflow: hidden;
}
</style>
