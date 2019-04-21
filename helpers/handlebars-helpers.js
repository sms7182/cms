module.exports={
    select:function(selected,options)
    {
        console.log(options.fn(this).replace(new RegExp(' value=\"'+ selected +'\"')));
       return options.fn(this).replace(new RegExp(' value=\"'+ selected +'\"'),'$&selected="selected"');
    }
}