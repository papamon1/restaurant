<template>
    <div>    
        <v-dialog v-model="isOpen" persistent max-width="356px" :overlay-opacity=0.9 overlay-color="#17324D">
            <div class="closeIcon">
                <v-btn
                    icon                
                    @click="isOpen = false"               
                    color="white"                    
                    >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            
        <v-card>    
            <v-img
              :src="getProductPic(product.pic)"
              max-height="300px"
              />                          
          <v-card-text>
            <v-container class="cont">              
                <div class="card__title" >                          
                    {{ product.name }}                      
                </div>  
                 <div class="card__description" >                          
                    {{ product.description }}                      
                </div>  


                <div v-if="product.allergens.length>0">
                    <div class="card__title" >                          
                        Alérgenos             
                    </div>  
                    <div class="card__description" >                          
                        <v-chip  v-for="alergeno in product.allergens" :key="alergeno._id"
                            class="ma-1 top__chips"
                            color="#E63946"
                            outlined
                            >
                                {{ alergeno.name }}
                        </v-chip>                
                    </div>  
                </div>
                
              
                <div v-if="product.sizes.length>0">                    
                    <div class="card__title" >                          
                        Tamaño             
                    </div>                
                    <v-radio-group v-model="element.size" row>
                    <v-radio v-for="size in product.sizes" :key="size._id" 
                        :label="size | formatPrice " :value="size._id">
                    </v-radio>                  
                    </v-radio-group>                                
                </div>

                <div v-for="(variant, index) in product.variants" :key="variant._key">
                    
                    <div class="card__title" >                          
                        {{ variant.name }}
                    </div> 
                    <v-radio-group v-model="element.variants[index]" row class="card__description">
                    <v-radio v-for="va in variant.vars" :key="va._id" 
                        :label=" va | formatPrice" :value="va._id" >
                    </v-radio>                  
                    </v-radio-group>
                
                </div>


                <div v-if="product.sizes">                                

                <div class="card__title" >¿Quieres ingredientes extra?</div>
                    <v-autocomplete
                        v-model="element.extras"
                        :items="prepareExtrasForAuocomplete()"
                        outlined
                        color="primary"
                        dense
                        chips
                        small-chips
                        label="Elige tus extras"
                        multiple
                        class="mt-4"
                    ></v-autocomplete>
                        
                </div>

                <div>
                    <div class="card__title" >                          
                        Déjanos tus indicaciones
                    </div> 

                    <v-text-field
                    dense
                    v-model="element.comments"                                                            
                    outlined
                    label="Añade un comentario"
                    style="min-height: 96px"            
                    rows="4"
                    row-height="30"          
                    class="mt-4"          
                    ></v-text-field>            
                </div>
                
            </v-container>            
          </v-card-text>
          <v-card-actions class="justify-center">         
            <v-col cols="4" class="mx-2"> 
              <v-btn  block depressed color="primary" @click="addToCart()">AÑADIR</v-btn>
            </v-col>   
            
            <!-- <v-btn color="blue darken-1" text @click="isOpen = false">Save</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props:{
        isOpen:{
            type: Boolean,
            required: true
        },
        product:{
            type: Object,
            required: false,
            default: ()=>{return {sizes:[]}}
        },
        
    },
    data(){
        return{
            dialog:false,
            element:{                            
              size:'',
              variants:[],
              extras:[],
              comments:''
            },            
        }
    },
    computed: {   
      ...mapState({
        extrasList: state => state.extras.items,                
      }), 
    },
    methods:{
      clickHandler(){
        this.isOpen=!this.isOpen
        this.$emit('closeModal', true)
      },
      getProductPic(prodPic){            
            return (prodPic==='' ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaO_1mPXorbpKRJRelbQRLKESJg7UZlEMs72nuJbD1XeUZdEy_&s":prodPic)
      },
      getLabelWithPrice(size){
        return size.name>0 ? size.price +' '+size.price+'€' : size.name
      },
      calcPrice(){
        let sum=0
        sum+=this.product.price
        if (this.element.size!=''){
          sum+= this.product.sizes.find((size)=>{
                return size._id === this.element.size;
            }).price
        }        
        
        
        //Variants        
        if(this.element.variants){
            this.element.variants.forEach((elementVariant, index) => {            
                sum+= this.element.prod_vars[index].vars[elementVariant].price
            });
        }
        



        //Extras
        if(this.element.extras){
            this.element.extras.forEach(elementExtra => {
                sum+= this.extrasList.find((extra)=>{
                    return elementExtra === extra._id;
                }).price
            });
        }
        
        

        alert(sum)    
        return sum
      },            
      prepareExtrasForAuocomplete(){
        
        let preparedArray= [];
      
        this.extrasList.forEach((element, index) => {
          let preparedObject=new Object
          preparedObject['text']=element.name +' +'+ element.price +'€'
          preparedObject['value']=element._id
          preparedArray[index]=preparedObject
        });

        return preparedArray

      },
      addToCart(){        
        this.element['description']=this.product.description
        this.element['name']=this.product.name
        this.element['_id']=this.product._id
        this.element['price']=this.product.price
        this.element['amount']=1
        this.element['prod_vars']=this.product.variants
        this.element['prod_extras']=this.product.extras        
        this.element['pic']=this.product.pic        
        this.$store.dispatch('cart/addCartElement', this.element)        
        .then(()=>{          
          this.element=new Object({
            size:'',
            variants:[],
            extras:[],
            comments:''
          })
          this.$emit('onElementAdded', 'Elemento añadido con éxito')
        })        
      },      
    },             
}
</script>
<style>

    .closeIcon{
        position: absolute;
        top: 70px;
        width:400px !important;
        justify-content: end;
        text-align: end;

    }

    .card__title{        
        display: block;
        padding-top: 16px;
        font-size: 16px !important;
        font-weight: 700;
        color: #333333;
    }

    
    .card__description{        
        display: block;
        padding-top: 4px;
        font-size: 12px !important;
        font-weight: 400;
        color: #808080;
    }    
    .cont{
        padding-right: .3rem !important;
        padding-left: .3rem !important;
    }

    .top__chips{
        max-height: 29px;
        font-size: 14px !important;
        font-weight: 300;         
    }

    /* Clases de vuetify para controles radiobutton */
    .mdi-radiobox-blank{
        font-size:16px !important;
    }

    .v-input--selection-controls__input label{
        font-size: 12px !important;
    }

    .v-input--selection-controls__input+.v-label {
        font-size: 12px !important;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .v-input--selection-controls__ripple {
        border-radius: 50%;
        cursor: pointer;
        height: 18px !important;
        position: absolute;
        transition: inherit;
        width: 18px !important;
        left: -4px;
        top: calc(50% - 16px) !important;
        margin: 7px;
        bottom: 1px !important;
        left: -4px !important;
        right: -7px !important;
        top: -4px !important;
    }

    .v-input--selection-controls {
        margin-top: 0px;
        padding-top: 4px;
    }

</style>
