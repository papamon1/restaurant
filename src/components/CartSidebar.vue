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
          <span class="cart__total"> Total: </span><span class="cart__prize">{{ totalPrice }} € </span>
        </div>
  
      </div>
  
      <div>
        <v-row dense>          
          <v-col
            v-for="(element, index) in cart"
            :key="index"
            cols="12"
          >
            <v-card              
              class="ficha"              
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div class="ficha__title">
                  {{ element.name }}
                </div>
                <div>                  
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }" color="red">                      
                        <v-icon v-on="on" color="red" class="mb-1" @click="removeCartElement(index)">mdi-minus-circle-outline</v-icon>
                    </template>                    
                    <span>Eliminar</span>
                  </v-tooltip>                
                </div>                                   
              </div>    
              <v-card-subtitle>
                <ul>
                  <li v-for="(variant, index) in element.variants" :key="index" >
                    {{ formatVariant(element._id, index, variant) }}
                  </li>                  
                  <li v-for="(extra, index) in element.extras" :key="index" >
                    {{ formatExtra(extra) }}
                  </li>    
                  <li v-if="element.comments" :key="index" >
                    Comentarios: {{ element.comments }}
                  </li> 
                </ul>
              </v-card-subtitle>            
              <div class="ficha__precio">
                {{ calcPrice(element) }} €
              </div>                                         
            </v-card>
          </v-col>
        </v-row>    
        <v-card-actions class="justify-center" v-if="cart.length>0">         
            <v-col cols="8" class="mx-2">               
              <v-btn to="/order" block dark depressed color="blue">REALIZAR PEDIDO</v-btn>                             
            </v-col>   
            
            <!-- <v-btn color="blue darken-1" text @click="isOpen = false">Save</v-btn> -->
        </v-card-actions>    
      </div>        
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props:{
        cart:{
            type:Array,
            required:false,
            default:()=>{return[]}
        },
        
    },       
  methods:{
    removeCartElement(index){      
      this.$store.dispatch('cart/removeCartElement', index)
      .then(()=>{
          this.$emit('onCartElementRemoved', 'Elemento eliminado')
      })
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
                
        return sum
      },     

  },
  computed: {
      ...mapState({               
        products: state => state.products.items,                     
        extrasList: state => state.extras.items,                      
      }),
      totalPrice(){
        let sum=0
        this.cart.forEach(element => {
          sum+=this.calcPrice(element)
        });
        
        return Math.round(sum * 100) / 100
      }
  }
}
</script>
<style scoped>

  

  .ficha{
      background-color: transparent !important;
      color:black !important;
      padding: 1rem;
      margin-top: .7rem;
      
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
    border-bottom: 1px solid #4496E8!important;
  }  

  .cart__container{
    
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
  .cart__prize{
    font-size: 14px;
    font-weight: 700;
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