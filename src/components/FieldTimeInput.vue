<!-- <template>
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
</template> -->
<template>
  <v-container>
    <v-row>
      <v-col class="label-FTI"> {{ label }} </v-col>
      <v-col>
        <v-text-field
          variant="underlined"
          class="two-digit-field"
          label="Hours"
          density="compact"
          v-model="hours"
          type="number"
          min="0"
          max="99"
          @input="updateTotalSeconds"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          variant="underlined"
          class="two-digit-field"
          label="Minutes"
          density="compact"
          v-model="minutes"
          type="number"
          min="0"
          max="59"
          @input="updateTotalSeconds"
          hide-details
        />
      </v-col>
      <v-col>
        <v-text-field
          variant="underlined"
          class="two-digit-field"
          label="Seconds"
          density="compact"
          v-model="seconds"
          type="number"
          min="0"
          max="59"
          @input="updateTotalSeconds"
          hide-details
        />
      </v-col>
    </v-row>
    <p>Total Seconds: {{ totalSeconds }}</p>
  </v-container>
</template>
<script>
export default {
  props: ["modelValue", "label", "rules"],
  emits: ["update:modelValue"],
  data() {
    return {
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
  width: 100px;
}
.label-FTI {
  max-width: fit-content;
}
</style>
