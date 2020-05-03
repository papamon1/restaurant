<template>
    <div>
        <v-container>
            <v-row>
                <v-col  cols="12" md="4">
                        <div class="row">                                                                              
                            <v-col cols="12" lg="8">
                                <v-img :src="restaurant.logo" max-height="120" contain></v-img>       
                                <h1 class="top__title">{{ restaurant.name }}</h1>
                                <h2 class="top__subtitle">{{ restaurant.description }}</h2>      
                                <div>
                                    <v-chip  v-for="(tag, index) in restaurant.tags" :key="index"
                                        class="ma-1 top__chips"
                                        color="#4496E8"
                                    >
                                        {{ tag }}
                                    </v-chip>
                                </div>
                            </v-col>    
                        </div>                                            
                </v-col>
                <v-col  cols="12" md="4" class="align-self-end">      
                    <div class="row">
                        <v-col cols="12">
                            <div><v-icon color="#4496E8">mdi-clock-outline</v-icon><span v-bind:class="{closed:!isOpen}"> <strong> Horario de pedidos: </strong>{{ restaurant.opening }} - {{ restaurant.closing }} </span></div>                   
                            <v-icon color="#4496E8" v-if="restaurant.delivery">mdi-moped</v-icon>Local con reparto     
                            <v-icon color="#4496E8" v-if="restaurant.takeaway">mdi-basket</v-icon> Recogida   
                        </v-col>
                    </div>                                      
                </v-col>
            </v-row>            
        </v-container>
        <v-container class="mb-4">
            <v-row class="justify-space-between">
                <v-col md="2">
                    <CategoriesSidebar :cart="cart" class="sticky"></CategoriesSidebar>
                </v-col>
                <v-col md="6">        
                    <ProductList :products="products" @productClicked="openProduct"></ProductList>                              
                </v-col>
                <v-col md="3">
                    <CartSidebar :cart="cart" @onCartElementRemoved="showSnackbar" class="sticky"></CartSidebar>
                </v-col>
            </v-row>                
        </v-container>
        
    
        
        <ProductNewDialog :isOpen="modalProduct" @closeModal="modalProduct=!modalProduct" @onElementAdded="addCartElementHandler" :product="products[clickedProduct]"/>        
        <v-snackbar
            top
            :timeout=2500
            v-model="snackbar.show"
            color="success"
        >
            {{ snackbar.text }}
            <v-btn
            color="black"
            text
            @click="snackbar.show = false"
            >
            Close
            </v-btn>
        </v-snackbar>


    </div>


    


</template>
<script>
import { mapState } from 'vuex'
import ProductList from '@/components/ProductList'
import ProductNewDialog from '@/components/ProductNewDialog'
import CartSidebar from '@/components/CartSidebar'
import CategoriesSidebar from '@/components/CategoriesSidebar'
export default {    
    components:{
        ProductList, ProductNewDialog, CartSidebar, CategoriesSidebar
    },
    data(){
        return{
            modalAlergen:false,
            modalProduct:false,
            clickedProduct:0,
            snackbar:{
                show:false,
                text:''
            }
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
        cart: state => state.cart.items,        
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
        },        
        showSnackbar(msg){
            this.snackbar.text=msg
            this.snackbar.show=true
        },
        addCartElementHandler(msg){
            this.modalProduct=!this.modalProduct
            this.showSnackbar(msg)
        },       
    }
}
</script>
<style scoped>

.closed{
    background-color: rgb(255, 0, 0, .7);
}

.empty{
    background-color: bisque;
}

.sticky{
    position: sticky;
    top: 6rem;
}

.cont{
    padding-right: 3rem;
    padding-left: 3rem;
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

.top__chips{
    max-height: 9px;
    font-size: 8px !important;
    font-weight: 300;
    color: #F2F2F2 !important;    
}

</style>