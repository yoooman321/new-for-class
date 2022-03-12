<template>
	<div class="login-page">
		<div class="login-container">
			<div class="login__title fz-30 fw-600 c-text-main">老師登入</div>
			<form class="login__form">
				<div class="input-wrapper">
					<div class="input__title fz-20 c-text-main">Email</div>
					<input v-model="email" class="input__field" name="email" />
				</div>
				<div class="error-message">
					{{ emailError }}
				</div>
				<div class="input-wrapper">
					<div class="input__title fz-20 c-text-main">Password</div>
					<input
						v-model="password"
						type="password"
						class="input__field"
						name="password"
					/>
				</div>
				<div class="error-message">
					{{ passwordError }}
				</div>
				<div
					class="login-button bgc-main c-fff cursor-pointer"
					@click="processLogin"
				>
					登入
				</div>
			</form>
		</div>

		<router-link to="/play/123" class="student-link">
			<div>學生請點此</div>
		</router-link>

		<AlertMessage v-if="showErrorMessage">
			<div>帳號密碼錯誤</div>
		</AlertMessage>
	</div>
</template>

<script>
import { useForm, useField } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AlertMessage from '@/components/popup/AlertMessage.vue'
import useAccount from '@/hooks/use-account'
export default {
	components: {
		AlertMessage,
	},

	beforeRouteEnter(to, from, next) {
		const userInformation = sessionStorage.getItem(
			'firebase:authUser:AIzaSyBASu7jS0Ivr3VAs1xX0-Cb2qdEKCWa1SA:[DEFAULT]'
		)

		if (userInformation) {
			next('/')
		} else {
			next()
		}
	},

	setup() {
		const router = useRouter()

		const { teacherSignIn } = useAccount()

		// Define a validation schema
		const simpleSchema = {
			email(value) {
				if (value && value.trim()) {
					return true
				}
				return '請填寫Email'
			},
			name(value) {
				if (value && value.trim()) {
					return true
				}
				return '請填寫密碼'
			},
		}
		// Create a form context with the validation schema
		useForm({
			validationSchema: simpleSchema,
		})
		// No need to define rules for fields
		const { value: email, errorMessage: emailError } = useField('email')
		const { value: password, errorMessage: passwordError } =
			useField('password')

		// login
		const showErrorMessage = ref(false)

		const processLogin = async () => {
			try {
				const uid = await teacherSignIn(email.value, password.value)
				localStorage.setItem('uid', uid)

				router.push('/')
			} catch {
				showErrorMessage.value = true
				setTimeout(() => {
					showErrorMessage.value = false
				}, 3000)
			}
		}

		return {
			email,
			emailError,
			password,
			passwordError,
			processLogin,
			showErrorMessage,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/teacher/_login.scss';
</style>
