<template>
    <v-container class="top">
            <v-row class="justify-space-between">
                <v-col md="6">
                    
                    <v-img :src="restaurant.logo" max-height="90" contain class="align-self-start" position="start"></v-img>                                                                    
                    <h1 class="mainTitle" style="display: inline">{{ restaurant.name }}</h1><v-icon class="summary--icon">mdi-map-marker</v-icon><span class="summary--features">{{ restaurant.address }}, {{ restaurant.zipCode }}, {{ restaurant.city }}</span>
                    <h2 class="top__subtitle">{{ restaurant.description }}</h2>      
                    <div class="my-3">
                        <v-chip  v-for="(tag, index) in restaurant.tags" :key="index"
                            class="ma-1 top-chips"                                    
                        >
                            {{ tag }}
                        </v-chip>
                    </div>
                                                                                        
                    <div><v-chip class="top-chips__opening mr-2">Horario: {{ openingTime }}</v-chip>                               
                        <v-icon v-if="restaurant.delivery" class="summary--icon">mdi-moped</v-icon><span class="summary--features">Con reparto</span> 
                        <v-icon class="summary--icon ml-2">mdi-basket</v-icon> <span class="summary--features">Recogida en local</span>    
                    </div>
                                                        
                </v-col>
                <v-col md="5">
                    <div>
                        <v-img :src="restaurant.image" max-height="256" contain position="right"></v-img>      
                    </div>
                    <div class="top__address">
                        <h2 class="secondaryTitle">Dirección de entrega:</h2>
                        <p class="top__subtitle">
                            Calle de Ana María, 9, 2 -A, 28039. Madrid
                            <v-chip outlined class="chip--success">Disponible</v-chip>
                        </p>
                    </div>  
                    
                </v-col>       
                
            </v-row>            
        </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props:{
        restaurant:{
            type:Object,
            required:true
        } 
    },
    computed:{
        ...mapGetters({
        'openingTime': 'restaurants/getOpeningTime'   ,
        'isOpen': 'restaurants/isOpen'   
      }),         
    }
}
</script>
<style lang="scss" scoped>

.top{
    margin-top: 64px;
}

.top-chips{
    background-color: #4595E6 !important; 
    color: #F2F2F2 !important;
}

.top-chips__opening{
    background-color: #02C39A !important; 
    border-color: #02C39A !important;
    color: #F2F2F2 !important;
}

.top__title{
    font-size: 24px;
    font-weight: 500;
}

.top__subtitle{
    font-size: 14px;
    font-weight: 400;
    color: #808080;
}

.top__address{
    margin-top: 24px;
}

.chip--success{
    margin-right:16px;
    color: #02C39A !important;
    border-color: #02C39A !important;
}

</style>