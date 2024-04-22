const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [{
        product: {type:mongoose.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number},
        color: {type: String},
        price: {type: Number},
        thumb: {type: String},
        title: {type: String},  
    }],
    status:{
        type: String,
        default: 'Processing',
        enum: ['Cancelled', 'Processing', 'Successful']
    },
    total:{
        type: Number
    },
    orderBy:{
        type: mongoose.Types.ObjectId, 
        ref: 'User'
    }
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);