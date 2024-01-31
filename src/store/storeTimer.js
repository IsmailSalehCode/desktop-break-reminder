import Vuex from "vuex";
import { SettingsController } from "../persistent-data/dbController";

const store = new Vuex.Store({
  state: {
    secondsRemaining: 0,
    isWorking: 1,
    isPaused: true,
    intervalId: null,
  },
  actions: {
    async initWorkSeconds({ commit }) {
      const workDuration = await SettingsController.getSpecificSetting(
        "workDuration"
      );
      commit("setSecondsRemaining", workDuration);
      //everything is set up but timer refuses to autostart. Even if isPaused=false :( . Проблемът е в runOrPauseTimer
      // commit("runOrPauseTimer");

      // commit("toggleMode");
      //=======================
    },
  },
  mutations: {
    runOrPauseTimer(state) {
      state.isPaused = !state.isPaused;

      if (state.isPaused) {
        clearInterval(state.intervalId);
      } else {
        state.intervalId = setInterval(() => {
          if (state.secondsRemaining > 0) {
            state.secondsRemaining--;
          } else {
            clearInterval(state.intervalId);
            state.isPaused = true;
          }
        }, 1000);
      }
    },
    toggleMode: async function (state) {
      const isWorking = state.isWorking;
      const restOrWorkDuration = isWorking ? "restDuration" : "workDuration";

      // Clear existing interval before starting a new one
      clearInterval(state.intervalId);

      try {
        const duration = await SettingsController.getSpecificSetting(
          restOrWorkDuration
        );
        store.commit("setSecondsRemaining", duration);
        state.isWorking = !isWorking;

        if (!state.isPaused) {
          store.commit("runOrPauseTimer");
        }
      } catch (error) {
        console.error("Error getting specific setting:", error);
      }
    },
    setSecondsRemaining(state, newDuration) {
      state.secondsRemaining = newDuration;
    },
  },
  methods: {
    async getWorkDuration() {
      return await SettingsController.getSpecificSetting("workDuration");
    },
  },
  getters: {
    isTimerElapsed(state) {
      return state.secondsRemaining === 0;
    },
    verb_playPauseButtonLabel(state) {
      return state.isPaused ? "▶" : "||";
    },
    strCurrTimerMode(state, getters) {
      if (getters.isTimerElapsed) {
        return "Waiting for input.";
      }
      const res = state.isWorking ? "Working" : "Resting";
      const activeMode = res.concat(" ...");
      return state.isPaused ? res : activeMode;
    },
    verb_nextMode(state) {
      return state.isWorking ? "resting" : "working";
    },
  },
});

export default store;
