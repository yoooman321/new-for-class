import { useStudentGameStore } from '@/stores/studentGame'
import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	deleteDoc,
} from 'firebase/firestore'

export default function useStudentGame() {
	const db = getFirestore()

	const setPlayerInformationToFirebase = async (examId, playerInformation) => {
		const studentUid = localStorage.getItem('studentUid')

		try {
			await setDoc(
				doc(db, 'rooms', examId, 'players', studentUid),
				playerInformation,
				{ merge: true }
			)
		} catch (e) {
			throw new Error(e)
		}
	}

	const getPlayerInformation = async (examId) => {
		const studentUid = localStorage.getItem('studentUid')
		const playerDoc = doc(db, 'rooms', examId, 'players', studentUid)

		try {
			const playerInformation = await getDoc(playerDoc)

			return playerInformation.data()
		} catch (e) {
			throw new Error(e)
		}
	}

	const checkAnswerIsCorrect = (questionIndex) => {
		const { questionList, playerInformation } = useStudentGameStore()

		if (playerInformation.playerAnswer === '') return false

		return questionList[questionIndex].options[playerInformation.playerAnswer]
			.isAnswer
	}

	const deletePlayerInformation = async (examId) => {
		const studentUid = localStorage.getItem('studentUid')
		const roomDoc = doc(db, 'rooms', examId, 'players', studentUid)
		try {
			await deleteDoc(roomDoc)
		} catch (error) {
			throw new Error(400)
		}
	}

	return {
		setPlayerInformationToFirebase,
		getPlayerInformation,
		checkAnswerIsCorrect,
		deletePlayerInformation,
	}
}
