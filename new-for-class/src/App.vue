<template>
	<router-view />
	<Loading v-if="showLoading" />
</template>

<script>
import Loading from '@/components/system/LoadingComponent.vue'

import { useSystemStore } from '@/stores/system'
import { storeToRefs } from 'pinia'

export default {
	components: {
		Loading,
	},

	setup() {
		const store = useSystemStore()
		const { showLoading } = storeToRefs(store)

		return { showLoading }
	},
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Noto+Sans+TC&display=swap');
#app {
	font-family: 'Lato', 'Noto Sans TC', 'Roboto', sans-serif;
}
</style>
