const router = require("express").Router();
const ctrls = require('../controllers/user')
const {verifyAccessToken, isAdmin} = require('../middlewares/verify_token')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/current', verifyAccessToken, ctrls.getOneUser)
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.get('/logout', ctrls.logout)
router.get('/forgotpassword', ctrls.forgotPassword)
router.put('/reset_password', ctrls.resetPassword)

router.get('/', [verifyAccessToken, isAdmin], ctrls.getAllUsers)
router.delete('/', [verifyAccessToken, isAdmin], ctrls.deleteUser)
router.put('/current', [verifyAccessToken], ctrls.updateUser)
router.put('/address/', [verifyAccessToken], ctrls.updateUserAddress)
router.put('/cart/', [verifyAccessToken], ctrls.updateCart)
router.put('/:userId', [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin)

module.exports = router

//CREATE : POST       (body) -- khong bi lo
//READ : GET          (query)-- bi lo
//UPDATE : PUT        (body)
//DELETE : DELETE     (query)