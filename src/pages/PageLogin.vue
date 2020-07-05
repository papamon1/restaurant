<template>
    <div class="container">
        <v-row align="center" justify="center">
            <v-img src="http://www.myiconfinder.com/uploads/iconsets/b030adac9955cf87d7abe3e5f2106d90.png" max-width="150"></v-img>
        </v-row>
        <v-card            
                    class="my-12 mr-6"                        
                >
            <v-container>
                <v-card-title class="title">Login</v-card-title>
                <v-card-subtitle class="text-left mt-1">Completa los campos para ingresar en la aplicación</v-card-subtitle>
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
        <v-snackbar
            top
            :timeout=4500
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
import { REDIRECT_MESSAGES } from '@/helpers/redirectMessages'
import { required, email, maxLength } from 'vuelidate/lib/validators'
export default {
    data(){
        return{
            snackbar:{
                show:false,
                text:''
            },
            login:{
                email:'',
                password:''
            }
        }
    },
    validations: {
        login:{
            email: { required, email, maxLength: maxLength(20)   },    
            password: { required, maxLength: maxLength(30)   }
        }
    },    
    methods: {
        loginWithEmailAndPassword () {
            this.$store.dispatch('auth/loginWithEmailAndPassword', this.login)
            .then(function() {                
                this.$router.push('/restaurant/5e835a751c9d440000fface6')
            }.bind(this))
            .catch(function(errMessage){
                this.showSnackbar(errMessage, "success")
                }.bind(this))
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
    },
    created() {        
        const { messageType } = this.$route.query
        if (!messageType) return
        const { message } = REDIRECT_MESSAGES[messageType]
        this.showSnackbar(message)                
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