"use server";

import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  massage: string;
  addon: string;
  people: string;
}

export async function handleBookingForm(data: BookingData) {
  try {
    // 1. Validation
    if (!data.name || !data.email || !data.phone || !data.address || !data.massage) {
      return { success: false, error: "Missing required fields" };
    }

    // 2. Save to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from('bookings')
      .insert([
        {
          full_name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          ritual: data.massage,
          booking_date: data.date,
          time_pref: data.time,
          people: data.people,
          addon: data.addon
        }
      ]);

    if (dbError) {
      console.error("Supabase Error:", dbError);
      return { success: false, error: "Database save failed" };
    }

    // 3. Send Emails
    // We wrap emails in their own try/catch so the user doesn't get an error 
    // if the email fails but the database worked.
    try {
      await resend.emails.send({
        from: 'Maison Céleste <booking@maisonceleste.ie>',
        to: [data.email],
        replyTo: 'maisonceleste@outlook.ie',
        subject: `Booking Confirmed: ${data.massage}`,
        html: `
          <div style="font-family: serif; color: #5A4A42; max-width: 600px; margin: auto; border: 1px solid #C4A052; padding: 40px;">
            <h1 style="color: #C4A052; text-transform: uppercase; letter-spacing: 2px;">Your Ritual is Reserved</h1>
            <p>Bonjour ${data.name},</p>
            <p>We are delighted to recieve your mobile spa session in Limerick.</p>
            <hr style="border: 0; border-top: 1px solid #C4A052; margin: 20px 0;" />
            <p><strong>Ritual:</strong> ${data.massage}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Location:</strong> ${data.address}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <hr style="border: 0; border-top: 1px solid #C4A052; margin: 20px 0;" />
            <p>Warmly,<br /><strong>Maison Céleste</strong></p>
          </div>
        `,
      });

      // Host Notification (To You)
      await resend.emails.send({
        from: 'Maison Céleste <booking@maisonceleste.ie>',
        to: ['maisonceleste@outlook.ie'],
        subject: `NEW BOOKING: ${data.name}`,
        html: `<p>New booking for ${data.massage}. Phone: ${data.phone}. Email: ${data.email}. address: ${data.address} time: ${data.time}</p>`
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
    }

    return { success: true };

  } catch (err) {
    console.error("Critical Server Error:", err);
    return { success: false, error: "Internal server error" };
  }
}
