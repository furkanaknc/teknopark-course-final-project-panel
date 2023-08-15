<template>
  <div>
    <h2>MY PROFILE</h2>
    <div class="card" v-if="user">
      <ul class="list-group">
        <li class="list-group-item">Email: {{user.email}}</li>
        <li class="list-group-item">First Name: {{user.firstName}}</li>
        <li class="list-group-item">Last Name: {{user.lastName}}</li>
        <li class="list-group-item">Role: {{user.role}}</li>
        <li class="list-group-item">Department Name: {{user.departmentName}}</li>
        <li class="list-group-item">Department Code: {{user.departmentCode}}</li>
        <li class="list-group-item">RegistrationNumber: {{user.registrationNumber}}</li>
        <li class="list-group-item">Birthday: {{formatDate(user.birthday)}}</li>
        <li class="list-group-item">Identidy Number: {{user.identidyNumber}}</li>
        <li class="list-group-item">Payroll: {{user.payroll}}</li>
        <li class="list-group-item">Wage: {{user.wage}}</li>
        <li class="list-group-item">Law No: {{user.lawNo}}</li>
        <li class="list-group-item">Courses:</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
export default{
  computed:mapGetters(['user']),
  methods: {
    ...mapActions(['getProfile']),
    formatDate(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
  
  created(){
    this.getProfile();
  }
}

</script>