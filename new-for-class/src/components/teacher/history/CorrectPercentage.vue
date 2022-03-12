<template>
	<VeProgress :progress="percent" :size="100" thickness="10%" color-fill="#fff">
		<span slot="legend-value">{{percent}}%</span>
	</VeProgress>
</template>

<script>
import { VeProgress } from 'vue-ellipse-progress'
export default {
	components: {
		VeProgress,
	},

	props: {
		percent: {
			type: Number,
		}
	},

	setup(props) {
		const { percent } = props

		return { percent }
	}
}
</script>
