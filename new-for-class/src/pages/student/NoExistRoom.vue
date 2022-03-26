<template>
	<div class="no-exist-room">
		<div class="c-text-main fw-600 fz-24">房間不存在，請重新輸入房間編號</div>

		<router-link to="/room">
			<div class="button bgc-main c-fff">返回</div>
		</router-link>
	</div>
</template>

<style lang="scss">
.no-exist-room {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	box-sizing: border-box;
	width: 100vw;
	height: 100vh;
	padding: 0 10px;

	text-align: center;

	background: linear-gradient(45deg, #80c2af, #30c5ff);

	a {
		text-decoration: initial;
	}

	.button {
		width: 150px;
		margin: 40px auto 0;
		padding: 10px 0;

		text-align: center;

		border-radius: 5px;
	}
}
</style>
