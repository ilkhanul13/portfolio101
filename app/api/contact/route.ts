import { NextRequest, NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // 1. Validasi input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // 2. Konfigurasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Email Gmail Anda
        pass: process.env.GMAIL_APP_PASSWORD, // App Password
      },
    });

    // 3. Kirim email ke Anda
    await transporter.sendMail({
      from: `"Web Portfolio" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Dikirim ke diri Anda sendiri
      replyTo: email, // Balasan Anda akan otomatis ke klien
      subject: `[From web Portfolio] ${subject}`,
      text: `
New message from your From Portfolio Web form.

From: ${name} <${email}>
Subject: ${subject}

Message:
${message}

---
This message was sent from your website's contact form.
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #0ea5e9; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
    <h2 style="margin: 0;">New Message from Client</h2>
    <p style="margin: 5px 0 0 0;">From: ${name} &lt;${email}&gt;</p>
  </div>
  <div style="background: #f8fafc; padding: 25px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
    <div style="margin-bottom: 15px;">
      <strong style="color: #475569; display: block; margin-bottom: 5px;">Name:</strong>
      <div style="color: #1e293b; background: white; padding: 10px 15px; border-radius: 6px; border: 1px solid #cbd5e1;">${name}</div>
    </div>
    <div style="margin-bottom: 15px;">
      <strong style="color: #475569; display: block; margin-bottom: 5px;">Email:</strong>
      <div style="color: #1e293b; background: white; padding: 10px 15px; border-radius: 6px; border: 1px solid #cbd5e1;">${email}</div>
    </div>
    <div style="margin-bottom: 15px;">
      <strong style="color: #475569; display: block; margin-bottom: 5px;">Subject:</strong>
      <div style="color: #1e293b; background: white; padding: 10px 15px; border-radius: 6px; border: 1px solid #cbd5e1;">${subject}</div>
    </div>
    <div style="margin-bottom: 15px;">
      <strong style="color: #475569; display: block; margin-bottom: 5px;">Message:</strong>
      <div style="color: #1e293b; background: white; padding: 10px 15px; border-radius: 6px; border: 1px solid #cbd5e1; white-space: pre-wrap;">${message}</div>
    </div>
    <p><strong>To reply, simply click "Reply" in your email client.</strong> The reply will be sent to ${email}.</p>
  </div>
</div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    let errorMessage = 'Failed to send message. Please try again later.';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check your Gmail configuration.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}