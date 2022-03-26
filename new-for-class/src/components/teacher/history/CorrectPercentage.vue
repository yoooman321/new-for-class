<template>
	<div class="correct-percentage">
		<VeProgress
			:progress="percent"
			:size="100"
			thickness="10%"
			color-fill="#fff"
		>
			<span
				slot="legend-value"
				:class="['fw-600 c-text-main', { 'text--warning': percent < 50 }]"
				>{{ percent }}%</span
			>
		</VeProgress>
	</div>
</template>

<script>
import { computed } from 'vue'
import { VeProgress } from 'vue-ellipse-progress'
export default {
	components: {
		VeProgress,
	},

	props: {
		percent: {
			type: Number,
			default: 0,
		},
	},

	setup(props) {
		const percentageColor = computed(() => {
			if (props.percent < 50) {
				return '#E3170A'
			}
			return '#3f79ff'
		})

		return { percentageColor }
	},
}
</script>

<style lang="scss">
.correct-percentage {
	.text--warning {
		color: #e3170a;
	}
}
</style>
