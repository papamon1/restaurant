<template>
  <div class="container">
    <div class="section" v-if="loading">
      <h1 class="title">Estamos activando tu cuenta de usuario...</h1>
      <AppSpinner/>
    </div>
        <v-card            
            class="my-12 mr-6"       
            v-if="!loading && valid"                 
        >
            <v-container>
                <v-card-title class="title">Restablecer contraseña</v-card-title>
                <v-card-subtitle class="text-left mt-1">
                    Hola, <strong> {{firstName}} {{ lastName }}!</strong> 
                    <br/>
                    Un paso más y podrás restablecer tu contraseña. Introduce tu nueva contraseña y vuelve a disfrutar de RestaurApp
                </v-card-subtitle>
                <form @submit.prevent="resetPassword">                    
                    <v-row>
                        <v-col>
                            <v-text-field
                                type="password"
                                dense
                                outlined
                                v-model="form.newPassword"
                                :error-messages="newPasswordErrors"
                                :counter="20"
                                label="Escribe tu nueva contraseña"
                                required
                                @input="$v.form.newPassword.$touch()"
                                @blur="$v.form.newPassword.$touch()"                                
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                type="password"
                                dense
                                outlined
                                v-model="form.newPasswordConfirm"
                                :error-messages="newPasswordConfirmErrors"
                                :counter="20"
                                label="Repite te nueva contraseña"
                                required
                                @input="$v.form.newPasswordConfirm.$touch()"
                                @blur="$v.form.newPasswordConfirm.$touch()"                                
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn type="submit" text class="button--forward">Restablecer</v-btn>  
                </form>                                         
            </v-container>
        </v-card>
        <div v-else>
            <h1 class="title">OOOOPSS.... no se encuentra el usuario para restaurar la contraseña. Puede que haya pasado mucho tiempo desde que lo solicitaste. Por favor, comienza el proceso de nuevo.</h1>
        </div>
  </div>
</template>

<script>
import { USER_RESET_PASSWORD } from '@/helpers/redirectMessages'
import AppSpinner from '@/components/AppSpinner'
import { required, sameAs, maxLength } from 'vuelidate/lib/validators'
export default {
  components:{
    AppSpinner
  },
  created() {
    this.activateUser()
  },
  data(){
      return{
        loading:true,
        valid:true,
        firstName:'',
        lastName:'',
        hash:'',
        form:{
            newPassword:'',
            newPasswordConfirm:'',
        }        
      }
  },
  methods: {
    activateUser() {
      const { hash } = this.$route.params
      this.$store.dispatch('auth/validateResetPassword', hash)        
        .then((res) =>{
            console.log(res.data)
            this.firstName= res.data.firstName
            this.lastName= res.data.lastName
            this.hash= res.data.hash
            this.loading=false
        })
        .catch(() =>{
            this.loading=false
            this.valid=false
        })
    },
    resetPassword(){
        const isInvalid = this.$v.$invalid       
        if(!isInvalid){
            this.$store.dispatch('auth/resetPassword', {form:{...this.form, hash:this.hash}})        
            .then(() => this.$router.push({path: '/login', query: { messageType: USER_RESET_PASSWORD.type}}))
            .catch(err => console.log(err))
        }        
    }
  },
  validations: {
        form:{
            newPassword: { required, maxLength: maxLength(20)   },    
            newPasswordConfirm: { required, maxLength: maxLength(30), sameAsPassword: sameAs('newPassword')   }
        }
    },
  computed:{
        newPasswordErrors () {
        const errors = []
            if (!this.$v.form.newPassword.$dirty) return errors
            !this.$v.form.newPassword.required && errors.push('Es necesario introducir una contraseña.')            
            return errors
        },  
        newPasswordConfirmErrors () {
        const errors = []
            if (!this.$v.form.newPasswordConfirm.$dirty) return errors            
            !this.$v.form.newPasswordConfirm.required && errors.push('Es necesario introducir una contraseña.')
            !this.$v.form.newPasswordConfirm.sameAsPassword && errors.push('Las contraseñas no coinciden.')
            return errors
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