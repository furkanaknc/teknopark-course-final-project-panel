<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="card">
      <router-link to="/courses" class="btn btn-primary">Courses</router-link>
      <router-link v-if="isValidUser" to="/createUser" class="btn btn-primary">Create User</router-link>
      <router-link v-if="isValidUser" to="/personals" class="btn btn-primary">Personals</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['user','role']),
    isValidUser() {
      return this.user.role === 'Admin' || this.user.role ==='Company Owner';
    }
  },
  created() {
    this.$store.dispatch('getProfile');
  }
};
</script>
