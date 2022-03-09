<template>
	<teleport to="body">
		<div class="confirm-dialog">
			<div class="confirm-dialog__title fw-600">
				<img src="@/assets/images/popup/icon/warning.svg" />
				<span>Warning!</span>
			</div>

			<div class="confirm-dialog__content c-text-main">
				<slot></slot>

				<div class="buttons">
					<div class="button cursor-pointer c-fff button--correct">確定</div>
					<div class="button cursor-pointer c-fff button--cancel">取消</div>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
body .confirm-dialog {
  position: fixed;
  top: 50%;
  left: 50%;

  width: 50%;
  margin-top: -25%;
  margin-left: -25%;
  padding: 20px 40px;

  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    padding-top: 10px;

    text-align: center;

    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;

      .button {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 40px;
        padding: 0 20px;

        border-radius: 10px;
        margin: 0 10px;

        &--correct {
          background-color: #1976d2;
        }

        &--cancel {
          background-color: #F2C037;
        }
      }
    }
  }
}

</style>
