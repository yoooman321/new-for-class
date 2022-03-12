<template>
	<div class="answered-player-list-container">
		<div class="answered-player-title fz-24">已作答玩家</div>
		<div class="answered-player-list">
			<div
				v-for="(player, index) in playerList"
				:key="`answered-${index}`"
				class="answered-player"
			>
				<!-- key need to change -->
				{{ player.playerName }}
			</div>
		</div>
	</div>
</template>

<script>
import { useTeacherGameStore } from '@/stores/teacherGame'
import { storeToRefs } from 'pinia'

export default {
	setup() {
		const store = useTeacherGameStore()
		const { playerList } = storeToRefs(store)

		// const playerList = [
		// 	'PlayerA',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// 	'PlayerB',
		// ]

		return { playerList }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/game/_answeredPlayerList.scss';
</style>
