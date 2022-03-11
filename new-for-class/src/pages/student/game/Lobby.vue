<template>
	<div class="lobby">
		<component :is="lobbyComponent"></component>
	</div>
</template>

<script>
import EnterGame from '@/components/student/game/EnterGame.vue'
import Tutorial from '@/components/student/game/TutorialPage.vue'
import WaitForStart from '@/components/student/game/WaitForStart.vue'

import { storeToRefs } from 'pinia'
import { useStudentGameStore } from '@/stores/studentGame'

export default {
	components: {
		EnterGame,
		Tutorial,
		WaitForStart,
	},

	setup() {
		const store = useStudentGameStore()
		const { lobbyComponent } = storeToRefs(store)
		const { setLobbyComponent } = useStudentGameStore()

		const uid = localStorage.getItem('studentUid')
		if (uid) {
			setLobbyComponent('Tutorial')
		}

		return { lobbyComponent }
	},
}
</script>
