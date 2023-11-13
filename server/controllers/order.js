const Order = require('../models/order')
const User = require('../models/user')
const asyncHandler = require('express-async-handler')

const createNewOrder = asyncHandler(async(req, res)=>{
    const {_id} = req.user
    const {coupon} = req.body
    const userCart = await User.findById(_id).select('cart').populate('cart.product', 'title price')
    const products = userCart?.map(e1 =>({
        product: e1.product._id,
        count: e1.quantity,
        color: e1.color
    }))
    const totalPrice = userCart.reduce((sum, e1) => e1.product.price * e1.quantity + sum, 0)
    if(coupon){
        totalPrice = totalPrice * (1-)
    }
    return res.status(200).json({
        success: userCart ? true : false,
        rs: userCart ? userCart : "Something went wrong"
    })
})

module.exports = {
    createNewOrder
}