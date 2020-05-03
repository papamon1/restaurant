<template>
    <v-footer
      dark
      padless      
      class="mt-2"
    >
      <v-card
        flat
        tile
        class="yellow lighten-1 black--text text-center"
        style="width:100%;"
      >
        <v-card-text>
          <v-btn                        
            class="mx-4 black--text"
            icon
          >
            <v-icon size="24px"></v-icon>
          </v-btn>
        </v-card-text>
  
        <v-card-text class="black--text pt-0">
          PapaMono
        </v-card-text>
  
        <v-divider></v-divider>
  
        <v-card-text class="black--text">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>