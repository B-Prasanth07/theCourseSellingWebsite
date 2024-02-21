const express=require('express');
const {authenticateJwt, SECRET} = require("../middleware/auth");
const {User, Admin, Course} = require("../db/index");
const jwt = require('jsonwebtoken');

const router=express.Router();


router.post("/signup", async(req,res) => {
    const {username,password} = req.body;
    const user=await User.findOne({username, password});
    if(user) {
        res.status(403).json({msg : "user already exists"});
    }else{
        const obj= {username, password};
        const newUser= new User(obj);
        newUser.save();
        const token=jwt.sign({username, role: 'admin'}, SECRET , {expiresIn : '5h'});
        res.json({msg : "user is created successfully", token});
    }
})

router.post('/login', async(req,res) => {
    const {username, password} =req.body;
    const user= await User.findOne({username, password});
    if(user){
         const token= jwt.sign({username, role :'user'}, SECRET, {expiresIn : '5h'});
         res.json({msg : "user logged in successfully", token});
    }else{
        res.status(403).json({msg : "invalid username or password"});
    }
})

router.get('/courses', authenticateJwt, async(req,res) => {
    const courses= await Course.find({published : true});
    res.json({courses});
})

router.post('/courses/:courseId', authenticateJwt, async(req,res)=> {
    const course= await Course.findById(req.params.courseId);
    if(course){
        const user= await User.findOne({username: req.user.username});
        if(user){
            user.purchasedCourses.push(course);
            await user.save();
            res.json({msg : "course purchased successfully"});
        }else{
            res.status(403).json({msg: "user not found"});
        }
    }else{
        res.status(403).json({msg : "course not found"});
    }
})

router.get('/purchasedCourses', authenticateJwt, async(req,res) => {
    const user= await User.findOne({username: req.user.username}).populate('purchasedCourses');
    if(user){
        res.json({purchasedCourses : user.purchasedCourses || []});
    }else{
        res.status(403).json({msg : "user not found"});
    }
})
router.get("/me", authenticateJwt, async (req,res)=> {
    const user=await User.findOne({username : req.user.username});
    if(!user){
        res.status(403).json({msg : "user doesn't exist"});
        return;
    }else{
        res.json({username : user.username});
    }
})

module.exports=router;