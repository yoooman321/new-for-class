import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
	state: () => {
		return {
			currentHistoryData: {},
		}
	},

	actions: {
		setCurrentHistoryData(currentHistoryData) {
			this.currentHistoryData = currentHistoryData
		},

		setHistoryRemark(remark) {
			this.currentHistoryData.remark = remark
		},
	},
})
