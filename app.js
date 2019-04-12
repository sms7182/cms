const  express=require('express');
const  app=express();
const  path=require('path');
const exphbs = require('express-handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{

   res.render('home/index');
})
app.listen(7070,()=>{
   console.log('listening to 7070');
});
