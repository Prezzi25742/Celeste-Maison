"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Resend } from 'resend';

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

    // 1. SAVE TO SUPABASE (Mapping exactly to your column names)
    const { error: dbError } = await supabase.from("bookings").insert([
      {
        full_name: data.name,
        email: data.email,
        address: data.address,
        booking_date: data.date,
        ritual: data.massage,
        time_pref: data.time,
        people: data.people,
        addon: data.addon || "None", // This fixes the NULL issue
      },
    ]);

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);

    // 2. SEND TO OUTLOOK (Using your verified domain)
    const { error: emailError } = await resend.emails.send({
      from: 'Bookings <bookings@maisoncelestelimerick.com>', 
      to: 'maisonceleste@outlook.ie',
      subject: `✨ New Booking: ${data.name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>New Booking for Maison Celeste</h2>
          <hr />
          <p><strong>Customer:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Address:</strong> ${data.address}</p>
          <p><strong>Ritual:</strong> ${data.massage}</p>
          <p><strong>Add-on:</strong> ${data.addon || "None"}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Guests:</strong> ${data.people}</p>
        </div>
      `,
    });

    if (emailError) console.error("Email failed:", emailError);

    return { success: true };

  } catch (err: any) {
    console.error("Critical Error:", err.message);
    return { success: false, error: err.message };
  }
}
