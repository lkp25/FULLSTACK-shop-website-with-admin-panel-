const sendEmail = require('../util/nodemailer')

module.exports = function (email){
    return sendEmail(
        email,
        "welcome to store",
        "",
        `Hello dear  user you created
        this account for email address:
        <p>${email}</p>`
    )
}