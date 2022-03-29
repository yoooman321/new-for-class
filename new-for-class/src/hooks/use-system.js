import { ref } from 'vue'

export default function useSystem() {
	const showSystemMessage = ref(false)
	const systemMessageText = ref('')
	const messageType = ref('success')

	const switchSystemMessage = () => {
		showSystemMessage.value = true
		setTimeout(() => {
			showSystemMessage.value = false
		}, 2500)
	}

	return { systemMessageText, messageType, showSystemMessage, switchSystemMessage }
}
