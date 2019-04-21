const  express=require('express');
const router=express.Router();
const Post=require('../../models/Post');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
});
router.get('/',(req,res)=>{

    Post.find({}).then(posts=>{
        res.render('admin/posts',{posts:posts});
    }).catch(err=>{
        console.log('could not to loading ..');
    });

});

router.get('/create',(req,res)=>{
    res.render('admin/posts/create');
})

router.post('/create',(req,res)=>{
   let allowComments=false;
   if(req.body.allowComments){
       allowComments=true;
   }
    const  newPost=new Post({
       title:req.body.title,
       status:req.body.status,
       allowComments:allowComments,
       body:req.body.body
   });
   newPost.save().then(savedPost=>{
       console.log(savedPost);
       res.redirect('/admin/posts');
   }).catch(error=>{
       console.log('could not  save');
   });

})
router.get('/edit/:id',(req,res)=>{

    Post.findOne({_id:req.params.id}).then(pst=>{
        res.render('admin/posts/edit',{post:pst});
    })

});

module.exports=router;