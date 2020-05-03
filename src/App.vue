<template>
  <v-app>
    <TheNav></TheNav>

    <v-content>
      <router-view :key="$route.path" />
    </v-content>

    <TheFooter></TheFooter>
  </v-app>
</template>

<script>

import TheNav from '@/components/TheNav';
import TheFooter from '@/components/TheFooter'

export default {
  name: 'App',

  components: {
    TheNav, TheFooter
  },

  data: () => ({
    //
  }),
};
</script>
