const User = require('../models/user')
const asyncHandler = require("express-async-handler")
const {generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require('../ultils/sendMail')
const crypto = require('crypto')

const register = asyncHandler(async(req, res)=>{
    const {email, password, firstName, lastName} = req.body
    if(!email || !password || !firstName || !lastName){
        return res.status(400).json({
            success: false,
            mes: "Missing input"
        })}
    
    const user = await User.findOne({email})
    if(user){
        throw new Error("User has existed already")
    }
    else{
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? "Register is successful" : "Something went wrong"
        })
    }
})

//Refresh_token => de cap moi access token
//Access_token => de xac thuc + phan quyen nguoi dung
const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success: false,
            mes: "Missing input"
        })}
    
    const response = await User.findOne({email})
    if(response && await response.isCorrectPassword(password)){
        const {password, role, refresh_token, ...userData} = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const refreshToken = generateRefreshToken(response._id)

        //Luu refresh token vao database
        await User.findByIdAndUpdate(response._id, {refresh_token: refreshToken}, {new: true})

        //Luu refresh token vao cookie
        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    }
    else{
        throw new Error ("Login failed")
    }
})

const getOneUser = asyncHandler(async(req, res)=>{
    const {_id} = req.user
    const user = await User.findById({_id}).select('-refresh_token -password -role')
    return res.status(200).json({
        success: user? true : false,
        res: user? user : "User not found"
    })
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    if(!cookie && !cookie.refreshToken){
        throw new Error("No refresh token in cookie")
    }
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET) // Neu co loi se quang ngay tai day
    const response = await User.findOne({_id: rs._id, refresh_token: cookie.refreshToken})
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : "Refressh token not matched" 
    })
})

const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    if(!cookie || !cookie.refreshToken) {
        throw new Error("No refresh token in cookie")
    }
    //xoa refresh token trong database
    await User.findOneAndUpdate({refresh_token: cookie.refreshToken},{refresh_token: ''}, {new: true})

    //xoa refresh token trong cookies
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: "Logout is successful"
    })
})

// Client gui email -> Server kiem tra email co hop le khong? -> Gui email kem theo link (password change token)
// Client check email -> click link
// Client gui api kem theo token
// Check token co giong token ma server gui hay khong
// Thay doi mat khau

const forgotPassword = asyncHandler(async(req, res)=>{
    const {email} = req.query
    if(!email){
        throw new Error("Missing email")
    }
    else{
        const user = await User.findOne({email})
        if(!user){
            throw new Error("User not found")
        }
        const resetToken = user.createPasswordResetToken()
        await user.save()

        const html = `Xin vui long click vao link ben duoi de doi mat khau. Link nay se het han sau 15 phut.<a href= ${process.env.URL_SERVER}/api/user/reset_password/${resetToken}>Click here</a>`

        const data = {
            email: email,
            html
        }
        const rs = await sendMail(data)
        return res.status(200).json({
            success: true,
            rs
        })
        //
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const {password, token} = req.body
    if(!password || !token) {
        throw new Error("Missing input")
    }
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpires:{$gt: Date.now()}})
    if(!user){
        throw new Error("Invalid reset password token")
    }
    else{
        user.password = password
        user.passwordResetToken = undefined
        user.passwordChangedAt = Date.now()
        user.passwordResetExpires = undefined
        await user.save()
        return res.status(200).json({
            success: user ? true : false,
            mes: user ? "User updated successfully": "Something went wrong"
        })
    }

})

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refresh_token -password -role')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

// delete user
const deleteUser = asyncHandler(async (req, res) => {
    const {_id} = req.query
    if(!_id){
        throw new Error("Missing input")
    }
    else{
        const response = await User.findByIdAndDelete(_id)
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? `User with email ${response.email} deleted successfully` : "Something went wrong"
        })
    }
})

//update user
const updateUser = asyncHandler(async (req, res) => {
    const {_id} = req.user
    if(!_id || Object.keys(req.body).length === 0){
        throw new Error("Missing input")
    }
    else{
        const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-refresh_token -password -role')
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? `User with email ${response.email} updated successfully` : "Something went wrong"
        })
    }
})

//update user by admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
    const {userId} = req.params
    if(!userId || Object.keys(req.body).length === 0){
        throw new Error("Missing input")
    }
    else{
        const response = await User.findByIdAndUpdate(userId, req.body, {new: true}).select('-refresh_token -password -role')
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? `User with email ${response.email} updated successfully` : "Something went wrong"
        })
    }
})

//update address
const updateUserAddress = asyncHandler(async (req, res) => {
    const {_id} = req.user
    if(!req.body.address){
        throw new Error("Missing input")
    }
    else{
        const response = await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}}, {new: true})
        return res.status(200).json({
            success: response ? true : false,
            mes: response ? response : "Something went wrong"
        })
    }
})


// update cart
const updateCart = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const {pid, quantity, color} = req.body
    if(!pid || !quantity || !color) {
        throw new Error("Missing input")
    }
    else{
        const user = await User.findById(_id).select('cart')
        const alreadyProduct = user?.cart.find(e1 => e1.product.toString() === pid)
        if(alreadyProduct){
            if(alreadyProduct.color === color){
                const response = await User.updateOne({cart:{$elemMatch: alreadyProduct}}, {$set: {"cart.$.quantity": quantity}},{new:true})
                return res.status(200).json({
                    success: response ? true : false,
                    updatedCart: response ? response : "Something went wrong"
                })
            }
            else{
                const response = await User.findByIdAndUpdate(_id,{$push:{cart:{product:pid, quantity:quantity, color:color}}},{new: true})
                return res.status(200).json({
                    success: response ? true : false,
                    updatedCart: response ? response : "Something went wrong"
                })
            }
        }
        else{
            const response = await User.findByIdAndUpdate(_id,{$push:{cart:{product:pid, quantity:quantity, color:color}}},{new: true})
            return res.status(200).json({
                success: response ? true : false,
                updatedCart: response ? response : "Something went wrong"
            })
        }
    }
})
module.exports = {
    register,
    login,
    getOneUser,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getAllUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart
}