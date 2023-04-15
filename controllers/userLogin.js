const User = require("../models/user")

const verify = async (req, res) => {
    const verify_id = req.query.verify_id
    const verfyStatus = await User.findOneAndUpdate({_id:verify_id},{verified: true})

  res.send(verfyStatus)
}


module.exports = { verify }