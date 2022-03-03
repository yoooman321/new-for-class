<template>
    <div class="answered-player-list-container">
      <div class="answered-player-title fz-24">已作答玩家</div>
        <div class="answered-player-list">
          <div
            class="answered-player"
            v-for="(player, index) in playerList"
            :key="index"
          >
            {{ player }}
          </div>
        </div>
    </div>
</template>

<script>
export default {
	setup() {
		const playerList = [
			'PlayerA',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
			'PlayerB',
		]

		return { playerList }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/game/_answeredPlayerList.scss';
</style>
