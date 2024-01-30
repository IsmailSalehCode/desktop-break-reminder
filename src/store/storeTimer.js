import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    secondsRemaining: 0,
    // 1-working, 0-resting
    // mode: 1, maybe leave that to vue component?
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
    initTimer(state, inputDuration) {
      state.secondsRemaining = inputDuration;
      store.commit("runTimer");
    },
  },
});

export default store;
