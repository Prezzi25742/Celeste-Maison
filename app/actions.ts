"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Resend } from 'resend'; // Make sure you ran 'npm install resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleBookingForm(data: any) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const cookieStore = await cookies();

    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    });

    // 1. SAVE TO SUPABASE
    const { error: dbError } = await supabase.from("bookings").insert([
      {
        full_name: data.name,
        email: data.email,
        address: data.address,
        booking_date: data.date,
        ritual: data.massage,
        time_pref: data.time,
        people: data.people,
        addon: data.addon || "None", 
      },
    ]);

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);

    // 2. SEND TO OUTLOOK (Via Resend)
    const { error: emailError } = await resend.emails.send({
      from: 'Maison Celeste <onboarding@resend.dev>', // Change this once you verify your domain
      to: 'maisonceleste@outlook.ie',
      subject: `✨ New Booking: ${data.name}`,
      html: `
        <h2>New Booking Details</h2>
        <p><strong>Client:</strong> ${data.name} (${data.email})</p>
        <p><strong>Service:</strong> ${data.massage}</p>
        <p><strong>Add-on:</strong> ${data.addon || "None"}</p>
        <p><strong>Date/Time:</strong> ${data.date} at ${data.time}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Guests:</strong> ${data.people}</p>
      `,
    });

    if (emailError) {
      console.error("Email failed:", emailError);
      // We don't "throw" here because the booking IS saved in DB already
    }

    return { success: true };

  } catch (err: any) {
    console.error("Server Action Error:", err.message);
    return { success: false, error: err.message };
  }
}
