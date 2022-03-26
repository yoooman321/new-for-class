<template>
	<div class="old-exam-page">
		<div class="old-exam-header">
			<div class="old-exam__title fz-20 fw-600 c-text-main">我的考題</div>
		</div>

		<div class="delete-data">
			<div
				class="delete-data__button c-fff"
				@click="processDeleteTeacherRooms()"
			>
				刪除資料庫資料
			</div>
			<div class="delete-data__text fz-12">(建議開始遊戲前都按一次)</div>
		</div>

		<table class="old-exam-table">
			<tr class="table__title-tr">
				<th class="table__title">考題名稱</th>
				<th class="table__title">操作</th>
			</tr>

			<tr
				v-for="exam in oldExamList"
				:key="exam.examTitle"
				class="table__content-tr"
			>
				<td class="table__content">{{ exam.examTitle }}</td>
				<td class="table__content table__buttons">
					<div
						class="table__button table__button--play"
						@click="processStartExamGame(exam.examId)"
					>
						開始玩
					</div>
					<div
						class="table__button table__button--edit"
						@click="goToEditPage(exam.examId)"
					>
						編輯
					</div>
					<div
						class="table__button table__button--delete"
						@click="processDeleteExamFromFirebase(exam.examId)"
					>
						刪除
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import useExamData from '@/hooks/teacher/use-exam'
import useTeacherGame from '@/hooks/teacher/use-teacher-game'
import { useExamStore } from '@/stores/exam'
import { useSystemStore } from '@/stores/system'
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
	setup() {
		// store
		const store = useExamStore()
		const { oldExamList } = storeToRefs(store)
		const { switchLoadingFlag } = useSystemStore()

		// hook
		const {
			getExamListFromFirebase,
			deleteExamFromFirebase,
			startExamGame,
			deleteTeacherRooms,
		} = useExamData()
		const {
			setPageToFirebase,
			setExamDataToFirebase,
			setQuestionIndexToFirebase,
			addHistoryToFirebase,
			deleteOldPlayers,
		} = useTeacherGame()

		// router
		const router = useRouter()

		// 拿考題列表
		const processGetExamListFromFirebase = async () => {
			switchLoadingFlag(true)
			const examList = await getExamListFromFirebase()
			store.setOldExamList(examList)
			switchLoadingFlag(false)
		}

		// 編輯
		const goToEditPage = (examId) => {
			router.push('/edit/' + examId)
		}

		// 刪除
		const processDeleteExamFromFirebase = async (examId) => {
			switchLoadingFlag(true)
			try {
				await deleteExamFromFirebase(examId)
				// Do something - 刪除成功，重新拿list
				processGetExamListFromFirebase()
				switchLoadingFlag(false)
			} catch {
				switchLoadingFlag(false)
				// Do something - error message
			}
		}

		// 開始遊戲
		const processStartExamGame = async (examId) => {
			const examData = store.getExamDataInOldExamList(examId)
			const timeStamp = new Date().getTime()
			examData.historyID = timeStamp

			const promiseList = [
				setPageToFirebase(examId, 'lobby'),
				setExamDataToFirebase(examId, examData),
				setQuestionIndexToFirebase(examId, -1),
				addHistoryToFirebase(examId, timeStamp, examData),
				deleteOldPlayers(examId),
			]

			try {
				switchLoadingFlag(true)
				const isSuccessful = await startExamGame(promiseList)
				if (isSuccessful) {
					const routeData = router.resolve({
						name: 'StartGame',
						params: { id: examId },
					})
					switchLoadingFlag(false)
					window.open(routeData.href, '_blank')
					return
				}

				// error message try again
			} catch (e) {
				switchLoadingFlag(false)
				console.log('oooooo')

				// do something
			}
		}

		// 移除資料庫資料
		const processDeleteTeacherRooms = async () => {
			try {
				switchLoadingFlag(true)
				await deleteTeacherRooms()
				switchLoadingFlag(false)
			} catch (error) {
				switchLoadingFlag(false)
			}
		}

		onBeforeMount(() => {
			processGetExamListFromFirebase()
		})

		return {
			oldExamList,
			goToEditPage,
			processDeleteExamFromFirebase,
			processStartExamGame,
			processDeleteTeacherRooms,
		}
	},
}
</script>
