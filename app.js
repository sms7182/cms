const  express=require('express');
const  app=express();
const  path=require('path');
const mongoose=require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const methodOverride=require('method-override');

mongoose.Promise=global.Promise;


mongoose.connect('mongodb://localhost:27017/cms').then((db)=>{
   console.log('mongo connected ')
}).catch(err=>console.log(err));


app.use(express.static(path.join(__dirname, 'public')));

const {select}=require('./helpers/handlebars-helpers');

app.engine('handlebars', exphbs({defaultLayout: 'home',helpers:{select:select}}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//override method
app.use(methodOverride('_method'))

//load routes
const  home=require('./routes/home/index');
const  admin=require('./routes/admin/index');
const  posts=require('./routes/admin/posts');

//use routes
app.use('/',home);
app.use('/admin',admin);
app.use('/admin/posts',posts);


app.listen(7070,()=>{
   console.log('listening to 7070');
});
