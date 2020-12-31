import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    user:{
        "id":String,
        "password":String
    },
    title: String,
    body: String
},{
    versionKey: false
})

 const Post = mongoose.model('Post', PostSchema);
 export { Post }
