<template>
  <v-container class="container-IFC">
    <v-row no-gutters>
      <v-col class="label-IFC"> {{ label }} </v-col>
      <v-col>
        <v-menu>
          <template v-slot:activator="{ props }">
            <div v-bind="props" class="rounded-sq" ref="shapeModel"></div>
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
  props: ["modelValue", "label"],
  emits: ["update:modelValue"],
  data() {
    return {
      pickedColor: "",
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(inputColor) {
        this.setUIShapeColor();
        this.pickedColor = inputColor;
      },
    },
    pickedColor() {
      this.$emit("update:modelValue", this.pickedColor);
    },
  },
  methods: {
    setUIShapeColor() {
      this.$nextTick(() => {
        const shape = this.$refs.shapeModel;

        if (shape) {
          shape.style.backgroundColor = this.pickedColor;
        }
      });
    },
    resetModelValue() {
      const defaultColor = this.$vuetify.theme.current.colors.background;
      this.pickedColor = defaultColor;
    },
  },
};
</script>
<style scoped>
.rounded-sq {
  cursor: pointer;
  height: 30px;
  width: 100%;
  border-radius: 5px;
  border: 2px solid white;
}
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
