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

    // 1. SAVE TO DATABASE
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

    if (dbError) throw new Error(dbError.message);

    // 2. SEND NOTIFICATION TO YOU (Outlook)
    await resend.emails.send({
      from: 'Maison Celeste <bookings@maisoncelestelimerick.com>',
      to: 'maisonceleste@outlook.ie',
      subject: `✨ New Booking: ${data.name}`,
      html: `<p>You have a new booking for <strong>${data.massage}</strong> on ${data.date} at ${data.time}.</p>`,
    });

    // 3. SEND CONFIRMATION TO CUSTOMER
    await resend.emails.send({
      from: 'Maison Celeste <bookings@maisoncelestelimerick.com>',
      to: data.email, // This sends to the customer's email address
      subject: `Booking Confirmed - Maison Celeste`,
      html: `
        <h1>Hi ${data.name},</h1>
        <p>Your ritual at Maison Celeste is confirmed!</p>
        <p><strong>Details:</strong></p>
        <ul>
          <li>Date: ${data.date}</li>
          <li>Time: ${data.time}</li>
          <li>Ritual: ${data.massage}</li>
          <li>Add-on: ${data.addon || "None"}</li>
        </ul>
        <p>We look forward to seeing you at ${data.address}.</p>
      `,
    });

    return { success: true };
  } catch (err: any) {
    console.error("Fatal Error:", err.message);
    return { success: false, error: err.message };
  }
}
