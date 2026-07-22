/**
 * Services Data
 * ─────────────────────────────────────────────────────────────────────────────
 * All content for the Services section pages.
 * Backend-ready: replace with API calls when NestJS backend is connected.
 */

import type { Service } from "@/types";

export const services: Service[] = [
  // ── Emergency Care ───────────────────────────────────────────────────────
  {
    id: "emergency-care",
    slug: "emergency-care",
    name: "Emergency Care",
    shortName: "Emergency",
    tagline: "Rapid, life-saving response — around the clock.",
    description:
      "Our Emergency Department operates 24 hours a day, 365 days a year, staffed by a dedicated team of emergency physicians, trauma surgeons, intensivists, and specially trained nurses. We are a Level I Trauma Center — the highest designation — equipped to handle the most complex life-threatening emergencies with speed, precision, and compassion.",
    shortDescription: "24/7 Level I Trauma Center with rapid response teams.",
    icon: "Siren",
    image: { src: "/assets/images/services/emergency.jpg", alt: "Emergency Care Department" },
    features: [
      {
        icon: "Clock",
        title: "24/7 Availability",
        description:
          "Our emergency team is on duty every hour of every day, including weekends and public holidays. No appointment needed — walk in or arrive by ambulance.",
      },
      {
        icon: "Ambulance",
        title: "Advanced Trauma Response",
        description:
          "ACS-verified Level I Trauma Center with dedicated trauma bays, helipad, and a trauma team that activates within minutes of notification.",
      },
      {
        icon: "Heart",
        title: "Cardiac Emergency Unit",
        description:
          "Dedicated cardiac catheterisation lab available 24/7 for STEMI (heart attack) patients. Door-to-balloon time consistently under 60 minutes.",
      },
      {
        icon: "Brain",
        title: "Stroke Code Protocol",
        description:
          "Certified Comprehensive Stroke Center with a neurology team and CT suite ready to administer tPA and thrombectomy around the clock.",
      },
      {
        icon: "Baby",
        title: "Paediatric Emergency",
        description:
          "Separate paediatric emergency section with child life specialists, paediatric-sized equipment, and board-certified paediatric emergency physicians.",
      },
      {
        icon: "Shield",
        title: "Triage & Fast Track",
        description:
          "Five-level triage system ensures the most critical patients are seen immediately. A dedicated fast track for lower-acuity cases minimises wait times.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Arrival & Registration",
        description:
          "Walk in or arrive by ambulance. Our triage nurse immediately assesses your condition and assigns an acuity level to prioritise your care.",
        icon: "LogIn",
      },
      {
        step: 2,
        title: "Triage Assessment",
        description:
          "A senior nurse performs a rapid assessment of your vital signs, chief complaint, and medical history to determine the urgency of care needed.",
        icon: "ClipboardList",
      },
      {
        step: 3,
        title: "Physician Evaluation",
        description:
          "An emergency physician evaluates you, orders diagnostic tests (blood work, imaging, ECG) and initiates treatment in parallel.",
        icon: "Stethoscope",
      },
      {
        step: 4,
        title: "Treatment & Stabilisation",
        description:
          "Our team delivers targeted treatment — from IV medications and wound care to emergency surgery or specialist consultation.",
        icon: "Activity",
      },
      {
        step: 5,
        title: "Admission or Discharge",
        description:
          "Once stabilised, you are either admitted to the appropriate ward or discharged with a detailed care plan, prescriptions, and follow-up instructions.",
        icon: "CheckCircle",
      },
    ],
    stats: [
      { value: "< 8 min", label: "Avg. Triage Wait", description: "Median wait time from arrival to triage assessment" },
      { value: "45K+", label: "ER Visits/Year", description: "Patients treated in our emergency department annually" },
      { value: "< 60 min", label: "Door-to-Balloon", description: "For STEMI heart attack patients" },
      { value: "Level I", label: "Trauma Centre", description: "ACS-verified — highest designation" },
    ],
    faqs: [
      {
        id: "em-faq-1",
        question: "Do I need an appointment for the Emergency Department?",
        answer:
          "No. The Emergency Department never requires an appointment. Walk in at any time, 24 hours a day, 7 days a week. For life-threatening emergencies, call 911 or our emergency line at +1 (800) 911-0000.",
        order: 1,
      },
      {
        id: "em-faq-2",
        question: "How does triage work — will I wait long?",
        answer:
          "We use a five-level triage system. Life-threatening conditions are seen immediately. Less urgent cases are assessed within 30 minutes. Our average triage-to-physician time is under 25 minutes for most patients.",
        order: 2,
      },
      {
        id: "em-faq-3",
        question: "Can I bring a family member into the emergency room?",
        answer:
          "Yes. One designated support person may accompany you during assessment and treatment, provided the situation allows. Our staff will keep your family updated throughout your care.",
        order: 3,
      },
      {
        id: "em-faq-4",
        question: "What should I bring to the Emergency Department?",
        answer:
          "Bring your ID, insurance card, a list of current medications and allergies, and any relevant medical records if available. Do not delay coming in if you don't have these — your care comes first.",
        order: 4,
      },
    ],
    relatedServiceIds: ["surgery", "diagnostics"],
    featured: true,
    order: 1,
  },

  // ── Diagnostics ──────────────────────────────────────────────────────────
  {
    id: "diagnostics",
    slug: "diagnostics",
    name: "Diagnostics & Imaging",
    shortName: "Diagnostics",
    tagline: "Precision diagnostics for accurate, faster diagnosis.",
    description:
      "Our Diagnostics and Imaging Centre is one of the most advanced in the region, housing over 120 state-of-the-art systems across radiology, pathology, cardiology, and neurology. From routine blood panels to complex genomic sequencing, our ISO-certified laboratory and ARRT-certified radiologists deliver precise, fast results you and your physician can trust.",
    shortDescription: "Comprehensive lab, imaging, and pathology services.",
    icon: "Microscope",
    image: { src: "/assets/images/services/diagnostics.jpg", alt: "Diagnostics and Imaging Centre" },
    features: [
      {
        icon: "Scan",
        title: "3T MRI & 256-Slice CT",
        description:
          "Our 3-Tesla MRI provides exceptional soft-tissue resolution, while our 256-slice CT scanner delivers whole-body imaging in seconds with minimal radiation.",
      },
      {
        icon: "Zap",
        title: "PET-CT & Nuclear Medicine",
        description:
          "Advanced PET-CT scanning for oncology staging, cardiac viability, and neurological assessment. Full nuclear medicine suite with dedicated gamma cameras.",
      },
      {
        icon: "Activity",
        title: "Cardiac Diagnostics",
        description:
          "Comprehensive cardiac testing: ECG, echocardiography (2D, 3D, stress echo), Holter monitoring, cardiac MRI, and coronary CT angiography.",
      },
      {
        icon: "FlaskConical",
        title: "ISO-Certified Laboratory",
        description:
          "Our pathology laboratory processes over 2,000 samples daily with same-day results for routine panels and 48-hour turnaround for complex tests.",
      },
      {
        icon: "Dna",
        title: "Genomic & Molecular Testing",
        description:
          "Next-generation sequencing, tumour profiling, hereditary cancer panels, pharmacogenomics, and prenatal genetic screening.",
      },
      {
        icon: "Eye",
        title: "Digital Pathology",
        description:
          "Whole-slide digital imaging enables rapid telepathology consults and AI-assisted analysis for oncology and haematology specimens.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Doctor's Referral",
        description:
          "Your physician issues a diagnostic request — either physically or through our electronic order system. No self-referral is needed for most tests.",
        icon: "FileText",
      },
      {
        step: 2,
        title: "Appointment Booking",
        description:
          "Book your test online, by phone, or at our walk-in reception. Many routine blood tests are available without an appointment.",
        icon: "Calendar",
      },
      {
        step: 3,
        title: "Sample Collection / Scan",
        description:
          "Our trained phlebotomists, radiographers, and technicians collect your sample or conduct your scan in a calm, comfortable environment.",
        icon: "Pipette",
      },
      {
        step: 4,
        title: "Expert Analysis",
        description:
          "Board-certified pathologists, radiologists, and lab scientists analyse your results with AI-assisted quality checks for accuracy.",
        icon: "Search",
      },
      {
        step: 5,
        title: "Report Delivery",
        description:
          "Reports are delivered to your physician and available on your patient portal. Urgent findings are communicated immediately.",
        icon: "Send",
      },
    ],
    stats: [
      { value: "2,000+", label: "Tests/Day", description: "Samples processed in our laboratory daily" },
      { value: "6 hrs", label: "Routine Results", description: "Average turnaround for standard blood panels" },
      { value: "120+", label: "Test Types", description: "Diagnostic modalities available" },
      { value: "99.7%", label: "Accuracy Rate", description: "Laboratory diagnostic accuracy rate" },
    ],
    faqs: [
      {
        id: "dx-faq-1",
        question: "Do I need a referral for diagnostic tests?",
        answer:
          "Most specialised imaging (MRI, CT, PET) and laboratory tests require a physician's referral. Routine blood panels, basic health checks, and some screening tests can be booked directly. Contact our diagnostic centre to confirm requirements for your specific test.",
        order: 1,
      },
      {
        id: "dx-faq-2",
        question: "How do I prepare for an MRI scan?",
        answer:
          "Remove all metal objects before entering the MRI suite. Inform our team if you have any implants, pacemakers, or claustrophobia. Most MRI scans require no special preparation, but contrast scans may require fasting. Full preparation instructions will be provided when you book.",
        order: 2,
      },
      {
        id: "dx-faq-3",
        question: "How will I receive my diagnostic reports?",
        answer:
          "Reports are available through our secure patient portal within the specified turnaround time. You will receive an SMS and email notification when results are ready. Urgent or critical results are communicated directly to your referring physician.",
        order: 3,
      },
      {
        id: "dx-faq-4",
        question: "Are walk-in blood tests available?",
        answer:
          "Yes. Our phlebotomy centre accepts walk-in patients for most routine blood tests, Monday through Saturday, 7 AM to 5 PM. Please bring your referral slip and ID.",
        order: 4,
      },
    ],
    relatedServiceIds: ["emergency-care", "surgery"],
    featured: true,
    order: 2,
  },

  // ── Telemedicine ─────────────────────────────────────────────────────────
  {
    id: "telemedicine",
    slug: "telemedicine",
    name: "Telemedicine",
    shortName: "Telemedicine",
    tagline: "Expert medical care from wherever you are.",
    description:
      "Nestiva's telemedicine platform connects you with our world-class specialists through secure, HD video consultations — from the comfort of your home, office, or anywhere in the world. Whether you need a follow-up visit, a second opinion, chronic disease management, or a prescription renewal, our digital health team is just a click away.",
    shortDescription: "Secure video consultations with top specialists.",
    icon: "Monitor",
    image: { src: "/assets/images/services/telemedicine.jpg", alt: "Telemedicine Virtual Consultation" },
    features: [
      {
        icon: "Video",
        title: "HD Video Consultations",
        description:
          "Crystal-clear, HIPAA-compliant video sessions with our specialists — from any device, any location, at a time that suits you.",
      },
      {
        icon: "Stethoscope",
        title: "300+ Specialists Available",
        description:
          "Access to over 300 of our consultants across all major specialties — cardiology, oncology, psychiatry, dermatology, paediatrics, and more.",
      },
      {
        icon: "FileText",
        title: "Digital Prescriptions",
        description:
          "Receive electronic prescriptions directly after your consultation, valid at any registered pharmacy. Controlled substances excluded.",
      },
      {
        icon: "RefreshCw",
        title: "Chronic Disease Management",
        description:
          "Ongoing virtual monitoring and management for diabetes, hypertension, asthma, thyroid disorders, and other chronic conditions.",
      },
      {
        icon: "Lock",
        title: "Secure & Private",
        description:
          "End-to-end encrypted platform meeting HIPAA, GDPR, and international data protection standards. Your health information stays yours.",
      },
      {
        icon: "Globe",
        title: "International Access",
        description:
          "Consult from anywhere in the world. We support patients across North America, Europe, the Middle East, and South Asia.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Book Your Appointment",
        description:
          "Select your specialist, choose an available time slot, and book through our patient portal or mobile app. Slots are often available within 24 hours.",
        icon: "Calendar",
      },
      {
        step: 2,
        title: "Complete Pre-Visit Form",
        description:
          "Fill in a brief health questionnaire and upload any relevant reports, images, or documents so your doctor is fully prepared.",
        icon: "ClipboardCheck",
      },
      {
        step: 3,
        title: "Join Your Video Session",
        description:
          "At your appointment time, click the secure link in your confirmation email. No software download required — works in any modern browser.",
        icon: "Video",
      },
      {
        step: 4,
        title: "Consult with Your Specialist",
        description:
          "Discuss your symptoms, review your results, and receive professional medical advice in a private, unhurried consultation.",
        icon: "MessageCircle",
      },
      {
        step: 5,
        title: "Receive Your Care Plan",
        description:
          "After the session, receive a summary, prescription (if needed), referrals, and follow-up instructions through the patient portal.",
        icon: "Send",
      },
    ],
    stats: [
      { value: "48 hrs", label: "Avg. Booking Time", description: "Average time from booking to first available slot" },
      { value: "300+", label: "Specialists Online", description: "Consultants available across all major specialties" },
      { value: "4.9/5", label: "Patient Rating", description: "Average patient satisfaction score" },
      { value: "60+", label: "Countries Served", description: "International patients served via telemedicine" },
    ],
    faqs: [
      {
        id: "tm-faq-1",
        question: "What equipment do I need for a telemedicine consultation?",
        answer:
          "You only need a smartphone, tablet, or computer with a camera and microphone, and a stable internet connection. Our platform works in any modern web browser — no app download is required.",
        order: 1,
      },
      {
        id: "tm-faq-2",
        question: "Is telemedicine covered by insurance?",
        answer:
          "Many insurance plans now cover telemedicine consultations. Coverage varies by provider and plan. We recommend verifying with your insurer before booking. Our billing team can also help confirm your benefits.",
        order: 2,
      },
      {
        id: "tm-faq-3",
        question: "Can I get a physical examination via telemedicine?",
        answer:
          "While telemedicine cannot replace an in-person physical examination, our doctors are skilled at conducting comprehensive visual assessments and directed examinations via video. For conditions requiring hands-on examination, we will arrange an in-person appointment.",
        order: 3,
      },
      {
        id: "tm-faq-4",
        question: "Is my consultation confidential and secure?",
        answer:
          "Absolutely. Our platform uses end-to-end encryption and is fully HIPAA and GDPR compliant. No third party can access your consultation. Your health data is stored securely and never shared without your consent.",
        order: 4,
      },
    ],
    relatedServiceIds: ["diagnostics", "emergency-care"],
    featured: true,
    order: 3,
  },

  // ── Surgery ──────────────────────────────────────────────────────────────
  {
    id: "surgery",
    slug: "surgery",
    name: "Surgery",
    shortName: "Surgery",
    tagline: "Precision surgery for better outcomes and faster recovery.",
    description:
      "Nestiva's Surgical Services combine the expertise of over 80 fellowship-trained surgeons with the most advanced surgical technology in the region — including the da Vinci Robotic Surgery System, 4K laparoscopic equipment, and intraoperative MRI. From routine procedures to complex reconstructive surgery, our integrated surgical teams deliver exceptional outcomes.",
    shortDescription: "Advanced surgical care with 80+ specialist surgeons.",
    icon: "Scissors",
    image: { src: "/assets/images/services/surgery.jpg", alt: "Advanced Surgical Suite" },
    features: [
      {
        icon: "Bot",
        title: "Robotic Surgery (da Vinci)",
        description:
          "Our da Vinci Xi systems enable unparalleled surgical precision, smaller incisions, reduced blood loss, and significantly faster recovery for complex procedures.",
      },
      {
        icon: "Minimize2",
        title: "Minimally Invasive Surgery",
        description:
          "Over 70% of our procedures are performed laparoscopically or endoscopically, resulting in less pain, fewer complications, and shorter hospital stays.",
      },
      {
        icon: "Brain",
        title: "Neurosurgery",
        description:
          "Awake brain surgery, minimally invasive spine surgery, and gamma knife radiosurgery for brain tumours, aneurysms, and movement disorders.",
      },
      {
        icon: "Heart",
        title: "Cardiac Surgery",
        description:
          "Open-heart surgery, TAVR, bypass grafting, valve repair and replacement — performed by a team with over 3,000 open-heart procedures.",
      },
      {
        icon: "Bone",
        title: "Orthopaedic Surgery",
        description:
          "Robotic-assisted joint replacement, complex fracture repair, sports medicine procedures, and revision surgery by subspecialty-trained surgeons.",
      },
      {
        icon: "Shield",
        title: "Enhanced Recovery (ERAS)",
        description:
          "Our ERAS protocols — including multimodal pain management, early mobilisation, and optimised nutrition — reduce complications and recovery time by up to 30%.",
      },
    ],
    processSteps: [
      {
        step: 1,
        title: "Surgical Consultation",
        description:
          "Meet your surgeon to review your diagnosis, discuss surgical options, understand risks and benefits, and make a shared, informed decision.",
        icon: "MessageSquare",
      },
      {
        step: 2,
        title: "Pre-Operative Assessment",
        description:
          "Complete a thorough pre-op evaluation including blood work, ECG, anaesthesia review, and medication optimisation to ensure you are fully ready.",
        icon: "ClipboardList",
      },
      {
        step: 3,
        title: "Day of Surgery",
        description:
          "Arrive at our surgical admissions unit, where our nursing team prepares you, reviews consent, and introduces your theatre team before you go to theatre.",
        icon: "Calendar",
      },
      {
        step: 4,
        title: "Surgery & Monitoring",
        description:
          "Your procedure is performed with continuous intraoperative monitoring by an anaesthesiologist. A perfusionist and scrub team support complex procedures.",
        icon: "Activity",
      },
      {
        step: 5,
        title: "Recovery & Discharge",
        description:
          "You recover in our PACU under close nursing supervision. Once stable, you move to your ward or are discharged with a complete recovery and follow-up plan.",
        icon: "CheckCircle",
      },
    ],
    stats: [
      { value: "12,000+", label: "Surgeries/Year", description: "Procedures performed annually across all specialties" },
      { value: "80+", label: "Surgeons", description: "Fellowship-trained specialist surgeons" },
      { value: "97.8%", label: "Success Rate", description: "Across all elective surgical procedures" },
      { value: "4", label: "Robotic Systems", description: "da Vinci Xi robotic surgery platforms" },
    ],
    faqs: [
      {
        id: "sx-faq-1",
        question: "How do I prepare for surgery?",
        answer:
          "Your surgical team will provide specific pre-operative instructions during your consultation. Generally, you should fast for 6–8 hours before surgery, disclose all medications and supplements, arrange transportation home, and prepare your home for recovery. Our pre-admission team will guide you through every step.",
        order: 1,
      },
      {
        id: "sx-faq-2",
        question: "Is robotic surgery safe?",
        answer:
          "Yes. Robotic-assisted surgery is one of the safest surgical advancements in modern medicine. The robot does not operate autonomously — it is controlled with precision by your surgeon. Benefits include smaller incisions, reduced blood loss, lower infection rates, and faster recovery.",
        order: 2,
      },
      {
        id: "sx-faq-3",
        question: "How long will I stay in hospital after surgery?",
        answer:
          "Length of stay depends on the procedure. Many minimally invasive procedures are day-case or overnight. Complex surgeries may require 3–7 days. Your surgeon will give you a personalised estimate. Our ERAS program is designed to minimise your hospital stay safely.",
        order: 3,
      },
      {
        id: "sx-faq-4",
        question: "Will I experience pain after surgery?",
        answer:
          "We use multimodal pain management — combining regional anaesthesia, anti-inflammatory medications, and targeted analgesics — to minimise post-operative pain. Our goal is to keep you comfortable while enabling early mobilisation for faster recovery.",
        order: 4,
      },
    ],
    relatedServiceIds: ["emergency-care", "diagnostics"],
    featured: true,
    order: 4,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export default services;
