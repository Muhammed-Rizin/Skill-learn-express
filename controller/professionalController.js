const Professional = require('../model/professionalModel')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ObjectId } = require("mongodb")

exports.professionalLogin = async (req,res) => {
    try {
        console.log(req.body.email)
        const professionalData = await Professional.findOne({email : req.body.email})
        if(!professionalData){
            res.status(400).json({
                message : "User not found"
            })
        }

        const password = await bcrypt.compare(req.body.password, professionalData.password)
        if(!password){
            res.status(404).json({
                message : 'Password Is incorrect'
            })
        }
        const token = jwt.sign({_id : professionalData._id},'secret')
        await Professional.findByIdAndUpdate(professionalData._id, {token : token})
        const updatedData = await Professional.findById(professionalData._id)
        res.json(updatedData)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'professional login failed'})
    }
}

exports.professionalRegister = async (req,res) => {
    try {
        const alreadydata = await Professional.findOne({email : req.body.email})
        const alreadyUser = await User.findOne({email : req.body.email})
        if(alreadydata || alreadyUser){
            res.status(400).json({
                message : "Email Already Registered"
            })
        }
    
        const { email, password, firstName, lastName, education} = req.body 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const professionalData = new Professional({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName,
            education : education
        })

        const result = await professionalData.save()

        const {_id } = await result.toJSON()
        const token = jwt.sign({_id : _id},"secret")
        await Professional.findByIdAndUpdate(result._id , {token : token})

        const data = await Professional.findById(result._id)
        res.json(data)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'professional register failed'})
    }    
}

exports.isBlocked = async (req,res) => {
    try {
        let { userid } = req.body
        userid = new ObjectId(userid)
        const data = await Professional.findById(userid)
        res.status(200).json(data.blocked)
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}

exports.isApproved = async (req,res) => {
    try {
        const id = req.body.userid
        const data = await Professional.findById(id)
        res.status(200).json( data.approved)
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}

exports.checkEmail = async (req, res) => {
    try {
        const alreadyData = await Professional.findOne({email :email})

        if(alreadyData){
            res.status(400).json({message : 'Email already registered'})
        }
    
        res.status(200).json({message : 'success'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.userDataByEmail = async (req, res) => {
    try {
        const email = req.query.email   
        const data = await User.findOne({email : email})
        console.log(email, data)
        if(!data) {
            res.status(404).json({message : 'Not valid'})
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}

exports.newPassword = async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const professionalData = await Professional.findOneAndUpdate({token : token}, {$set : {password : hashedPassword}})

        const payload = { _id: professionalData._id };
        const jwttoken = this.jwt.sign(payload);
        const data = await this.professionalModel.findOneAndUpdate({_id : professionalData._id},{$set : {token : jwttoken}})

        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}

exports.professionalData = async (req, res) => {
    try {
        const data = await Professional.findById(req.body.userid)
        res.status(200).json(data)
    } catch (error) {
        console.log('odsfas', error.message)
        res.status(500).json({status : 'error', message : 'internal server error'})
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const data = req.body.data
        await Professional.findByIdAndUpdate(data._id, {$set : data})
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}


exports.setNotification = async (req,res) => {
    try {
        const token = req.body.token
        const id = req.body.userid
        await Professional.findByIdAndUpdate(id, {$set : {notificationToken : token}})
        res.status(200).json({message : 'succcess'})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}