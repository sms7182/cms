const  mongoose=require('mongoose');
const  Schema=mongoose.Schema ;

const  PostSchema=new Schema({


    category:{
        type:Schema.Types.ObjectId,
        ref:'categories'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
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
    },
    filename:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now()
    },
    comments:[{
      type:Schema.Types.ObjectId,
      ref:'comments'
   }]

},{usePushEach:true});
module.exports=mongoose.model('posts',PostSchema);