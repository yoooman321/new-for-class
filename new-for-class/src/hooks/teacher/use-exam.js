import { useExamStore } from '@/stores/exam'
import { useTeacherGameStore } from '@/stores/teacherGame'

import {
	getFirestore,
	doc,
	setDoc,
	getDocs,
	collection,
	deleteDoc,
	query,
	orderBy,
} from 'firebase/firestore'

export default function useExamData() {
	const store = useExamStore()
	const teacherGameSotre = useTeacherGameStore()
	const db = getFirestore()
	const uid = localStorage.getItem('uid')

	const saveExamDataToFirebase = async () => {
		const examDataCloned = JSON.parse(JSON.stringify(store.examData))
		examDataCloned.timestamp = new Date().getTime()

		// firebase曾有過exam資料就直接覆蓋資料
		if (!examDataCloned.examId) {
			const examID = Math.floor(Math.random() * 1000000).toString()
			examDataCloned.examId = examID
		}

		try {
			await setDoc(
				doc(db, 'users', uid, 'examList', examDataCloned.examId),
				examDataCloned
			)
		} catch (e) {
			throw new Error(e)
		}
	}

	const getExamListFromFirebase = async () => {
		const docRef = collection(db, 'users', uid, 'examList')
		const queryType = query(docRef, orderBy('timestamp', 'desc'))

		let examList = []
		try {
			const docSnap = await getDocs(queryType)
			docSnap.forEach((doc) => {
				examList = [...examList, doc.data()]
			})

			return examList
		} catch (e) {
			return examList
		}
	}

	const deleteExamFromFirebase = async (examId) => {
		try {
			await deleteDoc(doc(db, 'users', uid, 'examList', examId))
		} catch (e) {
			throw new Error(e)
		}
	}

	const startExamGame = async (promiseObject) => {
		return Promise.all(promiseObject)
			.then(() => {
				return true
			})
			.catch((error) => {
				return false
			})
	}

	return {
		saveExamDataToFirebase,
		getExamListFromFirebase,
		deleteExamFromFirebase,
		startExamGame,
	}
}
