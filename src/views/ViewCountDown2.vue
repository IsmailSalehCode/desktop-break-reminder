<template>
  <v-container style="text-align: center">
    <v-row class="text-expanding">
      <v-col cols="12"> Current mode: {{ strCurrTimerMode }} </v-col>
      <v-col cols="12"> Time remaining: {{ formatElapsedTime() }} </v-col>
    </v-row>
    <v-row v-if="!isTimerElapsed">
      <v-col
        ><v-btn variant="tonal" size="large" @click="togglePause">{{
          verb_playPauseButtonLabel
        }}</v-btn></v-col
      >
    </v-row>
    <br />
    <v-row v-if="isTimerElapsed">
      <v-col>
        <v-btn
          size="x-large"
          variant="outlined"
          :loadingToggleMode="loadingToggleMode"
          @click="toggleTimerMode"
          >Start {{ verb_nextMode }}!</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import { SettingsController } from "../persistent-data/dbController";

export default {
  emits: ["bring-to-front", "max", "min"],
  mounted() {
    // this.getSettings();
    // setTimeout(() => {
    //   this.startTimer();
    // }, 1000);
  },
  computed: {
    isTimerElapsed() {
      return this.secondsRemaining === 0;
    },
    verb_playPauseButtonLabel() {
      return this.isPaused ? "Resume" : "Pause";
    },
    strCurrTimerMode() {
      if (this.isTimerElapsed == true) {
        return "Waiting for input.";
      }
      const res = this.isWorking ? "Working" : "Resting";
      return res.concat(" ...");
    },
    verb_nextMode() {
      return this.isWorking ? "resting" : "working";
    },
  },
  data() {
    return {
      secondsRemaining: this.$store.state.secondsRemaining,
      isPaused: this.$store.state.isPaused,
      isWorking: this.$store.state.isWorking,
      // settings: null,
      loadingToggleMode: false,
    };
  },
  watch: {
    "$store.state.secondsRemaining": function (newValue) {
      this.secondsRemaining = newValue;
    },
    "$store.state.isPaused": function (newIsPaused) {
      this.isPaused = newIsPaused;
    },
    "$store.state.isWorking": function (newIsWorking) {
      this.isWorking = newIsWorking;
    },
  },
  methods: {
    async toggleTimerMode() {
      this.loadingToggleMode = true;
      await this.$store.commit("toggleMode");
      this.loadingToggleMode = false;
    },
    togglePause() {
      this.$store.commit("togglePause");
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
    // async getSettings() {
    //   this.settings = await SettingsController.getAllSettings();
    // },
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
