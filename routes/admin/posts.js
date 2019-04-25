const  express=require('express');
const router=express.Router();
const Post=require('../../models/Post');
const {isEmpty}=require('../../helpers/upload-helpers');

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
});

router.post('/create',(req,res)=>{
    let filename='';
        if(!isEmpty(req.files)) {
            console.log('file is not empty');
            let file = req.files.file;
             filename = Date.now()+'-'+file.name;
             file.mv('./public/uploads/' + filename, (err) => {
                if (err) throw err;
                    });
                }

        else {
            console.log('file is empty');
        }
   let allowComments=false;
   if(req.body.allowComments){
       allowComments=true;
   }
    const  newPost=new Post({
       title:req.body.title,
       status:req.body.status,
       allowComments:allowComments,
       body:req.body.body,
        filename:filename
   });
   newPost.save().then(savedPost=>{
       console.log(savedPost);
       res.redirect('/admin/posts');
   }).catch(error=>{
       console.log('could not  save');
   });

});
router.get('/edit/:id',(req,res)=>{

    Post.findOne({_id:req.params.id}).then(pst=>{
        res.render('admin/posts/edit',{post:pst});
    })

});

router.put('/edit/:id',(req,res)=>{


    Post.findOne({_id:req.params.id}).then(pst=>{
       let  allowComments=false;
        if(req.body.allowComments){
            allowComments=true;
        }
        pst.title=req.body.title;
        pst.body=req.body.body;
        pst.status=req.body.status;
        pst.allowComments=allowComments;
        pst.save().then(updated=>{
            res.redirect('/admin/posts');
        });
    });
});

router.delete('/:id',(req,res)=>{

   Post.remove({_id:req.params.id}).then(result=>{
       res.redirect('/admin/posts');
   })

});

module.exports=router;