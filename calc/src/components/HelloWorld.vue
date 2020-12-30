<template>
  <div class="calc">
    <h1><div>{{result || '0'}}</div></h1>

    <button @click="clear">C</button>
    <button @click="clear">AC</button>
    <button @click="sign">+/-</button>

    <button @click="memClear">MC</button>
    <button @click="memRead">MR</button>
    <button @click="memMinus">M-</button>
    <button @click="memPlus">M+</button>

    <div class="button" @click="equal">=</div>
    <div class="button" @click="op('+')">+</div>
    <div class="button" @click="op('-')">-</div>
    <div class="button" @click="op('x')">x</div>
    <div class="button" @click="op('%')">%</div>
    <div class="button" @click="dot">.</div>
    
    <div class="button" @click="num('1')">1</div>
    <div class="button" @click="num('2')">2</div>
    <div class="button" @click="num('3')">3</div>
    <div class="button" @click="num('4')">4</div>
    <div class="button" @click="num('5')">5</div>
    <div class="button" @click="num('6')">6</div>
    <div class="button" @click="num('7')">7</div>
    <div class="button" @click="num('8')">8</div>
    <div class="button" @click="num('9')">9</div>
    <div class="button" @click="num('0')">0</div>
    <div class="button" @click="num('00')">00</div>

    
    <h1>{{memoryNum}}</h1>
  </div>
</template>

<script lang="ts">
import {Options, Vue } from 'vue-class-component';


@Options({
  props: {
    preNum: Number,
    secNum: Number,
  }
})

export default class Calculator extends Vue {
  opClick=false;
  fisrtOp=false;
  result='';
  preNum=0;
  secNum=0;
  memoryNum='';
  operator='';

  clear(){
    this.result='';
    this.operator='';
    this.preNum=0;
    this.secNum=0;
  }

  memClear(){
    this.memoryNum=''
  }
  
  memRead(){
    this.result=this.memoryNum;
  }

  memPlus(){
    if(this.memoryNum==''){
      this.memoryNum=(0+parseFloat(this.result)).toString();
    }else{
      this.memoryNum=(parseFloat(this.memoryNum)+parseFloat(this.result)).toString();
    }
    this.opClick=true;
  }

  memMinus(){
    if(this.memoryNum==''){
      this.memoryNum=(0-parseFloat(this.result)).toString();
    }else{
      this.memoryNum=(parseFloat(this.memoryNum)-parseFloat(this.result)).toString();
    }
    this.opClick=true;
  }

  sign(){
    this.result = this.result.charAt(0)=='-' ? this.result.slice(1) : '-'+this.result;
  }

  dot() {
    if (this.result.indexOf('.') === -1) {
      this.num('.');
    }
  }

  num(number: string){
    if(this.opClick){
      this.result='';
      this.opClick=false;
    }
    this.result = this.result+number;
  }

  setPre(){
    this.preNum=parseFloat(this.result);
    this.opClick=true;
  }

  calc(){
    this.secNum=parseFloat(this.result);
    if(this.operator =='+'){
        this.result = (this.preNum+parseFloat(this.result)).toString();
      }else if(this.operator =='-'){
        this.result = (this.preNum-parseFloat(this.result)).toString();
      }else if(this.operator =='%'){
        this.result = (this.preNum/parseFloat(this.result)).toString();
      }else if(this.operator =='x'){
        this.result = (this.preNum*parseFloat(this.result)).toString();
      }else{
        console.log("fail")
      }
  }

  op(operator: string){
    if(this.operator!=''){
      if(this.opClick==false){
        this.calc();
        this.setPre();
      }
    }else if(this.operator==''){
      this.setPre();
    }
    this.operator=operator;
    this.fisrtOp=true;
  }

  equal() {
    if(this.opClick==true){
      this.result=this.preNum.toString();
    }
    this.calc();
    this.operator='';
    this.preNum=parseFloat(this.result);
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calc {
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}
.display {
  grid-column: 1 / 5;
  background-color: #333;
  color: white;
}
.zero {
  grid-column: 1 / 3;
}
.button {
  background-color: #F2F2F2;
  border: 1px solid #999;
}
.operator {
  background-color: orange;
  color: white;
}
</style>