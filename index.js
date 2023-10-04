const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const db=require('./config/mongoose');
const expressLayout=require('express-ejs-layouts');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'))
const port=80;//deployment port is always 80 at production level/
//use express router
app.use('/',require('./routes'));
//setup a view engine
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port number: ${port}`);
});