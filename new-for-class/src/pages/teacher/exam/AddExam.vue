<template>
	<div class="add-exam-page">
		<Form class="add-exam-form c-text-main">
			<div class="input-wrapper">
				<div class="input__title fw-600 fz-18">考題名稱:</div>

				<Field
					v-model="examTitle"
					class="input__field"
					name="examName"
					type="text"
				/>
			</div>

			<div class="ranking-check">
				<input type="checkbox" v-model="showRankingPage" />
				<label class="text fw-600">是否顯示最後排行?</label>
			</div>

			<div class="question-sets">
				<draggable
					:list="examData.questionList"
					item-key="name"
					class="list-group"
					@start="dragging = true"
					@end="dragging = false"
				>
					<template #item="{ element, index }">
						<question-set :element="element" :index="index" />
					</template>
				</draggable>
			</div>
		</Form>

		<div class="add-new-question cursor-pointer" @click="addQuestion">
			<img class="add-icon" src="@/assets/images/teacher/icon/add.svg" />
			<span class="add-text c-text-main">新增問題</span>
		</div>

		<div class="form-buttons">
			<div
				class="button button__save cursor-pointer c-fff"
				@click="processSaveExamDataToFirebase"
			>
				儲存
			</div>

			<div class="button button__reset cursor-pointer c-fff">重置考題</div>
		</div>
	</div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import draggable from 'vuedraggable'
import QuestionSet from '@/components/teacher/exam/QuestionSet.vue'
import { ref, computed, onBeforeUnmount } from 'vue'
import { useExamStore } from '@/stores/exam'
import { useRouter } from 'vue-router'
import useExamData from '@/hooks/teacher/use-exam'

export default {
	components: {
		Form,
		Field,
		QuestionSet,
		draggable,
	},

	props: {
		id: {
			type: String,
		},
	},

	setup(props) {
		// dragging
		const dragging = ref(false)

		// hooks
		const { saveExamDataToFirebase } = useExamData()

		// router
		const router = useRouter()

		// store
		const store = useExamStore()

		// edit exam data
		const setEditExamData = () => {
			if (props.id) {
				const examData = store.getExamDataInOldExamList(props.id)

				if (!examData) {
					router.push('/')
					return
				}
				store.setTargetExamDataInExamData(examData)
			}
		}

		setEditExamData()

		const examTitle = computed({
			get: () => {
				return store.examData.examTitle
			},
			set: (value) => {
				store.setExamTitle(value)
			},
		})

		const showRankingPage = computed({
			get: () => {
				return store.examData.showRankingPage
			},
			set: (value) => {
				store.setExamShowRankingPage(value)
			},
		})

		const processSaveExamDataToFirebase = async () => {
			try {
				const response = await saveExamDataToFirebase()
				store.cleanExamData()
				router.push('/old')
			} catch (e) {
				// DO Something - show error messgae
			}
		}

		onBeforeUnmount(() => {
			store.cleanExamData()
			// DO Something - 確認要離開?
		})

		return {
			examData: store.examData,
			examTitle,
			showRankingPage,
			dragging,
			addQuestion: store.addQuestion,
			processSaveExamDataToFirebase,
		}
	},
}
</script>
