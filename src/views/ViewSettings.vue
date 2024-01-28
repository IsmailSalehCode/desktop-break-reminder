<template>
  <v-container>
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
        label="Maximize when timer has elapsed."
      ></v-checkbox>
      <v-checkbox
        density="compact"
        v-model="settings.wantsMinWhenTimerStart"
        label="Minimize when timer starts."
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
      console.log(storedSettings);
      this.settings = storedSettings;
      console.log(this.settings);
    },
    async updateSettings() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const settingsjson = JSON.stringify(this.settings);
        const result = await SettingsController.updateSettings(settingsjson);
        if (result instanceof Error) {
          console.error(result);
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
