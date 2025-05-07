const express=require('express');
const router=express.Router();
const controller=require('./controller');
const { routes } = require('./app');

router.get('/getusers',controller.getUsers);
router.post('/registerUser',controller.registerUsers);
router.post('/login',controller.loginUsers);
router.get('/App',controller.verifyUser);
router.post('/updateUser',controller.updateUser);


module.exports=router;