<template>
  <div class="Board" v-if="notCreate===true">
    <div v-for="(board, index) in boards" :key="index">
      <h1 @click="detailView(board._id)">{{board.title}}</h1>
      {{board.user.id}}
      {{board.body}}
    </div>
    <div><button v-if="isLogined===true" @click="notCreate=false">글쓰기</button></div>
  </div>

  <div class="Creator" v-else>
    <input placeholder="title" v-model="createNote.title" type="text">
    <input placeholder="body" v-model="createNote.body" type="text">
    <button @click="create">저장</button>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import axios from 'axios'
import router from '../router'

export default class Home extends Vue {
  notCreate=true
  isLogined=false
  createNote={
    title:"",
    body:""
  }
  boards=[]
    ostView=[]

    created(){
      axios.get('/api/post').then((response) => {
          this.boards=response.data.posts
          this.isLogined=response.data.isLogined
      })
    }

    detailView(id: string){
      router.push("/detail/"+id)
    }

    create(){
      axios.post('/api/post/create', {
        title: this.createNote.title,
        body: this.createNote.body
    }).then((response) => {
      if(response.data.success == true){
        alert(response.data.success);
        this.notCreate=true
      }else{
        alert(response.data.success);
      }   
    })
    }
}
</script>