import { useExamStore } from '@/stores/exam'
import {
	getFirestore,
	doc,
	setDoc,
} from 'firebase/firestore'

export default function useTeacherGame() {
	const db = getFirestore()
	const uid = localStorage.getItem('uid')
	const store = useExamStore()

	const setPageToFirebase = async (examId) => {
		try {
			await setDoc(
				doc(db, 'rooms', examId),
				{
					page: 'lobby',
				},
				{ merge: true }
			)
		} catch (e) {
			throw new Error(e)
		}
	}

	const setExamDataToFirebase = async (examId, examData) => {
		try {
			await setDoc(doc(db, 'rooms', examId), { examData }, { merge: true })
		} catch (e) {
			throw new Error(e)
		}
	}

	const saveHistoryToFirebase = async (examId) => {
		const timeStamp = new Date().getTime();
		const examData = JSON.parse(JSON.stringify(store.getExamDataInOldExamList(examId)))
		const historyData = {
			examData,
			timeStamp
		}
		
		try {
			await setDoc(doc(db, 'users', uid, 'historyList', timeStamp.toString()), historyData, { merge: true })
		} catch (e) {
			throw new Error(e)
		}
	}

	return { setPageToFirebase, setExamDataToFirebase, saveHistoryToFirebase }
}
