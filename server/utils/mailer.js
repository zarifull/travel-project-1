import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const data = await resend.emails.send({
      from: 'Batken Travels <onboarding@resend.dev>', 
      to: to, 
      subject: 'do not share! ' + subject,
      text: text,
    });
    console.log("✅ Email sent via Resend:", data);
    return data;
  } catch (error) {
    console.error("❌ Resend error:", error.message);
    throw error;
  }
};

export default resend;