import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageRestaurant from '@/pages/PageRestaurant.vue'
import PageOrder from '@/pages/PageOrder.vue'
import PagePedidosPendientes from '@/pages/PagePedidosPendientes.vue'
import PageSuccess from '@/pages/PageSuccess.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/restaurant/:id',
    name: 'PageRestaurant',
    component: PageRestaurant
  },
  {
    path: '/order/',
    name: 'PageOrder',
    component: PageOrder,
    meta: {onlyAuthUser: true}
  },
  {
    path: '/success/',
    name: 'PageSuccess',
    component: PageSuccess,
    meta: {onlyAuthUser: true}
  },
  {
    path: '/backoffice/:id',
    name: 'PedidosPendientes',
    component: PagePedidosPendientes
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
