<template>    
    <div>
        <v-app-bar            
            app
            color="#ffffff"
            height="80"
            class="theNav"
        >            
            <v-avatar :tile="true">
                <img :src="require('@/assets/logo_mono.png')" alt="logo">
            </v-avatar>
            <v-toolbar flat color="#ffffff" class="toolbar--text">
                
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

                <UserMenu :user="user"></UserMenu>

            </v-toolbar>
        </v-app-bar>     
        

    </div>
    
</template>
<script>
import UserMenu from '@/components/UserMenu'
import {mapGetters} from 'vuex'
export default {
    components:{
        UserMenu
    },    
    computed:{
        ...mapGetters({
            'user': 'auth/authUser'
        })
    }
        
}
</script>
<style lang="scss" scoped>

.toolbar--text{
    font-size: 34px;
    font-weight: 400;
}




//OVERRIDEN VUETIFY CLASSES


.v-input input {
    max-height: 32px !important;
    font-size: 14px !important;
}

.theNav{
    box-shadow: none !important;    
    border-bottom: 2px solid !important;
    border-bottom-color: #4496E8 !important;
    border-radius: 0px !important;
}

.theme--light.v-sheet {
    border-radius: 0px !important;
    border-top-left-radius: 0px !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
}

</style>