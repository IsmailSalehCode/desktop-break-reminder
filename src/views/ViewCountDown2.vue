<template>
  <v-container style="text-align: center">
    <v-row class="text-expanding">
      <v-col cols="12"> Current mode: {{ strCurrTimerMode }} </v-col>
      <v-col cols="12"> {{ formatElapsedTime() }} </v-col>
    </v-row>
    <v-row v-if="!isTimerElapsed" style="justify-content: center">
      <v-col class="containerTimerControl">
        <v-btn size="large" @click="replayTimer" icon="mdi-replay"></v-btn>
      </v-col>
      <v-col class="containerTimerControl">
        <v-btn
          size="large"
          @click="runOrPauseTimer"
          :icon="icon_playPause"
        ></v-btn>
      </v-col>
      <v-col class="containerTimerControl">
        <v-btn
          size="large"
          @click="forceElapseTimer"
          icon="mdi-fast-forward"
        ></v-btn>
      </v-col>
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
  emits: ["timer-elapsed", "timer-paused", "timer-running"],
  watch: {
    isTimerElapsed(v) {
      if (v == true) {
        this.$emit("timer-elapsed");
      }
    },
    isPaused(v) {
      if (v == true) {
        this.$emit("timer-paused");
      } else {
        this.$emit("timer-running");
      }
    },
  },
  computed: {
    isTimerElapsed() {
      return this.$store.getters.isTimerElapsed;
    },
    icon_playPause() {
      return this.$store.getters.icon_playPause;
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
    replayTimer() {
      this.$store.dispatch("replayTimer");
    },
    forceElapseTimer() {
      this.$store.commit("setSecondsRemaining", 0);
    },
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

.containerTimerControl {
  max-width: fit-content;
}
</style>
