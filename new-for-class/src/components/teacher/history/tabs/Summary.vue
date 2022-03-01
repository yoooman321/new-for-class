<template>
	<div class="summary">
		<div class="brief-information">
			<div class="card card--correct-percentage">
				<div class="card__title">答對率</div>
				<div class="card__content">
          <CorrectPercentage />
        </div>
			</div>

			<div class="card card--student-amount">
				<div class="card__title">學生人數</div>
				<div class="card__content">
					<span class="value fw-600 fz-20">10</span>
					<span class="unit fz-14">人</span>
				</div>
			</div>

			<div class="card card--question-amount">
				<div class="card__title">問題總數</div>
				<div class="card__content">
					<span class="value fw-600 fz-20">20</span>
					<span class="unit fz-14">題</span>
				</div>
			</div>
		</div>

		<div class="card card--unfinish-student">
			<div class="card__title">有漏答題的學生</div>
			<div class="card__content">
				<table class="table">
					<tr class="table__title-tr">
						<th class="table__title fw-600">學生名稱</th>
						<th class="table__title fw-600">漏答題數</th>
					</tr>

					<tr class="table__content-tr">
						<td class="table__content">學生1</td>
						<td class="table__content">3</td>
					</tr>
					<tr class="table__content-tr">
						<td class="table__content">學生1</td>
						<td class="table__content">3</td>
					</tr>
					<tr class="table__content-tr">
						<td class="table__content">學生1</td>
						<td class="table__content">3</td>
					</tr>
					<tr class="table__content-tr">
						<td class="table__content">學生1</td>
						<td class="table__content">3</td>
					</tr>
					<tr class="table__content-tr">
						<td class="table__content">學生1</td>
						<td class="table__content">3</td>
					</tr>
					<tr class="table__content-tr">
						<td class="table__content">學生1</td>
						<td class="table__content">3</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import CorrectPercentage from '@/components/teacher/history/CorrectPercentage.vue'
export default {
  components: {
    CorrectPercentage
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/history/_summary.scss';
</style>
