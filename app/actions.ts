"use server";

import { createClient } from "@/utils/supabase/server";
import { Resend } from "resend"; // 1. Import Resend

// 2. Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export interface BookingData {
  name: string;
  email: string;
  address: string;
  date: string;
  time: string;
  massage: string;
  addon: string;
  people: string;
}

export interface ActionResponse {
  success: boolean;
  error?: string;
}

export async function handleBookingForm(data: BookingData): Promise<ActionResponse> {
  try {
    const supabase = await createClient();

    // 3. STEP ONE: Insert into Supabase
    const { error: dbError } = await supabase
      .from("bookings") 
      .insert([
        {
          name: data.name,
          email: data.email,
          address: data.address,
          booking_date: data.date,
          time_preference: data.time,
          massage_type: data.massage,
          addon: data.addon || "None",
          people: data.people,
        },
      ]);

    if (dbError) {
      console.error("Supabase Error:", dbError.message);
      return { success: false, error: dbError.message };
    }

    // 4. STEP TWO: Send Confirmation Email
    // This only runs if the Supabase insert was successful
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
            <p>We are delighted to confirm your mobile spa session in Limerick.</p>
            <hr style="border: 0; border-top: 1px solid #C4A052; margin: 20px 0;" />
            <p><strong>Ritual:</strong> ${data.massage}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Location:</strong> ${data.address}</p>
            <p><strong>Guests:</strong> ${data.people}</p>
            ${data.addon ? `<p><strong>Enhancement:</strong> ${data.addon}</p>` : ''}
            <hr style="border: 0; border-top: 1px solid #C4A052; margin: 20px 0;" />
            <p style="font-size: 12px; font-style: italic;">We will contact you shortly if we require any further details for your appointment.</p>
            <p>Warmly,<br /><strong>Maison Céleste</strong></p>
          </div>
        `,
      });
    } catch (emailErr) {
      // We log the email error but don't stop the process 
      // because the data is already saved in the database.
      console.error("Email failed to send:", emailErr);
    }

    return { success: true };
    
  } catch (err) {
    console.error("Server Action Error:", err);
    return { success: false, error: "Internal server error" };
  }
}
