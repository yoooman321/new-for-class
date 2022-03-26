<template>
	<div class="answer-question__other-features">
		<div class="information-part">
			<AnsweredPlayerList class="answered-player-list-wrapper" />
			<div v-if="timesUp" class="times-up-part">
				<Statistics />
			</div>
		</div>

		<div class="empty-part"></div>
	</div>

	<div class="answer-question__options">
		<template v-for="(option, index) in options" :key="index">
			<div
				:class="[
					`option c-fff bgc-option-${index + 1}`,
					{
						'is-not-correct': !option.isAnswer && timesUp,
					},
				]"
			>
				<div class="option__symbol fz-24">{{ optionTitleList[index] }}</div>
				<div class="option__text">{{ option.optionValue }}</div>
			</div>
		</template>
	</div>
</template>

<script>
import AnsweredPlayerList from '@/components/teacher/game/AnsweredPlayerList.vue'
import Statistics from '@/components/teacher/game/StatisticsComponent.vue'

import { useTeacherGameStore } from '@/stores/teacherGame'

export default {
	components: {
		AnsweredPlayerList,
		Statistics,
	},

	props: {
		timesUp: {
			type: Boolean,
		}
	},

	setup() {
		// store
		const { currentQuestion } = useTeacherGameStore()
		const { options } = currentQuestion

		const optionTitleList = ['A', 'B', 'C', 'D']

		return {
			optionTitleList,
			options,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/game/_optionsAnswer.scss';
</style>
