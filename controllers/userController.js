
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const nodemailer = require("nodemailer");


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

            const transporter =  nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: 'shakil-nodejs@outlook.com',
                    pass: '123!@#456'
                }
            });
            
              // send mail with defined transport object
              let info = await transporter.sendMail({
                from: 'shakil-nodejs@outlook.com', // sender address
                to: req.body.email, // list of receivers
                subject: "Email Verification", // Subject line
                text: "Click to Verify your account", // plain text body
                html: "<b>Hello "+req.body.name+" ,</b><br> Please click the link to verify your account.<br><a href='http://localhost:3000/verify?verify_id="+userData._id.toString()+"'>Verify</a><br>Thank You !", // html body
              });
            
            res.status(201).send("Registration Successful, Please Verify Your Mail!!")
        }
        else{
            res.status(404).json({
                "success": true,
                "message": "Registration Failed!!",
            })
        }
        
    }
    catch(err){
        res.status(400).send(err.message);
    }
}
const login =  async (req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).send("Email and Password both are required!")
    }
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(404).send("User is not registered!")
    }
    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match){
        return res.status(401).send("Email or Password not matched!")
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
    res.cookie('token', authToken, { httpOnly: true });
    res.cookie('user', user._id, { httpOnly: true });

    //  res.status(201).header('auth-token', authToken).send(authToken)
     res.redirect('/main-panel');

}
const resetPassword =  async (req, res) => {
    if(!req.body.email || !req.body.new_password || !req.body.confirm_password){
        res.status(400).send("Email and Password both are required!")
    }
    if(req.body.confirm_password !== req.body.new_password){
        res.status(400).send("Password did not matched!")
    }
    const user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(404).send("User is not registered!")
    }
    const salt = await bcrypt.genSalt(10)
    const newHashedPassWord = await bcrypt.hash(req.body.new_password, salt)

const resetPassword = User.findOneAndUpdate({email:req.body.email},newHashedPassWord )
       if(!resetPassword){
            res.status(500).send("Something went wrong!")
       }
     res.status(201).send('New Password Created')

}


const currentUser =  (req, res) => {
    res.status(200).json({
        success: true,
        data:{
            user:req.user
        }
    })
}



module.exports = { registration, login, currentUser, resetPassword }