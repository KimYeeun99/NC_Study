<template>
  <div class="login">
    <h1>가입하기</h1>
    <input v-model='id' placeholder="id" type="text"><br>
    <input v-model='password' placeholder="password" type="text"><br>
    <button @click="register">가입</button><br>
    <p>{{msg}}</p>

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
  msg=''

  register(){
    axios.post('/api/login/register', {
      id: this.id,
      password: this.password
    }).then((response) => {
      if(response.data.success === false){
        alert(response.data.success);
        this.msg=response.data.success
        //this.$router.push('login')
      }
    })
  }
}
</script>
