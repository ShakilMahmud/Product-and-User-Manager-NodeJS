
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const nodemailer = require("nodemailer");

const sendVerificationMail = async (name, email, userId) =>{
    try{
        nodemailer.createTransport({
            //https://www.youtube.com/watch?v=IGbOi92_zFk
        })

    }catch(err){
        console.log(err)
    }

}

const registration = async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.phone || !req.body.password ){
        return res.send('Data Missing')
    }
    const emailStatus = await User.findOne({email:req.body.email})
    if(emailStatus){
        res.status(404);
        return res.send('Email already exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassWord = await bcrypt.hash(req.body.password, salt)

    const createUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassWord,
        role: req.body.role
    })

    try{
       const userData = await createUser.save()

        if(userData){

          sendVerificationMail(req.body.name, req.body.email, userData._id)

            res.status(201).json({
                "success": true,
                "message": "Registration Successful!!",
                data:{
                    name:createUser.name
                }
            })
        }
        else{
            res.status(404).json({
                "success": true,
                "message": "Registration Failed!!",
            })
        }
        
    }
    catch(err){
        res.status(400);
        throw new Error(err.message);
    }
}
const login =  async (req, res) => {
    if(!req.body.email || !req.body.password){
        res.status(400);
        throw new Error("Email and Password both are required!")
    }
    const user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(404);
        throw new Error("User is not registered!")
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match){
        res.status(401);
        throw new Error("Email or Password not matched!")
    }
    const verifiedStatus = await User.findOne({email:req.body.email})
    if(!verifiedStatus.verified){
        return res.send("Verify Your Email First")
    }
    const authToken = jwt.sign({
                                id:user._id,
                                name:user.name,
                                email:user.email,
                                role:user.role
                            },process.env.SECRET,{expiresIn: "1h"})
       if(!authToken){
            res.status(500);
            throw new Error("Something went wrong!")
       }
     res.status(201).header('auth-token', authToken).send(authToken)

}


const currentUser =  (req, res) => {
    res.status(200).json({
        success: true,
        data:{
            user:req.user
        }
    })
}



module.exports = { registration, login, currentUser }