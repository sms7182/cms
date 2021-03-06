const  express=require('express');
const  app=express();
const  path=require('path');
const mongoose=require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const Upload=require('express-fileupload');
const session=require('express-session');
const flash=require('connect-flash');
const {mongoDbUrl}=require('./config/database');
const passport=require('passport');


mongoose.Promise=global.Promise;


mongoose.connect(mongoDbUrl).then((db)=>{
   console.log('mongo connected ')
}).catch(err=>console.log(err));


app.use(express.static(path.join(__dirname, 'public')));

const {select,generateDate}=require('./helpers/handlebars-helpers');

app.engine('handlebars', exphbs({defaultLayout: 'home',helpers:{select:select,generateDate:generateDate}}));
app.set('view engine', 'handlebars');

//mildeware upload
app.use(Upload());

//body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//override method
app.use(methodOverride('_method'))

app.use(session({
   secret:'fatalerror',
   resave:true,
   saveUninitialized:true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
   res.locals.user=req.user||null;
   res.locals.success_message=req.flash('success_message');
   res.locals.error_message=req.flash('error_message');
   res.locals.form_errors=req.flash('form_errors');
   res.locals.error=req.flash('error');
   next();
});

//load routes
const  home=require('./routes/home/index');
const  admin=require('./routes/admin/index');
const  posts=require('./routes/admin/posts');
const categories=require('./routes/admin/categories');
const comments=require('./routes/admin/comments');

//use routes
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);
app.use('/admin/categories',categories);
app.use('/admin/comments',comments);


app.listen(7070,()=>{
   console.log('listening to 7070');
});
