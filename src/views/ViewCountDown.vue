<template>
  <v-container>
    <div>Current state: {{ strCurrTimerState }}</div>
    <div>
      <p>Time: {{ formatElapsedTime() }}</p>
    </div>
    <br />
    <div v-if="isTimerDone">
      <v-btn @click="toggleTimerState"
        >Start {{ nextActionDuringTimerState }}!</v-btn
      >
    </div>
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
      return this.isWorking ? "working" : "resting";
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
