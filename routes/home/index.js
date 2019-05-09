const  express=require('express');

const router=express.Router();
const  Post=require('../../models/Post');
const  Category=require('../../models/Category');
const  User=require('../../models/User');
const  bcrypt=require('bcryptjs');
const  passport=require('passport');
const  LocalStrategy=require('passport-local').Strategy;

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



//APP Login

passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
    console.log(email);
    User.findOne({email:email}).then(usr=>{
        console.log('find user');
        if(!usr){
            return done(null,false,{message:'No user find'});
        }
        bcrypt.compare(password,usr.password,(err,matched)=>{
            if(err) return err;
            if(matched){
                console.log('correct');
                return done(null,usr);
            }
            else{
                return done(null,false,{message:'Incorrect password.'});
            }
        });
    });

}));


passport.serializeUser(function (usr,done) {
    done(null,usr.id);
});
passport.deserializeUser(function (id,done) {
    User.findById(id,function (err,usr) {
        done(err,usr);
    })
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/admin',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res, next);

});


router.post('/register',(req,res)=>{

    let errors=[];
    if(!req.body.firstName){
        errors.push({message: 'please add a firstName'});
    }
    if(!req.body.lastName){
        errors.push({message: 'please add a lastName'});
    }
    if(!req.body.email){
        errors.push({message: 'please add an email'});
    }
    if(req.body.password!==req.body.passwordConfirm){
        errors.push({message:'Password fields dont match'});
    }
    if(errors.length>0){
        res.render('home/register',{
            errors:errors
        })
    }


else{
        User.findOne({email: req.body.email}).then(usr=>{
            if(!usr){

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
                            req.flash('success_message','You are now  registered,please login ');
                            res.redirect('/login/');
                        })

                    });
                });

            }
            else{
                req.flash('error_message','That  email exist please login');
                res.redirect('/login');
            }
        });
}





});

module.exports=router;