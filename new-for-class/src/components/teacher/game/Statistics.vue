<template>
	<div class="statistics">
		<div class="statistics-inner">
			<div
				class="statistics__option-list"
				v-for="(option, index) in optionList"
				:key="`${option}-graphic`"
			>
				<div class="statistics__graphic-list">
					<div class="statistics__amount">{{ testObj[option] }}</div>
					<div
						:class="`graphic bgc-option-${index + 1}`"
						:style="{
							height: `${(testObj[option] / totalOptionAmount) * 100}%`,
						}"
					></div>
				</div>
				<div class="statistics__title-list">
					<div class="title">{{ option }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	setup() {
		const optionList = ['A', 'B', 'C', 'D']
		const testData = [
			'A',
			'B',
			'B',
			'C',
			'D',
			'A',
			'B',
			'C',
			'D',
			'A',
			'B',
			'B',
			'C',
			'D',
			'A',
			'B',
			'C',
			'D',
			'A',
			'B',
			'B',
			'C',
			'D',
			'A',
			'B',
			'C',
			'D',
			'A',
			'B',
			'B',
			'C',
			'D',
			'A',
			'B',
			'C',
			'D',
			'A',
			'B',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'D',
			'A',
			'B',
			'B',
			'B',
			'D',
			'A',
			'B',
			'C',
			'D',
		]

		const getAmountByOption = (option) => {
			const optionList = testData.filter((data) => option === data)
			return optionList.length
		}

		let testObj = {
			A: getAmountByOption('A'),
			B: getAmountByOption('B'),
			C: getAmountByOption('C'),
			D: getAmountByOption('D'),
		}

		console.log('aa', testObj)

		return { testObj, totalOptionAmount: testData.length, optionList }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/game/_statistics.scss';
</style>
