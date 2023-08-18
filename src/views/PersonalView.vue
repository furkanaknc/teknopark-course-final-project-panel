<template>
    <div>
      <h2>Profiles</h2>
      <router-link to="/createUser" class="btn btn-success">Add User</router-link>
      <div v-if="!ProfileUpdateFormVisible">
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
          <li class="list-group-item">Birthday: {{formatDate (profile.birthday) }}</li>
          <li class="list-group-item">Identity Number: {{ profile.identidyNumber }}</li>
          <li class="list-group-item">Payroll: {{ profile.payroll }}</li>
          <li class="list-group-item">Wage: {{ profile.wage }}</li>
          <li class="list-group-item">Law Number: {{ profile.lawNo }}</li>
          <ul class="list-group">
  <li v-for="courseId in profile.courses" :key="courseId">
    Course Name: {{ getCourseName(courseId) }} (Company: {{ getCourseCompanyName(courseId) }})
  </li>
</ul>
          <button class="btn btn-primary" @click="openUpdateForm(profile)">Update</button>
          <button class="btn btn-danger" @click="deleteProfile(profile._id)">Delete</button>
        </ul>
      </div>
    </div>
           <!-- Add an update form for each profile -->
          <div v-if="ProfileUpdateFormVisible">
            <form @submit.prevent="handleUpdatingProfile">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input id="email" type="text" placeholder="First Name" name="firstName" v-model="updateUserProfile.firstName" class=" form-control">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input id="lastName" type="text" placeholder="Last Name" name="lastName" v-model="updateUserProfile.lastName" class=" form-control">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" placeholder="email" name="email" v-model="updateUserProfile.email" class=" form-control">
              </div>
              <div class="form-group">
                  <label for="role">User Role</label>
                  <select id="role" type="text" placeholder="User Role" name="role" v-model="updateUserProfile.role" class=" form-control">
                      <option value="Admin">Admin</option>
                      <option value="Company Owner">Company Owner</option>
                      <option value="Worker">Worker</option>
                      <option value="Educator">Educator</option>
                      <option value="Ordinary User">Ordinary User</option>
                  </select>
              </div>
              <div class="form-group">
                <label for="departmentName">Department Name</label>
                <input id="departmentName" type="text" placeholder="Department Name" name="departmentName" v-model="updateUserProfile.departmentName" class=" form-control">
              </div>
              <div class="form-group">
                <label for="departmentCode">Department Code</label>
                <input id="departmentCode" type="number" placeholder="Department Code" name="departmentCode" v-model="updateUserProfile.departmentCode" class=" form-control">
              </div>
              <div class="form-group">
                <label for="registrationNumber">Registration Number</label>
                <input id="registrationNumber" type="number" placeholder="Registration Number" name="registrationNumber" v-model="updateUserProfile.registrationNumber" class=" form-control">
              </div>
              <div class="form-group">
                <label for="birthday">Birthday</label>
                <input id="Birthday" type="date" placeholder="birthday" name="birthday" v-model="updateUserProfile.birthday" class=" form-control">
              </div>
              <div class="form-group">
                <label for="identidyNumber">Identidy Number</label>
                <input id="identidyNumber" type="number" placeholder="Identidy Number" name="identidyNumber" v-model="updateUserProfile.identidyNumber" class=" form-control">
              </div>
              <div class="form-group">
                  <label for="dayOfStartedToWork">Day Of Started To Work</label>
                  <input id="dayOfStartedToWork" type="date" placeholder="Day Of Started To Work" name="dayOfStartedToWork" v-model="updateUserProfile.dayOfStartedToWork" class=" form-control">
              </div>
              <div class="form-group">
                  <label for="payroll">Payroll type</label>
                  <select id="payroll" type="text" placeholder="Department Name" name="payroll" v-model="updateUserProfile.payroll" class=" form-control">
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
                  <input id="wage" type="number" placeholder="Wage" name="wage" v-model="updateUserProfile.wage" class=" form-control">
              </div>
              <div class="form-group">
                  <label for="lawNo">Law No</label>
                  <input id="lawNo" type="number" placeholder="Law No" name="lawNo" v-model="updateUserProfile.lawNo" class=" form-control">
              </div>
              <div class="form-group">
                <label for="courses">Courses</label>
                <select id="courses" multiple v-model="updateUserProfile.courses" class="form-control">
                  
                  <option v-for="course in courses" :key="course._id" :value="course._id">
                    {{ course.name }} ({{ course.company }})
                  </option>
                </select>
                
              </div>
              <ul class="list-group">
                <li v-for="courseId in updateUserProfile.courses" :key="courseId">
                  Course Name: {{ getCourseName(courseId) }} (Company: {{ getCourseCompanyName(courseId) }})
                  <button class="btn btn-danger" @click="removeCourse(courseId)">Remove</button>
                </li>
              </ul>
            <button class="btn btn-primary" type="submit">Save</button>
            <button class="btn btn-secondary" type="submit" @click="closeForm">Close</button>
          </form>
        </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['courses','profiles']),
    },
    data(){
      return{
        ProfileUpdateFormVisible: false,
      updateUserProfile: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        departmentName: '',
        departmentCode: '',
        registrationNumber: '',
        birthday: '',
        identidyNumber: '',
        dayOfStartedToWork: '',
        payroll: '',
        wage: '',
        lawNo: '',
        courses:[]
      },
      }
    },
    created() {
      this.fetchProfiles();
      this.$store.dispatch('getProfile');
      this.$store.dispatch('getCourses')
    },
    methods: {
      ...mapActions(['getAllProfiles','updateProfile','deleteUser','getCourses','addUserCourse','removeUserCourse']),
      fetchProfiles() {
        this.getAllProfiles();
      },

      getCourseName(courseId) {
        const course = this.courses.find(course => course._id === courseId);
        return course ? course.name : 'Course Not Found';
      },
      getCourseCompanyName(courseId) {
        const course = this.courses.find(course => course._id === courseId);
        return course  ? course.company : 'Unknown Company';
      },
      
      openUpdateForm(profile) {
      this.ProfileUpdateFormVisible = true;
      this.updateUserProfile = { ...profile };
      this.updateUserProfile.courses = profile.courses;
    },
    closeForm() {
      this.ProfileUpdateFormVisible = false;
      // Clear the updateUserProfile fields if needed
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },

    async handleUpdatingProfile() {
    try {
        console.log("Updating profile...", this.updateUserProfile);

        const res = await this.updateProfile({
            userId: this.updateUserProfile._id,
            updatedData: this.updateUserProfile,
        });

        console.log("Update response:", res);

        if (res.data.success) {
            console.log("Profile successfully updated.");
            this.ProfileUpdateFormVisible = false;
        }
    } catch (err) {
        console.error("Update error:", err);
    }
},
async deleteProfile(profileId) {
      try {
        const res = await this.deleteUser(profileId);
        if (res.data.success) {
          console.log("Profile successfully deleted.");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    },

    async addCourseToUser(courseId) {
    try {
      const res = await this.addUserCourse({
        userId: this.updateUserProfile._id,
        courseId: courseId,
      });
      if (res.data.success) {
        console.log("Course added to user successfully.");
        // You might want to update the list of courses after adding
        // and update the profile data as well
      }
    } catch (err) {
      console.error("Add course error:", err);
    }
  },

  async removeCourse(courseId) {
    try {
      const userId = this.updateUserProfile._id;

      const res = await this.removeUserCourse({
        userId,
        courseId
      });

      if (res.data.success) {
        console.log("Course removed successfully.");
        // Update the local state (VueX) after the course removal
        this.$store.commit("deleteCourseFromUser_success", {
          userId,
          courseId
        });
      }
    } catch (err) {
      console.error("Course removal error:", err);
    }
  },


    },
  };
  </script>
  