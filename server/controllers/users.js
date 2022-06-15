import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

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