<template>
  <div id="navigation">
    <v-app-bar density="compact" class="bg-black">
      <v-toolbar-items>
        <v-btn
          color="white"
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
        >
          {{ item.title }}
        </v-btn>
        <v-btn @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
import { useTheme } from "vuetify";

export default {
  setup() {
    const theme = useTheme();

    return { theme };
  },
  data() {
    return {
      menuItems: [
        { title: "Main", path: "/" },
        { title: "Settings", path: "/settings" },
      ],
    };
  },
  methods: {
    toggleTheme() {
      this.theme.global.name.value = this.theme.global.current.value.dark
        ? "light"
        : "dark";
    },
  },
};
</script>
<style>
.appTitleBadge {
  pointer-events: none;
}
</style>
