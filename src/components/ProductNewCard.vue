<template>
    <v-hover v-slot:default="{ hover }">
        <v-card            
            class="cardRounded my-12 mr-6"
            width="259"            
            :elevation="hover ? 24 : 14"        
            @click="emitClick()"    
        >
            <v-img
                height="120"
                :src="product.pic"
            ></v-img>
        
            <div class="card__title">
                <div>{{ product.name }}</div>                      
            </div>
        
            <div class="card__description">               
                {{ product.description }}              
            </div>    
        
            <div class="card__price d-flex flex-no-wrap justify-space-between">
                <div>{{ product.price }}€</div>       
                 <div>                                                          
                    <v-icon class="card__icon" @click="removeCartElement(index)">mdi-plus-circle-outline</v-icon>         
                </div>
            </div>
            
        </v-card>
    </v-hover>
</template>
<script>
export default {
    name: 'ProductCard',
    props:{
        product:{
            type:Object,
            required:true
        }
    },
    methods:{
        getProductPic(prodPic){            
            return (prodPic==='' ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaO_1mPXorbpKRJRelbQRLKESJg7UZlEMs72nuJbD1XeUZdEy_&s":prodPic)
        },
        emitClick(){      
            this.$emit('productClicked', this.product._id)      
        }
    },
    
}
</script>
<style scoped>

    .cardRounded{
        border-radius: 8px !important;
        margin-top: 0px !important;
    }
    
    .card__icon{
        margin-bottom: 4px!important;
        color: #02C39A !important;
    }

    .card__title{
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 16px;
        font-size: 16px !important;
        font-weight: 700;
    }

    .card__description{
        padding-left: 16px;
        padding-right: 16px;
        font-size: 12px !important;
        font-weight: 400;
        min-height: 33px;
        color: $secondary;
    }

    .card__price{
        padding-top: 16px;
        padding-bottom: 8px;
        padding-left: 16px;
        padding-right: 16px;
        font-weight: 400;
        font-size:16px;        
    }

    .v-application .my-12 {
        margin-top: 16px!important;
        margin-bottom: 16px!important;
    }

</style>