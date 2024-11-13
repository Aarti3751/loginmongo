const { json } = require('body-parser')
const express=require('express')//instances created
const app= express()
const mongoose=require('mongoose')
const cors = require('cors');



require('dotenv').config()


const port=process.env.port


mongoose.connect('mongodb://localhost:27017/sun')
.then(() => { console.log("database has been connected") })
.catch((error) => { console.log(error) })



const newSchema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})


const User = mongoose.model('User',newSchema)
app.use(cors())
app.use(express.json())




//route
app.get('/',async(req,res)=>{

    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message:error})
    }
})


app.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
    try {
        const user = User({ name, email, password })
        await user.save()

        res.status(200).json({message:" register succesfully"})
        
    } catch (error) {
        res.status(400).json({message:error})
        
    }
})


app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    // const {id}=req.params
    try {
        const user =await User.findOne({email})

        if(password===user.password){
            return res.status(200).json({message:"login succesfully"})
        }
        else{
            return res.status(400).json({message:"wrong crendntials"})
        }

        
    } catch (error) {
        res.status(400),json({message:error})
    }
})


// app.delete('/delete/:id',(req,res)=>{
//     try {
//         res.status(200).json({message:"this is delete route"})
//     } catch (error) {
//         res.status(400).json({message:error})
//     }
// })

app.listen(port,(req,res)=>{
    console.log(`we are running at ${port} `)
})