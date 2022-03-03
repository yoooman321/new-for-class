<template>
	<div class="question-display">
		<div class="question-part">
			<div class="question-index fw-600">Question 1</div>
			<div class="question">
				Test Question Test Question Test Question Test Question Test Question
			</div>
			<div class="counter-part fw-600">{{ counter }}</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
	setup() {
    // counter
		let counter = ref('')
		let timer = null
		const countDown = () => {
			if (counter.value === 'GO') {
				clearInterval(timer)
				return
			}

			if (counter.value === 1) {
				counter.value = 'GO'

				return
			}

			counter.value--
		}

		onMounted(() => {
			setTimeout(() => {
				counter.value = 3
				timer = setInterval(countDown, 1000)
			}, 3000)
		})

		return { counter }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/teacher/_questionDisplay.scss';
</style>
