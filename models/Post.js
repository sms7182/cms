const  mongoose=require('mongoose');
const  Schema=mongoose.Schema ;

const  PostSchema=new Schema({
    user:{

    },
    title:{
        type:String,
        required:true,
    },
    status:{
       type:String,
       default:'public'
    },
    allowComments:{
        type:Boolean,

    },
    body:{
        type:String
    }
});
module.exports=mongoose.model('posts',PostSchema);