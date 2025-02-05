import Comment from '../Model/comment.model.js';

export const createComment=async(req,res)=>{

    try {
        const {content, userId, PostId}=req.body;

        if(userId!=req.user.id){
            return res.status(401).json({message:"You are not allowed to create"});
        }
        const newComment=new Comment({
            content,
            userId,
            PostId,
        })

        await newComment.save();

        res.status(200).json(newComment);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal server error'})
    }
}

export const deleteComment=async(req,res)=>{

    
    try {
       
        const comment=await Comment.findById(req.params.commentId);

        if(!comment) return res.status(404).json('Comment Not Found');

        if(comment.userId!=req.user.id){
            return res.status(401).json('You are not owner of this comment');
        }

        await Comment.findByIdAndDelete(req.params.commentId);

        return res.status(200).json({message:'Comment deleted success'});
        
    } catch (error) {
        return res.status(401).json({message:"ISE"})
    }
}

export const updateComment=async(req,res)=>{

    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment) return res.status(404).json({message:"Not Found"});

        if(comment.userId!=req.user.id) return res.status(401).json({message:"You are not allowed to update"});

        const {CommentToUpdate}=req.body;

        const response=await Comment.findByIdAndUpdate(req.params.commentId,{
                $set:{
                    content:CommentToUpdate,
                },
            },
            {new:true}
        )

        return res.status(200).json(response);

    } catch (error) {
        return res.status(401).json("ISE")
    }
}

export const getComments=async(req,res)=>{
    try {
        const comments=await Comment.find({PostId:req.params.PostId});
        res.status(200).json({comments}) 
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

export const likedComment=async(req,res)=>{
    
    if(!req.user){
        return res.status(401).json({success:false, message:"Please sign-in first"})
    }

    try {
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return res.status(401).json("Comment not found");
        };
 
        const userIndex=comment.likes.indexOf(req.user?.id);

        if(userIndex===-1){
            
            comment.noOfLikes+=1;
            comment.likes.push(req.user.id);
        }
        else{
            comment.noOfLikes-=1;
            comment.likes.splice(userIndex,1);
        }
        
        await comment.save();

        res.status(200).json(comment);
        
    } catch (error) {
        console.log(error.message)
    }
}