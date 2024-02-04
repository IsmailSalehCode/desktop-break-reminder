<template>
  <v-container fluid>
    <div v-if="loadingSettings">
      <h2>Loading...</h2>
    </div>
    <div v-if="!loadingSettings">
      <v-form ref="form" @submit="updateSettings" @submit.prevent>
        <FieldTimeInput v-model="settings.workDuration" label="Work duration" />
        <FieldTimeInput v-model="settings.restDuration" label="Rest duration" />
        <v-checkbox
          density="compact"
          v-model="settings.wantsTrayMsgWhenTimerElapsed"
          label="Display message in taskbar upon timer elapse."
          hide-details
        ></v-checkbox>
        <v-checkbox
          density="compact"
          v-model="settings.wantsMaxWhenTimerElapsed"
          label="Maximize upon timer elapse."
          hide-details
        ></v-checkbox>
        <v-checkbox
          density="compact"
          v-model="settings.wantsMinWhenTimerStart"
          label="Minimize when timer starts."
          hide-details
        ></v-checkbox>
        <v-checkbox
          density="compact"
          v-model="settings.wantsThemeToggleWhenTimerPaused"
          label="Toggle app theme when timer is inactive."
          hide-details
        ></v-checkbox>
        <v-btn variant="tonal" type="submit">Save & Apply</v-btn>
      </v-form>
    </div>
  </v-container>
  <!-- todo: hex color picker field -->
  <!-- todo: add bgHexTimerRunning field -->
</template>
<script>
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
        this.loadingSettings = true;
        await this.$store.dispatch("updateSettings", this.settings);
        this.loadingSettings = false;
      }
    },
  },
  data() {
    return {
      loadingSettings: true,
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
