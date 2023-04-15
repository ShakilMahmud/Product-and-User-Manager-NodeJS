const router = require("express").Router()
const { verify } = require("../controllers/verifyController")
// const validateToken = require("../middleware/validateTokenHandler")


router.route('/').get(verify)


module.exports = router