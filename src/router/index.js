import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Goods from '../components/goods/goods.vue'
import Ratings from '../components/ratings/ratings.vue'
import Seller from '../components/seller/seller.vue'
import App from '../App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello,
      children:[
        {
          path:'/goods',
          component:Goods
        },
        {
          path:'/ratings',
          component:Ratings
        },
        {
          path:'/seller',
          component:Seller
        }
      ]
    },

  ]
})
