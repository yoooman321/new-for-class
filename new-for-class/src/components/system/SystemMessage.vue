<template>
	<div class="system-message-wrapper">
		<div class="system-message">
			<div class="system-message__content">
				<img
					v-if="messageType === 'success'"
					src="@/assets/images/teacher/icon/check.svg"
				/>
				<img v-else src="@/assets/images/teacher/icon/error.svg" />
				<slot name="content"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		messageType: {
			type: String,
			default: 'success',
		},
	},
}
</script>

<style lang="scss">
.system-message {
	position: relative;

	width: 40%;
	height: 100px;
	margin: 0 auto;

	transform: translateY(-100px);
	animation: show-system-message 3s;

	border-radius: 10px;
	background-color: #fff;
	box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.5);

	&-wrapper {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	&__content {
		display: flex;
		align-items: center;
		justify-content: center;

		height: 100%;

		img {
			height: 24px;
		}
	}
}
</style>
