<template>
	<div class="home-page">
		<h2 class="home__title fz-36 c-text-main">歡迎!</h2>
		<h3 class="home__subtitle fz-30 c-text-main">要做什麼呢?</h3>

		<div class="home__movement-list">
			<router-link :to="{ name: 'NewExam' }">
				<div class="home__movement home__movement--add c-fff fw-600">新增考題</div>
			</router-link>

			<router-link :to="{ name: 'OldExam' }">
				<div class="home__movement home__movement--old c-fff fw-600">選擇考題玩</div>
			</router-link>

			<router-link :to="{ name: 'History' }">
				<div class="home__movement home__movement--history c-fff fw-600">
					查看歷史成績
				</div>
			</router-link>
		</div>
	</div>
</template>
