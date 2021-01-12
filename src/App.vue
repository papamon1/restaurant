<template>
  <v-app>
    <div v-if="!isAdmin">
      <!-- <TheNav></TheNav>         -->
      <v-content>
        
          <router-view :key="$route.path" />
        
      </v-content>
      <TheFooter></TheFooter>
    </div>     
    <div v-if="isAdmin">
      <PageBackoffice></PageBackoffice>
    </div>   
  </v-app>
</template>

<script>

// import TheNav from '@/components/TheNav';
import TheFooter from '@/components/TheFooter'
import PageBackoffice from '@/pages/PageBackoffice'

export default {
  name: 'App',

  components: {
    /*TheNav,*/ TheFooter, PageBackoffice
  },
  created(){    
  },
  data(){
    return{      
    }
  },
  computed:{
    isAdmin(){
      return this.$store.state.admin
    }
  }
};
</script>
<style lang="scss">
@import './styles/_variables.scss';
#app {
  font-family: 'Montserrat', sans-serif;
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  //this is where we use the variable
  color: $primary;
  
}

</style>
