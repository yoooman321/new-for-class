<template>
	<div class="login-page">
		<div class="login-container">
			<div class="login__title fz-30 fw-600 c-text-main">老師登入</div>
			<Form class="login__form">
				<div class="input-wrapper">
					<div class="input__title fz-20 c-text-main">Email</div>
					<Field class="input__field" name="playerName" type="text" />
				</div>

				<div class="input-wrapper">
					<div class="input__title fz-20 c-text-main">Password</div>
					<Field class="input__field" name="playerName" type="text" />
				</div>

        <div class="login-button bgc-main c-fff cursor-pointer">
          登入
        </div>
			</Form>
		</div>

		<router-link to="/play/123" class="student-link">
			<div>學生請點此</div>
		</router-link>
	</div>
</template>

<script>
import { Form, Field } from 'vee-validate'
export default {
	components: {
		Form,
		Field,
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/teacher/_login.scss';
</style>
