<template>
  <v-app theme="dark">
    <AppBar />
    <v-main>
      <router-view
        @max="maximize"
        @min="minimize"
        @bring-to-front="bringToFront"
        @get-all-settings="getAllSettings"
        :c_settings="settings"
      ></router-view>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar.vue";
import AppFooter from "./components/AppFooter.vue";
import { SettingsController } from "./persistent-data/dbController";

export default {
  components: { AppBar, AppFooter },
  created() {
    // prevent blank page in Electron build
    this.$router.push("/");
  },
  mounted() {
    this.getAllSettings();
  },
  data() {
    return {
      settings: {
        workDuration: 0,
        restDuration: 0,
        wantsMaxWhenTimerElapsed: false,
        wantsMinWhenTimerStart: false,
        hexBackgroundColorWhenTimerElapsed: "",
      },
    };
  },
  methods: {
    async getAllSettings() {
      console.log("get all settings hit");
      try {
        this.settings = await SettingsController.getAllSettings();
      } catch (err) {
        console.error(err);
      }
    },
    bringToFront() {
      window.electronAPI.bringMainWindowToFront();
    },
    maximize() {
      window.electronAPI.maximizeMainWindow();
    },
    minimize() {
      window.electronAPI.minimizeMainWindow();
    },
  },
};
</script>

<style>
.v-application {
  font-family: sans-serif, Times;
}
a:-webkit-any-link {
  text-decoration: none;
  transition: all 0.3s;
}
a:-webkit-any-link:hover {
  color: rgb(38, 172, 255);
}
</style>
