<template>
	<div class="show-calculating">
		<div class="text c-fff">排行計算中...</div>
		<div class="load">
			<div class="load-dot load-dot--one"></div>
			<div class="load-dot load-dot--two"></div>
			<div class="load-dot load-dot--three"></div>
		</div>
	</div>
</template>

<style lang="scss">
.show-calculating {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	height: 100%;

	.text {
		padding-bottom: 20px;
	}
	.load {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.load-dot {
		width: 25px;
		height: 25px;
		margin-top: calc(50px - 12.5px);
		margin-left: 5px;

		animation-name: loading;
		animation-duration: 1.2s;
		animation-iteration-count: infinite;
		animation-direction: alternate;

		border-radius: 50%;
		background-color: #c5d5e4;

		&--two {
			animation-delay: 0.4s;
		}

		&--three {
			animation-delay: 0.8s;
		}
	}
}
</style>
