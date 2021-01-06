<template>
  <div class="Board" v-if="notCreate">
    <div v-for="(board, index) in boards" :key="index">
      <h1 @click="detailView(board._id)">{{ board.title }}</h1>
      {{ board.user.id }}
      {{ board.body }}
    </div>
    <div>
      <button v-if="isLogedIn" @click="notCreate = false">
        글쓰기
      </button>
    </div>
    <div>
      <button v-if="pageNum != 1" @click="prePage()">
        이전
      </button>
      <span>{{ pageNum }} / {{ pageAll }} 페이지</span>
      <button v-if="pageNum < pageAll" @click="nextPage()">
        다음
      </button>
    </div>
  </div>

  <div class="Creator" v-else>
    <input placeholder="title" v-model="createNote.title" type="text" />
    <input placeholder="body" v-model="createNote.body" type="text" />
    <button @click="createPost">저장</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import axios from 'axios';
import router from '../router';

export default class Home extends Vue {
  notCreate = true;
  isLogedIn = false;
  createNote = {
    title: '',
    body: '',
  };
  boards = [];
  error = {};
  pageAll = 0;
  pageNum = 1;

  created() {
    this.getPageCount();
    this.getBoard();
  }

  detailView(id: string) {
    router.push(`/detail/${id}`);
  }

  getBoard() {
    axios
      .get(`/api/post/${this.pageNum}`)
      .then(response => {
        this.boards = response.data.posts;
        this.isLogedIn = response.data.isLogedIn;
      })
      .catch(err => alert('에러발생'));
  }

  getPageCount() {
    axios
      .get('/api/post')
      .then(response => {
        this.pageAll = response.data;
      })
      .catch(err => alert('에러발생'));
  }

  prePage() {
    this.pageNum--;
    this.getBoard();
  }

  nextPage() {
    this.pageNum++;
    this.getBoard();
  }

  createPost() {
    axios
      .post('/api/post/create', {
        title: this.createNote.title,
        body: this.createNote.body,
      })
      .then(response => {
        if (response.data.success) {
          alert(response.data.msg);
          this.notCreate = true;
        } else {
          alert(response.data.msg);
        }
      })
      .catch(err => alert('에러발생'));
  }
}
</script>
