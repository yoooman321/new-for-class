import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
	state: () => {
		return {
			showLoading: false,
		}
	},

	actions: {
		switchLoadingFlag(booleanData) {
			this.showLoading = booleanData
		},
	},
})
