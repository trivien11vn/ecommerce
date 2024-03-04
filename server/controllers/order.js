const Order = require('../models/order')
const User = require('../models/user')
const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')

const createNewOrder = asyncHandler(async(req, res)=>{
    const {_id} = req.user
    const {coupon} = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.cart?.map(e1 =>({
        product: e1.product._id,
        count: e1.quantity,
        color: e1.color
    }))
    let total = userCart?.cart?.reduce((sum, e1) => e1.product.price * e1.quantity + sum, 0)

    const createData = {products, total, orderBy: _id}
    if(coupon){
        const selectedCoupon = await Coupon.findById(coupon)
        total = Math.round(total * (1 - +selectedCoupon?.discount/100) / 1000) * 1000 || total
        createData.total = total
        createData.coupon = coupon
    }
    const response = await Order.create(createData)
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