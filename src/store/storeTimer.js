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
    runTimer(state) {
      state.isPaused = false;
      state.intervalId = setInterval(() => {
        if (state.secondsRemaining > 0) {
          state.secondsRemaining--;
        } else {
          store.commit("togglePause");
        }
      }, 1000);
    },
    pauseTimer(state) {
      state.isPaused = true;
      clearInterval(state.intervalId);
    },
    togglePause(state) {
      const isPaused = state.isPaused;
      if (!isPaused) {
        store.commit("pauseTimer");
      } else {
        store.commit("runTimer");
      }
    },
    async toggleMode(state) {
      const isWorking = state.isWorking;
      if (isWorking) {
        const restDuration = await SettingsController.getSpecificSetting(
          "restDuration"
        );
        state.secondsRemaining = restDuration;
      } else {
        const workDuration = await SettingsController.getSpecificSetting(
          "workDuration"
        );
        state.secondsRemaining = workDuration;
      }
      state.isWorking = !state.isWorking;
      store.commit("runTimer");
    },
    // initTimer(state, inputDuration) {
    //   state.secondsRemaining = inputDuration;
    //   store.commit("runTimer");
    // },
  },
  getters: {
    async getRestDuration() {
      this.settings = await SettingsController.getAllSettings();
    },
  },
});

export default store;
