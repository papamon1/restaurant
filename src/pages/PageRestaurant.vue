<template>
    <div>
        <v-container>
            <v-row no-gutters class="justify-space-between">
                <v-col  cols="12" md="4">
                        <div class="row">
                            <v-col cols="12" lg="4">
                                <v-img :src="restaurant.logo" max-height="120" contain></v-img>
                            </v-col>                    
                            <v-col cols="12" lg="8">
                                <h1 class="title">{{ restaurant.name }}</h1>
                                <h2 class="subtitle-1">{{ restaurant.description }}</h2>
                                <h3 class="subtitle-2"><v-icon v-on="on">mdi-pound-box</v-icon>hamburguesas carne madrid</h3>
                            </v-col>    
                        </div>                                            
                </v-col>
                <v-col  cols="12" md="4" class="align-center">      
                    <div class="row">
                        <v-col cols="12">
                            <p><v-icon v-on="on">mdi-clock-outline</v-icon><span v-bind:class="{red:!isOpen}"> <strong> Horario de pedidos: </strong>{{ restaurant.opening }} - {{ restaurant.closing }} </span></p>                    
                            <p v-if="restaurant.delivery"><v-icon v-on="on">mdi-moped</v-icon>Local con reparto</p>     
                            <p v-if="restaurant.takeaway"><v-icon v-on="on">mdi-basket</v-icon> Recogida</p>     
                        </v-col>
                    </div>                                      
                </v-col>
            </v-row>            
        </v-container>
        <v-container fluid class="mb-4">
            <v-row no-gutters>
                <v-col cols="2" class="empty">
                    <div class="empty">CATEGORIAS</div>   
                </v-col>
                <v-col cols="8">        
                    <ProductList :products="products" @productClicked="openProduct"></ProductList>                              
                </v-col>
                <v-col cols="2" class="empty" md="display-none">
                    <div class="empty">CARRITO</div>   
                </v-col>
            </v-row>                
        </v-container>


        
          <ProductDialog :isOpen="modalProduct" @closeModal="modalProduct=!modalProduct" :product="products[clickedProduct]"/>        
       


    </div>


    


</template>
<script>
import { mapState } from 'vuex'
import ProductList from '@/components/ProductList'
import ProductDialog from '@/components/ProductDialog'
export default {    
    components:{
        ProductList, ProductDialog
    },
    data(){
        return{
            modalAlergen:false,
            modalProduct:false,
            clickedProduct:0
        }
    },
    props:{
        id:{
            type: String,
            required:false
        }
    },
    created(){        
        this.$store.dispatch('restaurants/getRestaurant', this.$route.params.id)
        .then()
    },
    computed: {
      ...mapState({
        restaurant: state => state.restaurants.item,        
        products: state => state.products.items,        
      }),
      isOpen(){
            var ahora = new Date().getHours();
            return ahora >= parseInt(this.restaurant.opening) && ahora <= parseInt(this.restaurant.closing) 
      },      
    },
    methods:{        
        openProduct(productId){
            //Localizo el index del producto, y envío a la ventana de dialogo dicho producto por su index            
            this.clickedProduct=this.products.findIndex((product)=>{
                return product._id === productId;
            })
            this.modalProduct=true
        }
    }
}
</script>
<style scoped>
.empty{
    background-color: bisque;
}
</style>