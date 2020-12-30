import mongoose from 'mongoose'
import { User } from './User'

const NoteSchema = new mongoose.Schema({
    user:{
        type: User,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
},{
    versionKey: false
})

 const Note = mongoose.model('Note', NoteSchema);
 export { Note }
