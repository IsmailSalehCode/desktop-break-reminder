<template>
  <v-footer bottom absolute app theme="dark">
    <v-col>
      <v-row justify="center">
        <v-col
          cols="12"
          style="
            text-align: center;
            text-wrap: balance;
            letter-spacing: 2px;
            font-size: smaller;
          "
        >
          &#169; {{ yearCreated }} -
          <a :href="linkMe" target="_blank">Ismail Saleh</a>
        </v-col>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      yearCreated: 2024,
      linkMe: "https://github.com/IsmailSalehCode",
    };
  },
};
</script>
