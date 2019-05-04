const  express=require('express');

const router=express.Router();
const  Post=require('../../models/Post');
const  Category=require('../../models/Category');


router.all('/*',(req,res,next)=>{
    req.app.locals.layout='home';
    next();
});
router.get('/',(req,res)=>{

    Post.find({}).then(pst=>{

        Category.find({}).then(categories=>{
            res.render('home/index',{posts:pst,categories:categories});
        });

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
        Category.find({}).then(categories=>{
            res.render('home/index',{posts:pst,categories:categories});
        });
    });

});


router.get('/login',(req,res)=>{

    res.render('home/login');
});

module.exports=router;