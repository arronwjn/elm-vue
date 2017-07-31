<template>
  <div class="goods">
    <div class="menu-wrapper"  id="menu">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="foods">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img  width='57' height="57" :src="food.image" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontral :food="food"></cartcontral>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
    <food :food='selectedFood' ref='food'></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart.vue'
  import food from '../food/food.vue'
  import cartcontral from '../cartcontral/cartcontral.vue'

  const ERR_OK=0;

  export default{
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return{
          goods:[],
          listHeight:[],
          scrollY:0,
          selectedFood:{}
        }
    },
    computed:{
      currentIndex(){
          for(let i=0;i<this.listHeight.length;i++){
            let height1=this.listHeight[i];
            let height2=this.listHeight[i+1];
            if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
                return i;
            }
          }
          return 0;
      },
      selectFoods(){
        let foods=[];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food)
            }
          })
        })

        return foods;
      },
    },
    created(){
      this.classMap=['decrease','discount','special','invoice','guarantee'];

      this.$http.get('/api/goods')
        .then(res=>{
          
            if(res.body.errno === ERR_OK){
              this.goods=res.body.data
              this.$nextTick(()=>{

                this._initScroll()
                this._calulateHeight();
              })

            }
        })
    },
    methods:{
      selectMenu(index,event){
        if(!event._constructed){
          return;
        }
        let foodList=document.getElementById('foods').getElementsByClassName('food-list-hook');
        let el=foodList[index]
        this.foodsScroll.scrollToElement(el,100)
      },
      _initScroll(){
          this.menuScroll=new BScroll(document.getElementById('menu'),{
            click:true,
          })

          this.foodsScroll=new BScroll(document.getElementById('foods'),{
            click:true,
            probeType:3
          })

          this.foodsScroll.on('scroll',(pos)=>{
              this.scrollY=Math.abs(Math.round(pos.y));
          })
      },
      _calulateHeight(){
          let foodList=document.getElementById('foods').getElementsByClassName('food-list-hook');
          let height=0;
          this.listHeight.push(height);
          for(let i=0;i<foodList.length;i++){
            let item=foodList[i]
            height+=item.clientHeight;
            this.listHeight.push(height)
            console.log(this.listHeight)
          }
      },
      selectFood(food,event){
        if(!event._constructed){
          return;
        }
        this.selectedFood=food;
        this.$refs.food.show();
      }
    },
    components:{
      shopcart,
      cartcontral,
      food
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    position: absolute;
    top:174px;
    bottom:46px;
    width: 100%;
    overflow: hidden;
  }
  .goods .menu-wrapper{
    flex:0 0 80px;
    width: 80px;
    background: #f3f5f7;
  }
  .menu-item{
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding:0 12px;
  }
  .menu-item  .icon{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    -webkit-background-size:12px 12px;
    background-size:12px 12px;
    background-repeat:no-repeat;
  }
  .current{
    position: relative;
    margin-top:-1px;
    z-index:10;
    background-color: #fff;
    font-weight: 700;
  }
  .menu-wrapper .current>.text{
    border:none;
  }
  .decrease{
    background-image: url('./images/decrease_3@3x.png');
  }
  .discount{
    background-image: url('./images/discount_3@3x.png');
  }
  .guarantee{
    background-image: url('./images/guarantee_3@3x.png');
  }
  .invoice{
    background-image: url('./images/invoice_3@3x.png');
  }
  .special{
    background-image: url('./images/special_3@3x.png');
  }
  .menu-item  .text{
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size:12px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    position: relative;
  }
  .text:after{
    width: 100%;
    display: block;
    position: absolute;
    left:0;
    bottom:0;
    /*border-top:1px solid rgba(7,17,27,0.1);*/
    content:' '
  }
  .goods .foods-wrapper{
    flex:1;
  }
  .title{
    padding-left:14px;
    height: 26px;
    line-height: 26px;
    border-left:2px solid #d9dde1;
    font-size:12px;
    color:rgb(147,153,159);
    background: #f3f5f7;
  }
  .food-item{
    display: flex;
    margin:18px;
    padding-bottom:18px;
    border-bottom:1px solid rgba(7,17,27,0.1);
  }
  .food-item:after{
    /*width: 100%;*/
    /*display: block;*/
    /*position: absolute;*/
    /*left:0;*/
    /*bottom:0;*/
    /*border-top:1px solid rgba(7,17,27,0.1);*/
    /*content:' '*/
  }
  .food-item:last-child{
    border:none;
    margin-bottom: 0;
  }
  .icon{
    flex:0 0 27px;
    margin-right:10px;
    z-index:-1;
  }
  .icon img{
    z-index:-1;
  }
  .content{
    flex:1;
    font-size:0;
    position: relative;
  }
  .content .name{
    margin:2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    font-size:14px;
    color:rgb(7,17,27)
  }
  .content .desc,.extra{
    line-height: 10px;
    font-size:10px;
    color:rgb(147,153,159)
  }
  .content .desc{
    margin-bottom:8px;
    line-height:12px;
  }
  .content .extra .count{
    margin-right: 8px;
  }
  .price{
    font-weight: 700;
    line-height: 24px;
  }
  .price .now{
    margin-right: 8px;
    font-size:14px;
    color:rgb(240,20,20)
  }
  .price .old{
    text-decoration: line-through;
    font-size:10px;
    color:rgb(147,153,159)
  }
  .cartcontrol-wrapper{
    position: absolute;
    right:0;
    bottom:-6px;
  }
</style>
