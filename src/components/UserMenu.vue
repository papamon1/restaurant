<template>
    <div>
        <v-menu                    
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
            v-if="!user"
        >
            <template v-slot:activator="{ on }">
            <v-btn icon
                v-on="on"
            >
                <v-icon>mdi-account</v-icon>
            </v-btn>
            </template>
    
            <v-card>
            <v-list>
                <v-list-item>
                <v-list-item-avatar>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
    
                <v-list-item-content>
                    <v-list-item-title>USUARIO SIN REGISTRAR</v-list-item-title>
                    <v-list-item-subtitle>Regístrate o loggeate para hacer tu pedido :) </v-list-item-subtitle>
                </v-list-item-content>
    
                
                </v-list-item>
            </v-list>
    
            <v-divider></v-divider>

            <v-tabs
                v-model="tab"
                background-color="#4496E8"
                centered
                dark
                icons-and-text
                v-if="!user"
            >
                <v-tabs-slider></v-tabs-slider>
        
                <v-tab href="#tab-1">
                Login
                <v-icon>mdi-exclamation</v-icon>
                </v-tab>
                       
        
                <v-tab href="#tab-2">
                Registrate
                <v-icon>mdi-account-box</v-icon>
                </v-tab>
            </v-tabs>
        
            <v-tabs-items v-model="tab">
                <!-- <v-tab-item
                v-for="i in 3"
                :key="i"
                :value="'tab-' + i"
                >
                <v-card flat>
                    <v-card-text>{{ text }}</v-card-text>
                </v-card>
                </v-tab-item> -->
                <v-tab-item                
                key="1"
                value="tab-1"
                >
                <v-card flat>
                    <v-container>
                        <form>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                        dense
                                        outlined
                                        v-model="login.email"
                                        :error-messages="loginEmailErrors"
                                        :counter="20"
                                        label="Email"
                                        required
                                        @input="$v.login.email.$touch()"
                                        @blur="$v.login.email.$touch()"
                                    ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                        type="password"
                                        dense
                                        outlined
                                        v-model="login.password"
                                        :error-messages="loginPasswordErrors"
                                        :counter="20"
                                        label="Password"
                                        required
                                        @input="$v.login.password.$touch()"
                                        @blur="$v.login.password.$touch()"                                
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </form>                        
                        <v-btn text @click="loginWithEmailAndPassword()" class="button--forward">Login</v-btn>   
                    </v-container>
                </v-card>
                </v-tab-item>
                 <v-tab-item                
                key="2"
                value="tab-2"
                >
                <v-card flat>
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
                        <v-btn text @click="register" class="button--forward">Register</v-btn>
                    </v-container>                       
                </v-card>
                </v-tab-item>
                
            </v-tabs-items>           
            </v-card>
        </v-menu>

        <v-menu                    
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
            v-else
        >
            <template v-slot:activator="{ on }">
            <v-btn icon
                v-on="on"
            >
                <v-list-item-avatar>
                    <img :src="user.avatar" alt="pic">
                </v-list-item-avatar>
            </v-btn>
            </template>
    
            <v-card>
            <v-list>
                <v-list-item>
                <v-list-item-avatar>
                    <img :src="user.avatar" alt="pic">
                </v-list-item-avatar>
    
                <v-list-item-content>
                    <v-list-item-title>{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
                    <v-list-item-subtitle>Comedor profesional 🍔 🍔 🍔 </v-list-item-subtitle>
                </v-list-item-content>
    
                <v-list-item-action>
                    <v-btn
                    
                    icon
                    
                    >
                    <v-icon>mdi-heart</v-icon>
                    </v-btn>
                </v-list-item-action>
                </v-list-item>
            </v-list>
    
            <v-divider></v-divider>
            <v-container>
                <form>
                    <v-row>
                        <v-col>
                            <v-text-field
                                dense
                                outlined
                                v-model="user.firstName"
                                
                                :counter="20"
                                label="Nombre"
                                required
                                
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                dense
                                outlined
                                v-model="user.lastName"
                                
                                :counter="20"
                                label="Apellido"
                                required
                                
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                dense
                                outlined
                                v-model="user.email"
                                
                                :counter="20"
                                label="Email"
                                required
                                
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                dense
                                outlined
                                v-model="user.phone"
                                
                                :counter="9"
                                label="Teléfono"
                                required
                                
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-text-field
                                dense
                                outlined
                                v-model="user.zipCode"
                                
                                :counter="6"
                                label="C.P"
                                required
                                
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                dense
                                outlined
                                v-model="user.city"
                                
                                :counter="20"
                                label="Ciudad"
                                required
                                
                            ></v-text-field>
                        </v-col>
                    </v-row>                    
                </form>                
                <v-btn text @click="logout()" class="button--forward">Logout</v-btn>
            </v-container>            
            </v-card>
        </v-menu>
        <v-snackbar
            top
            :timeout=2500
            v-model="snackbar.show"
            :color="this.snackbar.color"
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
import { required, email, numeric, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
export default {
    props:{      
        user:{
            type:Object,
            required:true
        }  
    },
    data(){
        return{
            login:{
                email:'',
                password:''
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
            snackbar:{
                show:false,
                text:'',
                color:''
            },         
            toRegister:true,
            tab: null,            
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
    methods: {
        logout () {
            this.$store.dispatch('auth/logout')
            .then(function(errMessage) {                
                this.showSnackbar(errMessage, "success")
            }.bind(this))
        },
        loginWithEmailAndPassword () {
            this.$store.dispatch('auth/loginWithEmailAndPassword', this.login)
            .then(function(errMessage) {                
                this.showSnackbar(errMessage, "success")
            }.bind(this))
            .catch(function(errMessage){
                this.showSnackbar(errMessage, "success")
                }.bind(this))
        },
        register(){            
            this.$v.form.$touch()
            if (this.checkValidation(this.$v.form, Object.keys(this.form))===false) return false 
            this.$store.dispatch('auth/registerUser', this.form)            
            .then(function(errMessage) {                                
                this.showSnackbar(errMessage, "success")
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
        showSnackbar(msg, color){
            this.snackbar.text=msg
            this.snackbar.color=color
            this.snackbar.show=true
        },
    },
    created(){
        
    }
    
}
</script>
<style lang="scss" scoped>

</style>