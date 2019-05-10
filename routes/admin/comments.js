const  express=require('express');
const router=express.Router();
const Post=require('../../models/Post');
const Comment=require('../../models/Comment');


router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
});

router.get('/',(req,res)=>{
    Comment.find({user:req.user.id}).then(cmns=>{
        res.render('admin/comments',{comments:cmns});

    })
})

router.post('/',(req,res)=>{

    console.log('post logged');
    console.log(req.body);
    Post.findOne({_id:req.body.id}).then(pst=>{

         const newComment=new Comment({
           user:req.user.id,
           body:req.body.body
       });
        pst.comments.push(newComment);
        pst.save().then(svPost=>{
           newComment.save().then(svComment=>{
               res.redirect(`/post/${pst.id}`);
           })
        });
    });

});


router.delete('/:id',(req,res)=>{
    Comment.remove({_id:req.params.id}).then(deleteItem=>{
        Post.findOneAndUpdate({comments:req.params.id},{$pull:{comments:req.params.id}},(err,data)=>{
            if(err) console.log(err);
            res.redirect('/admin/comments');

        });
    });
})


module.exports=router;