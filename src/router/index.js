import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/courses',
    name: 'courses',
    component: () => import('../views/CourseView.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/createUser',
    name: 'createUser',
    component: () => import('../views/CreateUserView.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/personals',
    name: 'personals',
    component: () => import('../views/PersonalView.vue'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta:{
      requireGuest:true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta:{
      requireGuest:true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta:{
      requireAuth:true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.requireAuth)){
    if(!store.getters.isLoggedIn){
      next('login');
    }else{
      next();
    }
  }else if(to.matched.some(record => record.meta.requireGuest)){
    if(store.getters.isLoggedIn){
      next('profile');
    }else{
      next();
    }
  }else{
    next();
  }
})



export default router;
