const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const adminRouter=require("./routes/admin");
const userRouter=require("./routes/user");

const app=express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use('/images', express.static('images'));
app.get("/", (req, res) => res.json({msg: "hello world after the class"}));
//give the mongo url for connection


mongoose.connect('mongodb+srv://prasanth:GXTpOnJRcn8lFNdf@cluster0.cketig0.mongodb.net/courses');


app.listen(3000, () => console.log('Server running on port 3000'));