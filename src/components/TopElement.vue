<template>
    <v-container>
            <v-row>
                <v-col>
                    <div class="row" md="4">                                                                              
                        <v-col md="4">
                            <v-img :src="restaurant.logo" max-height="120" contain class="align-self-start" position="start"></v-img>    
                        </v-col>
                    </div>
                    <div class="row">                                                                              
                        <v-col md="3">
                            <h1 class="titles">{{ restaurant.name }}</h1>
                            <h2 class="top__subtitle">{{ restaurant.description }}</h2>      
                            <div>
                                <v-chip  v-for="(tag, index) in restaurant.tags" :key="index"
                                    class="ma-1 top-chips"
                                    
                                >
                                    {{ tag }}
                                </v-chip>
                            </div>
                        </v-col>   

                        <v-col md="4">                                                                          
                            <div><v-icon class="summary--icon">mdi-clock-outline</v-icon><span v-bind:class="{closed:!isOpen}"> <span class="summary--features"> Horario de atención: {{ openingTime }} </span> </span></div>    
                            <div><v-icon class="summary--icon">mdi-map-marker</v-icon><span class="summary--features">{{ restaurant.address }}, {{ restaurant.zipCode }}, {{ restaurant.city }}</span></div>    
                            <div><v-icon v-if="restaurant.delivery" class="summary--icon">mdi-moped</v-icon><span class="summary--features">Con reparto</span> <v-icon class="summary--icon">mdi-basket</v-icon> <span class="summary--features">Recogida en local</span></div>    
                            <div></div>
                        </v-col>                            

                        <v-col md="5">  
                            <v-img :src="restaurant.image" max-height="228" contain position="right"></v-img>  
                        </v-col>                            
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

.top-chips{
    background-color: #4595E6 !important; 
    color: #F2F2F2 !important;
}

.top__title{
    font-size: 24px;
    font-weight: 500;
}

.top__subtitle{
    font-size: 16px;
    font-weight: 400;
    color: #808080;
}

</style>