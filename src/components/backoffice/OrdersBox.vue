<template>
    <div class="orders-box">
        <div class="orders-box--content">
            <div class="orders-box--row">
                <div class="orders-box--circle">
                    <v-icon color="#4496E8" medium>mdi-basket</v-icon>
                </div>
                <div>                      
                    <p>Pedidos este turno</p>
                    <div class="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline">
                        <h3>387 €</h3>                        
                    </div>
                </div>
            </div>            
        </div>
    </div>

</template>
<script>
export default {
    
}
</script>
<style lang="scss">

    .orders-box{        
        background-color: #4496E8;
        border-radius: 2rem;
        min-width: 275px;
    }

    .orders-box--content{
        padding: 1.25rem 1.75rem;
        color: #ffffff;        
    }

    .orders-box--row{
        display: flex;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        flex-wrap: wrap !important;
    }
    
    .orders-box--circle{
        background: white;
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 50%;
        text-align: center;
        line-height: 3.75rem;        
    }

</style>
