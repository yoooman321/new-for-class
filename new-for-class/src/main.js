import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

import '@/assets/scss/main.scss'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBASu7jS0Ivr3VAs1xX0-Cb2qdEKCWa1SA',
	authDomain: 'new-for-class.firebaseapp.com',
	projectId: 'new-for-class',
	storageBucket: 'new-for-class.appspot.com',
	messagingSenderId: '944820594606',
	appId: '1:944820594606:web:f04e93c8cb7ee049580a3f',
}

// Initialize Firebase
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
