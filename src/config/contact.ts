/**
 * Contact Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * All contact details, working hours, and map data.
 * Consumed by contact pages, footer, and structured data.
 */

export interface WorkingHour {
  days: string;
  hours: string;
  isEmergency?: boolean;
}

export const contact = {
  /** Primary contact email */
  email: "nestivahospital@gmail.com",

  /** Appointment-specific email */
  appointmentEmail: "nestivahospital@gmail.com",

  /** Support email */
  supportEmail: "nestivahospital@gmail.com",

  /** General enquiries phone */
  phone: "011-42422000",

  /** 24/7 emergency hotline */
  emergencyPhone: "011-42422000",

  /** Outpatient department */
  opdPhone: "011-42422000",

  /** Physical address */
  address: {
    street: "384, JS Complex, near Indane Gas godown, Munirka",
    city: "New Delhi",
    state: "Delhi",
    zip: "110068",
    country: "India",
    /** Full single-line version */
    full: "384, JS Complex, near Indane Gas godown, Munirka, New Delhi-110068",
  },

  /** Working hours */
  workingHours: [
    {
      days: "Monday – Friday",
      hours: "8:00 AM – 8:00 PM",
    },
    {
      days: "Saturday",
      hours: "9:00 AM – 5:00 PM",
    },
    {
      days: "Sunday",
      hours: "10:00 AM – 2:00 PM",
    },
    {
      days: "Emergency",
      hours: "24 / 7 / 365",
      isEmergency: true,
    },
  ] satisfies WorkingHour[],

  /** Google Maps embed URL */
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1641!2d77.17649!3d28.55189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b50e3e36b5d%3A0x5a0c0e8f3e4c0e6a!2sMunirka%2C%20New%20Delhi%2C%20Delhi%20110067!5e0!3m2!1sen!2sin!4v1700000000000",

  /** Direct Google Maps link */
  mapsLink: "https://maps.google.com/?q=Munirka,+New+Delhi,+Delhi+110068",

  /** WhatsApp number for quick contact */
  whatsapp: "01142422000",
} as const;

export type Contact = typeof contact;
