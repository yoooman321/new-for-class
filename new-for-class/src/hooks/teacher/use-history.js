import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	deleteDoc,
	query,
	orderBy,
	setDoc,
} from 'firebase/firestore'

export default function useHistory() {
	const db = getFirestore()
	const uid = localStorage.getItem('uid')

	const getHistoryListFromFirebase = async () => {
		let historyList = []
		const historyCollection = collection(db, 'users', uid, 'historyList')

		const queryType = query(historyCollection, orderBy('timeStamp', 'desc'))

		try {
			const historySnap = await getDocs(queryType)
			historySnap.forEach((doc) => {
				historyList = [...historyList, doc.data()]
			})

			return historyList
		} catch (w) {
			console.log('w', w)

			return historyList
		}
	}

	const deleteHistoryItemFromFirebase = async (historyId) => {
		const historyDoc = doc(
			db,
			'users',
			uid,
			'historyList',
			historyId.toString()
		)
		try {
			await deleteDoc(historyDoc)
		} catch (e) {
			throw new Error(e)
		}
	}

	const getHistoryItemFromFirebase = async (historyId) => {
		const historyDoc = doc(
			db,
			'users',
			uid,
			'historyList',
			historyId.toString()
		)
		try {
			const historyObject = await getDoc(historyDoc)
			return historyObject.data()
		} catch (e) {
			throw new Error(e)
		}
	}

	const timestampToDate = (timestamp) => {
		const fullDate = new Date(timestamp)

		const formatDate =
			[
				fullDate.getFullYear(),
				fullDate.getMonth() + 1,
				fullDate.getDate(),
			].join('-') +
			' ' +
			[fullDate.getHours(), fullDate.getMinutes(), fullDate.getSeconds()].join(
				':'
			)

		return formatDate
	}

	const setHistoryDataToFirebase = async (historyID, historyData) => {
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
		getHistoryListFromFirebase,
		deleteHistoryItemFromFirebase,
		getHistoryItemFromFirebase,
		setHistoryDataToFirebase,
		timestampToDate,
	}
}
