module.exports.posts=function(req,res){
    // console.log('post working')
    return res.render('posts',{
        title: "posts"
    });
}
