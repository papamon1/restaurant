<template>
    <v-dialog v-model="isOpen" persistent max-width="600px">        
        <v-card>          
            <v-card-title class="display-1" >                          
              {{ product.name }}
            </v-card-title>          
          <v-card-text>
            <v-container>
              <v-img
              :src="getProductPic(product.pic)"
              />
              <v-row>
                <v-col cols="12" >
                  <p>
                    {{ product.description}}
                  </p>                  
                </v-col>    
                <v-spacer></v-spacer>  
                hey
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
              <v-row>
                <v-col cols="12">
                <h1>Tamaño</h1>                  
                    <v-radio-group v-model="order.size" row>
                      <v-radio v-for="size in product.sizes" :key="size._id" 
                        :label="size.price>0 ? size.name +' +'+size.price+'€' : size.name" :value="size._id">
                      </v-radio>                  
                    </v-radio-group>
                </v-col>                  
              </v-row>
              <v-row v-for="(variant, index) in product.variants" :key="variant._key">
                <v-col cols="12">
                <h1>{{ variant.name }}</h1>
                    <v-radio-group v-model="order.variants[index]" row>
                      <v-radio v-for="va in variant.vars" :key="va._id" 
                        :label="va.name" :value="va._id">
                      </v-radio>                  
                    </v-radio-group>
                </v-col>    
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="clickHandler">Close</v-btn>
            <v-btn color="blue darken-1" text @click="isOpen = false">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>

export default {
    props:{
        isOpen:{
            type: Boolean,
            required: true
        },
        product:{
            type: Object,
            required: true
        },
        
    },
    data(){
        return{
            dialog:false,
            order:{
              productId:'',
              size:'',
              variants:{},
              extras:[],

            } 
        }
    },
    computed: {   
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
      }
    },          
    
}
</script>
<style  scoped>


</style>
