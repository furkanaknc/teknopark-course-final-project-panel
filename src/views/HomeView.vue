<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="card">
      <router-link to="/courses" class="card-link btn btn-primary">Courses</router-link>
      <router-link to="/createUser" class="card-link btn btn-primary">Create User</router-link>
    </div>
  </div>
</template>

<script>


export default {
  name: 'HomeView',
  components: {

  }
}
</script>
