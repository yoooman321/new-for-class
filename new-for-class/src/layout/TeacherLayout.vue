<template>
  <div class="teacher-layout">
    <!-- <Lobby /> -->
    <!-- <QuestionDisplay /> -->
    <!-- <AnswerQuestion /> -->
    <Finish />
  </div>
</template>

<script>
import Lobby from '@/pages/teacher/game/Lobby.vue'
import QuestionDisplay from '@/pages/teacher/game/QuestionDisplay.vue'
import AnswerQuestion from '@/pages/teacher/game/AnswerQuestion.vue'
import Finish from '@/pages/teacher/game/Finish.vue'
export default {
  components: {
    Lobby,
    QuestionDisplay,
    AnswerQuestion,
    Finish
  }
}
</script>
