<template>
<div class="player" :style="{margin:'3vw 0 0.5vw '+left+'vw '}">
  <div :class="{'icon':false,'icon-online':true}" v-if="who">
      <img src="../assets/1.png">
  </div>

  <div :class="{'icon':!this.$parent.online,'icon-online':this.$parent.online}" v-if="!who">
    <img src="../assets/2.png">
  </div>

  <div class="status"  v-if="who">
    <p style="color: #00ff58" >我({{me}})</p>
    <p>{{this.$parent.player[0]}}</p>
  </div>
  <div class="status" v-if="!who">
    <p>对方（{{enemy}})</p>
    <p v-if="this.$parent.player[1]!=='...'">{{this.$parent.player[1]}}</p>
    <p v-if="this.$parent.player[1]=='...'" style="color: blue" @click="show()">点我邀请</p>
  </div>


</div>
</template>

<script>
    export default {
        name: "player",
        props: ['left','who'],
        methods:{
          show:function () {
            if(navigator.userAgent.indexOf('QQBrowser') !== -1){
            this.$parent.invite=true;
            setTimeout(()=>{this.$parent.invite=false},2800);
            }
            else {
              prompt("请复制下面链接给好友,qq中可以点击右上角直接分享给好友", window.location.href);
            }


   }
},
      data(){

          return{
            height:(this.$parent.height-this.$parent.width*0.87-5-10)/2,
            enemy:'',
            me:this.$parent.me,

          }
      },
      beforeMount() {
          if(this.$parent.me==='X'){
            this.enemy='O';
          }
          else if(this.$parent.me==='O'){
            this.enemy='X';
          }
          else{

          }


      }

    }
</script>

<style scoped>
.player{
  width: 48vw;
  height: 19vw;
  border:2px solid white;
  border-radius:19vw;
  position: relative;
  margin-top: 2vw;



}
img{
  width: 17vw;
  height: 17vw;
 // border:1px solid white;
  border-radius:17vw;
   margin-top: 1vw;


}
.icon-online{
  width: 20vw;
  height: 19vw;
  float: left;
}
.icon-online::after{
  content: '';
  position: absolute;
  left :16vw ;
  top: 1vw;
  width: 2.5vw;
  height: 2.5vw;
  border:0.5px solid white;
  border-radius:2.5vw;
  background-color: lawngreen;

}
.icon{
  width: 20vw;
  height: 19vw;
  float: left;
}
  .icon::after{
    content: '';
    position: absolute;
    left :16vw ;
    top: 1vw;
    width: 2.5vw;
    height: 2.5vw;
    border:0.5px solid white;
    border-radius:2.5vw;
    background-color: #ff4536;

  }
  .status p:nth-child(1){
margin-bottom: 0;
  }
.status p:nth-child(2){
  margin-top: 0;
}

</style>
