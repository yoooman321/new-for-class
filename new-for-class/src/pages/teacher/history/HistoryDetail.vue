<template>
	<div class="history-detail">
		<div class="history-detail__title">
			<div class="title-card title">
				<div class="text fw-600">考題名稱</div>
				<div class="exam-name">{{ testData.examName }}</div>
			</div>

			<div class="title-card remark">
				<div class="text fw-600">備註</div>
				<div>{{ testData.remark }}</div>
			</div>
			<div class="title-card date">
				<div class="text fw-600">開始時間</div>
				<div>{{ testData.date }}</div>
			</div>
		</div>

			<div class="history-detail__tabs">
				<div class="history-detail__tab cursor-pointer">總覽</div>
				<div class="history-detail__tab cursor-pointer">玩家列表</div>
				<div class="history-detail__tab cursor-pointer">問題列表</div>
			</div>

		<div class="history-detail__content">


      <!-- <Summary></Summary> -->
			<!-- <Players></Players> -->
			<Questions></Questions>
		</div>
	</div>
</template>

<script>
import { reactive } from 'vue'
// import Summary from '@/components/teacher/history/tabs/Summary.vue'
// import Players from '@/components/teacher/history/tabs/Players.vue'
import Questions from '@/components/teacher/history/tabs/Questions.vue'
export default {
	components: {
		// Summary,
		// Players,
		Questions
	},

	setup() {
		const testData = reactive({
			examName: 'test',
			date: '2022/02/08',
			remark: 'this is remark',
		})

		return { testData }
	},
}
</script>
