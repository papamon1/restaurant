<template>
    <div>
        <TopElement :restaurant=restaurant></TopElement>
        <div class="text-center">
            <h1>¡¡¡ENHORABUENA!!</h1>
            <h2>Tu pedido se ha procesado con éxito</h2>  
            <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F1037%2F1037855.png&f=1&nofb=1" max-height="228" contain></v-img>
            <h3 class="mt-6">Se te ha asignado el siguiente número de pedido: <span class="green">{{ orderId }}</span></h3>      
            <h3>Consérvalo hasta su entrega</h3>
        </div>        
    </div>
</template>

<script>
export default {
    props:{
        orderId:{
            type: String,
            required: false
        }
    },
    mounted() {        
        this.orderId=this.$route.params.orderId        
    },  
}
</script>
<style lang="scss" scoped>

</style>