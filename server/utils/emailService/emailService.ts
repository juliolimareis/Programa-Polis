import nodemailer from "nodemailer";

export function useEmailService() {
  async function onRecoveryEmail(user: { name: string, email: string }, token: string) {
    const title = `Recuperação de senha - ${process.env.SYSTEM_NAME ?? ""}`;
    const body = emailRecoveryTemplate
      .replace("{userName}", user.name)
      .replace("{url}", (process.env.EMAIL_ROUTE_NAME ?? "").replace("{token}", token))
      .replace("{system_name}", process.env.SYSTEM_NAME ?? "")
      .replace("{system_name}.", process.env.SYSTEM_NAME ?? "")
      .replace("{system_code_color}", process.env.EMAIL_CODE_COLOR ?? "");

    return main({
      from: `${process.env.SYSTEM_NAME} <${process.env.EMAIL_USER}>`,
      to: user.email,
      text: title ?? "Recuperação de senha",
      subject: title ?? "Recuperação de senha",
      html: body
    })
      .then(() => true)
      .catch(err => err);
    // console.error(Message.EMAIL_URL_WEB_RECOVERY_NOT_FOUND);
  }

  async function main(sendEmail: SendEmail) {
    const { from, to, subject, html, text } = sendEmail;
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // true for 465, false for other ports
      tls: {
        rejectUnauthorized: false,
        // minVersion: "TLSv1.2"
      },
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: from, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  return { onRecoveryEmail };

  // main().catch(console.error);
}

interface SendEmail {
	from: string, // sender address
	to: string, // list of receivers
	subject: string, // Subject line
	text: string, // plain text body
	html:string // html body
}