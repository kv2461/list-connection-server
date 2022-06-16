import mongoose from 'mongoose';

const userPrivateSchema = new mongoose.Schema({
    _id: {
        type:String,
    },
    messages: {
        type:[Object],
        default:[]
    },
    notifications: {
        type:[Object],
        default:[]
    }
})


const UserPrivate = mongoose.model('UserPrivate',userPrivateSchema);

export default UserPrivate;