<template>
    <v-row class="justify-space-around">
        <template v-for="product in products">
            <ProductCard :product="product" :key="product._id" @productClicked="emitClick"></ProductCard>
        </template>
    </v-row>  
</template>

<script>
import ProductCard from '@/components/ProductCard'
export default {
    components:{
        ProductCard
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