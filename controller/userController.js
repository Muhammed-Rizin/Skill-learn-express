const User = require('../model/userModel')
const Professional = require('../model/professionalModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ObjectId } = require("mongodb")

const login = async (req,res) => {
    try{
        const userData = await User.findOne({email : req.body.email})
        if(!userData){
            return res.status(404).json({message : 'User not Found'})
        }

        if(userData.blocked === true){
            return res.status(400).json({ message: 'This email id is blocked' });
        }
        const password = await bcrypt.compare(req.body.password, userData.password)
        if(!password){
            return res.status(400).json({message : 'Password Is incorrect'})
        }
        const token = jwt.sign({_id : userData._id},'secret')
        await User.findByIdAndUpdate(userData._id, {token : token})
        const updatedData = await User.findById(userData._id)
        res.json(updatedData)
    }catch(error){
        res.status(500).json({status : 'error', message : 'User login failed'})
    }
}

const register = async (req,res) =>{
    try {
        const alreadydata = await User.findOne({email : req.body.email})
        const alreadyProfessional = await Professional.findOne({email : req.body.email})
        if(alreadydata || alreadyProfessional){
            return res.status(400).json({
                message : "Email Already Registered"
            })
        }
    
        const { email, password, firstName, lastName, education} = req.body 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        const userData = new User({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName,
            education : education
        })
    
        const result = await userData.save()
        const {_id } = await result.toJSON()
    
        const token = jwt.sign({_id : _id},"secret")
        await User.findByIdAndUpdate(result._id , {token : token})
        const data = await User.findById(result._id)
        res.json(data)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'User register failed'})
    }
}

const userData = async (req,res) => {
    try {
        let { userid } = req.body
        userid = new ObjectId(userid)
        const userData = await User.findById(userid)
        return res.status(200).json(userData)
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}

const userDatabyEmail = async (req,res) => {
    try {
        const { email } = req.query
        const userData = await Professional.findOne({email : email})
        return res.status(200).json(userData)
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}

module.exports = {
    login,
    register,
    userData,
    userDatabyEmail
}