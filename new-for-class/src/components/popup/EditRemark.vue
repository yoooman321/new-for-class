<template>
	<div class="edit-remark-wrapper">
		<div class="edit-remark-container">
			<div class="edit-remark-inner">
				<div
					class="edit-remark__close cursor-pointer"
					@click="closePopup"
				></div>
				<div class="edit-remark__title fw-600 fz-20">編輯備註</div>
				<input
					v-model="remark"
					class="edit-remark__input fz-18 c-text-main"
					type="text"
				/>
				<div
					class="edit-remark__button c-fff bgc-main cursor-pointer"
					@click="processSetRemarkToHistory"
				>
					確定
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { inject, ref } from 'vue'
import useHistory from '@/hooks/teacher/use-history'
import { useHistoryStore } from '@/stores/history'

export default {
	emits: ['change-show-edit-remark'],

	setup(_, context) {
		const historyID = inject('historyID')

		const closePopup = () => {
			context.emit('change-show-edit-remark', false)
		}
		// store
		const { currentHistoryData, setHistoryRemark } = useHistoryStore()

		const remark = ref('')
		remark.value = currentHistoryData.remark

		const { setHistoryDataToFirebase } = useHistory()
		const processSetRemarkToHistory = async () => {
			try {
				const historyData = {
					remark: remark.value,
				}
				await setHistoryDataToFirebase(historyID, historyData)
				setHistoryRemark(remark.value)
				closePopup()
			} catch (e) {
				console.log('jjj', e)

				// try again
			}
		}

		return { closePopup, remark, processSetRemarkToHistory }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/popup/_editRemark.scss';
</style>
