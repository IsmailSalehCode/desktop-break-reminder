<template>
  <v-footer bottom absolute app theme="dark">
    <v-col>
      <v-row justify="center">
        <v-col
          cols="12"
          style="
            font-size: 0.8rem;
            text-align: center;
            text-wrap: balance;
            font-weight: bold;
            letter-spacing: 3px;
          "
        >
          &#169; {{ yearCreated }} -
          <a :href="linkMe" target="_blank">Исмаил Салех</a>
          <!-- what to do with the bg text here TODO: should i add bg.pak to locales? electron-builder.json-->
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
