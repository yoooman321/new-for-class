<template>
	<div class="add-exam-page">
		<Form class="add-exam-form c-text-main" @submit="test">
			<div class="input-wrapper">
				<div class="input__title fw-600 fz-18">考題名稱:</div>

				<Field
					class="input__field"
					name="examName"
					type="text"
					v-model="examName"
				/>
			</div>

			<div class="question-sets">
				<draggable
					:list="list"
					item-key="name"
					class="list-group"
					@start="dragging = true"
					@end="dragging = false"
				>
					<template #item="{ element }">
						<question-set :index="element.index" />
					</template>
				</draggable>
			</div>
		</Form>

		<div class="add-new-question cursor-pointer" @click="addQuestion">
			<img class="add-icon" src="@/assets/images/teacher/icon/add.svg" />
			<span class="add-text c-text-main">新增問題</span>
		</div>

		<div class="form-buttons">
			<div class="button button__save cursor-pointer c-fff">儲存</div>

			<div class="button button__reset cursor-pointer c-fff">重置考題</div>
		</div>
	</div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import draggable from 'vuedraggable'
import QuestionSet from '@/components/teacher/exam/QuestionSet.vue'
import { ref, reactive } from 'vue'

export default {
	components: {
		Form,
		Field,
		QuestionSet,
		draggable,
	},
	setup() {
		const test = (values) => {
			console.log('aaa', values)
		}

		const dragging = ref(false)

		const examName = ref('')

		const list = reactive([{ index: '1' }, { index: '2' }, { index: '3' }])

		const addQuestion = () => {
			list.push({ index: '4' })
		}

		return { test, examName, list, dragging, addQuestion }
	},
}
</script>
