<template>
  <div id="detail" v-if="!isUpdating">
    <h1>상세페이지</h1>
    Title : {{ board.title }} User Id : {{ id }} Text : {{ board.body }}
    <div>
      <button v-if="isUser" @click="updatePost()">수정</button>
      <button v-if="isUser" @click="deletePost()">삭제</button>
    </div>
  </div>
  <div id="update" v-else>
    <input placeholder="title" v-model="board.title" />
    <input placeholder="body" v-model="board.body" />
    <button @click="update()">수정완료</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import router from '../router';
import axios from 'axios';

export default class Detail extends Vue {
  board = {
    title: '',
    body: '',
  };
  id = '';
  isUser = false;
  isUpdating = false;
  isDeleted = false;

  created() {
    axios
      .get(`/api/post/read/${this.$route.params.id}`)
      .then(response => {
        this.board = response.data.post;
        this.id = response.data.post.user.id;
        this.isUser = response.data.isUser;
      })
      .catch(err => alert('에러발생'));
  }

  updatePost() {
    this.isUpdating = true;
  }

  update() {
    axios
      .put(`/api/post/read/${this.$route.params.id}`, {
        title: this.board.title,
        body: this.board.body,
      })
      .then(response => {
        if (response.data.success) {
          alert(response.data.msg);
        } else {
          alert(response.data.msg);
        }
      })
      .catch(err => alert('에러발생'));
  }

  deletePost() {
    axios
      .delete('/api/post/read/' + this.$route.params.id)
      .then(response => {
        if (response.data.success) {
          this.isDeleted = true;
          alert(response.data.msg);
          router.push('/board');
        } else {
          alert(response.data.msg);
        }
      })
      .catch(err => alert('에러발생'));
  }
}
</script>
