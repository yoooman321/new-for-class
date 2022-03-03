<template>
  <div class="enter-game">
    <div class="enter-game__header">
      <img src="@/assets/images/student/welcome.png" >
    </div>

    <div class="enter-game__content">
      <Form>
        <div class="input-wrapper">
          <div class="input__title fz-20">請輸入您的暱稱(最多六個字)</div>
          <Field
					class="input__field"
					name="playerName"
					type="text"
				/>
        </div>

        <div class="submit-button fz-16 c-fff cursor-pointer">
          進入遊戲
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field } from 'vee-validate'
export default {
  components: {
    Form,
		Field,
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/components/student/_enterGame.scss';
</style>
