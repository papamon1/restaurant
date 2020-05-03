<template>
    <div>
        <v-container>
            <v-row no-gutters class="justify-space-between">
                <v-col  cols="12" md="4">
                        <div class="row">
                            <v-col cols="12" lg="4">
                                <v-img :src="restaurant.logo" max-height="120" contain></v-img>
                            </v-col>                    
                            <v-col cols="12" lg="8">
                                <h1 class="title">{{ restaurant.name }}</h1>
                                <h2 class="subtitle-2">{{ restaurant.description }}</h2>      
                                <p class="subtitle-2 mt-2">
                                    <v-icon>mdi-pound-box</v-icon>                          
                                    hamburgesas, carne, madrid, centro
                                </p>
                            </v-col>    
                        </div>                                            
                </v-col>
                <v-col  cols="12" md="4" class="align-center">      
                    <div class="row">
                        <v-col cols="12">
                            <p><v-icon>mdi-clock-outline</v-icon><span v-bind:class="{red:!isOpen}"> <strong> Horario de pedidos: </strong>{{ restaurant.opening }} - {{ restaurant.closing }} </span></p>                    
                            <p v-if="restaurant.delivery"><v-icon>mdi-moped</v-icon>Local con reparto</p>     
                            <p v-if="restaurant.takeaway"><v-icon>mdi-basket</v-icon> Recogida</p>     
                        </v-col>
                    </div>                                      
                </v-col>
            </v-row>            
        </v-container>
        
        <v-container>
            <v-row class="d-flex justify-center mb-6">
                <v-col                    
                    md="6" sm="8"
                >
                    <div              
                        class="ficha"              
                    >
                        <div class="ficha__header">
                            PEDIDO
                        </div>
                        <div v-for="(element, index) in cart" :key="index">
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div class="ficha__title">
                                    {{ element.name }}
                                </div>
                                <div>                  
                                    {{ calcPrice(element) }} €               
                                </div>                                   
                            </div>    
                            <v-card-subtitle>
                                <ul>
                                <li v-for="(variant, index) in element.variants" :key="index" >
                                    {{ formatVariant(element._id, index, variant) }}
                                </li>                  
                                <li v-for="(extra, index) in element.extras" :key="index" >
                                    {{ formatExtra(extra) }}
                                </li>    
                                <li v-if="element.comments" :key="index" >
                                    Comentarios: <span class="ficha__lista--desc">{{ element.comments }}</span>
                                </li> 
                                </ul>
                            </v-card-subtitle>                                        
                        </div>    
                        <hr class="my-2">
                        <div class="text-right">
                            <strong> Total: {{ totalPrice }} € </strong>
                        </div>                        
                    </div>
                </v-col>
            </v-row>
            
            <v-stepper v-model="e1">
                <v-stepper-header>
                
                    <v-stepper-step
                    key="1"
                    :complete="e1 > 1"
                    :step="1"
                    editable
                    >
                    Selección envío
                    </v-stepper-step>

                    <v-divider                                    
                    ></v-divider> 

                    <v-stepper-step
                    key="2"
                    :complete="e1 > 2"
                    :step="2"
                    editable
                    >
                    Datos de entrega
                    </v-stepper-step>

                    <v-divider                                    
                    ></v-divider> 

                    <v-stepper-step
                    key="3"
                    :complete="e1 > 3"
                    :step="3"
                    editable
                    >
                    Pago
                    </v-stepper-step>
                                   
                </v-stepper-header>
        
                <v-stepper-items>
                <v-stepper-content                    
                    key="1"
                    :step="1"
                >
                    <div class="my-4">
                        <h2>Seleccione envío o recogida</h2>
                        <v-radio-group v-model="delivery" :mandatory="false" row
                            :error-messages="deliveryErrors"                            
                            required
                            @input="$v.delivery.$touch()"
                            @blur="$v.delivery.$touch()">
                            <v-radio label="Envío a domicilio" value="delivery"></v-radio>
                            <v-radio label="Recogida en local" value="takeAway"></v-radio>
                        </v-radio-group>
                    </div>
                    
        
                    <v-btn
                    color="primary"
                    @click="nextStep(1)"
                    >
                    Siguiente
                    </v-btn>
        
                    <v-btn text>Cancel</v-btn>
                </v-stepper-content>


                
                <v-stepper-content                    
                    key="2"
                    :step="2"                    
                >
                    <div class="justify-center my-4">
                       <h2>Introduzca sus datos</h2> 
                        <form v-if="delivery==='delivery'">                                                                               
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        outlined
                                        v-model="deliveryAddress.name"
                                        :error-messages="nameErrors"
                                        :counter="20"
                                        label="Name"
                                        required
                                        @input="$v.deliveryAddress.name.$touch()"
                                        @blur="$v.deliveryAddress.name.$touch()"
                                    ></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-text-field
                                        outlined
                                        v-model="deliveryAddress.email"
                                        :error-messages="emailErrors"
                                        :counter="20"
                                        label="Email"
                                        required
                                        @input="$v.deliveryAddress.email.$touch()"
                                        @blur="$v.deliveryAddress.email.$touch()"
                                    ></v-text-field>
                                </v-col>
                                                            
                            </v-row>    
                            
                            <v-row>
                                <v-col md="6" sm="12">
                                    <v-text-field
                                    outlined
                                    v-model="deliveryAddress.tlf"    
                                    :error-messages="tlfErrors"                                
                                    :counter="9"
                                    label="Teléfono"
                                    @input="$v.deliveryAddress.tlf.$touch()"
                                    @blur="$v.deliveryAddress.tlf.$touch()"
                                    ></v-text-field>
                                </v-col>
                        
                                <v-col md="6" sm="12">
                                    <v-text-field
                                    outlined
                                    v-model="deliveryAddress.cp"      
                                    :error-messages="cpErrors"                                       
                                    :counter="5"
                                    label="C.P"
                                    @input="$v.deliveryAddress.cp.$touch()"
                                    @blur="$v.deliveryAddress.cp.$touch()"
                                    ></v-text-field>
                                </v-col>
                            </v-row> 
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                    outlined
                                    v-model="deliveryAddress.add"          
                                    :error-messages="addErrors"                                                  
                                    :counter="30"
                                    label="Dirección"
                                    @input="$v.deliveryAddress.add.$touch()"
                                    @blur="$v.deliveryAddress.add.$touch()"
                                    ></v-text-field>
                                </v-col>                            
                            </v-row>                                  
                        </form>   
                        <form v-if="delivery==='takeAway'">                                                                               
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        outlined
                                        v-model="takeAwayAddress.name"
                                        :error-messages="takeAwayAddressNameErrors"
                                        :counter="20"
                                        label="Name"
                                        required
                                        @input="$v.takeAwayAddress.name.$touch()"
                                        @blur="$v.takeAwayAddress.name.$touch()"
                                    ></v-text-field>
                                </v-col>

                                
                                                            
                            </v-row>    
                            
                            <v-row>
                                <v-col>
                                    <v-text-field
                                    outlined
                                    v-model="takeAwayAddress.tlf"    
                                    :error-messages="takeAwayAddressTlfErrors"                                
                                    :counter="9"
                                    label="Teléfono"
                                    @input="$v.takeAwayAddress.tlf.$touch()"
                                    @blur="$v.takeAwayAddress.tlf.$touch()"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        outlined
                                        v-model="takeAwayAddress.email"
                                        :error-messages="takeAwayAddressEmailErrors"
                                        :counter="20"
                                        label="Email"
                                        required
                                        @input="$v.takeAwayAddress.email.$touch()"
                                        @blur="$v.takeAwayAddress.email.$touch()"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>         
                                    <h3>Selecciona la hora de recogida</h3>                           
                                    <p>Por favor, indica la hora a la que pasarás a recoger tu pedido. Recuerda que estamos abiertos de {{ restaurant.opening }} a {{ restaurant.closing }} </p>
                                    <v-time-picker
                                        v-model="takeAwayAddress.readyTime"
                                        :landscape="$vuetify.breakpoint.smAndUp"                                                                         
                                        :error-messages="takeAwayAddressReadyTimeErrors"
                                        @input="$v.takeAwayAddress.readyTime.$touch()"
                                        @blur="$v.takeAwayAddress.readyTime.$touch()"
                                    ></v-time-picker>
                                    <div v-if="$v.takeAwayAddress.readyTime.$error">
                                        <span class="errorMessage"> {{ takeAwayAddressReadyTimeErrors[0]}} </span>
                                    </div>
                                </v-col>
                            </v-row>                                                   
                        </form>                                                  
                    
                    
                    </div>
                    
        
                    <v-btn
                    color="primary"
                    @click="nextStep(2)"
                    >
                    Siguiente
                    </v-btn>
        
                    <v-btn text @click="e1=1">Atras</v-btn>
                </v-stepper-content>

                <v-stepper-content                    
                    key="3"
                    :step="3"
                >
                    <div>
                        <h2>Pago</h2>
                        <p>
                            Para terminar el proceso, serás redirigido a la plataforma de Paypal, que es la que utilizamos para gestionar nuestros
                            pagos de la forma más segura posible, a través de este proveedor de garantía internacional. Después, volverás a nuestro
                            entorno donde te indicaremos el número de pedido que el sistema te ha asignado.
                        </p>
                    </div>
        
                    <v-btn
                    color="success"
                    @click="processOrder"
                    >
                    Finalizar
                    </v-btn>
        
                    <v-btn text @click="e1=2">Atras</v-btn>
                </v-stepper-content>

                </v-stepper-items>
            </v-stepper>
        </v-container>
        
      
        
    </div>
