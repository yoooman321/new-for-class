<template>
	<div class="player-detail-wrapper">
		<div class="player-detail-container">
			<div class="player-detail__header">
				<div class="player-name">
					<img
						class="player-name__icon"
						src="@/assets/images/popup/icon/person.svg"
					/>
					<div class="player-name__text fw-600 fz-24">
						{{ testData.playerName }}
					</div>
				</div>

				<div class="pagination">
					<div class="arrow-wrapper cursor-pointer">
						<img
							class="arrow__icon"
							src="@/assets/images/popup/icon/left-arrow.svg"
						/>
					</div>
					<div class="pages">1 of 2</div>
					<div class="arrow-wrapper cursor-pointer">
						<img
							class="arrow__icon"
							src="@/assets/images/popup/icon/right-arrow.svg"
						/>
					</div>
				</div>

				<div class="close-button cursor-pointer">
					<img class="close__icon" src="@/assets/images/popup/icon/close.svg" />
				</div>
			</div>

			<div class="player-detail__content">
				<div class="brief-information">
					<div class="card card--correct-percentage">
						<div class="card__title">答對率</div>
						<div class="card__content">
							<CorrectPercentage />
						</div>
					</div>

					<div class="card card--correct-percentage">
						<div class="card__title">答題數</div>
						<div class="card__content">1 of 2</div>
					</div>
				</div>
				<div class="player__detail-table-wrapper">
					<table class="player__detail-table">
						<tr class="table__title-tr">
							<th class="table__title">問題</th>
							<th class="table__title">問題類型</th>
							<th class="table__title">答案</th>
							<th class="table__title">對錯</th>
						</tr>

						<tr
							:key="question.questionTitle"
							v-for="(question, index) in questionTestData"
							class="table__content-tr"
						>
							<!-- TODO: 問題index要跟answer quesiontIndex一樣 -->
							<td class="table__content">{{ question.questionTitle }}</td>
							<td class="table__content">{{ question.type }}</td>
							<td class="table__content">
								{{ testData.answers[index].answer }}
							</td>
							<td class="table__content">
								<img
									v-if="testData.answers[index].correct"
									src="@/assets/images/popup/icon/correct.svg"
									alt=""
								/>
								<img v-else src="@/assets/images/popup/icon/error.svg" alt="" />
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CorrectPercentage from '@/components/teacher/history/CorrectPercentage.vue'
export default {
	components: {
		CorrectPercentage,
	},
	setup() {
		const testData = {
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
		}

		const questionTestData = [
			{ questionTitle: 'Q1', type: 'single', answer: 'A' },
			{ questionTitle: 'Q2', type: 'single', answer: 'A' },
		]

		return { testData, questionTestData }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/popup/_playerDetail.scss';
</style>
