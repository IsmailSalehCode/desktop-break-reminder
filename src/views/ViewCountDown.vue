<template>
  <v-container style="text-align: center">
    <v-row style="justify-content: center; font-size: 4vw">
      <v-col cols="12"> Current state: {{ strCurrTimerState }} </v-col>
      <v-col cols="12"> Time: {{ formatElapsedTime() }} </v-col>
    </v-row>
    <br />
    <v-row v-if="isTimerDone">
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
  mounted() {
    this.startTimer();
  },
  watch: {
    isTimerDone(v) {
      if (v == true) {
        this.stopTimer();
        window.electronAPI.bringMainWindowToFront();
      }
    },
  },
  computed: {
    isTimerDone() {
      return this.secondsRemaining === 0;
    },
    strCurrTimerState() {
      if (this.isTimerDone == true) {
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
    };
  },
  methods: {
    toggleTimerState() {
      this.isWorking = !this.isWorking;
      this.startTimer();
    },
    stopTimer() {
      const currTimerId = this.intervalId;
      clearInterval(currTimerId);
    },
    startTimer() {
      if (this.isWorking == true) {
        this.secondsRemaining = this.secondsWorkDuration;
      } else {
        this.secondsRemaining = this.secondsRestDuration;
      }
      // Start counting down from the initial seconds value
      this.intervalId = setInterval(() => {
        this.secondsRemaining--;
      }, 1000);
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
