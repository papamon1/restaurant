<template>
    <div>
        <TopElement :restaurant=restaurant></TopElement>
        

        <v-container class="mb-4">
            <v-row class="justify-space-between">
                <v-col md="8">            
                    <v-stepper v-model="e1" class="v-stepper">
                        <v-stepper-header>
                        
                            <v-stepper-step
                            key="1"
                            :complete="e1 > 1"
                            :step="1"
                                                        
                            >
                            Selección envío
                            </v-stepper-step>

                            <v-divider                                    
                            ></v-divider> 

                            <v-stepper-step
                            key="2"
                            :complete="e1 > 2"
                            :step="2"
                            
                            >
                            Datos de entrega
                            </v-stepper-step>

                            <v-divider                                    
                            ></v-divider> 

                            <v-stepper-step
                            key="3"
                            :complete="e1 > 3"
                            :step="3"
                            
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


                            <v-btn class="button--backward" text>Cancel</v-btn>            
                
                            <v-btn
                            color="primary"
                            @click="nextStep(1)"
                            class="button--forward"
                            >
                            Siguiente
                            </v-btn>
                                            
                        </v-stepper-content>


                        
                        <v-stepper-content                    
                            key="2"
                            :step="2"                    
                        >
                            <div v-if="user">
                                <div class="justify-center my-4">
                                <h2>Compruebe sus datos</h2> 
                                <form v-if="delivery==='delivery'">                                                                               
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                dense
                                                outlined
                                                v-model="deliveryAddress.firstName"
                                                :error-messages="deliveryAddressFirstNameErrors"
                                                :counter="20"
                                                label="Nombre"
                                                required
                                                @input="$v.deliveryAddress.firstName.$touch()"
                                                @blur="$v.deliveryAddress.firstName.$touch()"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col>
                                            <v-text-field
                                                dense
                                                outlined
                                                v-model="deliveryAddress.lastName"
                                                :error-messages="deliveryAddressLastNameErrors"
                                                :counter="20"
                                                label="Apellido"
                                                required
                                                @input="$v.deliveryAddress.lastName.$touch()"
                                                @blur="$v.deliveryAddress.lastName.$touch()"
                                            ></v-text-field>
                                        </v-col>                                                                    
                                    </v-row>    
                                    
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                            dense
                                            outlined
                                            v-model="deliveryAddress.address"          
                                            :error-messages="deliveryAddressAddressErrors"                                                  
                                            :counter="30"
                                            label="Dirección"
                                            @input="$v.deliveryAddress.address.$touch()"
                                            @blur="$v.deliveryAddress.address.$touch()"
                                            ></v-text-field>
                                        </v-col>                            
                                    </v-row>             

                                    <v-row>
                                        <v-col md="6" sm="12">
                                            <v-text-field
                                            dense
                                            outlined
                                            v-model="deliveryAddress.city"    
                                            :error-messages="deliveryAddressCityErrors"                                
                                            :counter="9"
                                            label="Ciudad"
                                            @input="$v.deliveryAddress.city.$touch()"
                                            @blur="$v.deliveryAddress.city.$touch()"
                                            ></v-text-field>
                                        </v-col>
                                
                                        <v-col md="6" sm="12">
                                            <v-text-field
                                            dense
                                            outlined
                                            v-model="deliveryAddress.zipCode"      
                                            :error-messages="deliveryAddressZipCodeErrors"                                       
                                            :counter="5"
                                            label="C.P"
                                            @input="$v.deliveryAddress.zipCode.$touch()"
                                            @blur="$v.deliveryAddress.zipCode.$touch()"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>                                                              
                                </form>   


                                <form v-if="delivery==='takeAway'">                                                                               
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                                dense
                                                outlined
                                                v-model="takeAwayAddress.firstName"
                                                :error-messages="takeAwayAddressfirstNameErrors"
                                                :counter="20"
                                                label="Nombre"
                                                required
                                                @input="$v.takeAwayAddress.firstName.$touch()"
                                                @blur="$v.takeAwayAddress.firstName.$touch()"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col>
                                            <v-text-field
                                                dense
                                                outlined
                                                v-model="takeAwayAddress.lastName"
                                                :error-messages="takeAwayAddressLastNameErrors"
                                                :counter="20"
                                                label="Apellido"
                                                required
                                                @input="$v.takeAwayAddress.lasttName.$touch()"
                                                @blur="$v.takeAwayAddress.lastName.$touch()"
                                            ></v-text-field>
                                        </v-col>

                                        
                                                                    
                                    </v-row>    
                                    
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                            dense
                                            outlined
                                            v-model="takeAwayAddress.phone"    
                                            :error-messages="takeAwayAddressPhoneErrors"                                
                                            :counter="9"
                                            label="Teléfono"
                                            @input="$v.takeAwayAddress.phone.$touch()"
                                            @blur="$v.takeAwayAddress.phone.$touch()"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field
                                                dense
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
                                                format="24hr"
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
                            </div>
                            
                            <div v- class="text-center" v-else>
                                <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F1037%2F1037855.png&f=1&nofb=1" max-height="228" contain></v-img>
                                <h1>Por favor, loggeate o registrate en el sistema para poder continuar</h1>
                            </div>


                            <v-btn text @click="e1=1" class="button--backward">Atras</v-btn>
                            <v-btn
                            color="primary"
                            @click="nextStep(2)"
                            v-if="user"
                            class="button--forward"
                            >
                            Siguiente
                            </v-btn>
                
                            
                
                            
                            
                        </v-stepper-content>

                        <v-stepper-content                    
                            key="3"
                            :step="3"
                        >
                            
                            <div v-if="user">
                                <h2>Pago</h2>
                                <p>
                                    Para terminar el proceso, serás redirigido a la plataforma de Paypal, que es la que utilizamos para gestionar nuestros
                                    pagos de la forma más segura posible, a través de este proveedor de garantía internacional. Después, volverás a nuestro
                                    entorno donde te indicaremos el número de pedido que el sistema te ha asignado.
                                </p>
                            </div>
                            <div v- class="text-center" v-else>
                                <v-img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F1037%2F1037855.png&f=1&nofb=1" max-height="228" contain></v-img>
                                <h1>Por favor, loggeate o registrate en el sistema para poder continuar</h1>
                            </div>
                
                            <v-btn text @click="e1=2" class="button--backward">Atras</v-btn>

                            <v-btn                            
                            @click="processOrder"
                            class="button--forward"
                            v-if="user"
                            >
                            Finalizar
                            </v-btn>
                                            
                        </v-stepper-content>

                        </v-stepper-items>
                    </v-stepper>
                </v-col>
                <v-col md="3">
                    <CartSidebar :isOnlyInfo=true :cart="cart.items" class="sticky"></CartSidebar>
                </v-col>
            </v-row>                
        </v-container>

        <v-container>
            <!-- <v-row class="d-flex justify-center mb-6">
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
                                    {{ element.firstName }}
                                </div>
                                <div>                  
                                    {{ calzipCoderice(element) }} €               
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
            </v-row> -->
            
            
        </v-container>
        
      
        
    </div>
