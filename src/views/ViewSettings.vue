<template>
  <v-container>
    <v-text-field
      class="PositiveNumberField"
      label="Work duration (s)"
      v-model="settings.workDuration"
      :rules="rulesTimeDuration"
    ></v-text-field>
    <v-text-field
      class="PositiveNumberField"
      label="Rest duration (s)"
      v-model="settings.restDuration"
      :rules="rulesTimeDuration"
    ></v-text-field>
  </v-container>
</template>
<script>
import { SettingsController } from "../persistent-data/dbController";
import {
  required,
  isPositiveWholeNumber,
  isLessThanMaxNumber,
} from "../rules-fields/rules-common";

export default {
  mounted() {
    this.getAllSettings();
  },
  methods: {
    async getAllSettings() {
      try {
        this.settings = await SettingsController.getAllSettings();
      } catch (err) {
        console.error(err);
      }
    },
  },
  data() {
    return {
      rulesTimeDuration: [required, isPositiveWholeNumber, isLessThanMaxNumber],
      settings: {
        workDuration: 5,
        restDuration: 2,
        wantsMaxWhenTimerDone: false,
        wantsMinWhenTimerStart: false,
      },
    };
  },
};
</script>
<style>
.PositiveNumberField {
  max-width: 170px;
}
</style>
