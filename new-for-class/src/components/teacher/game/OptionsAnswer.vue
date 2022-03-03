<template>
	<div class="answer-question__other-features">
		<AnsweredPlayerList class="answered-player-list-wrapper" />
		<Timer class="timer-wrapper" />
    <div class="times-up-part">
      <Statistics />
      <div class="next-button fz-40 c-fff cursor-pointer">下一題</div>
    </div>
	</div>

	<div class="answer-question__options">
		<template v-for="(option, index) in optionList" :key="index">
			<div :class="`option c-fff bgc-option-${index + 1}`">
				<div class="option__symbol fz-24">{{ option }}</div>
				<div class="option__text">Option 1</div>
			</div>
		</template>
	</div>
</template>

<script>
import Timer from '@/components/teacher/game/Timer.vue'
import AnsweredPlayerList from '@/components/teacher/game/AnsweredPlayerList.vue'
import Statistics from '@/components/teacher/game/Statistics.vue'
export default {
    components: {
    Timer,
    AnsweredPlayerList,
    Statistics,
  },

  setup() {
    const optionList = ['A', 'B', 'C', 'D']

    return {optionList}
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/game/_optionsAnswer.scss';

</style>