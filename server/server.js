const express=require('express');
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser');
const cors=require('cors');
const authRouter=require('./routes/auth/auth-routes')


mongoose.connect(`mongodb+srv://ullaskiranm:kiran123@cluster0.fbavnhp.mongodb.net/`).
then(()=>console.log("connected")).catch((err)=>console.log(err))

const app=express();
const PORT=process.env.PORT || 5000

app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:["Content-Type","Authorization","Cache-Control","Expire","Pragma"],
    credentials:true
}))

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter)

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))