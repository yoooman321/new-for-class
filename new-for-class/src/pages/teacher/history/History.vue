<template>
	<div class="history-page">
		<div class="history-header">
			<div class="history__title fz-20 fw-600 c-text-main">歷史紀錄</div>
		</div>

		<table class="history-table">
			<tr class="table__title-tr">
				<th class="table__title">考題名稱</th>
				<th class="table__title">時間</th>
				<th class="table__title">備註</th>
				<th class="table__title">操作</th>
			</tr>

			<tr
				v-for="(history, index) in historyList"
				:key="history.timeStamp"
				class="table__content-tr"
			>
				<td class="table__content">{{ history.examData.examTitle }}</td>
				<td class="table__content">{{ timestampToDate(history.timeStamp) }}</td>
				<td class="table__content">{{ history.remark }}</td>
				<td class="table__content table__buttons">
					<div
						class="table__button table__button--edit"
						@click="processGoToHistoryDetailPage(history)"
					>
						查看
					</div>
					<div
						class="table__button table__button--delete"
						@click="processDeleteHistoryItem(history, index)"
					>
						刪除
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import useHistory from '@/hooks/teacher/use-history'
import { onBeforeMount, ref } from 'vue'
import { useHistoryStore } from '@/stores/history'
import { useRouter } from 'vue-router'

export default {
	setup() {
		// hook
		const {
			getHistoryListFromFirebase,
			deleteHistoryItemFromFirebase,
			timestampToDate,
		} = useHistory()

		// store
		const { setCurrentHistoryData } = useHistoryStore()

		// router
		const router = useRouter()

		let historyList = ref([])

		onBeforeMount(async () => {
			historyList.value = await getHistoryListFromFirebase()
		})

		const processGoToHistoryDetailPage = (historyData) => {
			setCurrentHistoryData(historyData)
			router.push('/history/' + historyData.timeStamp)
		}

		const processDeleteHistoryItem = async ({ timeStamp }, historyIndex) => {
			// 確認要不要刪的視窗
			try {
				await deleteHistoryItemFromFirebase(timeStamp)
				historyList.value.splice(historyIndex, 1)

				// 刪除成功
			} catch (e) {
				// do something
			}
		}

		return {
			historyList,
			timestampToDate,
			processDeleteHistoryItem,
			processGoToHistoryDetailPage,
		}
	},
}
</script>
