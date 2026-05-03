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
    // 1. Validation check
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
      console.error("Supabase Error:", dbError.message);
      return { success: false, error: "Database save failed" };
    }

    // 3. Send Batch Emails
    try {
      const { data: emailData, error: resendError } = await resend.batch.send([
        {
          from: 'Maison Céleste <booking@maisonceleste.ie>',
          to: [data.email],
          replyTo: 'maisonceleste@outlook.ie',
          subject: `Booking Confirmed: ${data.massage}`,
          html: `
            <div style="font-family: serif; color: #5A4A42; max-width: 600px; margin: auto; border: 1px solid #C4A052; padding: 40px; background-color: #FDFBF7;">
              <h1 style="color: #C4A052; text-transform: uppercase; letter-spacing: 2px; text-align: center;">Your Ritual is Reserved</h1>
              <p>Bonjour ${data.name},</p>
              <p>We are delighted to receive your mobile spa request. Our team will reach to you as soon as possible.</p>
              <hr style="border: 0; border-top: 1px solid #C4A052; margin: 20px 0;" />
              <p style="margin: 10px 0;"><strong>Ritual:</strong> ${data.massage}</p>
              ${data.addon ? `<p style="margin: 10px 0;"><strong>Add-on:</strong> ${data.addon}</p>` : ''}
              <p style="margin: 10px 0;"><strong>Date:</strong> ${data.date}</p>
              <p style="margin: 10px 0;"><strong>Time Preference:</strong> ${data.time}</p>
              <p style="margin: 10px 0;"><strong>Location:</strong> ${data.address}</p>
              <hr style="border: 0; border-top: 1px solid #C4A052; margin: 20px 0;" />
              <p style="text-align: center; font-size: 12px; font-style: italic;">Relaxation is on its way.</p>
              <p style="text-align: center; margin-top: 20px;">Warmly,<br /><strong>Maison Céleste</strong></p>
            </div>
          `,
        },
        {
          from: 'Maison Céleste <booking@maisonceleste.ie>',
          to: ['maisonceleste@outlook.ie'],
          subject: `ACTION REQUIRED: New Booking - ${data.name}`,
          html: `
            <div style="font-family: sans-serif; color: #333; padding: 20px; border: 2px solid #5A4A42;">
              <h2 style="color: #5A4A42;">New Booking Received</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Client:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Ritual:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.massage}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Add-on:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.addon || 'None'}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date/Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.date} (${data.time})</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Address:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.address}</td></tr>
              </table>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">Check Supabase dashboard for full history.</p>
            </div>
          `,
        }
      ]);

      if (resendError) {
        console.error("Resend Batch Error:", resendError);
      }
    } catch (emailErr) {
      console.error("Email processing failed:", emailErr);
    }

    return { success: true };

  } catch (err) {
    console.error("Internal Server Error:", err);
    return { success: false, error: "Internal server error" };
  }
}
