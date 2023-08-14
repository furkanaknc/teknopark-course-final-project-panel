import axios from "axios";
import router from "../router/index";

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    courses: [],
    error: null
};

const getters = {
    // isLoggedIn: function (state) {
    //     if (state.token != '') {
    //         return true
    //     } else {
    //         return false
    //     }
    // }
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user,
    error: state => state.error,
    courses: state => state.courses,
};

const actions = {
    // Login Action
    async login({
        commit
    }, user) {
        commit('auth_request');
        try {
            let res = await axios.post('http://localhost:3000/api/users/login', user)
            if (res.data.success) {
                const token = res.data.token;
                const user = res.data.user;
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
            }
            return res;
        } catch (err) {
            commit('auth_error', err);
        }
    },
    // Register User
    async register({
        commit
    }, userData) {
        try {
            commit('register_request');
            let res = await axios.post('http://localhost:3000/api/users/register', userData);
            if (res.data.success !== undefined) {
                commit('register_success');
            }
            return res;
        } catch (err) {
            commit('register_error', err)
        }
    },
    async createUser({
        commit
    }, userData) {
        try {
            commit('createUser_request');
            let res = await axios.post('http://localhost:3000/api/users/createUser', userData);
            if (res.data.success !== undefined) {
                commit('createUser_success');
            }
            return res;
        } catch (err) {
            commit('createUser_error', err)
        }
    },
    // Get the user Profile
    async getProfile({
        commit
    }) {
        commit('profile_request');
        let res = await axios.get('http://localhost:3000/api/users/profile')
        commit('user_profile', res.data.user)
        return res;
    },
    // Logout the user
    async logout({
        commit
    }) {
        await localStorage.removeItem('token');
        commit('logout');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
        return
    },
    async createCourse({
        commit
    },course){
        commit('createCourse_request');
        try{
            let res = await axios.post('http://localhost:3000/api/courses/createCourse', course)
            if(res.data.success !== undefined){
                commit('createCourse_success')
            }
            return res;
        }catch(err){
            commit('createCourse_error', err)
        }
    },
    async getCourses({ commit }) {
        commit('getCourse_request');
        try {
          let res = await axios.get('http://localhost:3000/api/courses/getCourses');
          if (res.data.courses) {
            commit('course_information', res.data.courses);
          }
          return res;
        } catch (err) {
          commit('getCourse_error', err);
        }
      },
      async updateCourse({ commit }, course) {
        commit('updateCourse_request');
        try {
            let res = await axios.put(`http://localhost:3000/api/courses/updateCourse/${course._id}`, course);
            if (res.data.success !== undefined) {
                commit('updateCourse_success');
            }
            return res;
        } catch (err) {
            commit('updateCourse_error', err);
        }
    },

    async deleteCourse({ commit }, courseId) {
        commit('deleteCourse_request');
        try {
            let res = await axios.delete(`http://localhost:3000/api/courses/deleteCourse/${courseId}`);
            if (res.data.success !== undefined) {
                commit('deleteCourse_success');
            }
            return res;
        } catch (err) {
            commit('deleteCourse_error', err);
        }
    }
};

const mutations = {
    auth_request(state) {
        state.error = null
        state.status = 'loading'
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = 'success'
        state.error = null
    },
    auth_error(state, err) {
        state.error = err.response.data.msg
    },
    register_request(state) {
        state.error = null
        state.status = 'loading'
    },
    register_success(state) {
        state.error = null;
        state.status = 'success';
      },      
    register_error(state, err) {
        state.error = err.response.data.msg
    },
    createUser_request(state) {
        state.error = null
        state.status = 'loading'
    },
    createUser_success(state) {
        state.error = null;
        state.status = 'success';
      },      
    createUser_error(state, err) {
        state.error = err.response.data.msg
    },
    logout(state) {
        state.error = null
        state.status = ''
        state.token = ''
        state.user = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    },
    createCourse_request(state){
        state.error = null
        state.status = 'loading' 
    },
    createCourse_error(state,err){
        state.error = err.response.data.msg
    },
    getCourse_request(state) {
        state.error = null;
        state.status = 'loading';
      },
      course_information(state, courses) {
        state.courses = courses;
        state.status = 'success';
      },
      getCourse_error(state, err) {
        state.error = err.response.data.msg;
      },
      updateCourse_request(state) {
        state.error = null;
        state.status = 'loading';
    },
    updateCourse_success(state) {
        state.error = null;
        state.status = 'success';
    },
    updateCourse_error(state, err) {
        state.error = err.response.data.msg;
    },
      deleteCourse_request(state) {
        state.error = null;
        state.status = 'loading';
      },
      deleteCourse_success(state, courseId) {
        state.courses = state.courses.filter(course => course._id !== courseId);
        state.status = 'success';
      },
    
      
   
};

export default {
    state,
    actions,
    mutations,
    getters
};
