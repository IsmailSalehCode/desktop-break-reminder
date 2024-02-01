import Vuex from "vuex";
import { SettingsController } from "../persistent-data/dbController";

function handleError(err) {
  console.error(err);
  showAlert("error", err.message);
}

function showAlert(type, msg) {
  window.electronAPI.showAlert(type, msg);
}

const store = new Vuex.Store({
  state: {
    secondsRemaining: 0,
    isWorking: 1,
    isPaused: true,
    intervalId: null,
    settings: {},
  },
  actions: {
    async getSpecificSetting(settingName) {
      try {
        return await SettingsController.getSpecificSetting(settingName);
      } catch (err) {
        handleError(err);
      }
    },
    async getSettings({ commit }) {
      try {
        const newSettings = await SettingsController.getAllSettings();
        commit("setSettings", newSettings);
        return this.getters.settings;
      } catch (err) {
        handleError(err);
      }
    },
    async updateSettings({ commit }, newSettings) {
      try {
        await SettingsController.updateSettings(newSettings);
        commit("setSettings", newSettings);
        showAlert("info", "Done!");
      } catch (err) {
        handleError(err);
      }
    },
    async initWorkSeconds({ commit }) {
      await this.dispatch("getSettings");
      const workDuration = this.getters.settings.workDuration;
      commit("setSecondsRemaining", workDuration);
      //everything is set up but timer refuses to autostart. Even if isPaused=false :( . Проблемът е в runOrPauseTimer
      // commit("runOrPauseTimer");

      // commit("toggleMode");
      //=======================
    },
  },
  mutations: {
    setSettings(state, newSettings) {
      state.settings = newSettings;
    },
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
  getters: {
    settings(state) {
      return state.settings;
    },
    isTimerElapsed(state) {
      return state.secondsRemaining === 0;
    },
    icon_playPause(state) {
      return state.isPaused ? "mdi-play" : "mdi-pause";
    },
    strCurrTimerMode(state, getters) {
      if (getters.isTimerElapsed) {
        return "Waiting for input.";
      }
      let result = state.isWorking ? "Work" : "Rest";
      const isPaused = state.isPaused;

      if (isPaused) {
        result = result.concat(".");
      } else {
        result = result.concat("ing ...");
      }
      return result;
    },
    verb_nextMode(state) {
      let result = state.isWorking ? "resting" : "working";
      return result;
    },
  },
});

export default store;
