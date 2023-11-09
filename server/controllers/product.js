const Product = require('../models/product')
const asyncHandler = require("express-async-handler")
const slugify = require('slugify')

const createProduct = asyncHandler(async(req, res)=>{
    if(Object.keys(req.body).length === 0){
        throw new Error("Missing input")
    }
    if(req.body && req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : "Cannot create new product"
    })
})

const getProduct = asyncHandler(async(req, res)=>{
    const {pid} = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        product: product ? product : "Cannot find product"
    })
})


// Filter  - Sorting - Pagination
const getAllProduct = asyncHandler(async(req, res)=>{
    const queries = { ...req.query };

    // Loại bỏ các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach((el) => delete queries[el]);

    // Format lại các toán tử cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(
        /\b(gte|gt|lt|lte)\b/g,
        (matchedEl) => `$${matchedEl}`
    );

    // chuyen tu chuoi json sang object
    const formatedQueries = JSON.parse(queryString);

    // Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
    
    try {
        // Tìm kiếm sản phẩm theo điều kiện
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            const products = await Product.find(formatedQueries).sort(sortBy);
            const counts = await Product.countDocuments(formatedQueries);
            return res.status(200).json({
                success: true,
                products: products,
                counts: counts,
                });
        }
        else{
            const products = await Product.find(formatedQueries)
            const counts = await Product.countDocuments(formatedQueries);
            return res.status(200).json({
                success: true,
                products: products,
                counts: counts,
                });
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        return res.status(500).json({
        success: false,
        error: 'Cannot get products',
        });
    }
})

const updateProduct = asyncHandler(async(req, res)=>{
    const {pid} = req.params
    if(req.body && req.body.title){
        req.body.slug = slugify(req.body.title)
    }
    const product = await Product.findByIdAndUpdate(pid, req.body, {new: true})
    return res.status(200).json({
        success: product ? true : false,
        product: product ? product : "Cannot update product"
    })
})

const deleteProduct = asyncHandler(async(req, res)=>{
    const {pid} = req.params
    const product = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: product ? true : false,
        product: product ? product : "Cannot delete product"
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}