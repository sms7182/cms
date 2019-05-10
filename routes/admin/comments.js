const  express=require('express');
const router=express.Router();
const Post=require('../../models/Post');
const Comment=require('../../models/Comment');


router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
});

router.get('/',(req,res)=>{
    Comment.find({}).then(cmns=>{
        res.render('admin/comments',{comments:cmns});

    })
})

router.post('/',(req,res)=>{

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





module.exports=router;