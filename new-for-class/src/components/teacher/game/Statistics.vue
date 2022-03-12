<template>
	<div class="statistics">
		<div class="statistics-inner">
			<div
				v-for="(answerAmount, optionIndex, index) in statisitcsData"
				:key="`${optionIndex}-graphic`"
				class="statistics__option-list"
			>
				<div class="statistics__graphic-list">
					<div class="statistics__amount">{{ answerAmount }}</div>
					<div
						:class="`graphic bgc-option-${index + 1}`"
						:style="{
							height: `${(answerAmount / totalAnswerAmount) * 100}%`,
						}"
					></div>
				</div>
				<div class="statistics__title-list">
					<div class="title">{{ optionTitleList[index] }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useTeacherGameStore } from '@/stores/teacherGame'

export default {
	setup() {
		// store
		const store = useTeacherGameStore()
		const { currentQuestion } = useTeacherGameStore()
		const { playerList } = storeToRefs(store)
		const { options } = currentQuestion

		const optionTitleList = ['A', 'B', 'C', 'D']

		const answerList = playerList.value.map(({ playerAnswer }) => {
			return playerAnswer
		})

		const statisitcsData = {}

		options.forEach((_, index) => {
			const answerListMatchIndex = answerList.filter(
				(answer) => answer === index
			)
			statisitcsData[index] = answerListMatchIndex.length
		})

		return {
			statisitcsData,
			totalAnswerAmount: answerList.length,
			optionTitleList,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/game/_statistics.scss';
</style>
