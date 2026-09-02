"use server";

import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";
import twilio from "twilio"; 

const resend = new Resend(process.env.RESEND_API_KEY);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID, 
  process.env.TWILIO_AUTH_TOKEN
);

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
  addonCount: string;
  people: string;
}

export async function handleBookingForm(data: BookingData) {
  try {
    // ==========================================
    // 1. BASIC VALIDATION
    // ==========================================
    if (!data.name || !data.email || !data.phone || !data.address || !data.massage || !data.duration) {
      return { success: false, error: "Missing required fields" };
    }

    // ==========================================
    // 2. EXISTENCE VALIDATION (API CHECKS)
    // ==========================================

    // A. Check Email (Abstract API)
    try {
      const emailApiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${encodeURIComponent(data.email)}`;
      
      const emailRes = await fetch(emailApiUrl, { method: "GET" });
      
      if (!emailRes.ok) {
        throw new Error(`Abstract API responded with status: ${emailRes.status}`);
      }

      const emailData = await emailRes.json();

      if (emailData && emailData.deliverability === "UNDELIVERABLE") {
        return { 
          success: false, 
          error: "The email address provided does not exist or cannot receive mail. Please check for typos." 
        };
      }
      
      if (emailData?.is_disposable_email?.value === true) {
        return { 
          success: false, 
          error: "Temporary or disposable email addresses are not accepted for reservations." 
        };
      }

    } catch (e) {
      console.error("Email Validation API error:", e);
    }

    // B. Check Phone (Twilio)
    try {
      const phoneCheck = await twilioClient.lookups.v2.phoneNumbers(data.phone).fetch();
      
      if (!phoneCheck.valid) {
        return { success: false, error: "The phone number provided is not a valid, active number." };
      }
    } catch (error) {
      console.error("Twilio lookup error:", error);
      return { success: false, error: "Could not verify phone number structure." };
    }

    // ==========================================
    // 3. FORMAT DATES & SAVE TO DATABASE
    // ==========================================
    let dbDate = data.date;      // For PostgreSQL (YYYY-MM-DD)
    let displayDate = data.date; // For Emails (DD-MM-YYYY)

    if (data.date.includes('/')) {
      const [day, month, year] = data.date.split('/');
      dbDate = `${year}-${month}-${day}`;      // Satisfies Supabase
      displayDate = `${day}-${month}-${year}`; // Looks pretty in emails
    }

    const parsedAddonCount = data.addon ? (parseInt(data.addonCount, 10) || 1) : null;
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
          duration: data.duration,              // Fixed: Sent as string (text)
          booking_date: dbDate,
          time_pref: data.time,
          people: data.people,                  // Fixed: Sent as string (text)
          addon: data.addon || null,
          addonCount: parsedAddonCount          // Fixed: Matches exact column name
        }
      ]);

    if (dbError) {
      console.error("Supabase Error Details:", dbError); // Temporary detailed error logging
      return { success: false, error: `DB Error: ${dbError.message}` };
    }

    // ==========================================
    // 4. SEND EMAILS
    // ==========================================
    try {
      const addonText = data.addon 
        ? `${data.addon} (${parsedAddonCount} ${parsedAddonCount === 1 ? 'guest' : 'guests'})`
        : null;

      // Client Confirmation Email
      await resend.emails.send({
        from: 'Maison Céleste <booking@maisoncelestelimerick.com>',
        to: [data.email],
        replyTo: 'maisonceleste@outlook.ie',
        subject: `Your Ritual is Reserved | Maison Céleste`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #5A4A42; max-width: 600px; margin: auto; border: 1px solid #C4A052; padding: 40px; background-color: #FDFBF7;">
            <h1 style="color: #C4A052; text-transform: uppercase; letter-spacing: 4px; text-align: center; font-size: 24px; font-weight: 300;">Your Ritual is Reserved</h1>
            
            <p style="font-size: 16px; line-height: 1.6;">Bonjour ${data.name},</p>
            <p style="font-size: 16px; line-height: 1.6;">We are delighted to receive your mobile spa request. We look forward to bringing the Maison Céleste experience to you.</p>
            
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #EFEAE2; margin: 30px 0;">
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #C4A052; margin-top: 0;">Booking Details</h2>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Ritual:</strong> ${data.massage}</p>
              ${addonText ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Add-on:</strong> ${addonText}</p>` : ''}
              <p style="margin: 5px 0; font-size: 14px;"><strong>Guests:</strong> ${data.people}</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${displayDate}</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Time Preference:</strong> ${data.time}</p>
              <p style="margin: 5px 0; font-size: 14px;"><strong>Location:</strong> ${data.address}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <h3 style="font-size: 16px; margin-bottom: 10px;">Health Consultation</h3>
              <p style="font-size: 14px; margin-bottom: 20px;">To ensure your comfort and safety, please complete this brief consultation form prior to your session.</p>
              <a href="https://tally.so/r/A7qa0z?fbclid=PAVERFWARkGFdleHRuA2FlbQIxMABzcnRjBmFwcF9pZA8xMjQwMjQ1NzQyODc0MTQAAafLmS64ZrNY0aTwANgSoQS8bsjXnJxb_eh9y-byPaKV0fNc_XfQbgrbDQBEgA_aem_pWNRrex3Xc95GiJiBO75gA" 
                 style="background-color: #C4A052; color: white; padding: 12px 25px; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">Complete Consultation</a>
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
        from: 'Maison Céleste <booking@maisoncelestelimerick.com>',
        to: ['maisonceleste@outlook.ie'],
        subject: `NEW BOOKING: ${data.name}`,
        html: `<p>New booking for <strong>${data.massage}</strong> (${data.duration} mins).</p>
               <p><strong>Guests:</strong> ${data.people}</p>
               <p><strong>Add-on:</strong> ${addonText || 'None'}</p>
               <p><strong>Phone:</strong> ${data.phone}</p>
               <p><strong>Email:</strong> ${data.email}</p>
               <p><strong>Address:</strong> ${data.address}</p>
               <p><strong>Date:</strong> ${displayDate}</p>
               <p><strong>Time Preference:</strong> ${data.time}</p>`
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