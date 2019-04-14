const  express=require('express');
const  app=express();
const  path=require('path');
const exphbs = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public')));



app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

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
