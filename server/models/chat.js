import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    _id: {
        type:String,
    },
    createdAt: {
        type:Date,
        default:new Date()
    }, 
    participants: {
        type:[String],
        
    },
    messages: {
        type:[Object],
        default:[]
    },
    total_messages: {
        type: Number,
        default: 1,
    }
})


const Chat = mongoose.model('Chat',chatSchema);

export default Chat;