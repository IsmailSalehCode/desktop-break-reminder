<template>
  <v-container class="container-IFC">
    <v-row no-gutters>
      <v-col class="label-IFC"> {{ label }} </v-col>
      <v-col>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-text-field v-bind="props" hide-details v-model="pickedColor" />
          </template>
          <v-color-picker
            mode="hex"
            v-model="pickedColor"
            hide-inputs
            show-swatches
          ></v-color-picker>
        </v-menu>
      </v-col>
      <v-col>
        <v-btn
          variant="plain"
          density="comfortable"
          size="small"
          @click="resetModelValue"
          icon
          >↺</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["modelValue", "label", "rules"],
  emits: ["update:modelValue"],
  // mounted() {
  //   this.setShapeCurrColor();
  // },
  data() {
    return {
      pickedColor: "",
      //   hours: 0,
      //   minutes: 0,
      //   seconds: 0,
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(inputColor) {
        this.pickedColor = inputColor;
      },
    },
    pickedColor() {
      console.log(this.pickedColor);
      this.$emit("update:modelValue", this.pickedColor);
    },
  },
  methods: {
    resetModelValue() {
      const defaultColor = this.$vuetify.theme.current.colors.background;
      this.pickedColor = defaultColor;
    },
  },
};
</script>
<style scoped>
.container-IFC {
  max-width: fit-content;
  margin: 0px;
  padding: 16px 0px;
}
.label-IFC {
  max-width: fit-content;
  font-weight: bold;
  margin-right: 15px;
}
</style>
