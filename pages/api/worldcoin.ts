import nodemailer from 'nodemailer';
import { Request, Response } from 'express';


export default async function formHandler(req: Request, res: Response) {
  const { getKshs, email, mpesaName, phonenumber, coinNumber } = req.body;
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
      html: `${mpesaName} selling ${coinNumber} worldcoins for Kes ${getKshs}. phone number ${phonenumber}`,
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
