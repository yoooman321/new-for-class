<template>
	<!-- TODO LOADING  -->
	<div class="old-exam-page">
		<div class="old-exam-header">
			<div class="old-exam__title fz-20 fw-600 c-text-main">我的考題</div>
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
import { onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
	setup() {
		// store
		const store = useExamStore()
		const { oldExamList } = storeToRefs(store)

		// hook
		const { getExamListFromFirebase, deleteExamFromFirebase, startExamGame } =
			useExamData()
		const { setPageToFirebase, setExamDataToFirebase, saveHistoryToFirebase } =
			useTeacherGame()

		// router
		const router = useRouter()

		// 拿考題列表
		const processGetExamListFromFirebase = async () => {
			const examList = await getExamListFromFirebase()
			store.setOldExamList(examList)
		}

		// 編輯
		const goToEditPage = (examId) => {
			router.push('/edit/' + examId)
		}

		// 刪除
		const processDeleteExamFromFirebase = async (examId) => {
			try {
				await deleteExamFromFirebase(examId)
				// Do something - 刪除成功，重新拿list
				processGetExamListFromFirebase()
			} catch {
				// Do something - error message
			}
		}

		// 開始遊戲
		const processStartExamGame = async (examId) => {
			const examData = store.getExamDataInOldExamList(examId)

			const promiseList = [
				setPageToFirebase(examId),
				setExamDataToFirebase(examId, examData),
				saveHistoryToFirebase(examId),
			]

			try {
				const isSuccessful = await startExamGame(promiseList)
				if (isSuccessful) {
					const routeData = router.resolve({
						name: 'StartGame',
						params: { id: examId },
					})
					window.open(routeData.href, '_blank')
					return
				}

				// error message try again
			} catch (e) {
				console.log('oooooo')

				// do something
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
		}
	},
}
</script>
