const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
console.log(`router loaded`);
router.get('/',homeController.home);
console.log('homecontrol loaded');
router.use('/users',require('./users'));
console.log('users loaded');
router.use('/home',require('./posts'));
console.log('postloaded');
// app.use('dashboard', userController);
console.log('postcontroller loader');
// router.use('/posts',require('./posts'))
module.exports=router;
