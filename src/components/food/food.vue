<template lang="html">
    <transition name='move'>
      <div v-show="showFlag" class="food" id="showFlag">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image" alt="">
            <div class="back" @click='hide()'>
              <i class="fa fa-angle-left" aria-hidden="true"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">
                月售{{food.sellCount}}份
              </span>
              <span class="rating">
                好评率{{food.rating}}%
              </span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
            </div>
          </div>
          <div class="cartcontral-wrapper">
            <cartcontral :food='food'></cartcontral>
          </div>
          <transition name='fade'>
            <div @click.stop.prevent="addFirst($event)" class="buy" v-show='!food.count || food.count==0'>
              加入购物车
            </div>
          </transition>
        </div>
      </div>
    </transition>

</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontral from '../cartcontral/cartcontral.vue'

export default {
  props:{
    food:{
      type:Object
    }
  },
  data(){
    return{
      showFlag:false,
    }
  },
  methods:{
    show(){
      this.showFlag=true;
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll=new BScroll(document.getElementById('showFlag'),{
            click:true
          })
        }else{
          this.scroll.refresh();
        }
      })
    },
    hide(){
      this.showFlag=false;
    },
    addFirst(event){
      if(!event._constructed){
        return;
      }
      Vue.set(this.food,'count',1)
    }
  },
  components:{
    cartcontral
  }
}
</script>

<style lang="less" scoped>
  .food{
    position: fixed;
    left:0;
    top:0;
    bottom:48px;
    z-index:30;
    width:100%;
    background: #fff;
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);

    &.move-enter-active{
      transform: translate3d(100%,0,0);
    }
    &.move-leave-active{
      transform: translate3d(100%,0,0);
    }

    .image-header{
      position: relative;
      width:100%;
      height:0;
      padding-top:100%;

      img{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
      }

      .back{
        position: absolute;
        top:10px;
        left:0;

        i{
          display: block;
          padding:10px;
          font-size: 20px;
          color:#fff;
        }
      }
    }
    .content{
      padding:18px;

      .title{
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color:rgb(7,17,27)
      }
      .detail{
        margin-bottom:18px;
        line-height:10px;
        font-size:0;
        height: 10px;
        .sell-count,.rating{
          font-size:10px;
          color:rgb(147,153,159)
        }

        .sell-count{
          margin-right:12px;
        }
      }
      .price{
        font-weight: 700;
        line-height: 24px;
        .now{
          margin-right: 8px;
          font-size:14px;
          color:rgb(240,20,20)
        }
        .old{
          text-decoration: line-through;
          font-size:10px;
          color:rgb(147,153,159)
        }
      }

    }
    .cartcontral-wrapper{
      position: absolute;
      right:12px;
      bottom:12px;

    }
    .buy{
      position: absolute;
      right:18px;
      bottom:18px;
      z-index:10;
      height: 24px;
      line-height: 24px;
      padding:0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color:#fff;
      background: rgb(0,160,220);
      transition:all 0.2s;
      opacity: 1;
      &.fade-enter-active,&.fade-leave-active{
        opacity: 0;
      }
    }
  }

</style>
