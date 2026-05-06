import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ArchiveView from './views/ArchiveView.vue'
import ProfileView from './views/ProfileView.vue'
// 👇 1. 引入建档页面组件
import AddView from './views/AddView.vue' 

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/archive', component: ArchiveView },
    { path: '/profile', component: ProfileView },
    // 👇 2. 告诉 Vue，当网址是 /add 时，显示 AddView 组件
    { path: '/add', component: AddView } 
  ]
})

export default router;