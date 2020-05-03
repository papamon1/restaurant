<template>
    <div
      max-width="400"
      class="mx-auto"      
    >
      <!-- <v-system-bar
        color="blue darken-2"
        dark
      >
        <v-spacer></v-spacer>
  
        <v-icon>mdi-window-minimize</v-icon>
  
        <v-icon>mdi-window-maximize</v-icon>
  
        <v-icon>mdi-close</v-icon>
      </v-system-bar> -->
  
      <div class="cat__title">Categorías</div>

      <v-list>
        <!-- <v-subheader>REPORTS</v-subheader> -->
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(category, i) in categories"
            :key="i"     
            @click="onCategorySelected(category._id)"                  
            >
            <!-- <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title v-text="category.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
    
    
</template>
<script>
import { mapState } from 'vuex'
export default {
    props:{
        cart:{
            type:Array,
            required:false,
            default:()=>{return[]}
        }
    },
    methods:{  
      onCategorySelected(categoryId){
        let element = document.getElementById(categoryId)
                
        var top = element.offsetTop;
        
        window.scroll({
          top: top,          
          behavior: 'smooth'
        });
      },
      handleScroll(){
        const links = document.querySelectorAll('.v-list-item');
        const sections = document.querySelectorAll('section');
        let index = sections.length;

        while(--index && window.scrollY + 25 < sections[index].offsetTop) {
          // console.log(index)
        }
        
        links.forEach((link) => link.classList.remove('v-list-item--active'));
        links[index].classList.add('v-list-item--active');
      },
      //TODO bug on small screens
      // handleListClick(element){
      //   debugger
      //   console.log(element)
      // }
    },
    computed: {   
      ...mapState({
        categories: state => state.categories.items,                
      }), 
    },    
    created () {      
      window.addEventListener('scroll', this.handleScroll);
      // document.querySelectorAll('.v-list-item').addEventListener('onclick', this.handleListClick)
    },  
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>
<style scoped>
  .cat__title{
    margin-left: 16px;
    font-size: 24px;
    font-weight: 700;
  }
  .v-list-item--active::before{
    background-color: transparent !important;
    opacity: 0;
  }
  .v-list-item__title{
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .v-list-item{
    margin-top: -16px;
  }
  
</style>