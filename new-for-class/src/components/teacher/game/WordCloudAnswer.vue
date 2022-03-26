<template>
	<div class="word-cloud-answer">
		<div id="word-cloud-canvas" class="word-cloud-canvas"></div>

		<div class="empty-part"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'

import { useTeacherGameStore } from '@/stores/teacherGame'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'

export default {
	setup() {
		// store
		const store = useTeacherGameStore()
		const { playerList } = storeToRefs(store)

		// TODO: 命名要改
		watch(playerList, (count) => {
			const test = count.flatMap(({ playerAnswer }) => playerAnswer)

			const g = test.reduce((acc, cur) => {
				if (acc.length === 0) {
					return [
						{
							name: cur,
							value: 1,
						},
					]
				}

				const a = acc.findIndex(({ name }) => name === cur)
				if (a === -1) {
					return [...acc, { name: cur, value: 1 }]
				}
				acc[a].value += 1
				return acc
			}, [])

			chart.setOption({
				series: [
					{
						data: g,
					},
				],
			})
		})

		// chart
		let chart = null
		const chartTextColorList = [
			'#820263',
			'#D90368',
			'#EADEDA',
			'#2E294E',
			'#FFD400',
			'#000000',
			'#758BFD',
			'#FF8600',
			'#52796F',
			'#686963',
		]

		const initChart = () => {
			chart = echarts.init(document.getElementById('word-cloud-canvas'))

			chart.setOption({
				series: [
					{
						type: 'wordCloud',
						gridSize: 20,
						sizeRange: [30, 60],
						rotationRange: [0, 0],
						shape: 'rect',
						width: '100%',
						height: '100%',
						left: 'center',
						top: 'center',
						drawOutOfBound: false,
						layoutAnimation: true,
						textStyle: {
							fontWeight: 'bold',
							color: () => {
								const randomIndex = Math.round(Math.random() * 10)
								return chartTextColorList[randomIndex]
							},
						},
						data: [],
					},
				],
			})
		}

		onMounted(() => {
			initChart()
		})

		// return {
		// 	playerList,
		// }
	},
}
</script>

<style lang="scss">
.word-cloud-answer {
	display: flex;
	align-items: center;

	width: 100%;
	height: 100%;

	.word-cloud-canvas {
		flex-grow: 1;

		width: 100%;
		height: 100%;
	}

	.empty-part {
		flex-shrink: 0;

		width: 15%;
	}
}
</style>
