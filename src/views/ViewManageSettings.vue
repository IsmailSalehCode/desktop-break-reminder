<template>
  <v-container fluid>
    <v-form
      :loading="loadingSettings"
      ref="form"
      @submit="updateSettings"
      @submit.prevent
    >
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
        v-model="settings.wantsMaxWhenTimerElapsed"
        label="Maximize app window when timer has elapsed."
      ></v-checkbox>
      <v-checkbox
        density="compact"
        v-model="settings.wantsMinWhenTimerStart"
        label="Minimize app window when timer starts."
      ></v-checkbox>
      <v-text-field
        style="max-width: 200px"
        v-model="settings.hexBackgroundColorWhenTimerElapsed"
        label="Hex of BG upon timer elapse"
        :rules="rulesHex"
      ></v-text-field>
      <v-btn variant="tonal" type="submit">Save & Apply</v-btn>
    </v-form>
  </v-container>
</template>
<script>
import { SettingsController } from "../persistent-data/dbController";
import {
  required,
  isPositiveWholeNumber,
  isLessThanMaxNumber,
  isValidHexCode,
} from "../rules-fields/rules-common";

export default {
  mounted() {
    this.getSettings();
  },
  methods: {
    async getSettings() {
      this.settings = await SettingsController.getAllSettings();
    },
    async updateSettings() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.loadingSettings = true;
        const result = await SettingsController.updateSettings(this.settings);
        if (result instanceof Error) {
          console.error(result);
        } else {
          window.electronAPI.showAlert("Settings have been updated.");
        }
        this.loadingSettings = false;
      }
    },
  },
  data() {
    return {
      loadingSettings: true,
      rulesTimeDuration: [required, isPositiveWholeNumber, isLessThanMaxNumber],
      rulesHex: [required, isValidHexCode],
      settings: null,
    };
  },
};
</script>
<style>
.PositiveNumberField {
  max-width: 170px;
}
</style>
