<template>
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
      }
    },
  },
  computed: {
    isTimerDone() {
      return this.seconds === this.currTimerDuration;
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
        ? this.seconds_WorkDuration
        : this.seconds_RestDuration;
    },
  },
  data() {
    return {
      seconds: 0,
      intervalId: 1,
      isWorking: true,
      seconds_WorkDuration: 5,
      seconds_RestDuration: 2,
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
      this.seconds = 0;
      // Start counting seconds when the component is mounted. Clear the interval to stop the timer.
      this.intervalId = setInterval(() => {
        this.seconds++;
      }, 1000);
    },
    formatElapsedTime() {
      // Calculate hours, minutes, and remaining seconds
      const hours = Math.floor(this.seconds / 3600);
      const minutes = Math.floor((this.seconds % 3600) / 60);
      const remainingSeconds = this.seconds % 60;

      // Return the formatted time as a string
      return `${hours.toString().padStart(2, "0")} : ${minutes
        .toString()
        .padStart(2, "0")} : ${remainingSeconds.toString().padStart(2, "0")}`;
    },
  },
};
</script>
