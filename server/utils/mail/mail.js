
const mailer = require('nodemailer')
console.log('mailer is: ', mailer)

require('dotenv').config()

module.exports = (to, token) => {

    const URL = process.env.PRODUCTION ? process.env.URL_PRODUCTION : process.env.URL_DEV

    // setup SMTP
    const smtpTrasport =  mailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: process.env.SMTP_PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
      })

      // send EMAIL

      const data = {
          from: process.env.SMTP_FROM,
          to: to,
          subject: 'Welcome to our cms node blog',
          html:`
            <!DOCTYPE html>
            <html>
              <body style="margin: 0; padding: 0;background-color: #000000;min-height:70vh;width:100%;">
                <p>Welcome to our cms blog app</p>
                <p>Kindly click the following link to verify your email address</p>
                <a href="${URL}/emailconfirm/${token}">Verify your email</a>
              </body>  
            </html>
          `
      }
      smtpTrasport.sendMail(data, function(err, response) {

        if (err) {
            console.log(err)
        }else {
            cb()
        }
      })

      // close Connection
      smtpTrasport.close()

  
}
