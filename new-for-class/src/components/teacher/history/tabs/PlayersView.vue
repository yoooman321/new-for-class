<template>
	<div class="history-players">
		<table class="history-players-table">
			<tr class="table__title-tr">
				<th class="table__title c-fff bgc-main">學生名稱</th>
				<th class="table__title c-fff bgc-main">答對率</th>
				<th class="table__title c-fff bgc-main">未答題數</th>
				<th class="table__title c-fff bgc-main">分數</th>
			</tr>

			<tr
				v-for="(playerName, index) in Object.keys(playerList)"
				:key="playerName"
				class="table__content-tr cursor-pointer"
				@click="processOpenOpenDetail(index, playerName)"
			>
				<td class="table__content">{{ playerName }}</td>
				<td class="table__content">
					<div v-if="questionIsSingleAnswerAmount.length === 0">
						沒有單選題
					</div>
					<CorrectPercentage
						v-else
						:percent="getPlayerCorrectPercentage(playerName)"
					/>
				</td>
				<td class="table__content">{{ getUnAnswerAmount(playerName) }}</td>
				<td class="table__content">{{ getPlayerScore(playerName) }}</td>
			</tr>
		</table>
	</div>

	<PlayerDetail v-if="openDetail" @set-open-detail="setOpenDetail" />
</template>

<script>
import CorrectPercentage from '@/components/teacher/history/CorrectPercentage.vue'
import PlayerDetail from '@/components/popup/PlayerDetail.vue'

import { useHistoryStore } from '@/stores/history'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

export default {
	components: {
		CorrectPercentage,
		PlayerDetail,
	},
	setup() {
		const store = useHistoryStore()
		const { currentHistoryData } = storeToRefs(store)
		const { setPlayerData, setSelectedPlayerIndex, setSelectedPlayerName } =
			store
		const { examData } = currentHistoryData.value

		const totalQuestionAmount = examData.questionList.length
		const questionIsSingleAnswerAmount = examData.questionList.filter(({answerType}) => answerType === 'singleAnswer')
		

		// playerList
		const playerList = reactive({})
		for (let index = 0; index < totalQuestionAmount; index++) {
			currentHistoryData.value[`question${index}`].forEach((player) => {
				if (!playerList[player.playerName]) {
					playerList[player.playerName] = {
						options: [player],
					}
				} else {
					playerList[player.playerName].options.push(player)
				}
			})
		}
		setPlayerData(playerList)

		const getPlayerCorrectPercentage = (playerName) => {
			const playerAnswerCorrectList = playerList[playerName].options.filter(
				({ isCorrect }) => isCorrect
			)
			return (playerAnswerCorrectList.length / totalQuestionAmount) * 100
		}

		const getUnAnswerAmount = (playerName) => {
			const answerCount = playerList[playerName].options.length

			return totalQuestionAmount - answerCount
		}

		const getPlayerScore = (playerName) => {
			const answerCount = playerList[playerName].options.length
			return playerList[playerName].options[answerCount - 1].score
		}

		// openDetail
		const openDetail = ref(false)
		const setOpenDetail = (booleanData) => {
			openDetail.value = booleanData
		}
		const processOpenOpenDetail = (index, playerName) => {
			setSelectedPlayerIndex(index)
			setSelectedPlayerName(playerName)
			setOpenDetail(true)
		}

		return {
			playerList,
			openDetail,
			questionIsSingleAnswerAmount,
			getPlayerCorrectPercentage,
			getUnAnswerAmount,
			getPlayerScore,
			processOpenOpenDetail,
			setOpenDetail,
		}
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/history/_players.scss';
</style>
