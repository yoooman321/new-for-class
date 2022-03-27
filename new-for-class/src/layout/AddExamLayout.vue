<template>
	<div class="add-exam-layout">
		<div class="add-exam__header bgc-fff">
			<div class="add-exam__header-container">
				<div class="input-part">
					<div class="input__text c-text-main">考題名稱：</div>
					<input
						v-model="examTitle"
						:class="[
							'input__field fz-16 c-text-main',
							{
								invalid:
									!validation.examTitle.valid && validation.examTitle.touched,
							},
						]"
						placeholder="請輸入考題名稱"
						type="text"
					/>

					<div class="ranking-check">
						<input v-model="showRankingPage" type="checkbox" />
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
import { storeToRefs } from 'pinia'
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
			default: '',
		},
	},

	setup(props) {
		const {
			setExamTitle,
			setExamShowRankingPage,
			cleanExamData,
			cleanValidationData,
			getExamDataInOldExamList,
			setTargetExamDataInExamData,
			changeSelectedQuestionIndex,
			setValidation,
		} = useExamStore()
		const store = useExamStore()
		const { examData, validation } = storeToRefs(store)

		const examTitle = computed({
			get: () => {
				return examData.value.examTitle
			},
			set: (value) => {
				setExamTitle(value)
			},
		})

		const showRankingPage = computed({
			get: () => {
				return examData.value.showRankingPage
			},
			set: (value) => {
				setExamShowRankingPage(value)
			},
		})

		const { saveExamDataToFirebase } = useExamData()
		const { switchLoadingFlag } = useSystemStore()
		const router = useRouter()
		const processSaveExamDataToFirebase = async () => {
			const isValid = checkAllFieldIsValid()

			if (isValid) {
				try {
					switchLoadingFlag(true)
					await saveExamDataToFirebase()
					changeSelectedQuestionIndex(0)
					cleanExamData()
					cleanValidationData()
					router.push('/old')
					switchLoadingFlag(false)
				} catch (e) {
					// DO Something - show error messgae
					switchLoadingFlag(false)
				}
			}
		}

		const checkAllFieldIsValid = () => {
			let isValid = true
			if (!validation.value.examTitle.valid) {
				validation.value.examTitle.touched = true
				isValid = false
			}

			validation.value.questionList.forEach(
				({ limitedTime, questionTitle, options, optionList }) => {
					if (!limitedTime.valid) {
						limitedTime.touched = true
						isValid = false
					}

					if (!questionTitle.valid) {
						questionTitle.touched = true
						isValid = false
					}

					if (!options.valid) {
						options.touched = true
						isValid = false
					}

					optionList.forEach((option) => {
						if (!option.valid) {
							option.touched = true
							isValid = false
						}
					})
				}
			)

			return isValid
		}

		const goBack = () => {
			changeSelectedQuestionIndex(0)
			cleanExamData()
			cleanValidationData()
			router.push('/')
		}

		// edit exam data
		const setEditExamData = () => {
			if (props.id !== '') {
				const hadEditExamData = getExamDataInOldExamList(props.id)

				if (!hadEditExamData) {
					router.push('/')
					return
				}
				setTargetExamDataInExamData(hadEditExamData)
				setValidation()
			}
		}

		setEditExamData()

		return {
			examTitle,
			validation,
			showRankingPage,
			processSaveExamDataToFirebase,
			goBack,
		}
	},
}
</script>
