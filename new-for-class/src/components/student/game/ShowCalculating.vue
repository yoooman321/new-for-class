<template>
  	<div class="student-show-calculating">
		<div class="text fw-600 fz-20">成績計算中...</div>
		<div class="load">
			<div class="load-dot load-dot--one"></div>
			<div class="load-dot load-dot--two"></div>
			<div class="load-dot load-dot--three"></div>
		</div>
	</div>
</template>

<style lang="scss">
.student-show-calculating {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	height: 100%;

	.text {
		padding-bottom: 20px;
		color: #0b132b;
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
		background-color: #0b132b;

		&--two {
			animation-delay: 0.4s;
		}

		&--three {
			animation-delay: 0.8s;
		}
	}

	@keyframes loading {
		to {
			transform: translateY(-25px);

			opacity: 0.3;
		}
	}
}
</style>
