import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AddAttendant from '../views/AddAttendant.vue'
import AttendantList from '../views/AttendantList.vue'
import Agreements from '../views/Agreements.vue'
import Event from '../views/Event.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/add',
    name: 'add',
    component: AddAttendant
  },
  {
    path: '/',
    name: 'list',
    component: AttendantList
  },
  {
    path: '/event',
    name: 'event',
    component: Event
  },
  {
    path: '/agreements',
    name: 'agreements',
    component: Agreements
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
