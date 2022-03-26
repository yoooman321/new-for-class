<template>
	<div class="loading-page">
		<div class="load">
			<div class="load-dot load-dot--one"></div>
			<div class="load-dot load-dot--two"></div>
			<div class="load-dot load-dot--three"></div>
		</div>
	</div>
</template>

<style lang="scss">
.loading-page {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	background-color: rgba(0, 0, 0, 0.8);

	.load {
		position: absolute;
		top: 50%;
		left: 50%;

		display: flex;
		align-items: center;
		justify-content: center;

		transform: translate(-50%, -50%);
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
