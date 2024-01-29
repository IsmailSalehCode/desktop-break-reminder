<template>
  <v-container fluid>
    <v-form ref="form" @submit="updateSettings" @submit.prevent>
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
      <v-checkbox
        density="compact"
        v-model="settings.wantsMaxWhenTimerDone"
        label="Maximize app window when timer has elapsed."
      ></v-checkbox>
      <v-checkbox
        density="compact"
        v-model="settings.wantsMinWhenTimerStart"
        label="Minimize app window when timer starts."
      ></v-checkbox>
      <v-btn type="submit" color="success">Save & Apply</v-btn>
    </v-form>
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
      let storedSettings;
      try {
        storedSettings = await SettingsController.getAllSettings();
      } catch (err) {
        console.error(err);
      }
      this.settings = storedSettings;
    },
    async updateSettings() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const result = await SettingsController.updateSettings(this.settings);
        if (result instanceof Error) {
          console.error(result);
        } else {
          window.electronAPI.showAlert("Settings have been updated.");
        }
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
