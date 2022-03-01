<template>
	<div class="question-detail-wrapper">
		<div class="question-detail-container">
			<div class="question-detail__header">
				<div class="question-name">
					<div class="question-name__text">
						<span class="fw-600 fz-24"> Question 1:</span>
						<span>
							{{ questionTestData.questionTitle }}
						</span>
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

			<div class="question-detail__content">
				<div class="options">
					<div class="option">
						<div class="option__text">Option 1</div>
						<div class="option__correct">
							<img src="@/assets/images/popup/icon/correct.svg" alt="" />
						</div>
            <div class="option__progress-wrapper">
              <div class="option__progress"></div>
            </div>
            <div class="option__amount">1</div>
					</div>
					<div class="option">
						<div class="option__text">Option 1</div>
						<div class="option__correct">
							<img src="@/assets/images/popup/icon/correct.svg" alt="" />
						</div>
            <div class="option__progress-wrapper">
              <div class="option__progress"></div>
            </div>
            <div class="option__amount">1</div>
					</div>
					<div class="option">
						<div class="option__text">Option 1</div>
						<div class="option__correct">
							<img src="@/assets/images/popup/icon/correct.svg" alt="" />
						</div>
            <div class="option__progress-wrapper">
              <div class="option__progress"></div>
            </div>
            <div class="option__amount">2</div>
					</div>
					<div class="option">
						<div class="option__text">Option 1</div>
						<div class="option__correct">
							<img src="@/assets/images/popup/icon/correct.svg" alt="" />
						</div>
            <div class="option__progress-wrapper">
              <div class="option__progress"></div>
            </div>
            <div class="option__amount">3</div>
					</div>
					<div class="option">
						<div class="option__text">No answer</div>
						<div class="option__correct">
							<img src="@/assets/images/popup/icon/correct.svg" alt="" />
						</div>
            <div class="option__progress-wrapper">
              <div class="option__progress"></div>
            </div>
            <div class="option__amount">4</div>
					</div>
				</div>

        <div class="informations">
          <div class="information">秒數限制: 20秒</div>
          <div class="information">答對率 50%</div>
          <div class="information">學生答題數 2 of 2</div>
        </div>
				<div class="question__detail-table-wrapper">
					<table class="question__detail-table">
						<tr class="table__title-tr">
							<th class="table__title">學生名稱</th>
							<th class="table__title">學生回答</th>
							<th class="table__title">對錯</th>
						</tr>

						<tr
							class="table__content-tr"
						>
							<td class="table__content">test2</td>
							<td class="table__content">a1</td>
							<td class="table__content">
								<img
									v-if="true"
									src="@/assets/images/popup/icon/correct.svg"
									alt=""
								/>
								<img v-else src="@/assets/images/popup/icon/error.svg" alt="" />
							</td>
						</tr>
            		<tr
							class="table__content-tr"
						>
							<td class="table__content">test2</td>
							<td class="table__content">a1</td>
							<td class="table__content">
								<img
									v-if="true"
									src="@/assets/images/popup/icon/correct.svg"
									alt=""
								/>
								<img v-else src="@/assets/images/popup/icon/error.svg" alt="" />
							</td>
						</tr>
            		<tr
							class="table__content-tr"
						>
							<td class="table__content">test2</td>
							<td class="table__content">a1</td>
							<td class="table__content">
								<img
									v-if="true"
									src="@/assets/images/popup/icon/correct.svg"
									alt=""
								/>
								<img v-else src="@/assets/images/popup/icon/error.svg" alt="" />
							</td>
						</tr>		<tr
							class="table__content-tr"
						>
							<td class="table__content">test2</td>
							<td class="table__content">a1</td>
							<td class="table__content">
								<img
									v-if="true"
									src="@/assets/images/popup/icon/correct.svg"
									alt=""
								/>
								<img v-else src="@/assets/images/popup/icon/error.svg" alt="" />
							</td>
						</tr>		<tr
							class="table__content-tr"
						>
							<td class="table__content">test2</td>
							<td class="table__content">a1</td>
							<td class="table__content">
								<img
									v-if="true"
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

		const questionTestData = {
			questionTitle: 'Q1',
			type: 'single',
			answer: 'A',
		}

		return { testData, questionTestData }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/popup/_questionDetail.scss';
</style>
