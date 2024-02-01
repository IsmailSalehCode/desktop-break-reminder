<template>
  <v-container>
    <v-row>
      <v-col class="label-FTI"> {{ label }} </v-col>
      <v-text-field
        type="number"
        min="0"
        max="99"
        @update:model-value="updateTotalSeconds"
        variant="underlined"
        class="two-digit-field"
        v-model="hours"
        label="H"
        :rules="rules"
        hide-details
      ></v-text-field>
      <v-text-field
        type="number"
        min="0"
        max="59"
        @update:model-value="updateTotalSeconds"
        variant="underlined"
        class="two-digit-field"
        v-model="minutes"
        label="m"
        :rules="rules"
        hide-details
      ></v-text-field>
      <v-text-field
        type="number"
        min="0"
        max="59"
        @update:model-value="updateTotalSeconds"
        variant="underlined"
        class="two-digit-field"
        v-model="seconds"
        label="s"
        :rules="rules"
        hide-details
      ></v-text-field>
      {{ totalSeconds }}
    </v-row>
  </v-container>
</template>
<script>
import {
  required,
  isPositiveWholeNumber,
  isLessThanMaxNumber,
} from "../rules-fields/rules-common";
export default {
  props: ["modelValue", "label", "rules"],
  emits: ["update:modelValue"],
  data() {
    return {
      rulesTimeField: [required, isPositiveWholeNumber, isLessThanMaxNumber],
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  methods: {
    updateTotalSeconds() {
      // Ensure that hours, minutes, and seconds are non-negative integers
      this.hours = parseInt(this.hours) || 0;
      this.minutes = parseInt(this.minutes) || 0;
      this.seconds = parseInt(this.seconds) || 0;

      this.$emit("update:modelValue", this.totalSeconds);
    },
  },
  watch: {
    // totalSeconds() {
    //   this.$emit("update:modelValue", this.totalSeconds);
    // },
    modelValue: {
      immediate: true,
      handler(inputSeconds) {
        const inputHours = Math.floor(inputSeconds / 3600);
        const inputMinutes = Math.floor((inputSeconds % 3600) / 60);
        const inputRemainingSeconds = inputSeconds % 60;
        this.hours = inputHours;
        this.minutes = inputMinutes;
        this.seconds = inputRemainingSeconds;
      },
    },
  },
  computed: {
    totalSeconds() {
      const hours = this.hours;
      const minutes = this.minutes;
      const seconds = this.seconds;
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      return totalSeconds;
    },
  },
};
</script>
<style scoped>
.two-digit-field {
  max-width: 50px;
}
.label-FTI {
  max-width: fit-content;
  margin-top: auto;
  padding-bottom: 0px;
}
</style>
