<template>
  <v-container>
    <v-text-field
      label="Work duration (s)"
      v-model="workDuration"
    ></v-text-field>
    <v-text-field
      label="Rest duration (s)"
      v-model="restDuration"
    ></v-text-field>
  </v-container>
</template>
<script>
import { SettingsController } from "../";
export default {
  data() {
    return {
      workDuration: 5,
      restDuration: 2,
      wantsMaxWhenTimerDone: false,
      wantsMinWhenTimerStart: false,
    };
  },
};
</script>
<style lang=""></style>
