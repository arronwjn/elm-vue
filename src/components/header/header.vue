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
        <div v-if="seller.supports" class="supports">
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
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class='name'>{{seller.name}}</h1>
          <star :size='48' :score='seller.score'></star>
        </div>
      </div>
      <div class="detail-close">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
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
  .content{
    display: inline-block;
    font-size:14px;
    margin-left:16px;
  }
  .title{
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
  .name{
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
.supports{
  font-size:0;
}
  .supports .icon{
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
    background: rgba(7,17,27,0.8)
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
</style>
