<template>
    <div>
        <TheNav></TheNav>        
        <v-content>
            <div class="d-inline">
                <router-view :key="$route.path" />
            </div>      
        </v-content>
        <TheFooter></TheFooter>
    </div>                
</template>
<script>
import TheNav from '@/components/TheNav';
import TheFooter from '@/components/TheFooter'
export default {

    components:{
        TheNav, TheFooter
    }
}
</script>
<style lang="scss" scoped>

    .backofficeSidebar{     
        background-color: blanchedalmond;
        width: 260px;   
        position: fixed;
        top: 80px;
        bottom: 0;
        left: 0;
        z-index: 2;        
        border-right-style: solid;
        border-right-width: 0.7px;
    }

    .backofficeSidebar--title{        
        text-align: center;
        vertical-align: middle;
        width: 100%;
        padding-top: 1rem;
        padding-bottom: 1rem;
        font-size: 22px;
        font-weight: bold;
    }

    .backofficeSidebar--last{        
        position: absolute;
        bottom:2;
    }


    //OVERRIDING CLASSES
    .v-application--is-ltr .v-list-group--no-action.v-list-group--sub-group>.v-list-group__items>.v-list-item {
        padding-left: 60px;
    }

</style>