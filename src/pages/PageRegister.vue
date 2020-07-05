<template>
  <div class="container">
    <div class="section text-center">
        <v-row align="center" justify="center">
            <v-img src="http://www.myiconfinder.com/uploads/iconsets/b030adac9955cf87d7abe3e5f2106d90.png" max-width="150"></v-img>
        </v-row>
        
        <v-card            
                class="my-12 mr-6"                        
            >
                <v-card-title class="title">Registro de usuario</v-card-title>
                <v-card-subtitle class="text-left mt-1">Rellena los siguientes campos para completar tu registro de usuario</v-card-subtitle>
                <v-container>
                    <form>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="form.firstName"
                                    :error-messages="firstNameErrors"
                                    :counter="20"
                                    label="Nombre"
                                    required
                                    @input="$v.form.firstName.$touch()"
                                    @blur="$v.form.firstName.$touch()"
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="form.lastName"
                                    :error-messages="lastNameErrors"
                                    :counter="20"
                                    label="Apellido"
                                    required
                                    @input="$v.form.lastName.$touch()"
                                    @blur="$v.form.lastName.$touch()"                                
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="form.email"
                                    :error-messages="emailErrors"
                                    :counter="20"
                                    label="Email"
                                    required
                                    @input="$v.form.email.$touch()"
                                    @blur="$v.form.email.$touch()"
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="form.phone"
                                    :error-messages="phoneErrors"   
                                    :counter="9"
                                    label="Teléfono"
                                    required
                                    @input="$v.form.phone.$touch()"
                                        @blur="$v.form.phone.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="form.zipCode"
                                    :error-messages="zipErrors"        
                                    :counter="6"
                                    label="C.P"
                                    required
                                    @input="$v.form.zipCode.$touch()"
                                    @blur="$v.form.zipCode.$touch()"
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="form.address"          
                                    :error-messages="addressErrors"                                                  
                                    :counter="20"
                                    label="Dirección"
                                    required
                                    @input="$v.form.address.$touch()"
                                    @blur="$v.form.address.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="form.city"
                                    :error-messages="cityErrors"        
                                    :counter="6"
                                    label="Ciudad"
                                    required
                                    @input="$v.form.city.$touch()"
                                    @blur="$v.form.city.$touch()"
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    dense
                                    outlined
                                    v-model="form.avatar"          
                                    :error-messages="avatarErrors"                                                  
                                    :counter="150"
                                    label="avatar"
                                    required
                                    @input="$v.form.avatar.$touch()"
                                    @blur="$v.form.avatar.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field
                                    type="password"
                                    dense
                                    outlined
                                    v-model="form.password"
                                    :error-messages="passwordErrors"          
                                    :counter="6"
                                    label="Contraseña"
                                    required
                                    @input="$v.form.password.$touch()"
                                    @blur="$v.form.password.$touch()"
                                ></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    type="password"
                                    dense
                                    outlined
                                    v-model="form.passwordConfirmation"
                                    :error-messages="passwordConfirmationErrors"          
                                    :counter="20"
                                    label="Confirmar contraseña"
                                    required
                                    @input="$v.form.passwordConfirmation.$touch()"
                                    @blur="$v.form.passwordConfirmation.$touch()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </form>
                    <v-btn text @click="register" class="button--forward">Registrar</v-btn>
                </v-container>   

        </v-card>
    </div>
    <v-snackbar
            top
            :timeout=2500
            v-model="snackbar.show"
            color="success"
        >
            {{ snackbar.text }}
            <v-btn
            color="black"
            text
            @click="snackbar.show = false"
            >
            Close
            </v-btn>
        </v-snackbar>
  </div>
</template>

