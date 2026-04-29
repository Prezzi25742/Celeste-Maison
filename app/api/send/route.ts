import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY); // Use an env variable for security!

export async function POST(request: Request) {
  try {
    // 1. Get all the details from your form
    const { email, name, address, date, time, massage, people} = await request.json();

    const data = await resend.emails.send({
      from: 'Maison Celeste <maisonceleste@outlook.ie>', // Use your real domain here
      to: [email], // Send to Guest
      bcc: ['your-personal-email@gmail.com'], // This sends a copy to YOU
      subject: 'Your Sanctuary Awaits - Maison Celeste',
      html: `
        <div style="font-family: serif; color: #5A4A42; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #FDFBF7;">
          <h1 style="color: #C4A052; font-weight: normal;">Thank you, ${name}</h1>
          <p>We have received your booking request for a home wellness ritual.</p>
          
          <div style="background: #FDFBF7; padding: 15px; border-left: 3px solid #C4A052; margin: 20px 0;">
            <p><strong>Proposed Date:</strong> ${date}</p>
            <p><strong>Time Preference:</strong> ${time}</p>
            <p><strong>Location:</strong> ${address}</p>
            <p><strong>Selected Ritual:</strong> ${massage}</p>
            <p><strong>Guests:</strong> ${people}</p>
          </div>

          <p>We will be in touch shortly to finalize the details of your session.</p>
          
          <hr style="border: 0; border-top: 1px solid #C4A052; opacity: 0.2; margin: 30px 0;" />
          <p style="font-style: italic; text-align: center; color: #C4A052;">"Your home is the ultimate place for healing."</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}