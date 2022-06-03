import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:String,
    description:String,
    username:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes: {
        type:[String],
        default:[],
    },
    genre:String,
    subgenre:String,
    list:{
        type:[Object],
        default:[]
    },  
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;