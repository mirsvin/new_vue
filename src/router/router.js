import Main from '@/pages/Main'
import PostPage from '@/pages/PostPage'
import {createWebHistory, createRouter} from "vue-router"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/post',
    name: 'post',
    component: PostPage
  },
]
const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;