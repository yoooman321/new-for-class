<template>
	<div class="question-set">
		<Form>
			<div class="question-part">
				<div class="question-index">
					<span class="title fz-24 fw-600 c-main"
						>Question {{ props.index }}</span
					>
					<img
						class="expand-arrow"
						src="@/assets/images/teacher/icon/expane_less.svg"
						alt=""
					/>
				</div>

				<div class="question-input">
					<div class="input__title fz-18 c-text-main fw-500">問題:</div>
					<Field class="input__field" type="text" name="examName" />
				</div>
			</div>

			<div class="answer-part">
				<div class="title fz-24 fw-600 c-main">答案區</div>

				<div class="answer-configurations">
					<div class="configuration configuration__type">
						<div class="input__title">答案類型:</div>
						<select name="answerType" class="input__field">
							<option value="single">單選題</option>
							<option value="word">問答題</option>
						</select>
					</div>
					<div class="configuration configuration__time">
						<div class="input__title">答題秒數</div>
						<Field class="input__field" type="number" name="examName" />
					</div>
				</div>

				<div class="answer-options">
					<div class="input__title">答案選項 (請勾選正確答案)</div>

					<div class="options">
						<div class="input-wrapper">
							<input
								type="checkbox"
								class="input__checkbox"
								checked="checked"
							/>
							<span class="real-checkmark cursor-pointer"></span>
							<Field class="input__field" type="text" name="examName" />
							<div class="delete-button cursor-pointer">
								<img src="@/assets/images/teacher/icon/delete.svg" />
							</div>
						</div>

						<div class="input-wrapper">
							<input type="checkbox" class="input__checkbox" />
							<span class="real-checkmark cursor-pointer"></span>
							<Field class="input__field" type="text" name="examName" />
							<div class="delete-button cursor-pointer">
								<img src="@/assets/images/teacher/icon/delete.svg" />
							</div>
						</div>

						<div class="input-wrapper">
							<input type="checkbox" class="input__checkbox" />
							<span class="real-checkmark cursor-pointer"></span>
							<Field class="input__field" type="text" name="examName" />
							<div class="delete-button cursor-pointer">
								<img src="@/assets/images/teacher/icon/delete.svg" />
							</div>
						</div>

						<div class="input-wrapper">
							<input type="checkbox" class="input__checkbox" />
							<span class="real-checkmark cursor-pointer"></span>
							<Field class="input__field" type="text" name="examName" />
							<div class="delete-button cursor-pointer">
								<img src="@/assets/images/teacher/icon/delete.svg" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Form>
	</div>
</template>

<script>
import { Form, Field } from 'vee-validate'
import { ref } from 'vue'

export default {
	components: {
		Form,
		Field,
	},

  props: {
    index: {
      required: true,
    }
  },

	setup(props) {
		return { props }
	},
}
</script>

<style lang="scss">
@import '@/assets/scss/components/teacher/exam/_question-set.scss';
</style>
