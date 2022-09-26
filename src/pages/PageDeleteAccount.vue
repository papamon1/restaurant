<template>
  <div class="container">
    <div class="section">
      <h1 class="title">Estamos borrando tu cuenta de usuario...</h1>
      <AppSpinner />
    </div>
  </div>
</template>

<script>
import { USER_ACTIVATED } from '@/helpers/redirectMessages';
import AppSpinner from '@/components/AppSpinner';
export default {
  components: {
    AppSpinner,
  },
  created() {
    this.activateUser();
  },
  methods: {
    activateUser() {
      const { hash } = this.$route.params;
      this.$store
        .dispatch('auth/deleteUser', hash)
        .then(() =>
          this.$router.push({
            path: '/PageSuccessDelete',
            query: { messageType: USER_ACTIVATED.type },
          })
        )
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 50px;
  text-align: center;
  font-family: 'Montserrat', sans-serif !important;
}
</style>
