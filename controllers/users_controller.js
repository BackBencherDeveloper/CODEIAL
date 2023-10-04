const User=require('../models/users');
const saltRounds = 10;
const plaintextPassword = req.body.password;

module.exports.profile=async function(req,res){
    if(req.cookies.user_id){
        const user=await User.findById(req.cookies.user_id);
        if(user){
            console.log('User Found');
            return res.render('users',{
                title: 'User profile',
                user:user
            })
        }else{
            console.log('User not found')
            return res.redirect('sign-in');
        }
    }else{
        console.log('no cookies')
        return res.redirect('sign-in');
    }
};
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"SIGN-UP"
    })
};
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title: "SIGN-IN"
    })
};
module.exports.create=async function(req,res){
    //todo later
    if(req.body.password!=req.body.confirm_password){
       return res.redirect('back');
    }
    try{
        const user=await User.findOne({email:req.body.email});
        if(!user){
            console.log("User not found in database");
            await User.create(req.body);
            console.log("New User created");
            return res.redirect('/users/sign-in');
        }else{
            console.log(`User already Exist`);
            console.log('Moving to sign-in page');
            return res.redirect('/users/sign-in');
        }
    }catch(err){
        console.log(`Error in creating a user: ${err}`);
        res.redirect('back');
    }
}
module.exports.createSession=async function(req,res){
    try{
        const user=await User.findOne({email:req.body.email});
        if(user){
            console.log('User found');
            console.log('Checking password');
            if(user.password==req.body.password){
                console.log('Password match');
                res.cookie('user_id',user.id);
                return res.redirect('profile');
            }else{
                console.log('Incorrect password');
                return res.redirect('sign-in')
            }
        }else{
            console.log('User not found');
            return res.redirect('sign-up')
        }
    }catch(err){
        console.log(`Error in finding the User: ${err}`);
        return res.redirect('sign-in');
    }
};
module.exports.deleteSession=function(req,res){
    res.clearCookie('user_id');
    const redirectScript='<script>window.location.replace("sign-in");</script>';
    return res.send(redirectScript);
}