<template>
	<div class="teacher-answer-question-page">
		<div class="answer-question__question-part">{{questionTitle}}</div>

		<OptionsAnswer />

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
import { onMounted, ref } from 'vue'
import OptionsAnswer from '@/components/teacher/game/OptionsAnswer.vue'
import music from '@/assets/audio/bgm.mp3'

export default {
	components: {
		OptionsAnswer,
	},

	setup() {
		// store
		const { currentQuestion } = useTeacherGameStore()

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

		return { questionTitle: currentQuestion.questionTitle }
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
