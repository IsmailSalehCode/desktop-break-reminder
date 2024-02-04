<template>
  <v-app ref="appContainer">
    <AppBar @toggle-theme="toggleTheme" />
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
import { useTheme } from "vuetify";

export default {
  components: { AppBar, AppFooter },
  created() {
    // prevent blank page in Electron build
    this.$router.push("/");
  },
  async mounted() {
    await this.$store.dispatch("initWorkSeconds");
  },
  setup() {
    const theme = useTheme();

    return { theme };
  },
  data() {
    return {
      appHexBG: "default",
    };
  },
  methods: {
    async setPausedBGColor(isPaused) {
      let newBGColor;
      if (isPaused) {
        newBGColor = await this.getSpecificSetting("bgHexTimerPaused");
      } else {
        newBGColor = await this.getSpecificSetting("bgHexTimerRunning");
      }
      this.changeHexBGColor(newBGColor);
    },

    async getSpecificSetting(settingName) {
      return await this.$store.dispatch("getSpecificSetting", settingName);
    },
    async onTimerRunning() {
      const wantsMin = await this.getSpecificSetting("wantsMinWhenTimerStart");
      if (wantsMin) {
        this.minimize();
      }
      this.setPausedBGColor(false);
    },
    async onTimerPaused() {
      this.setPausedBGColor(true);
    },
    async onTimerElapsed() {
      this.bringToFront();
      const wantsTrayMsgWhenTimerElapsed = await this.getSpecificSetting(
        "wantsTrayMsgWhenTimerElapsed"
      );
      if (wantsTrayMsgWhenTimerElapsed) {
        this.showSystemTrayMessage("info", "Yo!", "Time's up!");
      }
      const wantsMax = await this.getSpecificSetting(
        "wantsMaxWhenTimerElapsed"
      );
      if (wantsMax) {
        this.maximize();
      }
    },
    changeHexBGColor(newHexCode) {
      this.$refs.appContainer.$el.style.backgroundColor = newHexCode;
    },
    toggleTheme() {
      this.theme.global.name.value = this.theme.global.current.value.dark
        ? "light"
        : "dark";
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
    showSystemTrayMessage(pIconType, pTitle, pContent) {
      window.electronAPI.showSystemTrayMessage({
        iconType: pIconType,
        title: pTitle,
        content: pContent,
      });
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
