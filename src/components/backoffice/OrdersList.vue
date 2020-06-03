<template>
    <div class="orders-list mb-4">
        <v-row class="justify-space-between">
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
            <OrderCard></OrderCard>
        </v-row>
    </div>

</template>
<script>
import OrderCard from '@/components/backoffice/OrderCard'
export default {
    components:{
        OrderCard
    }
    
}
</script>
<style lang="scss">

    .orders-list{        
        background-color:#eff1f5f7;
        border-radius: 2rem;
        max-width: 100%;
        padding-bottom: 25px;
        padding-top: 25px;
        padding-left: 35px;
        padding-right: 35px;
    }

    .orders-list--content{
        padding: 1.25rem 1.75rem;
        color: #ffffff;        
    }

    .orders-list--row{
        display: flex;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        flex-wrap: wrap !important;
    }
    
    .orders-list--circle{
        background: white;
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 50%;
        text-align: center;
        line-height: 3.75rem;        
    }

</style>
