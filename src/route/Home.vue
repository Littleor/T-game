<template>
<div class="root">

    <img class="icon" src="../assets/icno.jpg">
  <p>在线井字棋游戏</p>

    <input v-model="room" type="text" placeholder="请输入房间号"/>



    <div>
      <div class="button"><button @click="enter(0)">加入游戏</button></div>
      <div class="button"><button @click="enter(1)">创建游戏</button></div>
    </div>
<div class="footer">
  <p class="foot-p" style="margin: 0;">Copyright © <a onclick="alert('一位技术热爱者-欢迎加群826352486-极简影院的群懒得再创建群了')">Littleor</a> and <a onclick="alert('Rotten Raphael-提供本站图标-一位PS大佬')">RR</a> ALL right reserverd </p>
  <p class="foot-p"  style="margin: 0"> Please star me in <a href="https://github.com/Littleor/T-game">Github</a></p>
</div>
  </div>

</template>

<script>
    export default {
        name: "Home",
      data(){
          return{
            room:'',
          }
      },

      methods: {
          enter:function (type) {
            switch (type) {
              case 0:
                //选择了加入游戏
                if(this.room===''){
                 alert('请输入你要加入的房间号')

                }else {
                  const url='#/play?id='+this.room;
                  window.location.href =url;
                }

                    break;
              case 1:
                //选择了创建游戏
                if(this.room===''){
                 this.room= Math.floor(Math.random()*10000);

                }
                const url='#/play?id='+this.room;
                window.location.href =url;
                    break;
              default:
                console.log('error');
            }
          },

        },

    }
</script>

<style scoped>
  *{
    color:white;
  }
.root{
  width: 100vw;
  height: 100vh;
  text-align: center;
  background-color: rgba(103, 212, 255, 0.54);
}
.icon{
  width: 20vh;
  height: 20vh;
  border: 1px solid white;
  border-radius: 50%;
  margin-top: 10vh;
  margin-bottom: 3vh;
}
  p{
    margin: 0;
    margin-bottom: 12vh;
  }
  input{
    width: 80vw;
    height: 5vh;
    border: 2px solid white;
    border-radius: 5vh;
    outline-style: none ;
    margin-bottom: 10vh;
    box-shadow: 1px 1px darkgrey;
    text-align: center;
    color: #000;
  }
input:focus{
  width: 80vw;
  height: 5vh;
  border-radius: 5vh;
}
  .button{
    width: 36vw;
    height: 5vh;
    display: inline-block;
    border: 1px solid white;
    text-align: center;
    border-radius: 5vh;
    margin-left:5vw;
    margin-right: 5vw;
    box-shadow: 0.5px 0.5px darkgrey;
  }
  button{
    line-height: 5vh;
    text-decoration: none;
    outline-style: none;
    border:none;

  }
  .footer {
   position: absolute;
    width: 100vw;
    bottom: 10px;
    text-align: center;
  }
  .foot-p {
    font-weight: bold;
    margin: 0;

  }
a{
  color:#2d8cf0;
}
</style>
