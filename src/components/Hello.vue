<template>
  <div class="hello">
    <v-header :seller="seller"></v-header>
    <div class="tab border">
      <div class="tab-item">
        <router-link :to="{path:'/goods',activeClass:'router-link-exact-active'}">商品</router-link>

      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings',activeClass:'router-link-exact-active'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller',activeClass:'router-link-exact-active'}">商家</router-link>
      </div>
    </div>
    <router-view :seller='seller'></router-view>
  </div>
</template>

<script>
  import vHeader from './header/header.vue'

  const ERR_OK=0
export default {
  name: 'hello',
  data () {
    return {
      seller:{}
    }
  },
  created(){
    this.$http.get('https://arronwjn.github.io/api/seller')
      .then(res=>{
          if(res.body.errno===ERR_OK){
              this.seller=res.body.data;
              console.log(this.seller)
          }
      })
  },
  components:{
      vHeader,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height:40px;
  border-bottom:1px solid rgba(7,17,27,0.1);
  position: relative;
  z-index:30;
}
.tab:after{
  width: 100%;
  display: block;
  position: absolute;
  left:0;
  bottom:0;
  border-top:1px solid rgba(7,17,27,0.1);
  content:' ';
  z-index:200;
}
  .tab-item{
    flex:1;
  }
.tab-item a{
  display: block;
  text-decoration: none;
  text-align: center;
  font-size:14px;
  color:#778593;
}
.tab-item .router-link-exact-active {
  color:rgb(240,20,20);
}
</style>
