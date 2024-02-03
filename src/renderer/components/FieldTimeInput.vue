<template>
  <v-container class="container-FTI">
    <v-row no-gutters>
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
      <v-col class="time-field-delimiter">:</v-col>
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
      <v-col class="time-field-delimiter">:</v-col>

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
    <!-- <p>Total Seconds: {{ totalSeconds }}</p> -->
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
      capInputSeconds: 86400, //24 hrs
    };
  },
  methods: {
    updateTotalSeconds() {
      this.hours = parseInt(this.hours) || 0;
      this.minutes = parseInt(this.minutes) || 0;
      this.seconds = parseInt(this.seconds) || 0;

      this.$emit("update:modelValue", this.totalSeconds);
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(inputSeconds) {
        if (inputSeconds > this.capInputSeconds) {
          this.$emit("update:modelValue", this.capInputSeconds);
          inputSeconds = this.capInputSeconds;
        }
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
.container-FTI {
  max-width: fit-content;
  margin: 0px;
  padding: 16px 0px;
}
.time-field-delimiter {
  align-self: center;
  text-align: center;
}
.two-digit-field {
  width: 55px;
}
.label-FTI {
  max-width: fit-content;
  font-weight: bold;
  margin-right: 15px;
}
</style>