</template>
<script>
import { required, email, numeric, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapState,mapGetters } from 'vuex'
import TopElement from '@/components/TopElement'
// import ProductList from '@/components/ProductList'
// import ProductDialog from '@/components/ProductDialog'
import CartSidebar from '@/components/CartSidebar'
// import CategoriesSidebar from '@/components/CategoriesSidebar'

export default {    
    components:{
        TopElement, CartSidebar//ProductList, ProductDialog, CartSidebar, CategoriesSidebar, Footer
    },
    data(){
        return{            
            steps: 3,
            e1:1,     
            delivery:'delivery',
            deliveryAddress:{},
            takeAwayAddress: {}    
        }
    },
    validations: {
        deliveryAddress:{
            firstName: { required, maxLength: maxLength(20) },
            lastName: { required, maxLength: maxLength(20)   },
            address: { required, maxLength: maxLength(20)   },
            city: { required, maxLength: maxLength(30)   },
            zipCode: { 
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
            firstName: { required, maxLength: maxLength(20) },
            lastName: { required, maxLength: maxLength(20)},
            phone: { required, numeric, maxLength: maxLength(9)},      
            email: { required, email, maxLength: maxLength(20)},      
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
        cart: state => state.cart,               
        user: state => state.auth.item, 
      }),      
      ...mapGetters({
        'openingTime': 'restaurants/getOpeningTime',        
      }),     
      totalPrice(){
        let sum=0
        this.cart.items.forEach(element => {
          sum+=this.calzipCoderice(element)
        });
        
        return Math.round(sum * 100) / 100
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
        deliveryAddressFirstNameErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.firstName.$dirty) return errors            
            !this.$v.deliveryAddress.firstName.required && errors.push('Es necesario que rellenes este campo.')
            !this.$v.deliveryAddress.zipCode.maxLength && errors.push('Comprueba la longitud de tu nombre')
            return errors
        },
        deliveryAddressLastNameErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.lastName.$dirty) return errors            
            !this.$v.deliveryAddress.lastName.required && errors.push('Apellido es un campo requerido')
            !this.$v.deliveryAddress.lastName.maxLength && errors.push('Comprueba la longitud de tu apellido')
            return errors
        },
        deliveryAddressCityErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.city.$dirty) return errors            
            !this.$v.deliveryAddress.city.required && errors.push('Ciudad es un campo requerido')
            !this.$v.deliveryAddress.city.maxLength && errors.push('Comprueba la longitud de tu ciudad')
            return errors
        },
        deliveryAddressZipCodeErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.zipCode.$dirty) return errors
            !this.$v.deliveryAddress.zipCode.numeric && errors.push('El contenido del campo teléfono debe ser numérico')
            !this.$v.deliveryAddress.zipCode.required && errors.push('C.P es un campo requerido')
            !this.$v.deliveryAddress.zipCode.minLength && errors.push('El código postal no puede ser inferior a 5 dígitos')
            !this.$v.deliveryAddress.zipCode.maxLength && errors.push('El código postal no puede ser superior a 5 dígitos')
            return errors
        },
        deliveryAddressAddressErrors () {
        const errors = []
            if (!this.$v.deliveryAddress.address.$dirty) return errors            
            !this.$v.deliveryAddress.address.required && errors.push('Es necesario que rellenes este campo.')
            return errors
        },
        deliveryErrors () {
        const errors = []
            if (!this.$v.delivery.$dirty) return errors            
            !this.$v.delivery.required && errors.push('Es necesario elegir un tipo de recogida.')
            return errors
        },
        takeAwayAddressfirstNameErrors () {
        const errors = []
            if (!this.$v.takeAwayAddress.firstName.$dirty) return errors            
            !this.$v.takeAwayAddress.firstName.required && errors.push('Es necesario que rellenes este campo.')
            !this.$v.takeAwayAddress.firstName.maxLength && errors.push('Comprueba la longitud de tu nombre')
            return errors
        },
        takeAwayAddressLastNameErrors () {
        const errors = []
            if (!this.$v.takeAwayAddress.lastName.$dirty) return errors            
            !this.$v.takeAwayAddress.lastName.required && errors.push('El apellido es un campo requerido')
            !this.$v.takeAwayAddress.lastName.maxLength && errors.push('Comprueba la longitud de tu apellido')
            return errors
        },
        takeAwayAddressEmailErrors () {
        const errors = []
            if (!this.$v.takeAwayAddress.email.$dirty) return errors
            !this.$v.takeAwayAddress.email.email && errors.push('Debes introducir una dirección de email válida')
            !this.$v.takeAwayAddress.email.required && errors.push('Email es un campo requerido')            
            return errors
        },
        takeAwayAddressPhoneErrors () {
        const errors = []
            if (!this.$v.takeAwayAddress.phone.$dirty) return errors
            !this.$v.takeAwayAddress.phone.numeric && errors.push('El contenido del campo teléfono debe ser numérico')
            !this.$v.takeAwayAddress.phone.required && errors.push('Teléfono es un campo requerido')
            !this.$v.takeAwayAddress.phone.maxLength && errors.push('Comprueba la longitud de tu teléfono')
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
                if(toValidate[key]!=null)  return toValidate[key].$invalid===true
            });            
            if (checked.length===0) return true
            return false
        },
        formatExtra(extraId){            
            let extraFound = this.extrasList.find(extra => extra._id === extraId)
            return extraFound.firstName      
        },
        formatVariant(productId, variantIndex, variantValue){      
            let productFound = this.products.find(product => product._id === productId)
            return productFound.variants[variantIndex].firstName + ': ' +productFound.variants[variantIndex].vars[variantValue].firstName      
        },
        calzipCoderice(element){      
            let sum=0
            let productFound = this.products.find(product => product._id === element._id)
            sum+=element.price
            if (element.size!=''){
            sum+= productFound.sizes.find((size)=>{
                    return size._id === element.size;
                }).price
            }             
            //Extras

            if(element.extras && element.extras>0){
                element.extras.forEach(elementExtra => {
                sum+= this.extrasList.find((extra)=>{
                        return elementExtra === extra._id;
                    }).price
                });
            }
            
                    

            //Variants        
            if(element.variants && element.variants>0){
                element.variants.forEach((elementVariant, index) => {            
                    sum+= element.prod_vars[index].vars[elementVariant].price
                });
            }
            


            return sum*element.amount
        },     
        processOrder(){        
            let order={}
            order.cart={...this.cart}
            order.cart.totalPrice=this.totalPrice
            order.seller={...this.restaurant}
            order.delivery=this.delivery
            order.user=this.user._id
            order.createdAt= + new Date(),
            order.updatedAt= + new Date(),
            order.paymentMethod= "card"              
            order.updateUrl=''    
            
            this.delivery==='delivery' ? order.customerData={...this.deliveryAddress} : order.customerData={...this.takeAwayAddress}
            order=this.deleteUnusedFields(order)

            this.$store.dispatch('orders/createOrder', order)
            .then((data)=>{
                debugger
                window.location = data.updateUrl
            })
        },

        deleteUnusedFields(order){
            delete order.cart.isFetching
            delete order.cart.error
            delete order.seller.tags
            delete order.seller.subtags
            delete order.seller.deliveryCodes
            delete order.seller.openingTime
            delete order.seller.closing
            delete order.seller.delivery
            delete order.seller.takeAway        
            delete order.customerData.token            

            return order
        }

    },
    mounted(){
        this.deliveryAddress={...this.user}
        this.takeAwayAddress={...this.user, readyTime:''}
    }
}
</script>
<style lang="scss" scoped>


.v-stepper{
    box-shadow: none;
}

.v-stepper__header{
    box-shadow: none;
}

.theme--light.v-stepper .v-stepper__step--active .v-stepper__label {
    text-shadow: none;
    color: #4496E8;
}

.v-stepper__header {
    font-size: 24px !important;
    font-weight: 700 !important;
}



span .v-stepper__step__step.primary {    
    display: none !important;    
}

.v-divider{
    display: none;
}


.v-picker__body {
    width: 200px !important;
}

.errorMessage{
    font-size: 12px;
    color:#ff5252;
}


</style>