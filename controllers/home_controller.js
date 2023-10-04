module.exports.home=function(req,res){
    //  console.log('homeworking');
    return res.render('home',{
        title:"Home"
    })
}
// app.use('dashboard', userController);