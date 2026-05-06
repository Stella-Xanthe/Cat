import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ArchiveView from './views/ArchiveView.vue'
import AddView from './views/AddView.vue'
import ProfileView from './views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },          // 默认打开首页
    { path: '/archive', component: ArchiveView },
    { path: '/add', component: AddView },
    { path: '/profile', component: ProfileView }
  ]
})

export default router