<template>
  <div class="login">
    <div v-if="!isLogedIn">
      <h1>로그인</h1>
      <div><input placeholder="id" type="text" v-model="id" /></div>
      <div>
        <input placeholder="password" type="password" v-model="password" />
      </div>
      <button @click="login">로그인</button>
    </div>

    <div v-if="isLogedIn">
      <h1>유저정보</h1>
      {{ id }}님
    </div>
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
  isLogedIn = false;
  error = '';

  created() {
    axios
      .get('/api/login')
      .then(response => {
        this.isLogedIn = response.data.isLogedIn;
        this.id = response.data.userId;
      })
      .catch(err => alert('에러발생'));
  }

  login() {
    axios
      .post('/api/login', {
        id: this.id,
        password: this.password,
      })
      .then(response => {
        if (response.data.success) {
          alert(response.data.msg);
          this.isLogedIn = true;
        } else {
          alert(response.data.msg);
        }
      })
      .catch(err => alert('에러발생'));
  }
}
</script>
