<template>
  <v-container style="text-align: center">
    <v-row class="text-expanding">
      <v-col cols="12"> Current state: {{ strCurrTimerState }} </v-col>
      <v-col cols="12"> Time remaining: {{ formatElapsedTime() }} </v-col>
    </v-row>
    <v-row v-if="!isTimerElapsed">
      <v-col
        ><v-btn variant="tonal" size="large" @click="togglePause">{{
          playPauseButtonLabel
        }}</v-btn></v-col
      >
    </v-row>
    <br />
    <v-row v-if="isTimerElapsed">
      <v-col>
        <v-btn size="x-large" variant="outlined" @click="toggleTimerState"
          >Start {{ nextActionDuringTimerState }}!</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  emits: ["bring-to-front", "max", "min"],
  mounted() {
    this.startTimer();
  },
  watch: {
    isTimerElapsed(v) {
      if (v == true) {
        this.stopTimer();
        this.$emit("bring-to-front");
        this.$emit("max");
      }
    },
  },
  computed: {
    playPauseButtonLabel() {
      return this.isPaused ? "Resume" : "Pause";
    },
    isTimerElapsed() {
      return this.secondsRemaining === 0;
    },
    strCurrTimerState() {
      if (this.isTimerElapsed == true) {
        return "Waiting for input.";
      }
      const res = this.isWorking ? "Working" : "Resting";
      return res.concat(" ...");
    },
    nextActionDuringTimerState() {
      return this.isWorking ? "resting" : "working";
    },
    currTimerDuration() {
      return this.isWorking
        ? this.secondsWorkDuration
        : this.secondsRestDuration;
    },
  },
  data() {
    return {
      secondsRemaining: 0,
      intervalId: 1,
      isWorking: true,
      secondsWorkDuration: 5,
      secondsRestDuration: 2,
      isPaused: false,
    };
  },
  methods: {
    runTimer() {
      this.isPaused = false;
      this.intervalId = setInterval(() => {
        this.secondsRemaining--;
      }, 1000);
      this.$emit("min");
    },
    togglePause() {
      if (!this.isPaused) {
        this.stopTimer();
      } else {
        this.runTimer();
      }
    },
    toggleTimerState() {
      this.isWorking = !this.isWorking;
      this.startTimer();
    },
    stopTimer() {
      this.isPaused = true;
      const currTimerId = this.intervalId;
      clearInterval(currTimerId);
    },
    startTimer() {
      if (this.isWorking == true) {
        this.secondsRemaining = this.secondsWorkDuration;
      } else {
        this.secondsRemaining = this.secondsRestDuration;
      }
      this.runTimer();
    },
    formatElapsedTime() {
      // Calculate hours, minutes, and remaining seconds
      const hours = Math.floor(this.secondsRemaining / 3600);
      const minutes = Math.floor((this.secondsRemaining % 3600) / 60);
      const remainingSeconds = this.secondsRemaining % 60;

      // Return the formatted time as a string
      return `${hours.toString().padStart(2, "0")} : ${minutes
        .toString()
        .padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
    },
  },
};
</script>

<style scoped>
.text-expanding {
  font-size: 4vw;
}

@media screen and (max-width: 320px) {
  .text-expanding {
    font-size: 12px;
  }
}
</style>
