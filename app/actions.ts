"use server"

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

// --- CONTACT FORM ACTION ---
export async function handleContactForm(data: any) {
  try {
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([
        { 
          name: data.name, 
          email: data.email, 
          phone: data.phone, 
          message: data.message,
          people: data.people // Added people to Supabase
        }
      ]);

    if (dbError) {
        console.error("Supabase Error:", dbError.message);
        return { success: false, error: dbError.message };
    }

    await resend.emails.send({
      from: 'Maison Celeste <onboarding@resend.dev>',
      to: 'maisonceleste@outlook.ie',
      subject: `New Message from ${data.name}`,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Guests:</strong> ${data.people}</p>
        <p><strong>Message:</strong> ${data.message}</p>
      `
    });

    return { success: true };
  } catch (err: any) {
    console.error("Contact Action Error:", err);
    return { success: false, error: "Server error" };
  }
}

// --- BOOKING FORM ACTION ---
export async function handleBookingForm(data: any) {
  try {
    // 1. Create the combined ritual name
    const ritualName = data.addon 
      ? `${data.massage} (with ${data.addon})` 
      : data.massage;

    // 2. Store in the 'bookings' table
    const { error: dbError } = await supabase
      .from('bookings')
      .insert([{ 
          full_name: data.name, 
          email: data.email, 
          address: data.address,
          ritual: ritualName,
          booking_date: data.date, 
          time_pref: data.time,
          people: data.people // Added people to Supabase
      }]);

    if (dbError) {
      console.log("FULL ERROR DETAILS:", dbError);
      return { success: false, error: dbError.message };
    }

    // 3. Send the email notification
    await resend.emails.send({
      from: 'Maison Celeste <onboarding@resend.dev>',
      to: 'maisonceleste@outlook.ie',
      subject: `New Booking: ${ritualName} - ${data.name}`,
      html: `
        <h3>New Ritual Booking</h3>
        <p><strong>Client:</strong> ${data.name}</p>
        <p><strong>Guests:</strong> ${data.people}</p>
        <p><strong>Ritual:</strong> ${ritualName}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>Email:</strong> ${data.email}</p>
      `
    });

    return { success: true };
  } catch (err: any) {
    console.error("Booking Action Error:", err);
    return { success: false, error: "Server error" };
  }
}