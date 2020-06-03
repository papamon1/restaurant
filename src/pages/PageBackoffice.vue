<template>
    <div>
        <BackofficeSideMenu></BackofficeSideMenu>        
        <div style="margin-left:250px;">                
            <TheNav></TheNav>                   
                <router-view :key="$route.path" />            
            <TheFooter />    
        </div>        
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import TheNav from '@/components/TheNav';
import TheFooter from '@/components/TheFooter'
import BackofficeSideMenu from '@/components/backoffice/BackofficeSideMenu'

export default {    
    components:{    
        TheFooter, TheNav, BackofficeSideMenu
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
      ...mapGetters({
        'openingTime': 'restaurants/getOpeningTime'   
      }), 
      isOpen(){          
        var ahora = new Date()
        if (ahora.getHours()<16){
            return ahora.getHours() >= parseInt(this.restaurant.openingTime[ahora.getDay()].lunch.opening) && ahora <= parseInt(this.restaurant.openingTime[ahora.getDay()].lunch.closing) 
        }else{
            return ahora.getHours() >= parseInt(this.restaurant.openingTime[ahora.getDay()].dinner.opening) && ahora <= parseInt(this.restaurant.openingTime[ahora.getDay()].dinner.closing) 
        }
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
<style scoped lang="scss">

.content-backoffice{
    margin-top: 2rem;
    margin-left: 260px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    width: -webkit-fill-available;
}

</style>