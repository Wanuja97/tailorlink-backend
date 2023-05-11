const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

class EmailService{
    constructor(user_email, user_first_name, user_last_name){
        this.email = user_email;
    }
    
    async sendWelcome(req,res){
        console.log(this.email);
        let config = {
            service: 'gmail', // your email domain
            auth: {
                user: process.env.NODEJS_GMAIL_APP_USER,   // your email address
                pass: process.env.NODEJS_GMAIL_APP_PASSWORD // your password
            }
        }
    
        let transporter = nodemailer.createTransport(config);
        
        let MailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'TailorLink',
                link: 'https://localhost:3000/'
            }
        });
        let response = {
            body: {
                name: this.user_first_name + ' ' + this.user_last_name,
                intro: 'Welcome to TailorLink! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with TailorLink, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Click here',
                        link: 'http://localhost:3000/'
                    }
                }
            }
        };
    
        let mail = MailGenerator.generate(response);

        let message = {
            from: process.env.NODEJS_GMAIL_APP_USER, // sender address
            to: this.email, // list of receivers
            subject: 'Welcome to TailorLink!', // Subject line
            html: mail, // html body
        };
        
        try {
            let info = await transporter.sendMail(message);
            return {
              msg: "Email sent",
              info: info.messageId,
              preview: nodemailer.getTestMessageUrl(info)
            }
          } catch (err) {
            throw new Error(err);
          }
          
    }
}

module.exports = EmailService;