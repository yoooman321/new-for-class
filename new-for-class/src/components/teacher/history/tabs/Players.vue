<template>
	<div class="history-players">
		<table class="history-players-table">
			<tr class="table__title-tr">
				<th class="table__title">學生名稱</th>
				<th class="table__title">答對率</th>
				<th class="table__title">未答題數</th>
				<th class="table__title">分數</th>
			</tr>

			<tr
				:key="player.playerName"
				v-for="player in testData"
				class="table__content-tr cursor-pointer"
			>
				<td class="table__content">{{ player.playerName }}</td>
				<td class="table__content"><CorrectPercentage /></td>
				<td class="table__content">{{ player.unanswerCount }}</td>
				<td class="table__content">{{ player.score }}</td>
			</tr>
		</table>
	</div>

  <PlayerDetail />
</template>

<script>
import CorrectPercentage from '@/components/teacher/history/CorrectPercentage.vue'
import PlayerDetail from '@/components/popup/PlayerDetail.vue'
export default {
	components: {
		CorrectPercentage,
    PlayerDetail,
	},
	setup() {
		const testData = [
			{
				playerName: 'test 1',
				correctPercentage: '50',
				score: '5',
				unanswerCount: '3',
				answers: [
					{
						answer: 'A',
						correct: true,
						score: '1',
					},
					{
						answer: 'B',
						correct: false,
						score: '0',
					},
				],
			},
		]

		const questionTestData = [
			{ questionTitle: 'Q1', type: 'single', answer: 'A' },
			{ questionTitle: 'Q2', type: 'single', answer: 'A' },
		]

		return { testData, questionTestData }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/history/_players.scss';
</style>