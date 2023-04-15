const router = require("express").Router()
const { registration, login, currentUser, resetPassword } = require("../controllers/userController")
// const validateToken = require("../middleware/validateTokenHandler")


router.route('/registration').post(registration)
router.route('/login').post(login)
router.route('/user_status/').post(currentUser)
router.route('/reset_Password/').post(resetPassword)


module.exports = router