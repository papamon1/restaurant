<template>
    <div class="mb-10">
        <section v-for="category in categories" :key="category._id" :id="category._id">
            <v-row>                    
                <h1 :id="category._id" class="list__title">{{ category.name }}</h1>
            </v-row>                
            <v-row class="mb-2">                    
                <template v-for="product in productsByCategory(category._id)">                
                    <ProductNewCard  :product="product" :key="product._id" @productClicked="emitClick"></ProductNewCard>
                </template>        
            </v-row>  
        </section>    
    </div>
    
</template>

<script>
import {mapState, mapGetters} from 'vuex'
// import ProductCard from '@/components/ProductCard'
import ProductNewCard from '@/components/ProductNewCard'
export default {
    components:{
        // ProductCard
        ProductNewCard
    },
    computed:{
        ...mapGetters({
            'productsByCategory': 'products/getProductsByCategory'
        }),
        ...mapState({                  
            categories: state => state.categories.items,                    
        }), 
    },
    name: 'ProductList',
    props:{
        products:{
            type: Array,
            required:true
        }
    },
    methods:{
        emitClick(productId){      
            this.$emit('productClicked', productId)      
        }
    }
}
</script>
<style lang="postcss" scoped>
    .list__title{
        margin-top: 16px;
    }
</style>