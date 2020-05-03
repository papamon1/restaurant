<template>    
    <div>
        <v-app-bar            
            app
            dark                                     
        >            
            <v-avatar :tile="true">
                <img :src="require('@/assets/logo_mono.png')" alt="logo">
            </v-avatar>
            <v-toolbar flat>
                
                <v-toolbar-title>
                    <router-link :to="{name: 'PageRestaurant', params:{id:'5e835a751c9d440000fface6'}}" class="navbar-item">
                        LPA
                    </router-link>
                    <router-link :to="{name: 'PageRestaurant', params:{id:'5e8f5702f274465fbe1dd326'}}" class="navbar-item">
                        RESTAURANTE LAVAPIES
                    </router-link>
                    <router-link :to="{name: 'PageRestaurant', params:{id:'5e90eb87c7c06b37a663d188'}}" class="navbar-item">
                        BUDDY HOLLY
                    </router-link>
                </v-toolbar-title>                                    

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>
        </v-app-bar>
        <v-parallax height="350" src="https://res.cloudinary.com/glovoapp/w_1200,f_auto,q_auto/Stores/witqe1qslfrrj9kp3dm6"></v-parallax>
    </div>
    
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>