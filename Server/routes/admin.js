const mongoose=require('mongoose');
const express=require("express");
const jwt=require('jsonwebtoken');
const {User, Admin, Course} = require("../db/index");
const {authenticateJwt, SECRET}=require("../middleware/auth");


const router= express.Router();



router.post("/signup", async (req,res) => {
    const {username, password}= req.body;
    const admin= await Admin.findOne({username, password});
    if(admin){
        res.sendStatus(403).json({msg :"Admin already exists"});
    }
    const obj= {username : username, password : password};
    const newAdmin=new Admin(obj);
    newAdmin.save();

    const token=jwt.sign({username, role: 'admin'}, SECRET , {expiresIn : '5h'});
    res.json({msg : "admin created successfully", token});
})

router.post("/login", async (req,res)=> {
    const {username, password} = req.body;
    const admin= await Admin.findOne({username, password});
    if(admin){
        const token= jwt.sign({username, role: 'admin'}, SECRET, {expiresIn : '5h'});
        res.json({msg : "Admin loggedin successfully", token});
    }else{
        res.status(403).json({msg : "invalid username or password"});
    }
})

router.get("/me", authenticateJwt, async (req,res)=> {
    const admin=await Admin.findOne({username : req.user.username});
    if(!admin){
        res.status(403).json({msg : "admin doesn't exist"});
        return;
    }else{
        res.json({username : admin.username});
    }
})

router.post("/courses", authenticateJwt, async (req,res) => {
    const course= new Course(req.body);
    await course.save();
    res.json({msg : "Courses created successfully" , courseId : course.id});
})


router.put("/courses/:courseId", authenticateJwt, async (req,res) => {
    const course= await Course.findByIdAndUpdate(req.params.courseId, req.body, {new : true});
    if(course) {
        res.json({msg : "course updated successfully"});
    }else{
        res.status(403).json({msg : "course not found"});
    }
})

router.get("/courses", authenticateJwt, async (req,res) => {
    const courses= await Course.find({});
    res.json({courses});
})

router.get("/courses/:courseId", authenticateJwt, async (req,res) => {
    const courseId=req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({course});
})


module.exports=router;