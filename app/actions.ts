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
  duration: string;
  addon: string;
  people: string;
}

export async function handleBookingForm(data: BookingData) {
  try {
    // 1. Validation 
    if (!data.name || !data.email || !data.phone || !data.address || !data.massage || !data.duration) {
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
          duration: data.duration,
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
    // Wrapped in its own try/catch so the database save still succeeds even if email fails
    try {
      // Client Confirmation Email
      await resend.emails.send({
        from: 'Maison Céleste <booking@maisoncelestelimerick.ie>',
        to: [data.email],
        replyTo: 'maisonceleste@outlook.ie',
        subject: `Your Ritual is Reserved | Maison Céleste`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #5A4A42; max-width: 600px; margin: auto; border: 1px solid #C4A052; padding: 40px; background-color: #FDFBF7;">
            <h1 style="color: #C4A052; text-transform: uppercase; letter-spacing: 4px; text-align: center; font-size: 24px; font-weight: 300;">Your Ritual is Reserved</h1>
            
            <p style="font-size: 16px; line-height: 1.6;">Bonjour ${data.name},</p>
            <p style="font-size: 16px; line-height: 1.6;">We are delighted to receive your mobile spa request. We look forward to bringing the Maison Céleste experience to you.</p>
            
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #C4A052/20; margin: 30px 0;">
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #C4A052; margin-top: 0;">Booking Details</h2>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Ritual:</strong> ${data.massage}</p>
              ${data.addon ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Add-on:</strong> ${data.addon}</p>` : ''}
              <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${data.date}</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Time Preference:</strong> ${data.time}</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Location:</strong> ${data.address}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <h3 style="font-size: 16px; margin-bottom: 10px;">Health Consultation</h3>
              <p style="font-size: 14px; margin-bottom: 20px;">To ensure your comfort and safety, please complete this brief consultation form prior to your session.</p>
              <a href="https://tally.so/r/A7qa0z?fbclid=PAVERFWARkGFdleHRuA2FlbQIxMABzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafLmS64ZrNY0aTwANgSoQS8bsjXnJxb_eh9y-byPaKV0fNc_XfQbgrbDQBEgA_aem_pWNRrex3Xc95GiJiBO75gA" 
                 style="background-color: #C4A052; color: white; padding: 12px 25px; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Complete Consultation</a>
            </div>

            <p style="text-align: center; font-size: 10px; color: #5A4A42; margin-top: 40px;">Relaxation is on its way.</p>
            
            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #C4A052; padding-top: 20px;">
              <p style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">Warmly,<br />Maison Céleste</p>
              <a href="https://www.instagram.com/maison.celeste.wellness/" style="color: #C4A052; font-size: 12px; text-decoration: none;">Explore our journey on Instagram</a>
            </div>
          </div>
        `,
      });

      // Host Notification (To You)
      await resend.emails.send({
        from: 'Maison Céleste <booking@maisonceleste.ie>',
        to: ['maisonceleste@outlook.ie'],
        subject: `NEW BOOKING: ${data.name}`,
        html: `<p>New booking for ${data.massage} (${data.duration} mins). Phone: ${data.phone}. Email: ${data.email}. Address: ${data.address}. Time: ${data.time}</p>`
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