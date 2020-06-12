<template>
    <div>
        <TopElement :restaurant=restaurant></TopElement>
        <hr style="margin-top: 64px;">
        <v-container class="mb-4">
            <v-row class="justify-space-between">
                <v-col md="2">
                    <CategoriesSidebar class="sticky"></CategoriesSidebar>
                </v-col>
                <v-col md="6">        
                    <ProductList :products="products" @productClicked="openProduct"></ProductList>                              
                </v-col>
                <v-col md="3">
                    <CartSidebar :isOnlyInfo=false :cart="cart" @onCartElementRemoved="cartRemoveItemHandler" @onCartElemenAmountAdded="cartAddItemHandler" class="sticky"></CartSidebar>
                </v-col>
            </v-row>                
        </v-container>
        
    
        
        <ProductNewDialog :isOpen="modalProduct" @closeModal="modalProduct=!modalProduct" @onElementAdded="msgCartElementHandler"  :product="products[clickedProduct]"/>        
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
import TopElement from '@/components/TopElement'
export default {    
    components:{
        ProductList, ProductNewDialog, CartSidebar, CategoriesSidebar, TopElement
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
        this.$socket.on('holi',this.getSocket)
    },
    computed: {
      ...mapState({
        restaurant: state => state.restaurants.item,        
        products: state => state.products.items,        
        cart: state => state.cart.items,        
      }),            
    },
    methods:{        
        getSocket(saludo){            
            console.log(saludo.saludo)
            alert(saludo.saludo)
        },
        openProduct(productId){
            //Localizo el index del producto, y envío a la ventana de dialogo dicho producto por su index            
            this.clickedProduct=this.products.findIndex((product)=>{
                return product._id === productId;
            })
            this.modalProduct=true
            this.$socket.emit('test', 'JGil')
            
        },        
        showSnackbar(msg){
            this.snackbar.text=msg
            this.snackbar.show=true
        },
        msgCartElementHandler(msg){            
            this.modalProduct=!this.modalProduct
            this.showSnackbar(msg)
        },
        cartAddItemHandler(index, msg){
            this.$store.dispatch('cart/addAmountCartElement', index)
            this.showSnackbar(msg)
        },
        cartRemoveItemHandler(index,msg){
            this.$store.dispatch('cart/removeCartElement', index)
            this.showSnackbar(msg)
        }               
    }
}
</script>
<style scoped lang="scss">

.closed{
    background-color: rgb(255, 0, 0);
}

.empty{
    background-color: bisque;
}

.sticky{
    position: sticky;
    top: 6rem;
}


.top__chips{
    max-height: 9px;
    font-size: 8px !important;
    font-weight: 300;
    color: #F2F2F2 !important;    
}

</style>