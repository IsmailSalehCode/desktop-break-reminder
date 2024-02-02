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
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuItems: [
        { title: "Main", path: "/" },
        { title: "Settings", path: "/settings" },
      ],
    };
  },
};
</script>
<style>
.appTitleBadge {
  pointer-events: none;
}
</style>
