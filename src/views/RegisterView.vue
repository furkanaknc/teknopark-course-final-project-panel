<template>
  <div class="container">
    <h1>REGISTER</h1>
    <div>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input id="email" type="text" placeholder="First Name" name="firstName" v-model="firstName" class=" form-control">
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input id="lastName" type="text" placeholder="Last Name" name="lastName" v-model="lastName" class=" form-control">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="text" placeholder="email" name="email" v-model="email" class=" form-control">
        </div>
        <div class="form-group">
          <label for="birthday">Birthday</label>
          <input id="Birthday" type="date" placeholder="birthday" name="birthday" v-model="birthday" class=" form-control">
        </div>
        <div class="form-group">
          <label for="identidyNumber">Identidy Number</label>
          <input id="identidyNumber" type="number" placeholder="Identidy Number" name="identidyNumber" v-model="identidyNumber" class=" form-control">
        </div>
        <div class="form-group">
          <label for="registrationNumber">Registration Number</label>
          <input id="registrationNumber" type="number" placeholder="Registration Number" name="registrationNumber" v-model="registrationNumber" class=" form-control">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="text" placeholder="password" name="password" v-model="password" class=" form-control">
        </div>
        <div class="form-group">
          <label for="confirm_password">Confirm Password</label>
          <input id="confirm_password" type="text" placeholder="Confirm Password" name="confirm_password" v-model="confirm_password" class=" form-control">
        </div>
        <button class="btn btn-primary">Register</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <router-link to="/login" class="card-link">Have you already an account?</router-link>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default{
  data(){
    return{
      firstName:"",
      lastName:"",
      email:"",
      birthday:"",
      identidyNumber:"",
      registrationNumber:"",
      password:"",
      confirm_password:""
    };
  },
  methods:{
    ...mapActions(['register']),
    registerUser(){
      let user={
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        birthday:this.birthday,
        identidyNumber:this.identidyNumber,
        registrationNumber:this.registrationNumber,
        password:this.password,
        confirm_password:this.confirm_password
      };
      this.register(user).then(res => {
  console.log(res); // Check the structure of the response
  if (res.data.success) {
    this.$router.push("login");
  }
});
    }
  }
}
</script>