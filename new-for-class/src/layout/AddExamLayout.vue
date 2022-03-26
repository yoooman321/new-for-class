<template>
	<div class="add-exam-layout">
		<div class="add-exam__header bgc-fff">
			<div class="add-exam__header-container">
				<div class="input-part">
					<div class="input__text c-text-main">考題名稱：</div>
					<input
						v-model="examTitle"
						class="input__field fz-16 c-text-main"
						placeholder="請輸入考題名稱"
						type="text"
					/>

					<div class="ranking-check">
						<input type="checkbox" v-model="showRankingPage" />
						<label class="text">是否顯示最後排行?</label>
					</div>
				</div>

				<div
					class="add-exam__button add-exam__button--exit c-text-main"
					@click="goBack"
				>
					離開
				</div>
				<div
					class="add-exam__button add-exam__button--save c-fff"
					@click="processSaveExamDataToFirebase"
				>
					儲存
				</div>
			</div>
		</div>

		<div class="add-exam__content">
			<div class="question-list-view-wrapper">
				<QuestionListView />
			</div>
			<div class="question-set-wrapper">
				<QuestionSet />
			</div>
		</div>
	</div>
</template>

<script>
import QuestionListView from '@/components/teacher/exam/QuestionListView.vue'
import QuestionSet from '@/components/teacher/exam/QuestionSet.vue'

import { computed } from 'vue'
import { useExamStore } from '@/stores/exam'
import { useSystemStore } from '@/stores/system'
import { useRouter } from 'vue-router'
import useExamData from '@/hooks/teacher/use-exam'

export default {
	components: {
		QuestionListView,
		QuestionSet,
	},

	props: {
		id: {
			type: String,
		},
	},

	setup(props) {
		const {
			setExamTitle,
			setExamShowRankingPage,
			cleanExamData,
			getExamDataInOldExamList,
			setTargetExamDataInExamData,
			examData,
		} = useExamStore()
		const examTitle = computed({
			get: () => {
				return examData.examTitle
			},
			set: (value) => {
				setExamTitle(value)
			},
		})

		const showRankingPage = computed({
			get: () => {
				return examData.showRankingPage
			},
			set: (value) => {
				setExamShowRankingPage(value)
			},
		})

		const { saveExamDataToFirebase } = useExamData()
		const { switchLoadingFlag } = useSystemStore()
		const router = useRouter()
		const processSaveExamDataToFirebase = async () => {
			try {
				switchLoadingFlag(true)
				const response = await saveExamDataToFirebase()
				cleanExamData()
				router.push('/old')
				switchLoadingFlag(false)
			} catch (e) {
				// DO Something - show error messgae
				switchLoadingFlag(false)
			}
		}

		const goBack = () => {
			cleanExamData()
			router.push('/')
		}

		// edit exam data
		const setEditExamData = () => {
			if (props.id) {
				const examData = getExamDataInOldExamList(props.id)

				if (!examData) {
					router.push('/')
					return
				}
				setTargetExamDataInExamData(examData)
			}
		}

		setEditExamData()

		return { examTitle, showRankingPage, processSaveExamDataToFirebase, goBack }
	},
}
</script>
