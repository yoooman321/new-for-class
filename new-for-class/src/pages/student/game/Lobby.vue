<template>
	<div class="lobby">
		<!-- <EnterGame /> -->
		<!-- <Tutorial /> -->
    <WaitForStart />
	</div>
</template>

<script>
import EnterGame from '@/components/student/game/EnterGame.vue'
import Tutorial from '@/components/student/game/TutorialPage.vue'
import WaitForStart from '@/components/student/game/WaitForStart.vue'
export default {
	components: {
		EnterGame,
		Tutorial,
    WaitForStart
	},
}
</script>