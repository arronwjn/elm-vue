<template lang="html">
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    deliveryPrice:{type:Number,default:0},
    minPrice:{type:Number,default:0},
    selectFoods:{
        type:Array,
        default(){
            return [
              {
                price:14,
                count:1
              }

            ];
        }
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
            return `￥${this.minPrice}}元起送`;
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
      }
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
</style>
