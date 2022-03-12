import { useExamStore } from '@/stores/exam'
import { useTeacherGameStore } from '@/stores/teacherGame'
import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	deleteDoc,
} from 'firebase/firestore'

export default function useTeacherGame() {
	const db = getFirestore()
	const uid = localStorage.getItem('uid')
	const store = useExamStore()

	// 遊戲相關
	const setPageToFirebase = async (examId, page) => {
		try {
			await setDoc(doc(db, 'rooms', examId), { page }, { merge: true })
		} catch (e) {
			throw new Error(e)
		}
	}

	const setExamDataToFirebase = async (examId, examData) => {
		const { questionList, historyID } = examData
		try {
			await setDoc(
				doc(db, 'rooms', examId),
				{ questionList, historyID },
				{ merge: true }
			)
		} catch (e) {
			throw new Error(e)
		}
	}

	const setQuestionIndexToFirebase = async (examId, questionIndex) => {
		try {
			await setDoc(doc(db, 'rooms', examId), { questionIndex }, { merge: true })
		} catch (e) {
			throw new Error(e)
		}
	}

	const getRoomsInformation = async (examId) => {
		const roomDoc = doc(db, 'rooms', examId)
		try {
			const roomInformation = await getDoc(roomDoc)
			return roomInformation.data()
		} catch (error) {
			throw new Error(400)
		}
	}

	const deleteRoomsInformation = async (examId) => {
		const roomDoc = doc(db, 'rooms', examId)
		try {
			const roomInformation = await deleteDoc(roomDoc)
		} catch (error) {
			throw new Error(400)
		}
	}

	// 歷史相關
	const addHistoryToFirebase = async (examId, timeStamp) => {
		const examData = JSON.parse(
			JSON.stringify(store.getExamDataInOldExamList(examId))
		)
		const historyData = {
			examData,
			timeStamp,
		}

		try {
			await setDoc(
				doc(db, 'users', uid, 'historyList', timeStamp.toString()),
				historyData,
				{ merge: true }
			)
		} catch (e) {
			throw new Error(e)
		}
	}

	const setHistoryDataToFirebase = async (historyData) => {
		const { historyID } = useTeacherGameStore()
		const historyDoc = doc(db, 'users', uid, 'historyList', historyID.toString())

		try {
			await setDoc(historyDoc, historyData, { merge: true })
		} catch (e) {
			throw new Error(e)
		}
	}

	return {
		setPageToFirebase,
		setExamDataToFirebase,
		setQuestionIndexToFirebase,
		addHistoryToFirebase,
		getRoomsInformation,
		deleteRoomsInformation,
		setHistoryDataToFirebase,
	}
}
