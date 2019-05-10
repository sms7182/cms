const  express=require('express');
const faker=require('faker');
const router=express.Router();
const User=require('../../models/Post');
const {userAuthenticated}=require('../../helpers/authentication');

router.all('/*',(req,res,next)=>{
 req.app.locals.layout='admin';
 next();
});

router.get('/',(req,res)=>{

    res.render('admin/index');
});


router.get('/dashboard',(req,res)=>{

    res.render('admin/dashboard');
});

router.post('/generate-fake-posts',(req,res)=>{

    for(let i=0;i<req.body.amount;i++){
        let post=new User();
        post.title=faker.name.title();
        post.status='private';
        post.allowComments=faker.random.boolean();
        post.body=faker.lorem.sentence();

        post.save(function (err) {
            if(err){
                throw err;
            }
        });

    }
    res.redirect('/admin/posts');
});

module.exports=router;