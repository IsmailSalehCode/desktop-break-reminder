<template>
  <v-container style="text-align: center">
    <v-row class="text-expanding">
      <v-col cols="12"> Current mode: {{ strCurrTimerMode }} </v-col>
      <v-col cols="12"> {{ formatElapsedTime() }} </v-col>
    </v-row>
    <v-row v-if="!isTimerElapsed">
      <v-col
        ><v-btn
          variant="tonal"
          size="large"
          @click="runOrPauseTimer"
          style="font-family: cursive, monospace"
          >{{ verb_playPauseButtonLabel }}</v-btn
        ></v-col
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
          >Switch to {{ verb_nextMode }}!</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  emits: ["bring-to-front", "max", "min"],
  watch: {
    isTimerElapsed(v) {
      if (v == true) {
        this.$emit("bring-to-front");
        this.$emit("max");
      }
    },
  },
  computed: {
    isTimerElapsed() {
      return this.$store.getters.isTimerElapsed;
    },
    verb_playPauseButtonLabel() {
      return this.$store.getters.verb_playPauseButtonLabel;
    },
    strCurrTimerMode() {
      return this.$store.getters.strCurrTimerMode;
    },
    verb_nextMode() {
      return this.$store.getters.verb_nextMode;
    },
    isPaused() {
      return this.$store.state.isPaused;
    },
    secondsRemaining() {
      return this.$store.state.secondsRemaining;
    },
    isWorking() {
      return this.$store.state.isWorking;
    },
  },

  data() {
    return {
      // settings: null,
      loadingToggleMode: false,
    };
  },
  methods: {
    async toggleTimerMode() {
      this.loadingToggleMode = true;
      await this.$store.commit("toggleMode");
      this.loadingToggleMode = false;
    },
    runOrPauseTimer() {
      this.$store.commit("runOrPauseTimer");
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
