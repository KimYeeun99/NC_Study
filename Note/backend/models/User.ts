import mongoose, {Document} from 'mongoose';

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    password: String,
},{
    versionKey: false
})

const User = mongoose.model('User', UserSchema)

export {User}