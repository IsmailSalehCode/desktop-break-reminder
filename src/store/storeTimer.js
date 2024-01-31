import Vuex from "vuex";
import { SettingsController } from "../persistent-data/dbController";

const store = new Vuex.Store({
  state: {
    secondsRemaining: 0,
    isWorking: 1,
    isPaused: false,
    intervalId: null,
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
        state.secondsRemaining = duration;
        state.isWorking = !isWorking;

        if (!state.isPaused) {
          store.commit("runOrPauseTimer");
        }
      } catch (error) {
        console.error("Error getting specific setting:", error);
      }
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
      return res.concat(" ...");
    },
    verb_nextMode(state) {
      return state.isWorking ? "resting" : "working";
    },
  },
});

export default store;
