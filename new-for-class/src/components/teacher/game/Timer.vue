<template>
	<div class="timer">
		<VeProgress
			:progress="pecent"
			:color="setColor()"
			:size="100"
			thickness="10%"
			color-fill="#fff"
		>
			<span slot="legend-value">{{ count }}</span>
		</VeProgress>
	</div>
</template>

<script>
import { ref, watch } from 'vue'
import { VeProgress } from 'vue-ellipse-progress'
import { useTeacherGameStore } from '@/stores/teacherGame'
import countMusic from '@/assets/audio/counted.mp3'
export default {
	components: {
		VeProgress,
	},

	setup(_, context) {
		// store
		const { currentQuestion } = useTeacherGameStore()

		const limitedTime = currentQuestion.limitedTime
		let count = ref(limitedTime)
		let timer = null
		let pecent = ref(0)
		const countdown = () => {
			if (count.value <= 1) {
				clearInterval(timer)
				context.emit('processCountDownOver')
			}
			count.value--
			pecent.value = ((limitedTime - count.value || 1) / limitedTime) * 100
		}

		timer = setInterval(countdown, 1000)

		const setColor = () => {
			if (count.value <= 3) {
				return '#E3170A'
			}
			return '#41d3bd'
		}

		// watch(count, (count, prevCount) => {
		// 	if (count === 4) {
		// 		setTimeout(() => {
		// 			const myAudio = new Audio(countMusic)
		// 			myAudio.play()
		// 		}, 500)
		// 	}
		// 	/* ... */
		// })

		return { pecent, count, setColor }
	},
}
</script>
