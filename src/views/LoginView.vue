<template>
    <div class="container">
      <h1>LOGIN</h1>
      <div>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="email" name="email" v-model="email" class=" form-control">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="text" placeholder="password" name="password" v-model="password" class=" form-control">
          </div>
          <input type="submit" class="btn btn-primary" value="Login">
          &nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/register" class="card-link">Need an account ?</router-link>
        </form>
      </div>
    </div>
  </template>
  <script>
  import { mapActions } from 'vuex';
  export default{
    data(){
      return{
        email:"",
        password:""
      };
      
    },
    methods:{
      ...mapActions(['login']),
      loginUser(){
        console.log(this.email,this.password)
        let user ={
          email:this.email,
          password:this.password
        }
        this.login(user)
        .then(res=>{
          if(res.data.success){
            this.$router.push("/profile");
          }
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }
  }
</script>