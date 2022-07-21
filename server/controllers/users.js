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
        const usernameTrimmed = username.trim();
   
        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({ username:usernameTrimmed, email, password: hashedPassword, name:`${firstName} ${lastName}`});
        const result2= await UserPrivate.create({_id: result._id});

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
}

export const getChatById = async (req,res) => {
    const { id } = req.params

    try {
        if(!req.userId) return res.json({message:'Unauthenticated'});

        const chatInfo = await Chat.findById(id);

        res.status(200).json(chatInfo);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getInfoById = async (req,res) => {
    const { id } = req.params

    try {
        if(!req.userId) return res.json({message:'Unauthenticated'});

        const accountInfo = await User.findById(id);

        res.status(200).json(accountInfo);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
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


export const getAccountInfo = async (req,res) => {
    try {
        if(!req.userId) return res.json({message:'Unauthenticated'});

        const accountInfo = await UserPrivate.findById(req.userId);

        res.status(200).json(accountInfo);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}




export const messageUser = async (req,res) => {
    const { messageId } = req.params
    const { value } = req.body;

    //a bit long... maybe condense userprivate logic into another function
    
    if(!req.userId) return res.json({message:'Unauthenticated'});

        try {
    
            const user1 = { _id: req.userId };// need to sort these two values
            const user2 = { _id: messageId };
            const userItems = [req.userId,messageId].sort();
            const userFirst = userItems[0];
            const userSecond = userItems[1];

            const chatId = {_id: `${userFirst}-${userSecond}`};
            const chat_id1 = `${userFirst}-${userSecond}`
        
            const chatCount1 = await Chat.countDocuments(chatId);

            const userPrivate1 = await UserPrivate.countDocuments(user1);
            const userPrivate2 = await UserPrivate.countDocuments(user2);
     
            if (chatCount1 === 0) { //if no initial chat document

                const newChat = new Chat ({_id:chat_id1, createdAt:new Date().toISOString(), participants:userItems, messages:[value],})
                
                if (userPrivate1 === 1) { //if already has a document for private files .. have to account for not clearing the whole message array
                    const updatedUserPrivate1 =  await UserPrivate.findById(user1);

                    const index1 = updatedUserPrivate1.messages.findIndex((message)=>message.chat_id===String(chat_id1));


                    if (index1 === -1) { //  if chat doesn't exist in messages yet, just push 
                        updatedUserPrivate1.messages = [...updatedUserPrivate1.messages, {chat_id:chat_id1, new:false, participants:userItems, createdAt:new Date().toISOString()}];
                        var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate1, {new:true} ) 
                    } else { //if it does exist, filter it out and replace

                        const updatedMessage = {chat_id:chat_id1, new:false, participants:userItems, createdAt:new Date().toISOString()};
                        
                        const updatedMessages = updatedUserPrivate1.messages.filter((message) => (message.chat_id !== String(chat_id1)))
                        updatedMessages.push(updatedMessage);
                        updatedUserPrivate1.messages = updatedMessages;
                        var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate1, {new:true} ) 
                    }

                } else { //if no document for privatefiles ... 
                    const newMessageUpdate1 = {'messages': {chat_id:chat_id1, new:false, participants:userItems, createdAt:new Date().toISOString()}}
                    var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, newMessageUpdate1, {new: true, upsert:true})
                }



                if (userPrivate2 === 1) { 
                    const updatedUserPrivate2 =  await UserPrivate.findById(user2);

                    const index1 = updatedUserPrivate2.messages.findIndex((message)=>message.chat_id===String(chat_id1));


                    if (index1 === -1) { 
                        updatedUserPrivate2.messages = [...updatedUserPrivate2.messages, {chat_id:chat_id1, new:true, participants:userItems, createdAt:new Date().toISOString()}];
                        var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, updatedUserPrivate2, {new:true} ) 
                    } else { 

                        const updatedMessage = {chat_id:chat_id1, new:true, participants:userItems, createdAt:new Date().toISOString()};
                        
                        const updatedMessages = updatedUserPrivate2.messages.filter((message) => (message.chat_id !== String(chat_id1)))
                        updatedMessages.push(updatedMessage);
                        updatedUserPrivate2.messages = updatedMessages;
                        var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, updatedUserPrivate2, {new:true} ) 
                    }

                } else { 
                    const newMessageUpdate2 = {'messages': {chat_id:chat_id1, new:true, participants:userItems, createdAt:new Date().toISOString()}}
                    var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, newMessageUpdate2, {new: true, upsert:true})
                }

                await newChat.save();

                const data = await {newChat, newUpdatedUserPrivate1};
                
                res.status(200).json(data);
            
            } else {
            
                const updatedChat =  await Chat.findById(chatId)
                updatedChat.messages = [...updatedChat.messages, value];
                updatedChat.total_messages++;

                if (userPrivate1 === 1) {
                    const updatedUserPrivate1 =  await UserPrivate.findById(user1);

                    const index1 = updatedUserPrivate1.messages.findIndex((message)=>message.chat_id===String(chat_id1));


                    if (index1 === -1) { 
                        updatedUserPrivate1.messages = [...updatedUserPrivate1.messages, {chat_id:chat_id1, new:false, participants:userItems, createdAt:new Date().toISOString()}];
                        var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate1, {new:true} ) 
                    } else { 

                        const updatedMessage = {chat_id:chat_id1, new:false, participants:userItems, createdAt:new Date().toISOString()};
                        
                        const updatedMessages = updatedUserPrivate1.messages.filter((message) => (message.chat_id !== String(chat_id1)));
                        updatedMessages.push(updatedMessage);
                        updatedUserPrivate1.messages = updatedMessages;
                        var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, updatedUserPrivate1, {new:true} ) 
                    }

                } else { 
                    const newMessageUpdate1 = {'messages': {chat_id:chat_id1, new:false, participants:userItems, createdAt:new Date().toISOString()}}
                    var newUpdatedUserPrivate1 = await UserPrivate.findByIdAndUpdate(user1, newMessageUpdate1, {new: true, upsert:true})
                }



                if (userPrivate2 === 1) {
                    const updatedUserPrivate2 =  await UserPrivate.findById(user2);

                    const index1 = updatedUserPrivate2.messages.findIndex((message)=>message.chat_id===String(chat_id1));


                    if (index1 === -1) { 
                        updatedUserPrivate2.messages = [...updatedUserPrivate2.messages, {chat_id:chat_id1, new:true, participants:userItems, createdAt:new Date().toISOString()}];
                        var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, updatedUserPrivate2, {new:true} ) 
                    } else { 

                        const updatedMessage = {chat_id:chat_id1, new:true, participants:userItems, createdAt:new Date().toISOString()};
                        
                        const updatedMessages = updatedUserPrivate2.messages.filter((message) => (message.chat_id !== String(chat_id1)))
                        updatedMessages.push(updatedMessage);
                        updatedUserPrivate2.messages = updatedMessages;
                        var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, updatedUserPrivate2, {new:true} ) 
                    }

                } else { 
                    const newMessageUpdate2 = {'messages': {chat_id:chat_id1, new:true, participants:userItems, createdAt:new Date().toISOString()}}
                    var newUpdatedUserPrivate2 = await UserPrivate.findByIdAndUpdate(user2, newMessageUpdate2, {new: true, upsert:true})
                }
               

                let newChat = await Chat.findByIdAndUpdate(chatId, updatedChat, {new:true} ) 

                const data = await {newChat, newUpdatedUserPrivate1};
                
                res.status(200).json(data);
            }

            } catch(error) {
                res.status(404).json({message:error.message});
                console.log('huh')
      
            }

}