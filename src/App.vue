<template>
  <v-app>
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
export default {
  components: { AppBar, AppFooter },
  created() {
    // prevent blank page in Electron build
    this.$router.push("/");
  },
  methods: {
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
