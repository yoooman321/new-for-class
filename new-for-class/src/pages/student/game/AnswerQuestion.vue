<template>
  <div class="student-answer-question">
    <OptionsAnswer />
  </div>
</template>

<script>
import OptionsAnswer  from '@/components/student/game/OptionsAnswer.vue'
export default {
  components: {
    OptionsAnswer
  }
}
</script>

<style lang="scss">
.student-answer-question {
  height: 100%;
}

</style>