</template>
<script>
import { required, email, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
// import ProductList from '@/components/ProductList'
// import ProductDialog from '@/components/ProductDialog'
// import CartSidebar from '@/components/CartSidebar'
// import CategoriesSidebar from '@/components/CategoriesSidebar'

export default {    
    components:{
        //ProductList, ProductDialog, CartSidebar, CategoriesSidebar, Footer
    },
    data(){
        return{            
            steps: 3,
            e1:1,     
            delivery:'delivery',
            deliveryAddress: {
                name:'',
                email:'',
                tlf:'',
                cp:'',
                add:''
            },
            takeAwayAddress: {
                name:'',
                email:'',
                tlf:'',
                readyTime:''
            }    
        }
    },
    validations: {
        deliveryAddress:{
            name: { required, maxLength: maxLength(20) },
            email: { required, email, maxLength: maxLength(20)   },
            tlf: { required, numeric, maxLength: maxLength(9)   },
            add: { required, maxLength: maxLength(30)   },
            cp: { 
                required, 
                numeric,
                minLength: minLength(5),
                maxLength: maxLength(6)  
            },
            checkbox: {
                checked (val) {
                    return val
                },
            }
        },
        takeAwayAddress: {
            name: { required, maxLength: maxLength(20) },
            email: { required, email, maxLength: maxLength(20)   },
            tlf: { required, numeric, maxLength: maxLength(9)   },      
            readyTime: { required  },            
        }, 
        delivery:{required}        
    },
    props:{
        id:{
            type: String,
            required:false
        }
    },
    created(){        
        this.$store.dispatch('restaurants/getRestaurant', this.$route.params.id)
        .then()        
    },
    //TODO pasar las computed a una librería y compartir estas funciones a quien lo necesite
    computed: {
      ...mapState({
        restaurant: state => state.restaurants.item,        
        products: state => state.products.items,        
        cart: state => state.cart.items,                              
      }),      
      totalPrice(){
        let sum=0
        this.cart.forEach(element => {
          sum+=this.calcPrice(element)
        });
        
        return Math.round(sum * 100) / 100
      },
      isOpen(){
            var ahora = new Date().getHours();
            return ahora >= parseInt(this.restaurant.opening) && ahora <= parseInt(this.restaurant.closing) 
      },      
      checkboxErrors () {
        const errors = []
            if (!this.$v.checkbox.$dirty) return errors
            !this.$v.checkbox.checked && errors.push('You must agree to continue!')
            return errors
        },
        selectErrors () {
            const errors = []
            if (!this.$v.select.$dirty) return errors
            !this.$v.select.required && errors.push('Item is required')
            return errors
        },
        nameErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.name.$dirty) return errors            
            !this.$v.deliveryAddress.name.required && errors.push('Es necesario que rellenes este campo.')
            !this.$v.deliveryAddress.cp.maxLength && errors.push('Comprueba la longitud de tu nombre')
            return errors
        },
        emailErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.email.$dirty) return errors
            !this.$v.deliveryAddress.email.email && errors.push('El email debe tener una dirección valida')
            !this.$v.deliveryAddress.email.required && errors.push('Email es un campo requerido')
            !this.$v.deliveryAddress.cp.maxLength && errors.push('Comprueba la longitud de tu email')
            return errors
        },
        tlfErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.tlf.$dirty) return errors
            !this.$v.deliveryAddress.tlf.numeric && errors.push('El contenido del campo teléfono debe ser numérico')
            !this.$v.deliveryAddress.tlf.required && errors.push('Teléfono es un campo requerido')
            !this.$v.deliveryAddress.cp.maxLength && errors.push('Comprueba la longitud de tu teléfono')
            return errors
        },
        cpErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.cp.$dirty) return errors
            !this.$v.deliveryAddress.cp.numeric && errors.push('El contenido del campo teléfono debe ser numérico')
            !this.$v.deliveryAddress.cp.required && errors.push('C.P es un campo requerido')
            !this.$v.deliveryAddress.cp.minLength && errors.push('El código postal no puede ser inferior a 5 dígitos')
            !this.$v.deliveryAddress.cp.maxLength && errors.push('El código postal no puede ser superior a 5 dígitos')
            return errors
        },
        addErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.add.$dirty) return errors            
            !this.$v.deliveryAddress.add.required && errors.push('Es necesario que rellenes este campo.')
            return errors
        },
        deliveryErrors () {
        const errors = []
            if (!this.$v.delivery.$dirty) return errors            
            !this.$v.delivery.required && errors.push('Es necesario elegir un tipo de recogida.')
            return errors
        },
        takeAwayAddressNameErrors () {
        const errors = []
            if (!this.$v.takeAwayAddress.name.$dirty) return errors            
            !this.$v.takeAwayAddress.name.required && errors.push('Es necesario que rellenes este campo.')
            !this.$v.takeAwayAddress.name.maxLength && errors.push('Comprueba la longitud de tu nombre')
            return errors
        },
        takeAwayAddressEmailErrors () {
        const errors = []
            if (!this.$v.takeAwayAddress.email.$dirty) return errors
            !this.$v.takeAwayAddress.email.email && errors.push('El email debe tener una dirección valida')
            !this.$v.takeAwayAddress.email.required && errors.push('Email es un campo requerido')
            !this.$v.takeAwayAddress.email.maxLength && errors.push('Comprueba la longitud de tu email')
            return errors
        },
        takeAwayAddressTlfErrors () {
        const errors = []
            if (!this.$v.takeAwayAddress.tlf.$dirty) return errors
            !this.$v.takeAwayAddress.tlf.numeric && errors.push('El contenido del campo teléfono debe ser numérico')
            !this.$v.takeAwayAddress.tlf.required && errors.push('Teléfono es un campo requerido')
            !this.$v.takeAwayAddress.tlf.maxLength && errors.push('Comprueba la longitud de tu teléfono')
            return errors
        },
        takeAwayAddressReadyTimeErrors () {
        const errors = []
            if (!this.$v.takeAwayAddress.readyTime.$dirty) return errors
            !this.$v.takeAwayAddress.readyTime.required && errors.push('Es necesario rellenar una hora')            
            return errors
        },
    },
    methods:{        
        openProduct(productId){
            //Localizo el index del producto, y envío a la ventana de dialogo dicho producto por su index            
            this.clickedProduct=this.products.findIndex((product)=>{
                return product._id === productId;
            })
            this.modalProduct=true
        },        
        showSnackbar(msg){
            this.snackbar.text=msg
            this.snackbar.show=true
        },
        addCartElementHandler(msg){
            this.modalProduct=!this.modalProduct
            this.showSnackbar(msg)
        },       
        nextStep (n) {            
            if(n===2){
                if(this.delivery==='delivery'){
                    this.$v.deliveryAddress.$touch()
                    if (this.checkValidation(this.$v.deliveryAddress, Object.keys(this.deliveryAddress))===false) return false                
                    // if(this.$v.$invalid!=null) return false
                }else{
                    this.$v.takeAwayAddress.$touch()
                    if (this.checkValidation(this.$v.takeAwayAddress, Object.keys(this.takeAwayAddress))===false) return false                
                }
                
            }

            if (n === this.steps) {
                this.e1 = 1
            } else {
                this.e1 = n + 1
            }
        },
        checkValidation(toValidate, keyList){
            let checked=[]
            checked=keyList.filter(key => {              
                return toValidate[key].$invalid===true
            });
            if (checked.length===0) return true
            return false
        },
        formatExtra(extraId){            
        let extraFound = this.extrasList.find(extra => extra._id === extraId)
        return extraFound.name      
        },
        formatVariant(productId, variantIndex, variantValue){      
        let productFound = this.products.find(product => product._id === productId)
        return productFound.variants[variantIndex].name + ': ' +productFound.variants[variantIndex].vars[variantValue].name      
        },
        calcPrice(element){      
            let sum=0
            let productFound = this.products.find(product => product._id === element._id)
            sum+=element.price
            if (element.size!=''){
            sum+= productFound.sizes.find((size)=>{
                    return size._id === element.size;
                }).price
            }             
            //Extras

            element.extras.forEach(elementExtra => {
            sum+= this.extrasList.find((extra)=>{
                    return elementExtra === extra._id;
                }).price
            });
                    
            return sum
        },     
        processOrder(){
            this.$store.dispatch('restaurants/getRestaurant', this.$route.params.id)
        }

    }
}
</script>
<style scoped>
.empty{
    background-color: bisque;
}

