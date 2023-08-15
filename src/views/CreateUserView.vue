<template>
    <div class="container">
        <h1>ADD USER</h1>
        <div>
          <form @submit.prevent="submitUser">
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
              <input id="email" type="email" placeholder="email" name="email" v-model="email" class=" form-control">
            </div>
            <div class="form-group">
                <label for="role">User Role</label>
                <select id="role" type="text" placeholder="User Role" name="role" v-model="role" class=" form-control">
                    <option value="Admin">Admin</option>
                    <option value="Company Owner">Company Owner</option>
                    <option value="Worker">Worker</option>
                    <option value="Educator">Educator</option>
                    <option value="Ordinary User">Ordinary User</option>
                </select>
            </div>
            <div class="form-group">
              <label for="departmentName">Department Name</label>
              <input id="departmentName" type="text" placeholder="Department Name" name="departmentName" v-model="departmentName" class=" form-control">
            </div>
            <div class="form-group">
              <label for="departmentCode">Department Code</label>
              <input id="departmentCode" type="number" placeholder="Department Code" name="departmentCode" v-model="departmentCode" class=" form-control">
            </div>
            <div class="form-group">
              <label for="registrationNumber">Registration Number</label>
              <input id="registrationNumber" type="number" placeholder="Registration Number" name="registrationNumber" v-model="registrationNumber" class=" form-control">
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
                <label for="dayOfStartedToWork">Day Of Started To Work</label>
                <input id="dayOfStartedToWork" type="date" placeholder="Day Of Started To Work" name="dayOfStartedToWork" v-model="dayOfStartedToWork" class=" form-control">
            </div>
            <div class="form-group">
                <label for="payroll">Payroll type</label>
                <select id="payroll" type="text" placeholder="Department Name" name="payroll" v-model="payroll" class=" form-control">
                    <option value="Sabit Bordro">Sabit Bordro</option>
                    <option value="Zaman Ücretli Bordro">Zaman Ücretli Bordro</option>
                    <option value="Primli Bordro">Primli Bordro</option>
                    <option value="Komisyonlu Bordro">Komisyonlu Bordro</option>
                    <option value="Maaş Ve Prim Birleşimi Bordro">Maaş Ve Prim Birleşimi Bordro</option>
                    <option value="İkramiye Ve Bonuslu Bordro">İkramiye Ve Bonuslu Bordro</option>
                    <option value="Ücret Ve Yan Haklar Bordrosu">Ücret Ve Yan Haklar Bordrosu</option>
                    <option value="Sosyal Yardımlar Ve Kesinti Bordrosu">Sosyal Yardımlar Ve Kesinti Bordrosu</option>
                    <option value="Dönemsel Bordro">Dönemsel Bordro</option>
                    <option value="Görev Tazminatı Bordrosu">Görev Tazminatı Bordrosu</option>
                </select>
            </div>
            <div class="form-group">
                <label for="wage">Wage</label>
                <input id="wage" type="number" placeholder="Wage" name="wage" v-model="wage" class=" form-control">
            </div>
            <div class="form-group">
                <label for="lawNo">Law No</label>
                <input id="lawNo" type="number" placeholder="Law No" name="lawNo" v-model="lawNo" class=" form-control">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" type="text" placeholder="password" name="password" v-model="password" class=" form-control">
            </div>
            <button class="btn btn-primary">Add User</button>
           
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
      role:"",
      departmentName:"",
      departmentCode:"",
      registrationNumber:"",
      birthday:"",
      identidyNumber:"",
      dayOfStartedToWork:"",
      payroll:"",
      wage:"",
      lawNo:"",
      password:"",
    };
  },
  methods:{
    ...mapActions(['createUser']),
    async submitUser(){
      let user={
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        role:this.role,
        departmentName:this.departmentName,
        departmentCode:this.departmentCode,
        registrationNumber:this.registrationNumber,
        birthday:this.birthday,
        identidyNumber:this.identidyNumber,
        dayOfStartedToWork:this.dayOfStartedToWork,
        payroll:this.payroll,
        wage:this.wage,
        lawNo:this.lawNo,
        password:this.password,
      };
      try {
        const response = await this.createUser(user);
        if (response.data.success) {
        this.$router.push("/");
      }
      } catch (error) {
        console.error("Error:", error);
      }
//       this.createUser(user).then(res => {
//   console.log(res); // Check the structure of the response
//   if (res.data.success) {
//     this.$router.push("home");
//   }
// });
    }
  }
}
</script>