import nodemailer from "nodemailer";


/**
 * Account activation email
 */

export const accountActivationMail = async (to, data) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.AUTH_PASSWORD,
            }
        });
        // setup e-mail

        await transporter.sendMail({
            from: `Student library system <${process.env.MAIL_ID}>`,
            to: to,
            subject: 'Account Activation Mail',
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <style>
                        *{
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                            font-family: Arial, Helvetica, sans-serif;
                        }
                        img{
                            max-width: 100%;
                        }
                        ul{
                            list-style: none;
                            padding: 0;
                        }
                
                
                        .main-wraper{
                            width: 100%;
                            height: 100vh;
                            background-color: rgba(220, 220, 220, 0.636);
                            padding: 100px 0;
                        }
                        .wraper{
                            background-color: #fff;
                            width: 500px;
                            padding: 20px;
                            margin: auto;
                        }
                        .header img {
                            width: 160px;
                            padding-bottom: 10px;
                        }
                        .message-body {
                            padding: 10px 0 30px 0;
                        }
                        .message-body h3 {
                            font-size: 22px;
                            color: #000;
                            padding-bottom: 14px;
                        }
                        .message-body hr {
                            width: 20%;
                            margin-bottom: 12px;
                            border: 2px solid red;
                            border-radius: 5px;
                        }
                        .message-body a {
                            display: inline-block;
                            font-size: 15px;
                            text-decoration: none;
                            padding: 8px 20px;
                            background: blue;
                            text-align: center;
                            color: #fff;
                            margin-top: 22px;
                        }
                        .footer-socail ul {
                            display: flex;
                            justify-content: center;
                            gap: 10px;
                            padding-top: 30px;
                        }
                        .footer-socail ul img {
                            width: 28px;
                        }
                    </style>
                </head>
                <body>
                    <section class="main-wraper">
                        <div class="wraper">
                            <div class="header">
                                <img src="https://crocoblock.webdevelopermamun.me/class-9-10-profile-builder/wp-content/uploads/2023/10/web-developer-mamun-best-web-developer-in-bangladesh-website-solution-wordpress-developer.jpg" alt="">
                            </div>
                            <hr>
                            <div class="message-body">
                                <h3>Hey ${data.name}</h3>
                                <hr>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam accusamus qui, iste molestiae, expedita alias eligendi tempora laboriosam at, saepe animi necessitatibus itaque temporibus atque. Quas aperiam explicabo quaerat corporis?</p>
                
                                <a href="${data.link}">Verify Now</a>
                            </div>
                            <div class="footer">
                                <h4>Your Account Info </h4>
                                <span>Account Email : ${data.email}</span>
                
                                <div class="footer-socail">
                                    <ul>
                                        <li><a href="#"><img src="https://ci3.googleusercontent.com/proxy/U-VlCZ5im2-8xTE2xmcRiuBL3mt0CAVyFcpia3aIRPCVhPY4bAYpmXrOKOynXYgq5RiEgIm4NV-H79A4jI3XIzD_qlLZrJmNc2xZkISp=s0-d-e1-ft#https://pubs.payoneer.com/images/social_footer_facebook.png" alt=""></a></li>
                                        <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/EgodipUAOtoofucsS87Yo4c5zH5BWFZ0AjJ-Tign2_SivKnjgdsd4V0c_JZSnjU2pAdScYkIXqT3ZUo8I8GHQHt5M6RmmY4OEJYbI_w=s0-d-e1-ft#https://pubs.payoneer.com/images/social_footer_twitter.png" alt=""></a></li>
                                        <li><a href="#"><img src="https://ci5.googleusercontent.com/proxy/LgiR9RPxbPDdNvwu7fDo1NcSUZ_2VRG_y7iY1zaxa68tHYB7DWNscM4Tps4CV6VpGCbgG5OsS7E9KtrtSwfqwv95_1Auby0RbcpCMJyp=s0-d-e1-ft#https://pubs.payoneer.com/images/social_footer_linkedin.png" alt=""></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </body>
                </html>
            `

        });
        
    } catch (error) {
        console.log(error.message);
        
    }


}