<template>
    <div      
      class="mx-auto"
    >
      <!-- <v-system-bar
        color="blue darken-2"
        dark
      >
        <v-spacer></v-spacer>
  
        <v-icon>mdi-window-minimize</v-icon>
  
        <v-icon>mdi-window-maximize</v-icon>
  
        <v-icon>mdi-close</v-icon>
      </v-system-bar> -->
  
      <div>
        

        <div class="cart">
          <span class="cart__title">Mi pedido</span>                    
            <span class="cart__total" > Total: </span>
            <transition name="fade">
              <span class="cart__prize" v-if="totalVisible">{{ totalPrice }} € </span>              
            </transition>  
        </div>
  
      </div>
  
      <div>
        <v-row dense>          
          <v-col            
            cols="12"
          >
            <v-card              
              class="ficha"              
            >
              <div v-for="(element, index) in cart" :key="element.key">
                <CartSidebarCard :isOnlyInfo=isOnlyInfo :element="element" :index="index" @onCartElementRemoved="removeCartElement"  @onCartAddedAmount="addAmountCartElement"></CartSidebarCard>                                         
                <div v-if="index+1<cart.length" class="text-center mb-4">-------------------------------------</div>
              </div>
              
              <hr>
              
              <div class="d-flex justify-space-between mt-6 align-end">
                <div class="cart__total--big">Total:</div>
                <div class="cart__prize">{{ totalPrice }} €</div>
              </div>

              <transition name="fade">
                <v-card-actions class="justify-center" v-if="cart.length>0 && isOnlyInfo===false && user">         
                  <v-col cols="12" class="mx-2">               
                    <v-btn to="/order" block dark depressed color="blue">REALIZAR PEDIDO</v-btn>                             
                  </v-col>   
                  
                  <!-- <v-btn color="blue darken-1" text @click="isOpen = false">Save</v-btn> -->
                </v-card-actions>    
              </transition>

              

            </v-card>
          </v-col>
        </v-row>    
        
      </div>        
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import CartSidebarCard from '@/components/CartSidebarCard'
export default {
    components:{
      CartSidebarCard
    },
    props:{        
        cart:{
          type:Array,
          required:true
        },
        isOnlyInfo:{
          type: Boolean,
          required: false
        }
    },       
    data(){
      return{
        totalVisible:true
      }
    },
  methods:{

    removeCartElement(index){      
      this.$emit('onCartElementRemoved', index, 'Elemento eliminado')
      
    },
    addAmountCartElement(index){           
      this.$emit('onCartElemenAmountAdded', index,'Elemento añadido a tu pedido')      
      
    },
    //TODO refactorizar a filter ¿posible?
    //Ver si podemos pasarlo a filter o a una función en otro lugar
    formatExtra(extraId){            
      let extraFound = this.extrasList.find(extra => extra._id === extraId)
      return extraFound.name      
    },
    formatVariant(productId, variantIndex, variantValue){      
      let productFound = this.products.find(product => product._id === productId)
      return productFound.variants[variantIndex].name + ': ' +productFound.variants[variantIndex].vars[variantValue].name      
    },
    calcPrice(element){      
        let sum=0
        let productFound = this.products.find(product => product._id === element._id)
        sum+=element.price
        if (element.size!=''){
          sum+= productFound.sizes.find((size)=>{
                return size._id === element.size;
            }).price
        }             
        //Extras

        element.extras.forEach(elementExtra => {
          sum+= this.extrasList.find((extra)=>{
                return elementExtra === extra._id;
            }).price
        });
        
        
        //Variants        
        if(element.variants){
          element.variants.forEach((elementVariant, index) => {            
            sum+= element.prod_vars[index].vars[elementVariant].price
          });
        }      
        
        

        return sum*element.amount
      },     
      toggleTotalVisible(){        
        this.totalVisible=false
        setTimeout(function(){this.totalVisible=true}.bind(this), 100);
        
      }

  },
  computed: {
      ...mapState({               
        products: state => state.products.items,                     
        extrasList: state => state.extras.items,                             
      }),
      ...mapGetters({
        'user': 'auth/authUser'
      }),
      totalPrice(){        
        this.toggleTotalVisible()
        let sum=0
        
        this.cart.forEach(element => {
          sum+=this.calcPrice(element)
        });
        
        return Math.round(sum * 100) / 100
      }
  }, 
  created(){
    console.log('isonlyinfo ', this.isOnlyInfo)
  }
}
</script>
<style scoped>

  .ficha{
      background-color: transparent !important;
      color:black !important;
      padding: 1rem;
      margin-top: .7rem;
      border-radius: 8px;
      
  }

  .ficha__title{
      font-size: 16px;
      font-weight: 500;
  }

  .ficha__precio{
      font-size: 15px;
      font-weight: 500;
  }

  .cart{
    /* border-bottom: 1px solid #4496E8!important; */
  }  

  .cart__title{
    font-size: 24px;
    font-weight: 700;
  }
  .cart__total{
    font-size: 14px;
    font-weight: 400;
    padding-left: 8px;
  }

  .cart__total--big{
    font-size: 20px;
    font-weight: 700;    
  }

  .cart__prize{
    font-size: 16px;
    font-weight: 400;
  }
  
  .v-list-item--active::before{
    background-color: transparent !important;
    opacity: 0;
  }
  .v-list-item__title{
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .v-list-item{
    margin-top: -16px;
  }
  
  
</style>