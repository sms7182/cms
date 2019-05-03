const  express=require('express');
const router=express.Router();
const Category=require('../../models/Category');
const {isEmpty}=require('../../helpers/upload-helpers');


router.all('/*',(req,res,next)=>{
    req.app.locals.layout='admin';
    next();
});

router.get('/',(req,res)=>{
    Category.find({}).then(categories=>{
        res.render('admin/categories/index',{categories:categories});
    });

});

router.post('/create',(req,res)=>{

   let errors=[];
   if(req.body.name){
       console.log(req.body.name);
       const NewCategory=Category({
           name:req.body.name,
           
       });
       NewCategory.save().then(saved=>{
           res.render('admin/categories/index');
       });

   }
});

module.exports=router;