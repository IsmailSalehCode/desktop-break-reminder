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
    toggleMode(state) {
      const isWorking = state.isWorking;
      const restOrWorkDuration = isWorking ? "restDuration" : "workDuration";

      // Clear existing interval before starting a new one
      clearInterval(state.intervalId);

      SettingsController.getSpecificSetting(restOrWorkDuration).then(
        (duration) => {
          state.secondsRemaining = duration;
          state.isWorking = !isWorking;
          store.commit("runOrPauseTimer");
        }
      );
    },
  },
});

export default store;
