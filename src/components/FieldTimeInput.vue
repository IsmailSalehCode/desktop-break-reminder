<template>
  <v-container>
    <v-row
      >{{ label }}
      <v-text-field
        variant="underlined"
        :placeholder="placeholderTimeField"
        class="two-digit-field"
        v-model="hours"
        label="H"
        :rules="rules"
        hide-details
      ></v-text-field>
      <v-text-field
        variant="underlined"
        :placeholder="placeholderTimeField"
        class="two-digit-field"
        v-model="minutes"
        label="m"
        :rules="rules"
        hide-details
      ></v-text-field>
      <v-text-field
        variant="underlined"
        :placeholder="placeholderTimeField"
        class="two-digit-field"
        v-model="seconds"
        label="s"
        :rules="rules"
        hide-details
      ></v-text-field>
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
      hours: null,
      minutes: null,
      seconds: null,
      placeholderTimeField: "00",
    };
  },
  watch: {
    totalSeconds() {
      this.$emit("update:modelValue", this.totalSeconds);
    },
    modelValue() {
      const inputSeconds = this.modelValue;
      const inputHours = Math.floor(inputSeconds / 3600);
      const inputMinutes = Math.floor((inputSeconds % 3600) / 60);
      const inputRemainingSeconds = inputSeconds % 60;
      this.hours = inputHours;
      this.minutes = inputMinutes;
      this.seconds = inputRemainingSeconds;
    },
  },
  computed: {
    totalSeconds() {
      const hours = this.hours;
      const minutes = this.minutes;
      const seconds = this.seconds;
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      console.log("total seconds in FieldTimeInput: ", totalSeconds);
      return totalSeconds;
    },
  },
};
</script>
<style scoped>
.two-digit-field {
  max-width: 50px;
}
</style>
