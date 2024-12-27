import Post from "../Model/post.model.js";

export const CreatePost=async(req,res)=>{
    
    const {title,content,image}=req.body;

    if(!title || !content || title=='' || content==''){
        return res.status(505).json('Fill all fields');
    }

    try {
        
        const newPost=new Post({
            title:title,
            content:content,
            userId:req.user.id,
            image:image,
        })

        const response= await newPost.save();
        res.status(200).json({response:response})

    } catch (error) {
        console.log(error);
        res.status(505).json('Internal server Error');
    }
}

export const getPosts=async(req,res)=>{

    try {
        const posts=await Post.find({
            ...(req.query.PostId && { _id: req.query.PostId }),
            ...(req.query.userId && { userId: req.query.userId }),
        });
        
        res.status(200).json({posts});

    } catch (error) {
        res.status(500).json('IS ERROR');
    }

}

export const deletePost=async(req,res)=>{

    if(req.user.id!=req.params.PostCreatorId){
        return res.status(401).json({message:"You are not owner of this post"});
    }
    
    try {
        const response= await Post.findByIdAndDelete(req.params.PostId);
        res.status(200).json({response});
        console.log(response);
        
    } catch (error) {
        res.status(401).json('king');
    }

}

export const updatePost=async(req,res)=>{

    const {title,content}=req.body;
    if(!title || !content || title==''|| content==''){
        return res.status(200).json("Fill all fields");
    }

    try {
        
        const response=await Post.findByIdAndUpdate(req.params.PostId,{
            $set:{
                title:title,
                content:content,
            }
        },{new:true});

        res.status(200).json({response});

    } catch (error) {
        res.status.json({error});
    }

}

