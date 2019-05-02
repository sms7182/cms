const  express=require('express');

const router=express.Router();
const  Post=require('../../models/Post');


router.all('/*',(req,res,next)=>{
    req.app.locals.layout='home';
    next();
});
router.get('/',(req,res)=>{

    Post.find({}).then(pst=>{
        res.render('home/index',{posts:pst});
    })

});


router.get('/about',(req,res)=>{

    res.render('home/about');
});

router.get('/register',(req,res)=>{

    res.render('home/register');
});

router.get('/post/:id',(req,res)=>{

    Post.findOne({_id:req.params.id}).then(post=>{
        res.render('home/post',{post:post});
    });

});


router.get('/login',(req,res)=>{

    res.render('home/login');
});

module.exports=router;