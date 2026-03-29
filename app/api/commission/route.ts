import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, description } = await req.json();
  if (!name || !email || !description) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });
    await transporter.sendMail({
      from: `"Anya by Hiranya Website" <${process.env.GMAIL_USER}>`,
      to: "Aanyabyhiranya@gmail.com",
      subject: `New Commission Request from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Commission Description:</strong><br/>${description}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
