import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title:String,
    description:String,
    username:String,
    creator:String,
    tags:{
        type:[String],
        default:[]
    },
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
    comments: {
        type:[Object], 
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
})

const PostList = mongoose.model('PostList',postSchema);

export default PostList;