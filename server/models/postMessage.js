import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:String,
    description:String,
    username:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likeCount: {
        type:Number,
        default:0,
    },
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