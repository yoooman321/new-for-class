import { useExamStore } from '@/stores/exam'
import { useTeacherGameStore } from '@/stores/teacherGame'
import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	deleteDoc,
	collection,
	getDocs,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

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
		const { questionList, historyID, showRankingPage } = examData
		const auth = getAuth()
		try {
			await setDoc(
				doc(db, 'rooms', examId),
				{
					questionList,
					historyID,
					showRankingPage,
					roomCreater: auth.currentUser.email,
				},
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

	const deleteOldPlayers = async (examId) => {
		const players = collection(db, 'rooms', examId, 'players')
		try {
			const docSnap = await getDocs(players)
			docSnap.forEach((player) => {
				const oldPlayer = doc(db, 'rooms', examId, 'players', player.id)
				deleteDoc(oldPlayer)
			})
		} catch (error) {
			console.log('eeeee', error)
			throw new Error(400)
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
			await deleteDoc(roomDoc)
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
		const historyDoc = doc(
			db,
			'users',
			uid,
			'historyList',
			historyID.toString()
		)

		try {
			await setDoc(historyDoc, historyData, { merge: true })
		} catch (e) {
			throw new Error(e)
		}
	}

	return {
		setPageToFirebase,
		setExamDataToFirebase,
		deleteOldPlayers,
		setQuestionIndexToFirebase,
		addHistoryToFirebase,
		getRoomsInformation,
		deleteRoomsInformation,
		setHistoryDataToFirebase,
	}
}
