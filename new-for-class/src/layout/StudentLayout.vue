<template>
  <div class="student-layout">
    <div class="student-layout__header">
      <div class="title fz-20 fw-600">進入遊戲</div>
      <div class="button c-fff fz-14 cursor-pointer">答案確定</div>
    </div>
    <div class="student-layout__content">
      <!-- <Lobby /> -->
      <!-- <QuestionDisplay /> -->
      <!-- <AnswerQuestion /> -->
      <!-- <Result /> -->
      <Finish />
    </div>
    <div class="student-layout__footer">
      <div class="player fz-16 fw-600">PlayerName</div>
    </div>
  </div>

  <!-- <div class="student-loading">
    <div class="text c-fff fw-600">答案已送出，等待解答。</div>
  </div> -->
</template>

<script>
import Lobby from '@/pages/student/game/Lobby.vue'
import QuestionDisplay from '@/pages/student/game/QuestionDisplay.vue'
import AnswerQuestion from '@/pages/student/game/AnswerQuestion.vue'
import Result from '@/pages/student/game/Result.vue'
import Finish from '@/pages/student/game/Finish.vue'
export default {
  components: {
    Lobby,
    QuestionDisplay,
    AnswerQuestion,
    Result,
    Finish
  }
  
}
</script>