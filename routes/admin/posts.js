const  express=require('express');
const router=express.Router();
const Post=require('../../models/Post');
const {isEmpty}=require('../../helpers/upload-helpers');
const Category=require('../../models/Category');
const {userAuthenticated}=require('../../helpers/authentication');
var fs = require('fs');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
});
router.get('/',(req,res)=>{

    Post.find({}).populate('category')
        .then(posts=>{
        res.render('admin/posts',{posts:posts});
    }).catch(err=>{
        console.log('could not to loading ..');
    });

});

router.get('/create',(req,res)=>{
    Category.find({}).then(categories=>{
        res.render('admin/posts/create',{categories:categories});
    });

});

router.post('/create',(req,res)=>{

    let errors=[];
    if(!req.body.title){
        errors.push({message:'please add a title'});
    }
    if(errors.length>0){
        res.render('admin/posts/create',{
            errors:errors
        });
    }
    else{




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
        user:req.user.id,
       status:req.body.status,
       allowComments:allowComments,
       body:req.body.body,
         filename:filename,
        category:req.body.category
   });
   newPost.save().then(savedPost=>{
       req.flash('success_message',`Post ${savedPost.title} was created successfully`);
       res.redirect('/admin/posts');
   }).catch(error=>{
       console.log('could not  save'+error);
   });

}});
router.get('/edit/:id',(req,res)=>{

    Post.findOne({_id:req.params.id}).then(pst=>{
        Category.find({}).then(categories=>{
            res.render('admin/posts/edit',{post:pst,categories:categories});
        });


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
        pst.category=req.body.category;
        pst.user=req.user.id;
        let filename='';
        if(!isEmpty(req.files)) {
            console.log('file is not empty');
            let file = req.files.file;
            filename = Date.now()+'-'+file.name;
            pst.filename=filename;
            file.mv('./public/uploads/' + filename, (err) => {
                if (err) throw err;
            });
        }

        else {
            console.log('file is empty');
        }

        pst.save().then(updated=>{
            req.flash('sucess_message','Post was successfully updated');
            res.redirect('/admin/posts');
        });
    });
});

router.delete('/:id',(req,res)=> {
    Post.findOne({_id: req.params.id}).populate('comments').then(post => {

            post.remove();
            req.flash('success_message', 'Post was successfullt deleted');
            res.redirect('/admin/posts');
        });
    ;
});


module.exports=router;