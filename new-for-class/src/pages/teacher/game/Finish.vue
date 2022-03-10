<template>
	<div class="teacher-finish fw-600">Thank You For Your Playing!</div>
</template>

<script>
import useTeacherGame from '@/hooks/teacher/use-teacher-game'
import { onBeforeMount, inject } from 'vue'

export default {
	setup() {
		// inject examId
		const examId = inject('examId')

		// hook
		const { deleteRoomsInformation } = useTeacherGame()

		onBeforeMount(() => {
			deleteRoomsInformation(examId)
		})
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/pages/teacher/_finish.scss';
</style>
