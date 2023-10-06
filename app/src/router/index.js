import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '@/views/DashboardView.vue'
import Highlight from '@/views/HighlightView.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/highlight', component: Highlight } 
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;