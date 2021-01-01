<template>
  <div class="login">
    <div v-if="isLogined === false">
    <h1>로그인</h1>
    <input placeholder="id" type="text" v-model='id'><br>
    <input placeholder="password" type="password" v-model='password'><br>
    <button @click="login">로그인</button>
    </div>

    <div v-if="isLogined === true">
      <h1>유저정보</h1>
      {{id}}님
    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios'

@Options({
  components: {
    HelloWorld,
  },
})

export default class Home extends Vue {
  id=''
  password=''
  isLogined=false

  created(){
    axios.get('/api/login').then((response) => {
            this.isLogined=response.data.isLogined
            this.id=response.data.userId
        })
  }
  
  login(){
    axios.post('/api/login', {
      id: this.id,     
      password: this.password
    }).then((response) => {
      if(response.data.success == true){
        alert(response.data.success);
        this.isLogined=true
        //this.$router.push('login')
      }else{
        alert(response.data.success);
      }   
    })
  }
}
</script>
