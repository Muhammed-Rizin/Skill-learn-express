const Admin = require('../model/adminModel')
const User = require('../model/userModel')
const Professional = require('../model/professionalModel')
const jwt = require('jsonwebtoken')
const { ObjectId } = require("mongodb")

const adminLogin = async (req,res) => {
    try{
        const { email, password } = req.body
        const adminData = await Admin.findOne({email : email})
        if(!adminData || adminData.password !== password){
            return res.status(404).json({
                message : 'Email or password is incorrect'
            })
        }

        const token = jwt.sign({_id : adminData._id}, 'secret')
        await Admin.findByIdAndUpdate(adminData._id, {token : token})
        const data = await Admin.findOne({email : email})
        res.json(data)

    }catch(error) {
        res.status(500).json({status : 'error', message : 'Admin login failed'})
    }
}

const getUsers = async (req,res) => {
    try {
        const userData = await User.find()
        res.json(userData)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'User fetching failed'})
    }
}

const getProfessionals = async (req,res) => {
    try {
        const professionalData = await Professional.find({approved : true})
        res.json(professionalData)
    } catch (error) {
        res.status(500).json({status : 'error', message : error.message})
    }
}

const getProfessionalReqeust = async (req,res) => {
    try {
        const professionalData = await Professional.find({approved : false})
        res.json(professionalData)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'Professional fetching failed'})
    }
}

const blockUser = async (req,res) => {
    try {
        const id = new ObjectId(req.body.id)
        await User.findByIdAndUpdate(id,{blocked : true})
        const userData = await User.find()
        res.json(userData)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'User blocking failed'})
    }
}

const unblockUser = async (req,res) => {
    try {
        const id = new ObjectId(req.body.id)
        await User.findByIdAndUpdate(id,{blocked : false})
        const userData = await User.find()
        res.json(userData)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'User unblocking failed'})
    }
}

const rejectProfessionals = async (req,res) => {
    try {
        const id = new ObjectId(req.body.id)
        await Professional.findByIdAndUpdate(id,{rejected : true})
        const professionalData = await Professional.find({approved : false})
        res.json(professionalData)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'Professional reject failed'})
    }
}

const approveProfessionals = async (req,res) => {
    try{
        const id = new ObjectId(req.body.id)
        await Professional.findByIdAndUpdate(id,{approved : true, rejected : false})
        const professionalData = await Professional.find({approved : false})
        res.json(professionalData)
    }catch(error){
        res.status(500).json({status : 'error', message : error.message})
    }
}


const blockProfessionals = async (req,res) => {
    try {
        const id = new ObjectId(req.body.id)
        await Professional.findByIdAndUpdate(id,{blocked : true})
        const professionalData = await Professional.find()
        res.json(professionalData)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'Professional blocking failed'})
    }
}
const unblockProfessionals = async (req,res) => {
    try {
        const id = new ObjectId(req.body.id)
        await Professional.findByIdAndUpdate(id,{blocked : false})
        const professionalData = await Professional.find()
        res.json(professionalData)
    } catch (error) {
        res.status(500).json({status : 'error', message : 'Professional unblocking failed'})
    }
}
module.exports = {
    adminLogin,
    getUsers,
    getProfessionals,
    getProfessionalReqeust,
    blockUser,
    unblockUser,
    rejectProfessionals,
    approveProfessionals,
    blockProfessionals,
    unblockProfessionals
}