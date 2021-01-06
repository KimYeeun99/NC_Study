<template>
  <div class="login">
    <h1>가입하기</h1>
    <div><input v-model="id" placeholder="id" type="text" /></div>
    <div>
      <input v-model="password" placeholder="password" type="password" />
    </div>
    <button @click="register">가입</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios';

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  id = '';
  password = '';

  register() {
    axios
      .post('/api/login/register', {
        id: this.id,
        password: this.password,
      })
      .then(response => {
        if (response.data.success) {
          alert('가입에 성공하였습니다!');
        }
      })
      .catch(err => alert('이미 존재하는 아이디입니다.'));
  }
}
</script>
