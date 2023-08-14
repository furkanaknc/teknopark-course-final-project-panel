<template>
    <div>
      <h2>Profiles</h2>
      <div class="card" v-for="profile in profiles" :key="profile._id">
        <ul class="list-group">
          <li class="list-group-item">ID: {{ profile._id }}</li>
          <li class="list-group-item">First Name: {{ profile.firstName }}</li>
          <li class="list-group-item">Last Name: {{ profile.lastName }}</li>
          <li class="list-group-item">Email: {{ profile.email }}</li>
          <li class="list-group-item">Role: {{ profile.role }}</li>
          <li class="list-group-item">Department Name: {{ profile.departmentName }}</li>
          <li class="list-group-item">Department Code: {{ profile.departmentCode }}</li>
          <li class="list-group-item">Registration Number: {{ profile.registrationNumber }}</li>
          <li class="list-group-item">Birthday: {{ profile.birthday }}</li>
          <li class="list-group-item">Identity Number: {{ profile.identidyNumber }}</li>
          <li class="list-group-item">Payroll: {{ profile.payroll }}</li>
          <li class="list-group-item">Wage: {{ profile.wage }}</li>
          <li class="list-group-item">Law Number: {{ profile.lawNo }}</li>
          <ul class="list-group">
            <li v-for="course in profile.courses" :key="course._id">
              Course Name: {{ course.courseName }}
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['profiles']),
    },
    created() {
      this.fetchProfiles();
    },
    methods: {
      ...mapActions(['getAllProfiles']),
      fetchProfiles() {
        this.getAllProfiles();
      },
    },
  };
  </script>
  