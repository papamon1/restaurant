<template>
    <div>    
        <v-dialog v-model="isOpen" persistent max-width="356px">                        
            <div class="closeIcon">
                <v-btn
                    icon                
                    @click="isOpen = false"               
                    color="grey"                    
                    >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            
        <v-card>    
            <v-img
              :src="getProductPic(product.pic)"
              />                          
          <v-card-text>
            <v-container class="cont">              
                <div class="card__title" >                          
                    {{ product.name }}                      
                </div>  
                 <div class="card__description" >                          
                    {{ product.description }}                      
                </div>  
                <div class="card__title" >                          
                    Alérgenos             
                </div>  
                <div class="card__description" >                          
                    <v-chip  v-for="alergeno in product.allergens" :key="alergeno._id"
                        class="ma-1 top__chips"
                        color="#E63946"
                        >
                            {{ alergeno.name }}
                    </v-chip>                
                </div>  
              <v-row>
                                
                <v-spacer></v-spacer>  
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <h1>Ingredientes</h1>
                  <p class="mt-2">{{ product.ingredients }}</p>                  
                </v-col>
                <v-col cols="12" sm="6">
                  <h1>Alérgenos</h1>
                  <ul class="mt-2">
                    <li v-for="alergeno in product.allergens" :key="alergeno._id">
                      {{ alergeno.name }}
                    </li>
                  </ul>                  
                </v-col>
              </v-row>
              <v-row v-if="product.sizes.length>0">
                <v-col cols="12" >
                <h1>Tamaño</h1>                  
                    <v-radio-group v-model="element.size" row>
                      <v-radio v-for="size in product.sizes" :key="size._id" 
                        :label="size | formatPrice " :value="size._id">
                      </v-radio>                  
                    </v-radio-group>
                </v-col>                  
              </v-row>
              <v-row v-for="(variant, index) in product.variants" :key="variant._key">
                <v-col cols="12">
                <h1>{{ variant.name }}</h1>
                    <v-radio-group v-model="element.variants[index]" row>
                      <v-radio v-for="va in variant.vars" :key="va._id" 
                        :label=" va | formatPrice" :value="va._id">
                      </v-radio>                  
                    </v-radio-group>
                </v-col>    
              </v-row>
              <v-row>
                <v-col cols="12" v-if="product.sizes.length>0">
                <h1>¿Quieres ingredientes extra?</h1>                  
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
                </v-col>                  
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="element.comments"                                                            
                    outlined
                    label="Añade un comentario"
                    style="min-height: 96px"            
                    rows="4"
                    row-height="30"                    
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
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
        

        //Extras

        this.element.extras.forEach(elementExtra => {
          sum+= this.extrasList.find((extra)=>{
                return elementExtra === extra._id;
            }).price
        });
        

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
        this.$store.dispatch('cart/addCartElement', this.element)        
        .then(()=>{          
          this.element=new Object({
            size:'',
            variants:{},
            extras:[],
            comments:''
          })
          this.$emit('onElementAdded', 'Elemento añadido con éxito')
        })        
      },      
    },             
}
</script>
<style  scoped>

    .closeIcon{
        position: absolute;
        top: 0;
        width:380px;
        justify-content: end;
        text-align: end;

    }

    .card__title{        
        display: block;
        padding-top: 8px;
        font-size: 16px !important;
        font-weight: 500;
        color: #333333;
    }
    .card__description{        
        display: block;
        padding-top: 4px;
        font-size: 10px !important;
        font-weight: 400;
        color: #808080;
    }    
    .cont{
        padding-right: .3rem !important;
        padding-left: .3rem !important;
    }

    .top__chips{
        max-height: 16px;
        font-size: 10px !important;
        font-weight: 300;
        color: #F2F2F2 !important;    
    }
</style>
