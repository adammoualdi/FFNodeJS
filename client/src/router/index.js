import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
