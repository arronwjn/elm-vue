<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if='seller.supports' class="support-count" @click="showData()">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="fa fa-angle-right right" aria-hidden="true"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showData()">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade" mode="out-in">
      <div v-show="detailShow" class="detail" >
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class='name'>{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size='48' :score='seller.score'></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) in seller.supports" class="supports-item">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="desc">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="close()">
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import star from '../star/star'

  export default{
    props:{
        seller:{
            type:Object,
        }
    },
    data(){
      return{
        detailShow:false
      }
    },
    methods:{
      showData(){
        this.detailShow=true
      },
      close(){
        this.detailShow=false
      }
    },
    components:{
      star,
    },
    created(){
      this.classMap=['decrease','discount','special','invoice','guarantee'];
    },
  }
</script>

<style scoped>
  @import '../../../static/css/reset.css';

.header{
  position: relative;
  color:#fff;
  background: rgba(7,17,27,0.5);
  overflow: hidden;
}
  .content-wrapper{
    position: relative;
    padding:24px 12px 18px 24px;
    font-size:0;
  }
  .avatar{
    display: inline-block;
    vertical-align: top;
  }
.avatar img{
  border-radius: 2px;
}
  .content-wrapper .content{
    display: inline-block;
    font-size:14px;
    margin-left:16px;
  }
 .content .title{
    margin:2px 0 8px 0;
  }
  .brand{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    background-image: url('./images/brand@2x.png');
    -webkit-background-size:30px 18px;
    background-size:30px 18px;
    background-repeat:no-repeat;
  }
  .content .name{
    vertical-align: top;
    margin-left:6px;
    font-size:16px;
    line-height:18px;
    font-weight:bold;
  }
  .description{
    margin-bottom:10px;
    line-height: 12px;
    font-size:12px;
  }
.support{
  font-size:0;
}
  .support>.icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    -webkit-background-size:12px 12px;
    background-size:12px 12px;
    background-repeat:no-repeat;
  }
  .text{
    /*vertical-align: top;*/
    font-size:10px;
    line-height:14px;
  }
  .decrease{
    background-image: url('./images/decrease_1@2x.png');
  }
.discount{
   background-image: url('./images/discount_1@2x.png');
 }
.guarantee{
  background-image: url('./images/guarantee_1@2x.png');
}
.invoice{
  background-image: url('./images/invoice_1@2x.png');
}
.special{
  background-image: url('./images/special_1@2x.png');
}
  .support-count{
    position: absolute;
    display: inline-block;
    right:12px;
    bottom:14px;
    padding:0 8px;
    height: 24px;
    line-height: 27px;
    border-radius: 14px;
    color:#fff;
    background: rgba(0,0,0,0.2);
    text-align: center;
  }
  .count{
    font-size:10px;
    vertical-align: top;
  }
  .right{
    vertical-align: top;
    font-size:10px;
    line-height: 27px;
    margin-left: 2px;
  }
  .bulletin-wrapper{
    height: 28px;
    line-height: 31px;
    padding:0 22px 0 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size:10px;
    background: rgba(7,17,27,0.2);
  }
  .bulletin-title{
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width:22px;
    height: 12px;
    background-image: url(./images/bulletin@2x.png);
    -webkit-background-size:22px 12px;
    background-size:22px 12px;
    background-repeat:no-repeat;
  }
  .bulletin-text{
    vertical-align: top;
    font-size:10px;
    margin:0 4px;
  }
  .background{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index:-1;
    filter:blur(10px)
  }
  .detail{
    position: fixed;
    z-index:100;
    top:0;
    left:0;
    width:100%;
    height:100%;
    overflow: auto;
    background: rgba(7,17,27,0.8);
    transition:all 0.5s;
    backdrop-filter:blur(10px)
  }
  .fade-transition{
    opacity: 1;
    background: rgba(7,17,27,0.8);
  }
  .fade-enter{
    opacity: 0;
    background: rgba(7,17,27,0);
  }
  .fade-leave-active{
    opacity: 0;
    background: rgba(7,17,27,0);
  }
  .detail-wrapper{
    width: 100%;
    min-height: 100%;
  }
  .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .detail-main .name{
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  .detail-close{
    position: relative;
    width:32px;
    height: 32px;
    margin:-64px auto 0 auto;
    clear:both;
    font-size: 32px;
    color:#fff;
  }
  .detail-close i{
    color:#fff;
  }
  .star-wrapper{
    margin-top:18px;
    padding:2px 0;
    text-align: center;
  }
  .detail-wrapper .title{
    display: flex;
    width: 80%;
    margin:28px auto 24px auto;
  }
  .detail-wrapper .line{
    flex:1;
    position: relative;
    top:-6px;
    border-bottom:1px solid rgba(255,255,255,0.2);
  }
  .detail-wrapper .text{
    padding:0 12px;
    font-weight: 700;
    font-size:14px;
  }
  .supports{
    width: 80%;
    margin: 0 auto;
  }
  .supports-item{
    padding:0 12px;
    margin-bottom:12px;
    font-size:0;
  }
  .supports-item:last-child{
      margin: 0;
  }
  .supports-item>.icon{
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right:6px;
    background-size:16px 16px;
    background-repeat:no-repeat;
  }
  .supports-item .desc{
    line-height: 16px;
    font-size:12px;
  }
  .bulletin{
    width: 80%;
    margin: 0 auto;
  }
  .bulletin .content{
    padding:0 12px;
    line-height: 24px;
    font-size:12px;
  }

</style>
