<template>
  <v-app>
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
    async onTimerRunning() {
      const wantsMin = await this.$store.dispatch(
        "getSpecificSetting",
        "wantsMinWhenTimerStart"
      );
      if (wantsMin) {
        this.minimize();
      }
    },
    async onTimerPaused() {
      const wantsThemeToggleWhenTimerPaused = await this.$store.dispatch(
        "getSpecificSetting",
        "wantsThemeToggleWhenTimerPaused"
      );
      if (wantsThemeToggleWhenTimerPaused) {
        this.toggleTheme();
      }
    },
    async onTimerElapsed() {
      this.bringToFront();
      const wantsTrayMsgWhenTimerElapsed = await this.$store.dispatch(
        "getSpecificSetting",
        "wantsTrayMsgWhenTimerElapsed"
      );
      if (wantsTrayMsgWhenTimerElapsed) {
        this.showSystemTrayMessage("info", "Yo!", "Time's up!");
      }
      const wantsMax = await this.$store.dispatch(
        "getSpecificSetting",
        "wantsMaxWhenTimerElapsed"
      );
      if (wantsMax) {
        this.maximize();
      }
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
