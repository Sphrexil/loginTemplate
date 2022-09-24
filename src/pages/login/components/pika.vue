<template>
  <div class="container">
  <div class="left-ear">
    <div class="punta"></div>
  </div>
  <div class="right-ear">
    <div class="fillear"></div>
  </div>
  <div class="pik-body">
    <img class="shock-left" src="http://www.megghy.com/gif_animate/natura/tuoni/3.gif">
    <img class="shock-right" src="http://www.megghy.com/gif_animate/natura/tuoni/3.gif">
    <div class="pik-head">
      <div class="eye-left"></div>
      <div class="eye-right"></div>
      <div class="cheek-right"></div>
      <div class="nose"></div>
      <div class="mouth"></div>
    </div>
    
    <div class="mid">
      <div class="left-hand"></div>
      <div class="right-hand"></div>
      <div class="mark1"></div>
      <div class="mark2"></div>
    </div>
    
    <div class="left-foot"></div>
    <div class="right-foot"></div>
  </div>
  <div class="tail">
    <div class="part1"></div>
    <div class="part2"></div>
    <div class="part3"></div>
    <div class="part4"></div>
    <div class="part5"></div>
  </div>
</div>
</template>

<script type='text/ecmascript-6'>
export default {

} 
</script>

<style scoped lang='scss'>
$bordercolor: #0A0A0A;

html, body{
  background: #1f1f1f;
}

