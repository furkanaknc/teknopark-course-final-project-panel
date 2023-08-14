<template>
  <div>
    <h2>Courses</h2>
    <div class="buttons">
      <button class="btn btn-primary btn-space" @click="isAddCoursePopupVisible = true">
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
    <div v-if="!isAddCoursePopupVisible">
      <div class="card" v-for="course in courses" :key="course._id">
        <ul class="list-group">
          <li class="list-group-item">ID: {{ course._id }}</li>
          <li class="list-group-item">Name: {{ course.name }}</li>
          <li class="list-group-item">Company: {{ course.company }}</li>
          <li class="list-group-item">Group: {{ course.group }}</li>
          <li class="list-group-item">Description: {{ course.description }}</li>
        </ul>
        <button class="btn btn-primary" @click="handleDeleteCourse(course._id)">Delete</button>
        <button class="btn btn-primary" @click="handleUpdateCoursePopup(course)">Edit</button>

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
    ...mapGetters(['courses']),
  },
  data() {
    return {
      isAddCoursePopupVisible: false,
      newCourse: {
        name: '',
        company: '',
        group: '',
        description: '',
      },
      addCourseError: '',
      isUpdateCoursePopupVisible: false,
      updatedCourse: {
        _id: '',
        name: '',
        company: '',
        group: '',
        description: '',
      },
    };
  },
  methods: {
    ...mapActions(['getCourses', 'createCourse','deleteCourse','updateCourse']),
    async handleDeleteCourse(courseId) {
  const response = await this.deleteCourse(courseId);
  console.log('Response:', response); 
  if (response.status === 200) {
    
    this.$store.commit('deleteCourse_success', courseId);
  } else {
    console.error('Failed to delete course:', response.data.msg);
  }
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
async handleUpdateCoursePopup(course) {
      this.updatedCourse = { ...course };
      this.isUpdateCoursePopupVisible = true;
    },
    async handleUpdatingCourse() { // Rename the method
      const response = await this.updateCourse(this.updatedCourse); // Call the Vuex action for update
      console.log('Response:', response);
      if (response.status === 200) {
        this.getCourses();
        this.isUpdateCoursePopupVisible = false;
      } else {
        console.error('Failed to update course:', response.data.msg);
      }
    },
    cancelUpdate() {
      this.isUpdateCoursePopupVisible = false;
    },


    
  },
  created() {
    this.getCourses();
  },
};
</script>
