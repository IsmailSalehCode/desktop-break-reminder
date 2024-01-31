<template>
  <v-app theme="dark">
    <AppBar />
    <v-main>
      <router-view
        @max="maximize"
        @min="minimize"
        @bring-to-front="bringToFront"
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
  methods: {
    async getSetting(setting) {
      return await SettingsController.getSpecificSetting(setting);
    },
    async get_wantsMaxWhenTimerElapsed() {
      return await this.getSetting("wantsMaxWhenTimerElapsed");
    },
    async get_wantsMinWhenTimerStart() {
      return await this.getSetting("wantsMinWhenTimerStart");
    },
    async get_hexBackgroundColorWhenTimerElapsed() {
      return await this.getSetting("hexBackgroundColorWhenTimerElapsed");
    },
    bringToFront() {
      window.electronAPI.bringMainWindowToFront();
    },
    async maximize() {
      const wantsMax = await this.get_wantsMaxWhenTimerElapsed();
      console.log(wantsMax);
      if (wantsMax) {
        window.electronAPI.maximizeMainWindow();
      }
    },
    async minimize() {
      const wantsMin = await this.get_wantsMinWhenTimerStart();
      if (wantsMin) {
        window.electronAPI.minimizeMainWindow();
      }
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