<script>
import { USER_REGISTERED } from '@/helpers/redirectMessages'
import { required, email, numeric, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
export default {
    created() {

    },
    methods: {        
        register(){                        
            this.$v.form.$touch()
            if (this.checkValidation(this.$v.form, Object.keys(this.form))===false) return false 
            this.$store.dispatch('auth/registerUser', this.form)            
            .then(function() {       
                debugger                         
                this.$router.push({path: '/login', query: { messageType: USER_REGISTERED.type}})
            }.bind(this))
            .catch(function(errMessage) {                                
                this.showSnackbar(errMessage, "error")
            }.bind(this))
        },
        checkValidation(toValidate, keyList){
            let checked=[]
            checked=keyList.filter(key => {                         
                return toValidate[key].$invalid===true
            });
            if (checked.length===0) return true
            return false
        },
        showSnackbar(msg){
            this.snackbar.text=msg
            this.snackbar.show=true
        },

    },
    computed:{
      loginEmailErrors () {
        const errors = []
            if (!this.$v.login.email.$dirty) return errors
            !this.$v.login.email.email && errors.push('Es necesario identificarte con un correo electrónico válido.')
            !this.$v.login.email.required && errors.push('Email es un campo requerido')            
            return errors
        },  
        loginPasswordErrors () {
        const errors = []
            if (!this.$v.login.password.$dirty) return errors            
            !this.$v.login.password.required && errors.push('Es necesario introducir una contraseña.')
            return errors
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
        firstNameErrors () {
        const errors = []
            if (!this.$v.form.firstName.$dirty) return errors            
            !this.$v.form.firstName.required && errors.push('Es necesario que rellenes este campo.')            
            return errors
        },
        lastNameErrors () {
        const errors = []
            if (!this.$v.form.lastName.$dirty) return errors            
            !this.$v.form.lastName.required && errors.push('Es necesario que rellenes este campo.')            
            return errors
        },
        emailErrors () {
        const errors = []
            if (!this.$v.form.email.$dirty) return errors
            !this.$v.form.email.email && errors.push('El email debe tener una dirección valida. Con esta dirección será con la que te identifiques.')
            !this.$v.form.email.required && errors.push('Email es un campo requerido')            
            return errors
        },
        phoneErrors () {
        const errors = []
            if (!this.$v.form.phone.$dirty) return errors
            !this.$v.form.phone.numeric && errors.push('El contenido del campo teléfono debe ser numérico')
            !this.$v.form.phone.required && errors.push('Teléfono es un campo requerido')            
            return errors
        },
        zipErrors () {
        const errors = []
            if (!this.$v.form.zipCode.$dirty) return errors
            !this.$v.form.zipCode.numeric && errors.push('El contenido del campo teléfono debe ser numérico')
            !this.$v.form.zipCode.required && errors.push('C.P es un campo requerido')
            !this.$v.form.zipCode.minLength && errors.push('El código postal no puede ser inferior a 5 dígitos')
            !this.$v.form.zipCode.maxLength && errors.push('El código postal no puede ser superior a 5 dígitos')
            return errors
        },
        addressErrors () {
        const errors = []
            if (!this.$v.form.address.$dirty) return errors            
            !this.$v.form.address.required && errors.push('Es necesario que rellenes este campo.')
            return errors
        },
        cityErrors () {
        const errors = []
            if (!this.$v.form.city.$dirty) return errors            
            !this.$v.form.city.required && errors.push('Es necesario que rellenes este campo.')
            return errors
        },
        avatarErrors () {
        const errors = []
            if (!this.$v.form.avatar.$dirty) return errors            
            !this.$v.form.avatar.required && errors.push('Es necesario que rellenes este campo.')
            return errors
        },
        passwordErrors () {
        const errors = []
            if (!this.$v.form.password.$dirty) return errors            
            !this.$v.form.password.required && errors.push('Es necesario elegir una contraseña.')
            return errors
        },   
        passwordConfirmationErrors () {
        const errors = []
            if (!this.$v.form.passwordConfirmation.$dirty) return errors            
            !this.$v.form.passwordConfirmation.sameAsPassword && errors.push('Las dos contraseñas deben coincidir.')
            !this.$v.form.passwordConfirmation.required && errors.push('Es necesario rellenar este campo.')
            return errors
        }        
    },
    data(){
        return{
            snackbar:{
                show:false,
                text:''
            },
            form:{
                address:'',
                email:'',
                firstName:'',
                lastName:'',
                phone:'',
                zipCode:'',
                city:'',
                state:'Madrid',
                avatar:'',
                password:'',
                passwordConfirmation:''
            },       
        }

    },
    validations: {
        login:{
            email: { required, email, maxLength: maxLength(20)   },    
            password: { required, maxLength: maxLength(30)   }
        },
        form:{
            firstName: { required, maxLength: maxLength(20) },
            lastName: { required, maxLength: maxLength(20) },
            email: { required, email, maxLength: maxLength(20)   },
            phone: { required, numeric, maxLength: maxLength(9)   },
            address: { required, maxLength: maxLength(30)   },
            city: { required, maxLength: maxLength(30)   },
            state: { required, maxLength: maxLength(30)   },
            avatar: { required, maxLength: maxLength(150)   },
            zipCode: { 
                required, 
                numeric,
                minLength: minLength(5),
                maxLength: maxLength(6)  
            },
            password: { required, maxLength: maxLength(30)   },
            passwordConfirmation: { required, maxLength: maxLength(30),sameAsPassword: sameAs('password')},
            checkbox: {
                checked (val) {
                    return val
                },
            }
        },                
    },
}
</script>

<style scoped>
  .title {
    font-size: 50px;
    text-align: center;
    font-family: 'Montserrat', sans-serif !important;
  }
</style>