.container{
  width:320px;
  height:460px;
  position:relative;
  margin:10vh auto;
  
  .left-ear{
    position: absolute;
    top: -0px;
    width: 36px;
    height: 160px;
    left: 48px;
    background: #fed823;
    border-bottom-left-radius: 80px 70%;
    border-top-left-radius: 100%;   
    border-top-right-radius: 100%; 
    -webkit-transform: rotateZ(25deg);
    transform: rotateZ(25deg);
    border-left: 3px solid $bordercolor;
    border-right: 3px solid $bordercolor;
    border-top: 1px solid $bordercolor;
    overflow: hidden;
    z-index: 100;
    .punta{
      position: absolute;
      content: '';
      display: block;
      left: 4px;
      width: 38px;
      height: 50px;
      background: #231815;
      -webkit-transform: rotateZ(12deg);
      transform: rotateZ(12deg);
      border-top-right-radius:  250%; 
      border-bottom-left-radius: 15px;
      border-bottom: 3px solid $bordercolor;
    }
  }
    
  .right-ear{
    position: absolute;
    top: 69px;
    right: 80px;
    width: 30px;
    height: 140px;
    background: #231815;
    border-bottom-left-radius: 80px 150%;
    border-top-left-radius: 190%;   
    border-top-right-radius: 150%; 
    -webkit-transform: rotateZ(80deg);
    transform: rotateZ(80deg);
    border: 3px solid $bordercolor;
    border-bottom: none;
    z-index: 500;
    overflow: hidden;
    
    .fillear{
      position: absolute;
      bottom: 0px;
      background: #fed823;
      width: 40px;
      height: 110px;
      border-radius: 0 80% 0 0;
      border-top: 3px solid $bordercolor;
    }
  }
   
  .pik-body{
    border-top-left-radius: 130px 120px;
	  border-top-right-radius: 150px 100px;
	  border-bottom-left-radius: 100px 130px;
	  border-bottom-right-radius: 150px 100px;
    width:185px;
    height:340px;
    position:absolute;
    border: 3px solid rgba(0,0,0,0);
    bottom: 0;
    transform: rotateZ(-1deg);
    z-index: 300;
    
    .pik-head{
      position: absolute;
      width: 160px;
      height: 160px;
      background: #fed823;
      right: 7px;
      border-top-left-radius: 130px 120px;
	    border-top-right-radius: 150px 100px;
      border-bottom-left-radius: 80px 80px;
	    border-bottom-right-radius: 25px 120px;
      border: 3px solid $bordercolor;
      border-bottom: none;
      
      &:before{
        content: '';
        position: absolute;
        display: block;
        width: 30px;
        height: 70px;
        background: #fed823; //fed823
        border-left: 4px solid $bordercolor;
        left: -14px;
        top: 81px;
        transform: rotateZ(-28deg);
        border-top-left-radius: 150%90px;
        border-bottom-left-radius: 150%90px;
      }
      &:after{
        content: '';
        display: block;
        position: absolute;
        width:23px;
        height: 40px;
        background: #e94e24;
        border-radius: 50%;
        left: -18px;
        top: 80px;
        border-right: 3px solid $bordercolor;
        border-top: 3px solid $bordercolor;
        border-bottom: 3px solid $bordercolor;
      }
      
      .cheek-right{
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #e94e24;
        border: 3px solid $bordercolor;
        top: 90px;
        right: 18px;
      }
      
      .eye-right{
        position: absolute;
        width: 30px;
        height: 33px;
        background: $bordercolor;
        border-radius: 50%;
        top: 57px;
        right: 36px;
        &:before{
          content: '';
          position: absolute;
          display: block;
          width: 10px;
          height: 12px;
          background: white;
          border-radius: 50%;
          left: 8px;
          top: 5px;
        }
        &:after{
          content: '';
          position: absolute;
          right: 3px;
          display: block;
          width: 28px;
          height: 3px;
          background: $bordercolor;
          -webkit-transform: rotateZ(-28deg);
          transform: rotateZ(-28deg);
        }
      }
      
      .eye-left{
        position: absolute;
        width: 20px;
        height: 32px;
        background: $bordercolor;
        border-radius: 50%;
        -webkit-transform: rotateZ(10deg);
        transform: rotateZ(10deg);
        top: 50px;
        left: 10px;
        &:before{
          content: '';
          position: absolute;
          display: block;
          width: 8px;
          height: 13px;
          background: white;
          border-radius: 50%;
          -webkit-transform: rotateZ(8deg);
          transform: rotateZ(8deg);
          left: 10px;
          top: 5px;
        }
        &:after{
          content: '';
          display: block;
          width: 24px;
          height: 3px;
          background: $bordercolor;
          -webkit-transform: rotateZ(28deg);
          transform: rotateZ(28deg);
        }
      }
      
      .nose{
        position: absolute;
        width: 10px;
        height: 11px;
        background: $bordercolor;
        top: 75px;
        left: 40px;
        border-radius: 0% 50% 30% 50%;
        -webkit-transform: rotateZ(-36deg);
        transform: rotateZ(-36deg);
      }
      
      .mouth{
        position: absolute;
        width: 25px;
        height: 20px;
        border-radius: 0% 0% 100% 0%;
        border-bottom: 4px solid $bordercolor;
        border-right: 3px solid $bordercolor;
        top: 90px;
        left: 48px;
        -webkit-transform: rotateZ(55deg);
        transform: rotateZ(55deg);
        &:before{
          content: '';
          display: block;
          position: absolute;
          width: 17px;
          height: 15px;
          border-radius: 0% 0% 90% 0%;
          border-bottom: 4px solid $bordercolor;
          border-right: 3px solid $bordercolor;
          top: 22px;
          right: 20px;
          -webkit-transform: rotateZ(-10deg);
          transform: rotateZ(-10deg);
        }
      }
    }
    
    .mid{
      position: absolute;
      width: 160px;
      height: 150px;
      top: 165px;
      background: #fed823;
      left: 30px;
      border-top-right-radius: 70px 140px;
      border-bottom-right-radius: 50px;
      border-bottom-left-radius: 30px;
      border-bottom: 3px solid $bordercolor;
      border-right: 3px solid $bordercolor;
      z-index: 1;
      &:before{
        position: absolute;
        content: '';
        display: block;
        width: 150px;
        height: 40px;
        border-right: 3px solid $bordercolor;
        background: #fed823;
        right: 15px;
        -webkit-transform: rotateZ(-8deg);
        transform: rotateZ(-8deg);
      }
      &:after{
        position: absolute;
        content: '';
        display: block;
        bottom: -2px;
        left: -20px;
        width: 70px;
        height: 100px;
        border-radius: 90% 30% 0 80%;
        background: #fed823;
        border-bottom: 3px solid $bordercolor;
        border-left: 3px solid $bordercolor;
      }
      
      .mark1{
        position: absolute;
        width: 18px;
        height: 12px;
        border-top-left-radius: 50px 100%;
        border-bottom-left-radius: 50px 100%;
        background: #c76e29;
        border: 2px solid $bordercolor;
        border-right: none;
        -webkit-transform: rotateZ(-15deg);
        transform: rotateZ(-15deg);
        right: 13px;
        top: 27px;
        z-index: 20;
      }
      
      .mark2{
        position: absolute;
        width: 28px;
        height: 16px;
        border-top-left-radius: 100px 190%;
        border-bottom-left-radius: 50px 130%;
        background: #c76e29;
        border: 2px solid $bordercolor;
        border-right: none;
        -webkit-transform: rotateZ(-10deg);
        transform: rotateZ(-10deg);
        right: 0px;
        top: 82px;
        z-index: 20;
      }
      
      .left-hand{
        position: absolute;
        width: 65px;
        height: 65px;
        left: -20px;
        top: -10px;
        border-radius: 70% 50% 80% 60%;
        border-left: 3px solid $bordercolor;
        border-bottom: 3px solid $bordercolor;
        background: #fed823;
        z-index: 5;
        &:before{
          content: '';
          display: block;
          position: absolute;
          width: 40px;
          height: 10px;
          border-radius: 40%;
          border-top: 2px solid $bordercolor;
          -webkit-transform: rotateZ(17deg);
          transform: rotateZ(17deg);
          top: 16px;
          left: 17px;
          
        }
      }
      
      .right-hand{
        position: absolute;
        width: 85px;
        height: 65px;
        right: 45px;
        top: -5px;
        border-top-left-radius: 150px 150%;
        border-bottom-left-radius: 50px 70%;
        border-bottom-right-radius: 50px 70%;
        border-left: 3px solid $bordercolor;
        border-bottom: 2px solid $bordercolor;
        z-index: 25;
        background: #fed823;
      }
    }
    
    .left-foot{
      position: absolute;
      bottom: 0;
      width: 70px;
      height: 30px;
      background: #fed823;
      border-radius: 75%;
      -webkit-transform: rotateZ(-18deg);
      transform: rotateZ(-18deg);
      border: 3px solid $bordercolor;
      
      &:before{
        content: '';
        display: block;
        position: absolute;
        width: 25px;
        height: 6px;
        border-top: 3px solid $bordercolor;
        border-radius: 40%;
        -webkit-transform: rotateZ(-15deg);
        transform: rotateZ(-15deg);
        bottom: 8px;
      }
      
      &:after{
        content: '';
        display: block;
        position: absolute;
        width: 25px;
        height: 8px;
        border-top: 3px solid $bordercolor;
        border-radius: 50%;
        -webkit-transform: rotateZ(-15deg);
        transform: rotateZ(-15deg);
        bottom: 12px;
        left: -1px;
      }
    }
    
    .right-foot{
      position: absolute;
      bottom: 0;
      width: 70px;
      height: 27px;
      right: -12px;
      background: #fed823;
      border-radius: 85%;
      -webkit-transform: rotateZ(17deg);
      transform: rotateZ(17deg);
      border-bottom: 3px solid $bordercolor;
      &:before{
        content: '';
        display: block;
        position: absolute;
        width: 25px;
        height: 6px;
        border-top: 3px solid $bordercolor;
        border-radius: 40%;
        -webkit-transform: rotateZ(15deg);
        transform: rotateZ(15deg);
        bottom: 3px;
        right: 0;
      }
      
      &:after{
        content: '';
        display: block;
        position: absolute;
        width: 25px;
        height: 8px;
        border-top: 3px solid $bordercolor;
        border-radius: 50%;
        -webkit-transform: rotateZ(15deg);
        transform: rotateZ(15deg);
        bottom: 8px;
        right: -1px;
      }
    }
    
  }
  
  .tail{
    position: absolute;
    width: 150px;
    height: 250px;
    right: 0;
    top: 140px;
    transform-origin: 0 bottom;
    animation: tailmove 3s ease infinite;
    
    .part1{
      position: absolute;
      bottom: 18px;
      width: 60px;
      height: 15px;
      border-bottom: 2px solid $bordercolor;
      border-top: 2px solid $bordercolor;
      background: #983c0d;
      -webkit-transform: rotateZ(-50deg);
      transform: rotateZ(-50deg);
    }
    .part2{
      position: absolute;
      bottom: 49px;
      width: 50px;
      height: 18px;
      left: 9px;
      border-top: 2px solid $bordercolor;
      background: #983c0d;
      -webkit-transform: rotateZ(40deg);
      transform: rotateZ(40deg);
      border-right: 2px solid $bordercolor;
      &:before{
        position:absolute;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-left: 9px solid #fed823;
        border-right: 9px solid rgba(0,0,0,0);
        border-bottom: 5px solid rgba(0,0,0,0);
        border-top: 5px solid rgba(0,0,0,0);
        left: 15px;
        top: -1px;
      }
      
      &:after{
        position:absolute;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-left: 9px solid #fed823;
        border-right: 9px solid rgba(0,0,0,0);
        border-bottom: 5px solid rgba(0,0,0,0);
        border-top: 5px solid rgba(0,0,0,0);
        left: 14px;
        top: 8px;
        
      }
    }
    
     .part3{
      position: absolute;
      bottom: 78px;
      width: 70px;
      height: 25px;
      border-top: 2px solid $bordercolor;
      background: #fed823;
      -webkit-transform: rotateZ(-45deg);
      transform: rotateZ(-45deg);
    }
    
    .part4{
      position: absolute;
      bottom: 105px;
      width: 80px;
      height: 35px;
      border-top: 2px solid $bordercolor;
      background: #fed823;
      -webkit-transform: rotateZ(45deg);
      transform: rotateZ(45deg);
      left: -10px;
    }
    
    .part5{
      position: absolute;
      bottom: 145px;
      width: 150px;
      height: 85px;
      border-top: 3px solid $bordercolor;
      border-left: 2px solid $bordercolor;
      background: #fed823;
      -webkit-transform: rotateZ(-7deg);
      transform: rotateZ(-7deg);
      left: -16px;
      border-top-left-radius: 100%30px;
      border-bottom-right-radius: 20%10px;
      border-right: 2px solid $bordercolor;
    }
  }
}

.shock-left{
  position: absolute;
  left: -130px;
  top: 80px;
  -webkit-transform: rotateZ(140deg);
  transform: rotateZ(140deg);
  width: 140px;
  z-index: 10;
}

.shock-right{
  position: absolute;
  right: -110px;
  top: 100px;
  -webkit-transform: rotateZ(-14deg);
  transform: rotateZ(-14deg);
  z-index: 10;
}

@keyframes tailmove{
  0%{
    transform: rotateZ(0deg);
  }
  
  50%{
    transform: rotateZ(15deg);
  }
  
  100%{
    transform: rotateZ(0deg);
  }
}


</style>
