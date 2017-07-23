<template lang="html">
  <div class="">
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'logo-highlight':totalCount>0}">
              <i class="fa fa-shopping-cart" aria-hidden="true" :class="{'fa-shopping-cart-highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'price-highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right" @click.stop="pay()">
          <div class="pay" :class="payClass">
            {{payDesc}}

          </div>
        </div>
      </div>
      <div class="ball-container">
        <!-- <transition-group name="drop"> -->
          <div v-for="(ball,index) in balls" key="index" v-show="ball.show" class="ball">
            <div class="inner">
              <ul>
                <li class="" v-for="food in selectFoods">
                  <span class="">{{food.name}}</span>
                  <div class="">
                    <!-- <span>￥{{food.price*food.count}}</span> -->
                  </div>
                  <div class="">
                    <cartcontral :food="food"></cartcontral>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        <!-- </transition-group> -->
      </div>
      <transition name="folds">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty()">清空</span>
          </div>
          <div class="list-content" id='list-content'>
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="food-name">{{food.name}}</span>
                <div class="food-price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontral-wrapper">
                  <cartcontral :food="food"></cartcontral>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name='fade'>
      <div class="list-mask" v-show="listShow" @click="hideList()"></div>
    </transition>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
import cartcontral from '../cartcontral/cartcontral.vue'

export default {
  props:{
    deliveryPrice:{type:Number,default:0},
    minPrice:{type:Number,default:0},
    selectFoods:{
        type:Array,
        default(){
            return [];
        }
    }
  },
  data(){
    return{
      balls:[
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        },
      ],
      fold:true
    }
  },
  computed:{
      totalPrice(){
          let total=0;
          this.selectFoods.forEach((food)=>{
            total+=food.price * food.count;
          })

          return total;
      },
      totalCount(){
          let count=0;
          this.selectFoods.forEach((food)=>{
              count+=food.count;
          })

          return count;
      },
      payDesc(){
          if(this.totalPrice === 0){
            return `￥${this.minPrice}元起送`;
          }else if(this.totalPrice < this.minPrice){
            let diff=this.minPrice - this.totalPrice;
            return `还差￥${diff}元起送`;
          }else{
            return '去结算'
          }
      },
      payClass(){
          if(this.totalPrice < this.minPrice){
            return 'not-enough'
          }else{
            return 'enough'
          }
      },
      listShow(){
        if(!this.totalCount){
          this.fold=true;
          return false;
        }
        let show=!this.fold;
        if(show){
          this.$nextTick(()=>{
            if(!this.scroll){
              this.scroll=new BScroll(document.getElementById('list-content'),{
                click:true
              })
            }else{
              this.scroll.refresh()
            }

          })
        }
        return show;
      }
  },
  methods:{
    drop(el){
      console.log(el)
    },
    toggleList(){
      if(!this.totalCount){
        return;
      }
      this.fold=!this.fold;
    },
    empty(){
      this.selectFoods.forEach((food)=>{
        food.count=0;
      })
    },
    hideList(){
      this.fold=true;
    },
    pay(){
      if(this.totalPrice<this.minPrice){
        return;
      }
      window.alert(`支付${this.totalPrice}元`)
    }
  },
  components:{
    cartcontral,
  }
}
</script>

<style lang="css" scoped>
  .shopcart{
    position: fixed;
    left: 0;
    bottom:0;
    z-index:50;
    width: 100%;
    height:48px;
  }
  .content{
    display: flex;
    background: #141d27;
    font-size: 0;
  }
  .content-left{
    flex:1;
  }
  .logo-wrapper{
    display: inline-block;
    position: relative;
    top:-10px;
    margin:0 12px;
    padding:6px;
    width:56px;
    height:56px;
    box-sizing: border-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }
  .logo{
    width:100%;
    height:100%;
    border-radius: 50%;
    text-align: center;
    background: #2b343c;
  }
  .logo-highlight{
    background: rgb(0,160,220);
  }
  .num{
    position: absolute;
    top:0;
    right:0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size:12px;
    font-weight: 700;
    color:#fff;
    background: rgb(240,20,20);
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
  }
  .fa-shopping-cart{
    line-height: 44px;
    font-size: 24px;
    color:#80858a;
  }
  .fa-shopping-cart-highlight{
    color:#fff;
  }
  .price{
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255,255,255,0.1);
    font-size: 16px;
    font-weight: 700;
    color:rgba(255,255,255,0.4);
  }
  .price-highlight{
    color:#fff;
  }
  .desc{
    display: inline-block;
    vertical-align: top;
    line-height: 26px;
    margin:12px 0 0 12px;
    color:rgba(255,255,255,0.4);
    font-size: 10px;
  }

  .content-right{
    flex:0 0 105px;
    width:105px;
  }
  .pay{
    vertical-align: top;
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    color:rgba(255,255,255,0.4);
    font-weight: 700;
    background: #2b333b
  }
  .not-enough{
    background: #2b333b
  }
  .enough{
    background: #00b43c;
    color:#fff;
  }
  .ball-container .ball{
    position: fixed;
    left:32px;
    bottom:22px;
    z-index:200;
  }
  /*.drop-transition{
    transition:all 0.4s
  }*/
  .inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0,160,220);
    transition: all 0.4s;
  }
  .shopcart-list{
    position: absolute;
    top:0;
    left:0;
    z-index:-1;
    width:100%;
    transition:all 0.1s linear;
    transform: translate3d(0,-100%,0);
  }
  .folds-leave-active{
    transform:translate3d(0,0,0);
  }
  .folds-enter-active{
    transform:translate3d(0,0,0);
  }
  .list-header{
    height:40px;
    line-height:40px;
    padding:0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .title{
    float: left;
    font-size: 14px;
    color:rgb(7,17,27)
  }
  .empty{
    float: right;
    font-size: 12px;
    color:rgb(0,160,220)
  }
  .list-content{
    padding:0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;
  }
  .food{
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7,17,27,0.1)
  }
  .food-name{
    line-height: 24px;
    font-size: 14px;
    color:rgb(7,17,27)
  }
  .food-price{
    position: absolute;
    right:90px;
    bottom:12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color:rgb(240,20,20);
  }
  .cartcontral-wrapper{
    position: absolute;
    right:0;
    bottom:6px;
  }
  .list-mask{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index:40;
    background-color: rgba(7,17,27,0.6);
    opacity: 1;
    backdrop-filter:blur(10px);
    transition: all 0.2s;
  }
  /*.fade-transition{
    transition: all 0.5s;
    opacity: 1;
    background-color: rgba(7,17,27,0.6);
  }*/
  .fade-enter-active,.fade-leave-active{
    opacity: 0;
    background: rgba(7,17,27,0)
  }
</style>
