<template>
  <v-app>
    <TheNav></TheNav>

    <v-content>
      <router-view :key="$route.path" />
    </v-content>
  </v-app>
</template>

<script>

import TheNav from '@/components/TheNav';

export default {
  name: 'App',

  components: {
    TheNav
  },

  data: () => ({
    //
  }),
};
</script>
