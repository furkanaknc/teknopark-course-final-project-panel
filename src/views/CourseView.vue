<template>
  <div>
    <h2>Courses</h2>
    <div  class="buttons">
      <button v-if="isAdmin() && !isUpdateCoursePopupVisible && !isAddCoursePopupVisible" class="btn btn-success btn-space" @click="isAddCoursePopupVisible = true">
        Add Course
      </button>
    </div>

    <!-- Hidden form -->
    <div v-if="isAddCoursePopupVisible" class="card">
      <form @submit.prevent="addCourse">
        <div class="form-group">
          <label for="name">Name:</label>
          <input v-model="newCourse.name" type="text" id="name" class="form-control">
        </div>
        <div class="form-group">
          <label for="company">Company:</label>
          <input v-model="newCourse.company" type="text" id="company" class="form-control">
        </div>
        <div class="form-group">
          <label for="educator">Educator</label>
          <select v-model="newCourse.educator" id="educator" class="form-control">
            <option value="">Select Educator</option>
            <option type="Text" v-for="educator in educators" :key="educator._id" :value="educator._id">
                {{ educator.firstName }} {{ educator.lastName }}
            </option>
        </select>
        
        </div>
        <div class="form-group">
          <label for="group">Group:</label>
          <select v-model="newCourse.group" id="group" class="form-control"> 
            <option value="iç eğitim">iç eğitim</option>
            <option value="dış eğitim">dış eğitim</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="newCourse.description" id="description" class="form-control" ></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">Create Course</button>
          <button type="button" class="btn btn-secondary" @click="closeForm">Close</button>
        </div>
      </form>
    </div>

    <!-- Existing course list -->
    <div v-if="!isAddCoursePopupVisible && !isUpdateCoursePopupVisible">
      <div class="card" v-for="course in courses" :key="course._id">
        <ul class="list-group">
          <li class="list-group-item">ID: {{ course._id }}</li>
          <li class="list-group-item">Name: {{ course.name }}</li>
          <li class="list-group-item">Company: {{ course.company }}</li>
          <li class="list-group-item">Educator: {{ getEducatorName(course.educator) }}</li>
          <li class="list-group-item">Group: {{ course.group }}</li>
          <li class="list-group-item">Description: {{ course.description }}</li>
        </ul>
        <button v-if="isAdmin()" class="btn btn-danger" @click="handleDeleteCourse(course._id)">Delete</button>
        <button v-if="isAdmin()" class="btn btn-primary" @click="handleUpdateCoursePopup(course)">Edit</button>

      </div>
    </div>
    <!-- Update course form -->
<div v-if="isUpdateCoursePopupVisible" class="card">
  <form @submit.prevent="handleUpdatingCourse">
    <div class="form-group">
      <label for="name">Name:</label>
      <input v-model="updatedCourse.name" type="text" id="name" class="form-control">
    </div>
    <div class="form-group">
      <label for="company">Company:</label>
      <input v-model="updatedCourse.company" type="text" id="company" class="form-control">
    </div>
    <div class="form-group">
      <label for="group">Group:</label>
      <select v-model="updatedCourse.group" id="group" class="form-control">
        <option value="iç eğitim">iç eğitim</option>
        <option value="dış eğitim">dış eğitim</option>
      </select>
    </div>
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea v-model="updatedCourse.description" id="description" class="form-control"></textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Update Course</button>
      <button type="button" class="btn btn-secondary" @click="cancelUpdate">Cancel</button>
    </div>
  </form>
</div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['courses','user','educators']),
    getEducatorName() {
        return educatorId => {
            const educator = this.educators.find(edu => edu._id === educatorId);
            return educator ? `${educator.firstName} ${educator.lastName}` : 'Unknown Educator';
        };
    },
  },
  data() {
    return {
      isAddCoursePopupVisible: false,
      newCourse: {
        name: '',
        company: '',
        group: '',
        description: '',
        educator:'',
      },
      addCourseError: '',
      isUpdateCoursePopupVisible: false,
      updatedCourse: {
        _id: '',
        name: '',
        company: '',
        group: '',
        description: '',
        educator:'',
      },
      
    };
  },
  methods: {
    ...mapActions(['getCourses', 'createCourse','deleteCourse','updateCourse','getEducatorProfiles']),

  // delete operation
    async handleDeleteCourse(courseId) {
  const response = await this.deleteCourse(courseId);
  console.log('Response:', response); 
  if (response.status === 200) {
    
    this.$store.commit('deleteCourse_success', courseId);
  } else {
    console.error('Failed to delete course:', response.data.msg);
  }
},


// check user is admin or not
isAdmin() {
  return this.user.role === 'Admin';
  },

    closeForm() {
      this.isAddCoursePopupVisible = false;
      this.resetNewCourse();
    },
    resetNewCourse() {
      this.newCourse = {
        name: '',
        company: '',
        group: '',
        description: '',
      };
    },

  // add course operation
    async addCourse() {
  const response = await this.createCourse(this.newCourse);
  console.log('Response:', response); 
  if (response.status === 201) {
    
    this.getCourses();
    this.resetNewCourse();
    this.isAddCoursePopupVisible = false; 
  } else {
    this.addCourseError = response.data.msg;
    console.error('Failed to create course:', this.addCourseError);
  }
},

async getEducatorProfiles() {
    try {
        const response = await this.$store.dispatch('getEducatorProfiles');
        console.log('Educators Response:', response);
    } catch (error) {
        console.error('Error fetching educators:', error);
    }
},



// update operation
async handleUpdateCoursePopup(course) {
      this.updatedCourse = { ...course };
      this.isUpdateCoursePopupVisible = true;
    },
    async handleUpdatingCourse() {
      const response = await this.updateCourse(this.updatedCourse);
      console.log('Response:', response);
      if (response.status === 200) {
        this.getCourses();
        this.isUpdateCoursePopupVisible = false;
      } else {
        console.error('Failed to update course:', response.data.msg);
      }
    },

  // close the form
    cancelUpdate() {
      this.isUpdateCoursePopupVisible = false;
    },
  },
 
  created() {
    this.getCourses();
    this.$store.dispatch('getProfile');
    this.$store.dispatch('getEducatorProfiles'); 
    
  },
};
</script>

<style>
</style>