import express from "express";
import { signup, login , getUser, logout , verifyEmail,updatePassword , resetPassword , deleteUser } from "../controller/auth.controller.js"; 

const router  = express.Router();

router.post('/login',login);
router.get('/getUser' , getUser);
router.post('/signup' , signup )
router.post('/logout' , logout);
router.post('/verifyEmail' , verifyEmail)
router.post('/updatePassword' , updatePassword)
router.post('/resetPassword/:token' , resetPassword);
router.post('/deleteUser',deleteUser )

export default router;