import resend from "./mailer.js"; 

const sendOtp = async (email, otp) => {
  try {
    await resend.emails.send({
      from: 'Batken Travels <onboarding@resend.dev>', 
      to: email, 
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    });
    console.log(`✅ OTP sent to ${email}`);
  } catch (error) {
    console.error("❌ Failed to send OTP via Resend:", error.message);
    throw error;
  }
};

export default sendOtp;