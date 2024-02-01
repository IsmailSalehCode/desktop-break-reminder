<template>
  <v-container fluid>
    <div v-if="loadingSettings">
      <h2>Loading...</h2>
    </div>
    <div v-if="!loadingSettings">
      <v-form ref="form" @submit="updateSettings" @submit.prevent>
        <v-text-field
          class="PositiveNumberField"
          label="Work duration (s)"
          v-model="settings.workDuration"
          :rules="rulesTimeDuration"
        ></v-text-field>
        <!-- <v-text-field
          class="PositiveNumberField"
          label="Rest duration (s)"
          v-model="settings.restDuration"
          :rules="rulesTimeDuration"
        ></v-text-field> -->
        <FieldTimeInput
          v-model="settings.restDuration"
          label="Rest duration"
          :rules="rulesTimeDuration"
        />
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
          v-model="settings.bgHexTimerPaused"
          label="BG color when timer paused."
          :rules="rulesHex"
        ></v-text-field>
        <v-btn variant="tonal" type="submit">Save & Apply</v-btn>
      </v-form>
    </div>
  </v-container>
  <!-- todo: hex color picker field -->
  <!-- todo: add bgHexTimerRunning field -->
</template>
<script>
import {
  required,
  isOneOrTwoDigitPositiveWholeNumber,
  isLessThanMaxNumber,
  isValidHexCode,
} from "../rules-fields/rules-common";
import FieldTimeInput from "../components/FieldTimeInput.vue";

export default {
  components: {
    FieldTimeInput,
  },
  mounted() {
    this.getSettings();
  },
  methods: {
    async getSettings() {
      this.loadingSettings = true;
      this.settings = await this.$store.dispatch("getSettings");
      this.loadingSettings = false;
    },
    async updateSettings() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.loadingSettings = true; //todo better loading indication
        await this.$store.dispatch("updateSettings", this.settings);
        this.loadingSettings = false;
      }
    },
  },
  data() {
    return {
      loadingSettings: true,
      rulesTimeDuration: [
        required,
        isOneOrTwoDigitPositiveWholeNumber,
        isLessThanMaxNumber,
      ],
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
