<template>
	<div
		v-if="Object.keys(currentHistoryData).length !== 0"
		class="history-detail"
	>
		<router-link to="/history">
			<div class="history-detail__return">
				<img src="@/assets/images/teacher/icon/arrow-left.svg" />
				<span class="c-main">返回</span>
			</div>
		</router-link>

		<div class="history-detail__title">
			<div class="title-card title">
				<div class="text fw-600">考題名稱</div>
				<div class="exam-name">{{ currentHistoryData.examData.examTitle }}</div>
			</div>

			<div class="title-card remark">
				<div class="remark-title" @click="changeShowEditRemark(true)">
					<div class="text fw-600">備註</div>
					<img
						class="cursor-pointer"
						src="@/assets/images/teacher/icon/edit.svg"
					/>
				</div>
				<div>{{ currentHistoryData.remark }}</div>
			</div>
			<div class="title-card date">
				<div class="text fw-600">開始時間</div>
				<div>{{ timestampToDate(currentHistoryData.timeStamp) }}</div>
			</div>
		</div>

		<div class="history-detail__tabs">
			<div
				v-for="(tabTitle, tabName) in tabList"
				:key="tabName"
				:class="[
					'history-detail__tab cursor-pointer fz-20',
					{
						active: tabName === currentTab,
					},
				]"
				@click="changeTab(tabName)"
			>
				{{ tabTitle }}
			</div>
		</div>

		<div class="history-detail__content">
			<component :is="currentTab"></component>
		</div>
	</div>

	<teleport to="body">
		<edit-remark
			v-if="showEditRemark"
			@change-show-edit-remark="changeShowEditRemark"
		/>
	</teleport>
</template>

<script>
import Summary from '@/components/teacher/history/tabs/SummaryView.vue'
import Players from '@/components/teacher/history/tabs/PlayersView.vue'
import Questions from '@/components/teacher/history/tabs/QuestionsView.vue'
import EditRemark from '@/components/popup/EditRemark.vue'

import { onBeforeMount, onBeforeUnmount, ref, reactive, provide } from 'vue'
import { useHistoryStore } from '@/stores/history'
import useHistory from '@/hooks/teacher/use-history'
import { storeToRefs } from 'pinia'

export default {
	components: {
		Summary,
		Players,
		Questions,
		EditRemark,
	},

	props: {
		id: {
			type: String,
			default: '',
		},
	},

	setup(props) {
		provide('historyID', props.id)
		// store
		const store = useHistoryStore()
		const { currentHistoryData } = storeToRefs(store)
		const { setCurrentHistoryData } = useHistoryStore()

		// hook
		const { getHistoryItemFromFirebase, timestampToDate } = useHistory()

		// tab
		const currentTab = ref('summary')
		const changeTab = (tab) => {
			currentTab.value = tab
		}
		const tabList = reactive({
			summary: '總覽',
			players: '玩家列表',
			questions: '問題列表',
		})

		// remark
		const showEditRemark = ref(false)
		const changeShowEditRemark = (booleanData) => {
			showEditRemark.value = booleanData
		}

		onBeforeMount(async () => {
			if (Object.keys(currentHistoryData.value).length === 0) {
				try {
					const historyData = await getHistoryItemFromFirebase(props.id)
					setCurrentHistoryData(historyData)
				} catch (e) {
					// show error message return to history
					console.log('e', e)
				}
			}
		})

		onBeforeUnmount(() => {
			// clear currenthistory
		})

		return {
			currentHistoryData,
			currentTab,
			tabList,
			changeTab,
			showEditRemark,
			changeShowEditRemark,
			timestampToDate,
		}
	},
}
</script>
