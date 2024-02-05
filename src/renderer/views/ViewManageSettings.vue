<template>
  <v-container fluid>
    <div v-if="loadingSettings">
      <h2>Loading...</h2>
    </div>
    <div v-if="!loadingSettings">
      <v-form ref="form" @submit="updateSettings" @submit.prevent>
        <InputFieldTime v-model="settings.workDuration" label="Work duration" />
        <InputFieldTime v-model="settings.restDuration" label="Rest duration" />
        <v-checkbox
          density="comfortable"
          v-model="settings.wantsTrayMsgWhenTimerElapsed"
          label="Display message in taskbar upon timer elapse."
          hide-details
        ></v-checkbox>
        <v-checkbox
          density="comfortable"
          v-model="settings.wantsMaxWhenTimerElapsed"
          label="Maximize upon timer elapse."
          hide-details
        ></v-checkbox>
        <v-checkbox
          density="comfortable"
          v-model="settings.wantsMinWhenTimerStart"
          label="Minimize when timer starts."
          hide-details
        ></v-checkbox>

        <InputFieldColor
          v-model="settings.bgHexTimerRunning"
          label="BG color when timer is running."
        />
        <InputFieldColor
          v-model="settings.bgHexTimerPaused"
          label="BG color when timer is paused."
        />
        <br />
        <v-btn variant="tonal" type="submit">Save & Apply</v-btn>
      </v-form>
    </div>
  </v-container>
  <!-- todo: make it possible to enter "unset" as a value for the bgHex fields. unset resets the colors. -->
</template>
<script>
import InputFieldColor from "../components/InputFieldColor.vue";
import InputFieldTime from "../components/InputFieldTime.vue";

export default {
  components: {
    InputFieldTime,
    InputFieldColor,
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
.color-field {
  max-width: 200px;
}
.PositiveNumberField {
  max-width: 170px;
}
</style>
