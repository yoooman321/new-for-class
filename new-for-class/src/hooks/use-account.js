import {
	getAuth,
	deleteUser,
	signOut,
	browserSessionPersistence,
	setPersistence,
	signInAnonymously,
	signInWithEmailAndPassword,
} from 'firebase/auth'

export default function useAccount() {
	const playerSignIn = async () => {
		const auth = getAuth()
		await setPersistence(auth, browserSessionPersistence)
		const userInfo = await signInAnonymously(auth)

		return userInfo.user.auth.currentUser.uid
	}

	const playerSignOut = () => {
		return new Promise((resolve, reject) => {
			const auth = getAuth()
			signOut(auth)
				.then(() => {
					resolve()
				})
				.catch((e) => {
					reject(e)
				})
		})
	}

	const deletePlayerAuth = () => {
		const auth = getAuth()
		const user = auth.currentUser

		deleteUser(user)
			.then(() => {
				// User deleted.
			})
			.catch((error) => {
				console.log('eee', error)

				// An error ocurred
				// ...
			})
	}

	const teacherSignIn = async (email, password) => {
		const auth = getAuth()
		try {
			await setPersistence(auth, browserSessionPersistence)
			try {
				const userInfo = await signInWithEmailAndPassword(auth, email, password)
				return userInfo.user.auth.currentUser.uid
			} catch (l) {
				return new Error(400)
			}
		} catch (e) {
			return new Error(400)
		}
	}

	return { playerSignIn, playerSignOut, deletePlayerAuth, teacherSignIn }
}
