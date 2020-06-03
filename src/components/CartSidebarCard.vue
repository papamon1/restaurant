<template>
    <div      
      class="mx-auto"
    >
        <div class="">
            <div class="ficha__amount color__text--primary">
                x{{ element.amount }}
            </div>      
            <div class="ficha__title color__text--primary">
                {{ element.name }}
            </div>                                               
        </div>    
        <v-card-subtitle>
            <div v-for="(variant, index) in element.variants" :key="index">
                <span class="ficha__section color--secondary">{{ formatVariantName(element._id, index, variant) }}:</span> <span class="ficha__text color__text--secondary">{{ formatVariant(element._id, index, variant) }}</span>
            </div>
                                 
            <div v-for="(extra, index) in element.extras" :key="index" >
                <span class="ficha__section color--secondary">Extras</span>{{ formatExtra(extra) }}
            </div>    
            <li v-if="element.comments" :key="index" >
            <span class="ficha__section color--secondary">Comentarios</span> : {{ element.comments }}
            </li>         
        </v-card-subtitle>            
        <div class="ficha__precio d-flex flex-no-wrap justify-space-between">
            <div>{{ calcPrice  }} €</div>
            <div>             
                <v-tooltip bottom v-if=!isOnlyInfo>
                    <template v-slot:activator="{ on }" color="red">                      
                        <v-icon v-on="on" class="color--secondary mb-1" @click="addAmountCartElement(index)">mdi-plus-circle-outline</v-icon>
                    </template>                    
                    <span>Añadir</span>
                </v-tooltip>          
                <v-tooltip bottom v-if=!isOnlyInfo>
                    <template v-slot:activator="{ on }" color="red">                      
                        <v-icon v-on="on" class="color--secondary mb-1" @click="removeCartElement(index)">mdi-minus-circle-outline</v-icon>
                    </template>                    
                    <span>Eliminar</span>
                </v-tooltip>                           
            </div>   
        </div>                                                  
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props:{
        element:{
            type:Object,
            required:false,
            default:()=>{return[]}
        },
        index:{
          type: Number,
          required:true
        },
        isOnlyInfo:{
          type: Boolean,
          required: false
        }
        
    },       
    data(){
      return{
        amount:1
      }
    },
  methods:{
    removeCartElement(index){      
      this.amount-=1      
      this.$emit('onCartElementRemoved', index)      
    },
    addAmountCartElement(index){        
      this.amount+=1      
      this.$emit('onCartAddedAmount', index)      
    },
    //TODO refactorizar a filter ¿posible?
    //Ver si podemos pasarlo a filter o a una función en otro lugar
    formatExtra(extraId){            
      let extraFound = this.extrasList.find(extra => extra._id === extraId)
      return extraFound.name      
    },
    formatVariantName(productId, variantIndex){      
      let productFound = this.products.find(product => product._id === productId)
      return productFound.variants[variantIndex].name     
    },
    formatVariant(productId, variantIndex, variantValue){      
      let productFound = this.products.find(product => product._id === productId)
      return productFound.variants[variantIndex].vars[variantValue].name      
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
          sum+=this.calcPrice(element)*this.amount
        });
        
        return Math.round(sum * 100) / 100
      },
      calcPrice(){      
        let sum=0
        let productFound = this.products.find(product => product._id === this.element._id)
        sum+=this.element.price
        if (this.element.size!=''){
          sum+= productFound.sizes.find((size)=>{
                return size._id === this.element.size;
            }).price
        }             
        //Extras

        this.element.extras.forEach(elementExtra => {
          sum+= this.extrasList.find((extra)=>{
                return elementExtra === extra._id;
            }).price
        });

        //Variants        
        if(this.element.variants){
          this.element.variants.forEach((elementVariant, index) => {            
            sum+= this.element.prod_vars[index].vars[elementVariant].price
          });
        }
        

                        
        return Math.round(sum*this.element.amount * 100) / 100
      },
  }
}
</script>
<style lang="scss" scoped>

  .ficha{
      background-color: transparent !important;
      color:black !important;
      padding: 1rem;
      margin-top: .7rem;
      border-radius: 8px;
      
  }

  .ficha__amount{
      font-size: 16px;
      font-weight: 700;
  }

  .ficha__title{
      font-size: 16px;
      font-weight: 400;
  }

  .ficha__section{
      font-size: 12px;
      font-weight: 400;
  }
  .ficha__text{
      font-size: 12px;
      font-weight: 400;
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