.ficha{
    /* background-color: #f1f1f1 !important; */
    color:black !important;
    padding: 1rem;
    background: rgba(252,234,187,1);
    background: -moz-linear-gradient(top, rgba(252,234,187,1) 0%, rgba(255,225,148,1) 80%, rgba(251,223,147,1) 97%, rgba(255,225,148,1) 98%, rgba(255,225,148,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(252,234,187,1)), color-stop(80%, rgba(255,225,148,1)), color-stop(97%, rgba(251,223,147,1)), color-stop(98%, rgba(255,225,148,1)), color-stop(100%, rgba(255,225,148,1)));
    background: -webkit-linear-gradient(top, rgba(252,234,187,1) 0%, rgba(255,225,148,1) 80%, rgba(251,223,147,1) 97%, rgba(255,225,148,1) 98%, rgba(255,225,148,1) 100%);
    background: -o-linear-gradient(top, rgba(252,234,187,1) 0%, rgba(255,225,148,1) 80%, rgba(251,223,147,1) 97%, rgba(255,225,148,1) 98%, rgba(255,225,148,1) 100%);
    background: -ms-linear-gradient(top, rgba(252,234,187,1) 0%, rgba(255,225,148,1) 80%, rgba(251,223,147,1) 97%, rgba(255,225,148,1) 98%, rgba(255,225,148,1) 100%);
    background: linear-gradient(to bottom, rgba(252,234,187,1) 0%, rgba(255,225,148,1) 80%, rgba(251,223,147,1) 97%, rgba(255,225,148,1) 98%, rgba(255,225,148,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#ffe194', GradientType=0 );
    border-radius: 29px 29px 29px 29px;
    -moz-border-radius: 29px 29px 29px 29px;
    -webkit-border-radius: 29px 29px 29px 29px;    
    -webkit-box-shadow: 9px 10px 46px 5px rgba(171,196,182,0.96);
    -moz-box-shadow: 9px 10px 46px 5px rgba(171,196,182,0.96);
    box-shadow: 9px 10px 46px 5px rgba(171,196,182,0.96);
}

.ficha__title{
    text-decoration: underline;
    font-size: 1rem;
}
.ficha__header{
    text-decoration: underline;
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 1rem;
}
.ficha__lista--desc{
    font-weight: 300;
}
.errorMessage{
    line-height: 12px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    color: #FF5252;
    font-size: 12px;
}

</style>