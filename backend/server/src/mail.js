const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS,
    }
});

const makeEmail = (email, text, home) => `
    <div className="email" style="font-family: sans-serif; padding: 5px; background: #f6fafb; display: flex; flex-direction: column; align-items: center;">
        <h1 style="text-align: center; font-size: 35px; transform: skew(-8deg);"> 
            <a href="${home}" style="background: #002f60; color: white; padding: 8px 15px; text-decoration: none; text-transform: uppercase;">Ship Safe</a>
        </h1>
        <div style="max-width: 640px;">
            <table style="width: 100%; border-radius: 10px; background: white; padding: 50px; border-radius: 10px;">
                <tbody>
                    <tr>
                        <td>
                            <h2 style="font-size: 20px;">Hello <span style="color: #002f60">${email}</span>!</h2>
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">We have received a request to reset your ShipSafe password. You can do this through the button below. Please note that this link expires 1 hour from when this email was delivered, so be sure to reset your password immediately.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="text-align: center; line-height: 1.5; padding: 20px 0; margin-bottom: 10px"> 
                                <a href="${text}" style="background: #002f60; color: white; border-radius: 5px; text-decoration: none; width: 210px; display: inline-block; font-weight: bold; line-height: 2.5;">Reset Password</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">For your security, password must be a minimum of eight characters with at least one number and one letter.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="line-height: 5px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">If you didn't request this, please ignore this email. Your password will stay safe and won't be changed.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="line-height: 5px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <p style="font-size: 12px; line-height: 1.5;">Please do not reply to this email as it is not monitored for responses.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="line-height: 5px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <p style="font-size: 14px;">Thanks, <br /><b>Kunle Kodes!</b></p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
`;

exports.transport = transport;
exports.makeEmail = makeEmail;