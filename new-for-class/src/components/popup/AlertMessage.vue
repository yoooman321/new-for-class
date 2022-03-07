<template>
	<div class="alert-message-wrapper">
		<div class="alert-message__title">
			<img src="@/assets/images/popup/icon/warning.svg" />
			<span>Warning!</span>
		</div>

		<div class="alert-message__content c-text-main">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss">
.alert-message {
  &-wrapper {
    position: fixed;
    top: -300px;;

    padding: 20px 40px;

    border-radius: 10px;
    background-color: #fff;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.8);

    animation: slideIn 3s 1;
  }


  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    padding-top: 10px;

    text-align: center;
  }

  @keyframes slideIn {
    0%,100% {
      top: -300px;
    }
    20%,80% {
      top: 10px;
    }
  }
}

</style>
