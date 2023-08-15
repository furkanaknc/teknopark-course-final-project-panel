import axios from "axios";
import router from "../router/index";

const state = {
    token: localStorage.getItem('token') || '',
    user: {},
    role:'',
    status: '',
    courses: [],
    profiles:[],
    educators: [],
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
    role: state => state.role,
    error: state => state.error,
    courses: state => state.courses,
    profiles: state => state.profiles,
    educators: state => state.profiles,
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
                const role =res.data.role;
                console.log(role)
                // Store the token into the localstorage
                localStorage.setItem('token', token);
                // Set the axios defaults
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user, role);
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
    //Get all Profiles
    async getAllProfiles({ commit }) {
        commit('getProfiles_request');
        try {
            
            let res = await axios.get('http://localhost:3000/api/users/getAllProfiles');

           
            if (res.data.profiles) {
                commit('profiles_information', res.data.profiles);
            }

            return res;
        } catch (err) {
            commit('getProfiles_error', err);
        }
    },

    //Update Personal
    async updateProfile({ commit }, { userId, updatedData }) {
        try {
            const res = await axios.put(`http://localhost:3000/api/users/updateUser/${userId}`, updatedData);
            if (res.data.success) {
                commit('updateProfile_success', updatedData);
            }
            return res;
        } catch (err) {
            console.error("Update User Error:", err);
            throw err;
        }
    },

    //Delete user
    async deleteUser({ commit }, userId) {
        commit('deleteUser_request');
        try {
            let res = await axios.delete(`http://localhost:3000/api/users/deleteUser/${userId}`);
            if (res.data.success !== undefined) {
                commit('deleteUser_success', userId);
            }
            return res;
        } catch (err) {
            commit('deleteUser_error', err);
        }
    },
    

    //Call Educators
    async getEducatorProfiles({ commit }) {
        commit('getEducatorProfiles_request');
        try {
            let res = await axios.get('http://localhost:3000/api/users/getEducators');
    
            if (res.data.educators) {
                commit('educatorProfiles_information', res.data.educators);
            }
    
            return res;
        } catch (err) {
            commit('getEducatorProfiles_error', err);
        }
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
    auth_success(state, token, user, role) {
        state.token = token;
        state.user = user;
        state.role = role;
        state.status = 'success';
        state.error = null;
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
        state.role = ''
    },
    profile_request(state) {
        state.status = 'loading'
    },
    user_profile(state, user) {
        state.user = user
    },
    getProfiles_request(state) {
        state.error = null;
        state.status = 'loading';
    },
    profiles_information(state, profiles) {
        state.profiles = profiles;
        state.status = 'success';
    },
    getProfiles_error(state, err) {
        state.error = err.response.data.msg;
    },

    updateProfile_request(state) {
        state.error = null;
        state.status = 'loading';
    },
    updateProfile_success(state, updatedProfile) {
        const profileIndex = state.profiles.findIndex(profile => profile._id === updatedProfile._id);
        if (profileIndex !== -1) {
            state.profiles[profileIndex] = updatedProfile;
        }
    },
    
    updateProfile_error(state, err) {
        state.error = err.response.data.msg;
    },

    deleteUser_request(state) {
        state.error = null;
        state.status = 'loading';
    },
    deleteUser_success(state, userId) {
        state.profiles = state.profiles.filter(profile => profile._id !== userId);
        state.status = 'success';
    },
    deleteUser_error(state, err) {
        state.error = err.response.data.msg;
    },
    
    getEducatorProfiles_request(state) {
        state.error = null;
        state.status = 'loading';
    },
    educatorProfiles_information(state, profiles) {
        state.profiles = profiles;
        state.status = 'success';
    },
    getEducatorProfiles_error(state, err) {
        state.error = err.response.data.msg;
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
