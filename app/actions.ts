"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export type BookingData = {
  name: string;
  email: string;
  address: string;
  date: string;
  time: string;
  massage: string;
  addon?: string;
  people: string;
};

export async function handleBookingForm(data: BookingData) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
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
      }
    );

    // Mapped exactly to your screenshot
    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          full_name: data.name,
          email: data.email,
          address: data.address,
          booking_date: data.date,
          ritual: data.massage,    // CHANGED from massage_type to ritual
          time_pref: data.time,    // CHANGED from time_preference to time_pref
          people: data.people,     // CHANGED from guests to people
          // Addon is not in your screenshot, so we leave it out 
          // or you need to add an 'addon' column in Supabase
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      error: err instanceof Error ? err.message : "Internal Server Error" 
    };
  }
}
