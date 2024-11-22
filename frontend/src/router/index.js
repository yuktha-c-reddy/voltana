import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Login.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../components/Dashboard.vue'),
      meta: { requiresAuth: true } ,
    },
    {
      path: '/invite',
      name: 'Invite',
      component: () => import('../components/Invite.vue'),
      meta: { requiresAuth: true } ,
    },
    {
      path: '/delete',
      name: 'Delete',
      component: () => import('../components/Delete.vue'),
      meta: { requiresAuth: true } ,
    },
    {
      path: '/update',
      name: 'Update',
      component: () => import('../components/Update.vue'),
      meta: { requiresAuth: true } ,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../components/Logout.vue'),
      meta: { requiresAuth: true } ,
    },
    
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken'); 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      alert("Please log in to access this page!")
      next({ name: 'Login' });
    } else {

      next();
    }
  } else {
    next(); 
  }
});


export default router
