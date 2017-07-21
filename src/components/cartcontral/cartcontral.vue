<template>
  <div class="cartcontral">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
        <i class="fa fa-minus-circle inner" aria-hidden="true"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add"><i class="fa fa-plus-circle" aria-hidden="true" @click="addCart($event)"></i></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default{
      props:{
          food:{
              type:Object
          }
      },
      created(){
         console.log(this.food)
      },
    methods:{
      addCart(event){
        if(!event._constructed){
            return;
        }
        if(!this.food.count){
//            this.food.count==1;
            Vue.set(this.food,'count',1)
        }else{
            this.food.count++;
        }
        console.log('aa')
      },
      decreaseCart(event){
        if(!event._constructed){
            return;
        }
        if(this.food.count){
            this.food.count--;
        }
      },
    }
  }

</script>

<style scoped>
  .cartcontral{
    font-size:0;
  }
  .cart-decrease{
    display: inline-block;
    padding:6px;
    transition:all 0.2s linear;
  }
  .inner{
    display:inline-block;
    line-height: 24px;
    font-size:24px;
    color:rgb(0,160,220);
    transition:all 0.2s linear;
    transform: rotate(0);
  }
  .move-transition{
    opacity:1;
    transform: translate3D(0,0,0);
  }
  .move-leave-active,.move-enter-active{
    opacity:0;
    transform: translate3D(24px,0,0);
  }
  /*.move-enter-active{*/
    /*opacity:0;*/
    /*transform: translate3D(24px,0,0);*/
  /*}*/
  .move-leave-active .inner{
    transform: rotate(180deg);
  }
  .move-enter-active .inner{
    transform: rotate(180deg);
  }
  .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top:6px;
    line-height: 24px;
    text-align: center;
    font-size:10px;
    color:rgb(147,153,159)
  }
  .cart-add{
    display: inline-block;
    padding:6px;
    line-height: 24px;
    font-size:24px;
    color:rgb(0,160,220)
  }
</style>
