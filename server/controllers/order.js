const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createNewOrder = asyncHandler(async(req, res)=>{
    const {_id} = req.user
    const {products, total} = req.body

    const response = await Order.create({products, total, orderBy: _id})
    return res.status(200).json({
        success: response ? true : false,
        rs: response ? response : "Something went wrong",
        userCart
    })
})

const updateStatus = asyncHandler(async(req, res)=>{
    const {oid} = req.params
    const {status}  = req.body
    if(!status){
        throw new Error("Missing input")
    }
    const response = await Order.findByIdAndUpdate(oid, {status}, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})

const getUserOrder = asyncHandler(async(req, res)=>{
    const {_id} = req.user
    const response = await Order.find({orderBy: _id})
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})

const getOrdersByAdmin = asyncHandler(async(req, res)=>{
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})
module.exports = {
    createNewOrder,
    updateStatus,
    getUserOrder,
    getOrdersByAdmin
}