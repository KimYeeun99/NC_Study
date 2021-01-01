<template>
    <div id="detail" v-if="isUpdate===false">
        <h1>상세페이지</h1><br>
        <button v-if="isUser===true" @click="updateView()">수정</button>
        <button v-if="isUser===true" @click="deletePage()">삭제</button><br>
        Title : {{board.title}}<br>
        User Id : {{id}}<br>
        Text : {{board.body}}<br>
    </div>
    <div id="update" v-else>
        <input placeholder="title" v-model="board.title">
        <input placeholder="title" v-model="board.body">
        <button @click="update()">수정완료</button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import router from '../router'
import axios from 'axios'

export default class Detail extends Vue {
    board={
        title:"",
        body:""
    }
    id=''
    isUser=false
    isUpdate=false
    isDeleted=false

    created(){
        axios.get('/api/post/read/'+this.$route.params.id).then((response) => {
            this.board=response.data.posts
            this.id=response.data.posts.user.id
            this.isUser=response.data.isUser
        })  
    }
    updateView(){
        this.isUpdate=true
    }
    update(){
        axios.put('/api/post/read/'+this.$route.params.id, {
            title: this.board.title,
            body: this.board.body
        }).then((response) => {
            console.log(response.data.success)
            if(response.data.success===true){
                alert(response.data.success)
            }else{
                alert("성공하지 못했습니다.")
            }
    }) 
    }

    deletePage(){
        axios.delete('/api/post/read/'+this.$route.params.id).then((response) => {
            if(response.data.success===true){
                this.isDeleted=true
                alert(response.data.success)
                router.push("/board")
            }else{
                alert("성공하지 못했습니다.")
            }
    }) 
    }
}
</script>