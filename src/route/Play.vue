
<template>

  <div class="root">

<div class="header">
  <p >{{id}}号房</p>
</div>
    <player left="1" :who="admin"></player>
   <div class="game">
     <ol>
       <ul class="block" @click="play(index)"  v-for="(data,index) in datas" >{{data}}</ul>
     </ol>
    </div>
    <player left="52" :who="!admin"></player>
<!--  <div class="talk"></div>-->
    <img class="invite" v-if="invite" src="../assets/invite.png"/>

  </div>
</template>


<script>
  import player from  "../components/player"
  import Vue from 'vue';

  var ws = new WebSocket('ws://sixming.com:9099');
  export default {
    name: 'Play',
    components: {
        'player':player,
    },

    data(){
      return{
        val:'',
        content:'',
        user:(new Date).getTime() + "" + Math.ceil(Math.random() * 10),
        id:this.$route.query.id,
        enemy:'',//对手的id
        status:'',//当前状态 wait playing
        datas:['','','','','','','','',''],//保存游戏数据的数组
        me:'X',//X or O;user1=X user2=O
        order:'',//是谁的回合呢？
        win:false,//赢了码？
        height:window.innerHeight,
        width:window.innerWidth,
        admin:true,//是不是房主
        player:['等待对手','...'],//第一个代表自己
        online:false,//对手在不在线？
        from:'',
        invite:false,
    }
    },
    methods:{
      msgsend:function () {
        const obj = {
          "id" : this.id,
          "user":this.user,
          "content":this.val ,
          "contentType": "text",
          "type":"talk",
          "time": (new Date()).getTime()
        };
        const str = JSON.stringify(obj);
        ws.send(str);
      },
      play:function (index) {
        if(this.datas[index]==='' && this.order===this.user && this.status==="playing"){
          this.datas.splice(index,1,this.me);
          this.win=this.whowin();
          console.log(this.win);
          const obj = {
            "id": this.id,//房间号
            "user":this.user ,//个人辨识码
            "to": this.enemy,
            "data": this.datas,
            "contentType": "text",
            "type": "data",
            "order":this.enemy,
            "win":this.win,
            "time": (new Date()).getTime()
          };

          const str = JSON.stringify(obj);
          this.order=this.enemy;
          ws.send(str);

      switch (this.win) {
        case 'X':
          if(this.me==="X"){

            this.player['0']='胜利！';
            this.player['1']='失败 ';

            const obj = {
              "id": this.id,//房间号
              "user": this.user,//个人辨识码
              "content": "restart",
              "contentType": "text",
              "type": "order",
              "time": (new Date()).getTime()
            };
            const str = JSON.stringify(obj);
            ws.send(str);
            alert('恭喜你,你胜利了！再接再厉！');
          }
          else{
            this.player['1']='胜利！';
            this.player['0']='失败 ';

            const obj = {
              "id": this.id,//房间号
              "user": this.user,//个人辨识码
              "content": "restart",
              "contentType": "text",
              "type": "order",
              "time": (new Date()).getTime()
            };
            const str = JSON.stringify(obj);
            ws.send(str);
            alert('很遗憾,你失败了！再来一次吧？');
          }
          break;
        case 'O':
          if(this.me==="O"){
            this.player['0']='胜利！';
            this.player['1']='失败 ';

            const obj = {
              "id": this.id,//房间号
              "user": this.user,//个人辨识码
              "content": "restart",
              "contentType": "text",
              "type": "order",
              "time": (new Date()).getTime()
            };
            const str = JSON.stringify(obj);
            ws.send(str);
            alert('恭喜你,你胜利了！再接再厉！');
          }
          else{
            this.player['1']='胜利！';
            this.player['0']='失败 ';

            const obj = {
              "id": this.id,//房间号
              "user": this.user,//个人辨识码
              "content": "restart",
              "contentType": "text",
              "type": "order",
              "time": (new Date()).getTime()
            };
            const str = JSON.stringify(obj);
            ws.send(str);
            alert('很遗憾,你失败了！再来一次吧？');
          }
          break;
        case 'Null':
          this.player[0] = '平局';
          this.player[1] = '平局';

          const obj = {
            "id": this.id,//房间号
            "user": this.user,//个人辨识码
            "content": "restart",
            "contentType": "text",
            "type": "order",
            "time": (new Date()).getTime()
          };
          const str = JSON.stringify(obj);
          ws.send(str);
          alert('平局！');
          break;
        default:
          this.player[0] = '等待对方操作';
          this.player[1] = '正在操作...';
      }//获取当前信息
          Vue.set(this.player,0,this.player[0]);
          Vue.set(this.player,1,this.player[1]);
        }
        else{
          //已被下了

        }
      },
      iswin:function (m,n,t,u) {
        if (this.datas[m] === u && this.datas[m] === this.datas[n] && this.datas[n] === this.datas[t] && this.datas[m] !== '' && this.datas[n] !== '' && this.datas[t] !== '') {
          return true;
        }
        else{
          return false;
        }
      },
      whowin:function () {
        if(this.iswin(0,1,2,"X")||this.iswin(3,4,5,"X")||this.iswin(6,7,8,"X")|| this.iswin(0,3,6,"X")|| this.iswin(1,4,7,"X")|| this.iswin(2,5,8,"X")|| this.iswin(0,4,8,"X")|| this.iswin(2,4,6,"X")){
          return "X";
        }
        else if(this.iswin(0,1,2,"O")||this.iswin(3,4,5,"O")||this.iswin(6,7,8,"O")|| this.iswin(0,3,6,"O")|| this.iswin(1,4,7,"O")|| this.iswin(2,5,8,"O")|| this.iswin(0,4,8,"O")|| this.iswin(2,4,6,"O")){
          return "O";
        }
        else if(this.datas[0]!==''&&this.datas[1]!==''&&this.datas[2]!==''&&this.datas[3]!==''&&this.datas[4]!==''&&this.datas[5]!==''&&this.datas[6]!==''&&this.datas[7]!==''&&this.datas[8]!==''){
          return "Null";
        }
        else{
          return false;
        }
      },

    },
    beforeRouteEnter (to, from, next) {
      console.log(from)
        if(from.name==='homeLink'){
          location.reload();
        }

        else{

        }

      next();

    },
 created() {
   document.title = "在线井字棋-"+ this.$route.query.id;
   const meta =document.getElementsByTagName('meta');
   meta["description"].setAttribute('content',"在线井字棋-"+this.$route.query.id+"-就差你你了！我在房间里等你哦！");

     ws.onopen =  ()=> {
     //开启事件

     const obj = {
       "id": this.id,//房间号
       "user": this.user,//个人辨识码
       "content": "已连接",
       "contentType": "text",
       "type": "register",
       "time": (new Date()).getTime()
     };
     const str = JSON.stringify(obj);
     ws.send(str);


   };


   ws.onmessage = (e)=> {
     const obj=JSON.parse(e.data);

     console.log(obj);

     switch (obj.type) {

       case "register":
         //注册时的信息
         this.me=obj.you;//确定我是谁
         this.status=obj.status;
         this.order=obj.order;
         if(this.status==="playing"){
           this.online=true;
           switch (this.me) {
             case 'X':
               //我是一号玩家
               this.enemy=obj.user2;
               this.admin=true;
               this.player[1] = '等待对方操作';
               this.player[0] = '正在操作...';
               break;
             case 'O':
               //我是二号玩家
               this.enemy=obj.user1;
               this.admin=false;
               this.player[0] = '等待对方操作';
               this.player[1] = '正在操作...';
               break;
           }//确定对方的 辨识码
           Vue.set(this.player,0,this.player[0]);
           Vue.set(this.player,1,this.player[1]);
         }
         else if(this.status==="begin"){
           alert('该房间已经开始游戏了,为你切换到其他房间');
           const url='#/play?id='+ Math.floor(Math.random()*10000);
           window.location.href =url;
           location.reload();
         }
         break;
       case "data":
          this.status=obj.status;
         this.datas=obj.data;
         if(obj.win!==false){
           this.win=obj.win;
           if(this.win==="Null"){
             this.player[1] = '平局';
             this.player[0] = '平局';

             const obj = {
               "id": this.id,//房间号
               "user": this.user,//个人辨识码
               "content": "restart",
               "contentType": "text",
               "type": "order",
               "time": (new Date()).getTime()
             };
             const str = JSON.stringify(obj);
             ws.send(str);
             alert('平局!');
           }
           else{
             this.player[0] = '失败 ';
             this.player[1] = '胜利！';

             const obj = {
               "id": this.id,//房间号
               "user": this.user,//个人辨识码
               "content": "restart",
               "contentType": "text",
               "type": "order",
               "time": (new Date()).getTime()
             };
             const str = JSON.stringify(obj);
             ws.send(str);
             alert('很遗憾,你失败了！再来一次吧？');
           }
         }
         else {
           this.order = obj.order;
           this.player[1] = '等待对方操作';
           this.player[0] = '正在操作...';

         }
         Vue.set(this.player,0,this.player[0]);
         Vue.set(this.player,1,this.player[1]);
         break;


     }



   };
   ws.onclose=function(e){
     console.log(e);
     ws.close(); //关闭TCP连接
   };

   }



  }
</script>


<style>

</style>
<style scoped>
*{
  color:white;
}

  .root{
    background-color: rgba(103, 212, 255, 0.54);
    height: 100vh;
    width: 100vw;
    overflow-x:hidden;
    overflow-y:hidden;
  }

  .header{
  margin: 0;
    position: relative;
  }
  .header p{
    top:3px;
    font-size: small;
    border: 1px solid white;
    padding: 2px;
    margin: 0;
    position: absolute;
    right: 6px;
  }
  .game{
    height: 85vw;
    width: 100vw;
    padding: 5vh 5vw 5vh 5vw;

  //  background-color: #ff4536;
  }
  ol{
    padding: 0;
    margin: 0;
  }

  .block{
    position: relative;
    text-align: center;
    width: 28vw;
    float: left;
    height: 28vw;
    solid-color: white;
    border: 0.5vw solid white;
    font-weight: bold;
    font-size: 24vw;
    line-height: 28vw;
    padding: 0;
    margin: 0;
  }
.invite{
  position: absolute;
  top:0;
  left: 0;
  height: 100vh;
  width: 100vw;
  opacity:0.8;
}
</style>

