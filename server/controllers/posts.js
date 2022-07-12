import mongoose from 'mongoose';
import PostList from '../models/postList.js';

export const getPost = async (req,res) => {
    const { id } = req.params;

    try {
        const post = await PostList.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getPosts = async (req, res) => {
    const {page, subgenrename, genrename} = req.query

    try {

        const subgenre = new RegExp(subgenrename,'i');
        const genre = new RegExp(genrename,'i');

        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        
        const total = await PostList.countDocuments({subgenre,genre});

        const posts = await PostList.find({subgenre,genre}).sort({_id: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data:posts, currentPage:Number(page), numberOfPages:Math.ceil(total/LIMIT)});

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

//QUERY -> /posts?page=1 -> page = 1
//PARAMS -> /posts/123 -> id = 123

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags, } = req.query
    console.log(tags)
    try {
        const title = new RegExp(searchQuery,'i'); //ignore case

        const posts = await PostList.find({ $or: [{title}, {tags: {$in:tags.split(',') } }, ] }); //$or find me title or tags
        //$in is one of the tags in the array of tags equal to any of my tags

        res.json({ data: posts }); //will need to destructure twice when recieving in actions
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}


export const getPostsByUsername = async (req, res) => {
    const { username } = req.params;
    
    try {

        const posts = await PostList.find({username:username}); //$or find me title or tags
        //$in is one of the tags in the array of tags equal to any of my tags

        res.json({ data: posts }); //will need to destructure twice when recieving in actions
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

//so far this and routes is all ive written for getting subgenre as categories
//don;t know how much of an advanced search i want to make in the future
// export const getPostsBySubgenre = async (req, res) => {
//     const { subgenreName } = req.query
//     try {
//         const subgenre = new RegExp(subgenreName,'i'); 

//         const posts = await PostList.find({ subgenre }); 

//         res.json({ data: posts }); 
//     } catch (error) {
//         res.status(404).json({message:error.message});
//     }
//}

export const createPost = async (req,res) => {
    const post = req.body;

    const newPostList = new PostList({...post,creator:req.userId,createdAt:new Date().toISOString()});

    try {
        await newPostList.save();

        res.status(201).json(newPostList);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id:_id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostList.findByIdAndUpdate(_id,{...post,_id},{new:true} )
    
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id:_id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostList.findByIdAndRemove(_id);

    res.json({message:'Post deleted successfully'});
}

export const likePost = async (req,res) => {
    const {id:_id} = req.params;

    if(!req.userId) return res.json({message:'Unauthenticated'});


    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const post = await PostList.findById(_id);

    const index = post.likes.findIndex((id)=>id===String(req.userId));

    if(index===-1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id)=>id!==String(req.userId))
    }

    const updatedPost = await PostList.findByIdAndUpdate(_id,post,{new:true});

    res.json(updatedPost);
}



export const commentPost = async (req,res) => {
    const { id } = req.params;
    const { value } = req.body;
    

    const post = await PostList.findById(id);

    post.comments.push(value);

    const updatedPost = await PostList.findByIdAndUpdate(id, post, {new:true});

    res.json(updatedPost);
}

export const deleteComment = async (req, res) => {
    const { id } = req.params; 
    const { commentId } = req.body;

    const post = await PostList.findById(id);


    post.comments = post.comments.filter((comment) => comment.id !== commentId);

    const updatedPost = await PostList.findByIdAndUpdate(id, post, {new:true});
    
    res.json(updatedPost);
}

export const likeComment = async (req, res) => {
    const { id } = req.params; 
    const { commentId } = req.body;

    const post = await PostList.findById(id);
    
    var updatedComment = post.comments.filter((comment) => comment.id === commentId);
    
    const index = updatedComment[0].likes.findIndex((id)=>id===String(req.userId));



    if(index===-1){
        updatedComment[0].likes.push(req.userId);
    } else {
        updatedComment[0].likes = updatedComment[0].likes.filter((id)=>id!==String(req.userId))
    }

    const updatedComments = post.comments.filter((comment) => {
        if (comment.id !== commentId) {
            return comment
        } else {
            return updatedComment
        }
    });
    post.comments = updatedComments;

    const updatedPost = await PostList.findByIdAndUpdate(id, post, {new:true});
    
    res.json(updatedPost);
}

export const replyComment = async (req, res) => {
    const { id } = req.params; 
    const { commentId, value } = req.body;

    const post = await PostList.findById(id);


    var updatedComment = post.comments.filter((comment) => comment.id === commentId);

    if (updatedComment[0].replies === undefined) {
        updatedComment[0].replies = [];
    }
    updatedComment[0].replies.push(value);

    const updatedComments = post.comments.filter((comment) => {
        if (comment.id !== commentId) {
            return comment
        } else {
            return updatedComment
        }
    });
    post.comments = updatedComments;



    const updatedPost = await PostList.findByIdAndUpdate(id, post, {new:true});
    
    res.json(updatedPost);
}

export const likeReply = async (req, res) => {
    const { id } = req.params; 
    const { commentId, replyId } = req.body;

    const post = await PostList.findById(id);
    
    var updatedComment = post.comments.filter((comment) => comment.id === commentId);

    var updatedReply = updatedComment[0].replies.filter((reply) => reply.id === replyId);
    
    const index = updatedReply[0].likes.findIndex((id)=>id===String(req.userId));



    if(index===-1){
        updatedReply[0].likes.push(req.userId);
    } else {
        updatedReply[0].likes = updatedReply[0].likes.filter((id)=>id!==String(req.userId))
    }

    updatedComment = updatedComment[0].replies.filter((reply) => {
        if (reply.id !== replyId) {
            return reply
        } else {
            return updatedReply
        }
    })

    const updatedComments = post.comments.filter((comment) => {
        if (comment.id !== commentId) {
            return comment
        } else {
            return updatedComment
        }
    });
    post.comments = updatedComments;

    const updatedPost = await PostList.findByIdAndUpdate(id, post, {new:true});
    
    res.json(updatedPost);
}

export const deleteReply = async (req, res) => {
    const { id } = req.params; 
    const { commentId, replyId } = req.body;

    const post = await PostList.findById(id);
    
    var updatedComment = post.comments.filter((comment) => comment.id === commentId);

    updatedComment[0].replies = updatedComment[0].replies.filter((reply) => reply.id !== replyId);
    
    const updatedComments = post.comments.filter((comment) => {
        if (comment.id !== commentId) {
            return comment
        } else {
            return updatedComment
        }
    });
    post.comments = updatedComments;

    const updatedPost = await PostList.findByIdAndUpdate(id, post, {new:true});
    
    res.json(updatedPost);
}