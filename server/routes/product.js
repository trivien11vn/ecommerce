const router = require("express").Router();
const ctrls = require('../controllers/product')
const uploader = require('../config/cloudinary.config')
const {verifyAccessToken, isAdmin} = require('../middlewares/verify_token')

router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct)
router.get('/', ctrls.getAllProduct)
router.put('/', [verifyAccessToken], ctrls.ratings)

router.put('/upload_image/:pid', [verifyAccessToken, isAdmin],uploader.array('images', 10), ctrls.uploadImage)
router.get('/:pid', ctrls.getProduct)
router.put('/:pid', [verifyAccessToken, isAdmin], ctrls.updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], ctrls.deleteProduct)
module.exports = router
