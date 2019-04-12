const  express=require('express');
const  app=express();
const  path=require('path');
const exphbs = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public')));



app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{

   res.render('home/index');
});


app.get('/about',(req,res)=>{

   res.render('home/about');
})

app.get('/register',(req,res)=>{

   res.render('home/register');
})


app.get('/login',(req,res)=>{

   res.render('home/login');
})


app.listen(7070,()=>{
   console.log('listening to 7070');
});
