import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import UserPrivate from '../models/userPrivate.js';
import Chat from '../models/chat.js';
import PostList from '../models/postList.js';

export const signin = async (req,res) => {
    const {email,password} = req.body

    try {
        const existingUser = await User.findOne({email});
        
        if (!existingUser) return res.status(404).json({message:"User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({message:'Invalid credentials'});

        const token = jwt.sign({ email:existingUser.email, id:existingUser._id},'test',{expiresIn:'1h'})

        res.status(200).json({ result:existingUser, token })

    } catch (error) {
        res.status(500).json({message:'Something went wrong'});
    }
}

export const signup = async (req,res) => {

    const {email, password, confirmPassword, firstName, lastName, username} = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({message:'User already exists'});

        if (password !== confirmPassword) return res.status(400).json({message:'Passwords do not match'});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({ username, email, password: hashedPassword, name:`${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id:result._id},'test',{expiresIn:'1h'});

        res.status(200).json({result, token})
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const updateUser = async (req,res) => {
    const { id:_id } = req.params
    const userToUpdate = req.body;


    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    try {
        const updatedUser = await User.findByIdAndUpdate(_id,{...userToUpdate,_id},{new:true} )
    
        res.json(updatedUser);
    } catch (error) {
        console.log(error);
    }
    

    // try {
    //     const existingUser = await User.findOne({ email });

    //     if (existingUser) return res.status(400).json({message:'User already exists'});

    //     if (password !== confirmPassword) return res.status(400).json({message:'Passwords do not match'});

    //     const hashedPassword = await bcrypt.hash(password,12);

    //     const result = await User.create({ username, email, password: hashedPassword, name:`${firstName} ${lastName}`});

    //     const token = jwt.sign({email: result.email, id:result._id},'test',{expiresIn:'1h'});

    //     res.status(200).json({result, token})
    // } catch (error) {
    //     res.status(500).json({ message: 'Something went wrong' });
    // }
}


export const getInfoByUsername = async (req,res) => {
    const { username } = req.params
  


    try {

        const data = await User.find({username:username});

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
    

    // try {
    //     const existingUser = await User.findOne({ email });

    //     if (existingUser) return res.status(400).json({message:'User already exists'});

    //     if (password !== confirmPassword) return res.status(400).json({message:'Passwords do not match'});

    //     const hashedPassword = await bcrypt.hash(password,12);

    //     const result = await User.create({ username, email, password: hashedPassword, name:`${firstName} ${lastName}`});

    //     const token = jwt.sign({email: result.email, id:result._id},'test',{expiresIn:'1h'});

    //     res.status(200).json({result, token})
    // } catch (error) {
    //     res.status(500).json({ message: 'Something went wrong' });
    // }
}

export const followUser = async (req,res) => {
    const { followId } = req.params


    
    if(!req.userId) return res.json({message:'Unauthenticated'});


    try {

        const userAccount = await User.findById(req.userId);
        const followAccount = await User.findById(followId);


        const index = followAccount.followers.findIndex((id)=>id===String(req.userId));

        if(index===-1) {
            followAccount.followers.push(req.userId);
            userAccount.following.push(followId);
        } else {
            followAccount.followers = followAccount.followers.filter((id)=>id!==String(req.userId));
            userAccount.following = followAccount.following.filter((id)=>id!==String(followId));
        }

        const updatedUserAccount = await User.findByIdAndUpdate(req.userId,userAccount,{new:true});
        const updatedFollowAccount = await User.findByIdAndUpdate(followId,followAccount,{new:true});

        res.status(200).json(updatedFollowAccount);

    } catch (error) {
        res.status(404).json({message:error.message});
    }

}







export const messageUser = async (req,res) => {
    const { messageId } = req.params
    const { value } = req.body;

    
    if(!req.userId) return res.json({message:'Unauthenticated'});

        try {
    
            const user1 = { _id: req.userId };
            const user2 = { _id: messageId };
            const chatId1 = {_id: `${req.userId}-${messageId}`};
            const chatId2 = {_id: `${messageId}-${req.userId}`};
            const chat_id1 = `${req.userId}-${messageId}`
            const chat_id2 = `${messageId}-${req.userId}`

            const chatCount1 = await Chat.countDocuments(chatId1);
            const chatCount2 = await Chat.countDocuments(chatId2);

            const userPrivate1 = await UserPrivate.countDocuments(user1);
            const userPrivate2 = await UserPrivate.countDocuments(user2);

            if (chatCount1 === 0 && chatCount2 === 0) { //if no initial chat document

                const newChat = new Chat({_id:`${req.userId}-${messageId}`, createdAt:new Date().toISOString(), participants:[req.userId, messageId], messages:[value],})

                
                if (userPrivate1 === 1) { //if already has a document for private files .. have to account for not clearing the whole message array
                    const updatedUserPrivate1 =  await UserPrivate.findById(user1);

                    const index1 = updatedUserPrivate1.messages.findIndex((message)=>message.chat_id===String(chat_id1));
                    const index2 = updatedUserPrivate1.messages.findIndex((message)=>message.chat_id===String(chat_id2));


                    if (index1 === -1 && index2 === -1) { //  if chat doesn't exist in messages yet, just push 
                        console.log('hi')
                        // console.log(updatedUserPrivate1)
                        updatedUserPrivate1.messages = [...updatedUserPrivate1.messages, {chat_id:chat_id1, new:false, participants:[req.userId, messageId], createdAt:new Date().toISOString()}];
                        var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate1, {new:true} ) 
                    } else { //if it does exist, filter it out and replace

                        const updatedMessage = {chat_id:chat_id1, new:false, participants:[req.userId, messageId], createdAt:new Date().toISOString()};
                        
                        const updatedMessages = updatedUserPrivate1.messages.filter((message) => (message.chat_id !== String(chat_id1) && message.chat_id !== String(chat_id2)))
                        updatedMessages.push(updatedMessage);
                        updatedUserPrivate1.messages = updatedMessages;
                        var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate1, {new:true} ) 
                    }

                } else { //if no document for privatefiles ... 
                    const newMessageUpdate1 = {'messages': {chat_id:chat_id1, new:false, participants:[req.userId, messageId], createdAt:new Date().toISOString()}}
                    var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, newMessageUpdate1, {new: true, upsert:true})
                }



                if (userPrivate2 === 1) { //if already has a document for private files .. have to account for not clearing the whole message array
                    const updatedUserPrivate2 =  await UserPrivate.findById(user2);

                    const index1 = updatedUserPrivate2.messages.findIndex((message)=>message.chat_id===String(chat_id1));
                    const index2 = updatedUserPrivate2.messages.findIndex((message)=>message.chat_id===String(chat_id2));


                    if (index1 === -1 && index2 === -1) { //  if chat doesn't exist in messages yet, just push 
                        // console.log(updatedUserPrivate1)
                        updatedUserPrivate2.messages = [...updatedUserPrivate2.messages, {chat_id:chat_id1, new:true, participants:[req.userId, messageId], createdAt:new Date().toISOString()}];
                        var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, updatedUserPrivate2, {new:true} ) 
                    } else { //if it does exist, filter it out and replace

                        const updatedMessage = {chat_id:chat_id1, new:false, participants:[req.userId, messageId], createdAt:new Date().toISOString()};
                        
                        const updatedMessages = updatedUserPrivate2.messages.filter((message) => (message.chat_id !== String(chat_id1) && message.chat_id !== String(chat_id2)))
                        updatedMessages.push(updatedMessage);
                        updatedUserPrivate2.messages = updatedMessages;
                        var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, updatedUserPrivate2, {new:true} ) 
                    }

                } else { //if no document for privatefiles ... 
                    const newMessageUpdate2 = {'messages': {chat_id:chat_id1, new:true, participants:[req.userId, messageId], createdAt:new Date().toISOString()}}
                    var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, newMessageUpdate2, {new: true, upsert:true})
                }

                await newChat.save();

                const data = await {newChat, newUpdatedUserPrivate1};
                
                res.status(200).json(data);
            

                console.log('zero')
            } 






            
            // else if (chatCount1 > 0) {
            //     const updatedChat =  await Chat.findById(chatId1)
            //     updatedChat.messages = [...updatedChat.messages, value];
            //     updatedChat.total_messages++;

            //     if (userPrivate1 === 1) {
            //         const updatedUserPrivate1 =  await UserPrivate.findById(user1);

            //         updatedUserPrivate1.messages = [...updatedUserPrivate1.messages, {chatId1, new:false, participants:[req.userId, messageId]}];

            //         var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate1, {new:true} ) 
            //     } else {
            //         const newMessageUpdate1 = {'messages': {chatId1, new:false, participants:[req.userId, messageId]}}
            //         var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, newMessageUpdate1, {new: true, upsert:true})
            //     }

            //     if (userPrivate2 === 1) {
            //         const updatedUserPrivate2 =  await UserPrivate.findById(user2);
            //         updatedUserPrivate2.messages = [...updatedUserPrivate2.messages, {chatId1, new:true, participants:[req.userId, messageId]}];

            //         var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate2, {new:true} ) 
            //     } else {
            //         const newMessageUpdate2 = {'messages': {chatId1, new:true, participants:[req.userId, messageId]}}
            //         var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, newMessageUpdate2, {new: true, upsert:true})
            //     }

            //     console.log('one')



            //     let newChat = await Chat.findByIdAndUpdate(chatId1, updatedChat, {new:true} ) 

            //     const data = await {newChat, newUpdatedUserPrivate1};
                
            //     res.status(200).json(data);
            // }

            // else if (chatCount2 > 0) {
            //     const updatedChat =  await Chat.findById(chatId2)
            //     updatedChat.messages = [...updatedChat.messages, value];
            //     updatedChat.total_messages++;

            //     if (userPrivate1 === 1) {
            //         const updatedUserPrivate1 =  await UserPrivate.findById(user1);
            //         updatedUserPrivate1.messages = [...updatedUserPrivate1.messages, {chatId1, new:false, participants:[req.userId, messageId]}];

            //         var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate1, {new:true} ) 
            //     } else {
            //         const newMessageUpdate1 = {'messages': {chatId1, new:false, participants:[req.userId, messageId]}}
            //         var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, newMessageUpdate1, {new: true, upsert:true})
            //     }

            //     if (userPrivate2 === 1) {
            //         const updatedUserPrivate2 =  await UserPrivate.findById(user2);
            //         updatedUserPrivate2.messages = [...updatedUserPrivate2.messages, {chatId1, new:true, participants:[req.userId, messageId]}];

            //         var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate2, {new:true} ) 
            //     } else {
            //         const newMessageUpdate2 = {'messages': {chatId1, new:true, participants:[req.userId, messageId]}}
            //         var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, newMessageUpdate2, {new: true, upsert:true})
            //     }

            //     console.log('two')

            //     let newChat = await Chat.findByIdAndUpdate(chatId2, updatedChat, {new:true} ) 

            //     const data = await {newChat, newUpdatedUserPrivate1};
                
            //     res.status(200).json(data);
            // }


            } catch(error) {
                res.status(404).json({message:error.message});
                console.log('huh')
            }

}