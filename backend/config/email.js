import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send OTP Email
export const sendOTPEmail = async (email, otp, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Acceptopia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset OTP - Acceptopia',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>You requested to reset your password for your Acceptopia account. Use the OTP below to proceed:</p>
              
              <div class="otp-box">
                <p style="margin: 0; color: #666;">Your OTP Code</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; color: #999; font-size: 14px;">Valid for ${process.env.OTP_EXPIRE_MINUTES || 10} minutes</p>
              </div>

              <div class="warning">
                ⚠️ <strong>Security Notice:</strong> Never share this OTP with anyone. Acceptopia staff will never ask for your OTP.
              </div>

              <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The Acceptopia Team</strong>
              </p>
            </div>
            <div class="footer">
              <p>This is an automated email. Please do not reply.</p>
              <p>&copy; ${new Date().getFullYear()} Acceptopia. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP Email sent to ${email}`);
    return true;
  } catch (error) {
    console.error(`❌ Email Error: ${error.message}`);
    throw new Error('Failed to send OTP email. Please try again later.');
  }
};

// Send Welcome Email (Optional - bonus feature)
export const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Acceptopia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Acceptopia! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Acceptopia!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for joining Acceptopia! We're excited to have you on board.</p>
              <p>Your account has been successfully created and you can now access all features of our platform.</p>
              <p style="text-align: center;">
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" class="button">Get Started</a>
              </p>
              <p>If you have any questions, feel free to reach out to our support team.</p>
              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The Acceptopia Team</strong>
              </p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Acceptopia. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome Email sent to ${email}`);
  } catch (error) {
    console.error(`❌ Welcome Email Error: ${error.message}`);
    // Don't throw error here - welcome email is optional
  }
};

