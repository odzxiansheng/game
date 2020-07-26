import Vue from 'vue'
import Router from 'vue-router'
const path = (name) => () => import(`../view//${name}`);
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '登陆',
      component:path('login'),
      meta:{
        active:'/'
      }
    },
    {
      path: '/home',
      name: 'home',
      component:path('home'),
      meta:{
        active:'/'
      }
    },
    {
      path: '/userRes',
      name: 'userRes',
      component:path('userRes'),
      meta:{
        active:'/'
      }
    },
    {
      path: '/secretPlace',
      name: 'secretPlace',
      component:path('secretPlace'),
      meta:{
        active:'/'
      }
    },
  ]
})
