
<template>
    <v-hover v-slot:default="{ hover }">
        <v-card
            :elevation="hover ? 24 : 6"
            class="col-md-5 my-2"
            @click="emitClick()"
            >            
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="title">{{ product.name }}</v-list-item-title>
          <v-list-item-subtitle class="subtitle-1">{{ product.description }} </v-list-item-subtitle>
        </v-list-item-content>
  
        <v-list-item-avatar
          tile
          size="120"
          class="d-none d-md-flex"
        >
            <v-img
            :src="getProductPic(product.pic)"            
            aspect-ratio="2"            
            />
        </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
                <v-btn text color="info" class="d-none md-flex">Alergenos</v-btn>
                <v-tooltip v-for="allergen in product.allergens" bottom color="success" :key="allergen._id">
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on">{{ allergen.icon }}</v-icon>
                    </template>
                    <span>{{ allergen.name }}</span>
                </v-tooltip>   
                <v-spacer></v-spacer>
  
                <h1 class="">{{ product.price }}€</h1>               

              </v-card-actions>
    </v-card>
    
    <!-- <v-card
        :elevation="hover ? 12 : 2"
        :class="{ 'on-hover': hover }"
        >
        <v-img
            :src="item.img"
            height="225px"
        >
            <v-card-title class="title white--text">
            <v-row
                class="fill-height flex-column"
                justify="space-between"
            >
                <p class="mt-4 subheading text-left">{{ item.title }}</p>

                <div>
                <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                    {{ item.text }}
                </p>
                <p class="caption font-weight-medium font-italic text-left">
                    {{ item.subtext }}
                </p>
                </div>

                <div class="align-self-center">
                <v-btn
                    v-for="(icon, index) in icons"
                    :key="index"
                    :class="{ 'show-btns': hover }"
                    color="transparent"
                    icon
                >
                    <v-icon
                    :class="{ 'show-btns': hover }"
                    color="transparent"
                    >
                    {{ icon }}
                    </v-icon>
                </v-btn>
                </div>
            </v-row>
            </v-card-title>
        </v-img>
    </v-card> -->

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