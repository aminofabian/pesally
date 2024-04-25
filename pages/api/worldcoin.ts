import nodemailer from 'nodemailer';

export default async function formHandler(req, res) {
  const { selling, getKshs, email, mpesaName, phonenumber } = req.body;
  const user = process.env.user;
  const pass = process.env.pass;

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: user,
      pass: pass,
    },
    secure: true,
  });

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log("Server is ready to take our messages");

    // Mail data
    const mailData = {
      from: {
        name: mpesaName,
        address: email,
      },
      replyTo: email,
      to: `zelisline@gmail.com, ${email}`,
      subject: `Form message`,
      text: 'Worldcoin transaction',
      html: `${mpesaName} selling ${selling} worldcoins for Kes ${getKshs}. phone number ${phonenumber}`,
    };

    // Send mail
    const info = await transporter.sendMail(mailData);
    console.log(info);

    // Send response
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: 'Error sending message. Your message was not sent' });
  }
}
