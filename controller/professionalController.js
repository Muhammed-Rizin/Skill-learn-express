const Professional = require('../model/professionalModel')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ObjectId } = require("mongodb")

const professionalLogin = async (req,res) => {
    try {
        const professionalData = await Professional.findOne({email : req.body.email})
        if(!professionalData){
            return res.status(400).json({
                message : "User not found"
            })
        }

        const password = await bcrypt.compare(req.body.password, professionalData.password)
        if(!password){
            return res.status(404).json({
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

const professionalRegister = async (req,res) => {
    try {
        const alreadydata = await Professional.findOne({email : req.body.email})
        const alreadyUser = await User.findOne({email : req.body.email})
        if(alreadydata || alreadyUser){
            return res.status(400).json({
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

const isBlocked = async (req,res) => {
    try {
        let { userid } = req.body
        userid = new ObjectId(userid)
        const professionalData = await Professional.findById(userid)
        return res.status(200).json(professionalData._id)
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}

const isApproved = async (req,res) => {
    try {
        const id = req.body.userid
        const data = await Professional.findById(id)
        return res.status(200).json( data.approved)
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'error', message: 'internal server error'})
    }
}
module.exports = {
    professionalLogin,
    professionalRegister,
    isBlocked,
    isApproved
}