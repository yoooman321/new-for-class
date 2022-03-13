import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
	state: () => {
		return {
			currentHistoryData: {},
			selectedQuestionIndex: 0,
			selectedPlayerName: '',
			selectedPlayerIndex: 0,
			playerData: {},
		}
	},

	actions: {
		setCurrentHistoryData(currentHistoryData) {
			this.currentHistoryData = currentHistoryData
		},

		setHistoryRemark(remark) {
			this.currentHistoryData.remark = remark
		},

		setSelectedQuestionIndex(index) {
			this.selectedQuestionIndex = index
		},

		setSelectedPlayerIndex(index) {
			this.selectedPlayerIndex = index
		},

		setSelectedPlayerName(playerName) {
			this.selectedPlayerName = playerName
		},

		setPlayerData(playerData) {
			this.playerData = playerData
		},
	},
})
