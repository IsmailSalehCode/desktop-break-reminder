<template>
  <v-app theme="dark" ref="appContainer">
    <AppBar />
    <v-main>
      <router-view
        @timer-elapsed="onTimerElapsed"
        @timer-running="onTimerRunning"
        @timer-paused="onTimerPaused"
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
  async mounted() {
    await this.$store.dispatch("initWorkSeconds");
  },
  data() {
    return {
      appHexBG: "default",
    };
  },
  methods: {
    async onTimerRunning() {
      const wantsMin = await this.get_wantsMinWhenTimerStart();
      if (wantsMin) {
        this.minimize();
      }
      const bgHex = await this.getSetting("bgHexTimerRunning");
      this.changeHexBGColor(bgHex);
    },
    async onTimerPaused() {
      const bgHex = await this.getSetting("bgHexTimerPaused");
      this.changeHexBGColor(bgHex);
    },
    async onTimerElapsed() {
      this.bringToFront();
      const wantsMax = await this.get_wantsMaxWhenTimerElapsed();
      if (wantsMax) {
        this.maximize();
      }
    },
    changeHexBGColor(newHexCode) {
      this.$refs.appContainer.$el.style.backgroundColor = newHexCode;
    },
    async getSetting(setting) {
      return await SettingsController.getSpecificSetting(setting);
    },
    async get_wantsMaxWhenTimerElapsed() {
      return await this.getSetting("wantsMaxWhenTimerElapsed");
    },
    async get_wantsMinWhenTimerStart() {
      return await this.getSetting("wantsMinWhenTimerStart");
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
