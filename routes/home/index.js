const  express=require('express');

const router=express.Router();
const  Post=require('../../models/Post');
const  Category=require('../../models/Category');
const  User=require('../../models/User');
const  bcrypt=require('bcryptjs');

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

router.post('/register',(req,res)=>{

    const newUser=new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        email:req.body.email


});
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.password,salt,(err,hash)=>{
            console.log(hash);
            newUser.password=hash;
            newUser.save().then(saveUser=>{
                res.redirect('/admin/');
            })

        });
    });


});

module.exports=router;