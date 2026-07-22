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
  email: "info@nestiva.hospital",

  /** Appointment-specific email */
  appointmentEmail: "appointments@nestiva.hospital",

  /** Support email */
  supportEmail: "support@nestiva.hospital",

  /** General enquiries phone */
  phone: "+1 (800) 637-8482",

  /** 24/7 emergency hotline */
  emergencyPhone: "+1 (800) 911-0000",

  /** Outpatient department */
  opdPhone: "+1 (800) 637-1111",

  /** Physical address */
  address: {
    street: "123 Medical Center Drive",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    /** Full single-line version */
    full: "123 Medical Center Drive, New York, NY 10001, United States",
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
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v0000000000000",

  /** Direct Google Maps link */
  mapsLink: "https://goo.gl/maps/example",

  /** WhatsApp number for quick contact */
  whatsapp: "+18006378482",
} as const;

export type Contact = typeof contact;
