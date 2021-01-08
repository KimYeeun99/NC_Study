<template>
  <div class="calc">
    <h1>
      <div class="display">{{ result || '0' }}</div>
    </h1>

    <div class="button" @click="clear">C</div>
    <div class="button" @click="clear">AC</div>
    <div class="button" @click="sign">+/-</div>

    <div class="button" @click="memClear">MC</div>
    <div class="button" @click="memRead">MR</div>
    <div class="button" @click="memMinus">M-</div>
    <div class="button" @click="memPlus">M+</div>

    <div class="button" @click="equal">=</div>
    <div class="button" @click="op('+')">+</div>
    <div class="button" @click="op('-')">-</div>
    <div class="button" @click="op('*')">x</div>
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

    <h1>{{ operator }}</h1>
    <h1>{{ preNum }}</h1>
    <h1>{{ secNum }}</h1>
    <h1>{{ opClick }}</h1>

    <h1>{{ memoryNum }}</h1>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

type Operator = '+' | '-' | '*' | '%';

const CalcFunctions: Record<Operator, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '%': (a, b) => a % b,
};

export default class Calculator extends Vue {
  opClick = false;
  firstOp = true;
  result = '';
  preNum = 0;
  secNum = 0;
  memoryNum = '';
  operator: Operator | null = null;

  clear() {
    this.result = '';
    this.firstOp = true;
    this.preNum = 0;
    this.secNum = 0;
  }

  memClear() {
    this.memoryNum = '';
  }

  memRead() {
    this.result = this.memoryNum;
  }

  memPlus() {
    if (!this.memoryNum) {
      this.memoryNum = (0 + parseFloat(this.result)).toString();
    } else {
      this.memoryNum = (
        parseFloat(this.memoryNum) + parseFloat(this.result)
      ).toString();
    }
    this.opClick = true;
  }

  memMinus() {
    if (!this.memoryNum) {
      this.memoryNum = (0 - parseFloat(this.result)).toString();
    } else {
      this.memoryNum = (
        parseFloat(this.memoryNum) - parseFloat(this.result)
      ).toString();
    }
    this.opClick = true;
  }

  sign() {
    this.result =
      this.result.charAt(0) === '-' ? this.result.slice(1) : '-' + this.result;
  }

  dot() {
    if (this.result.indexOf('.') === -1) {
      this.num('.');
    }
  }

  num(appendNum: string) {
    if (this.opClick) {
      this.result = '';
      this.opClick = false;
    }
    this.result = `${this.result}${appendNum}`;
  }

  setPre() {
    this.preNum = parseFloat(this.result);
    this.opClick = true;
  }

  calc() {
    if (this.operator) {
      const calcNum = CalcFunctions[this.operator](this.preNum, this.secNum);
      this.result = calcNum.toString();
    }
  }

  op(operator: Operator) {
    if (!this.firstOp) {
      if (!this.opClick) {
        this.calc();
        this.setPre();
      }
    } else {
      this.firstOp = false;
      this.setPre();
    }
    this.operator = operator;
  }

  equal() {
    if (this.opClick) {
      this.result = this.preNum.toString();
    } else {
      this.secNum = parseFloat(this.result);
    }
    this.calc();
    this.setPre();
  }
}
</script>

<style scoped>
.calc {
  margin: 0 auto;
  width: 400px;
  font-size: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.button {
  background-color: ivory;
  border: 1px solid grey;
}
.operator {
  background-color: orange;
  color: white;
}
</style>
