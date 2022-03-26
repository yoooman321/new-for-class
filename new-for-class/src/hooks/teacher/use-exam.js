import { useExamStore } from '@/stores/exam'
import {
	getFirestore,
	doc,
	setDoc,
	getDocs,
	collection,
	deleteDoc,
	query,
	orderBy,
	where,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export default function useExamData() {
	const store = useExamStore()
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
			.catch(() => {
				return false
			})
	}

	const deleteTeacherRooms = async () => {
		const auth = getAuth()
		const creater = auth.currentUser.email
		const allRooms = collection(db, 'rooms')
		const myRooms = query(allRooms, where('roomCreater', '==', creater))

		try {
			const docSnap = await getDocs(myRooms)
			docSnap.forEach((room) => {
				const roomDoc = doc(db, 'rooms', room.id)
				deleteDoc(roomDoc)
			})
		} catch (error) {
			throw new Error(400)
		}
	}

	return {
		saveExamDataToFirebase,
		getExamListFromFirebase,
		deleteExamFromFirebase,
		startExamGame,
		deleteTeacherRooms,
	}
}
