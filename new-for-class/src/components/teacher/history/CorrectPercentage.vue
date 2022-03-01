<template>
	<VeProgress :progress="50" :size="100" thickness="10%" colorFill="#fff">
		<span slot="legend-value">50%</span>
	</VeProgress>
</template>

<script>
import { VeProgress } from 'vue-ellipse-progress'
export default {
	components: {
		VeProgress,
	},
}
</script>
