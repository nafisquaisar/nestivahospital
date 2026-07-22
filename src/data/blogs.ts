/**
 * Blog Posts Data — Extended with full content
 */
import type { Blog } from "@/types";

export const blogs: Blog[] = [
  {
    id: "blog-heart-health-2024",
    slug: "understanding-cardiovascular-prevention",
    title: "Understanding Cardiovascular Prevention: A Complete Guide",
    excerpt:
      "Heart disease remains the leading cause of death worldwide, yet up to 80% of cases are preventable. Learn the risk factors, warning signs, and science-backed strategies our cardiologists recommend.",
    content: `## Why Cardiovascular Health Matters

Heart disease is the leading cause of death globally, accounting for more than 17 million deaths each year. Yet cardiologists consistently remind us that up to 80% of premature heart attacks and strokes are preventable through lifestyle modification and early intervention.

## The Key Risk Factors

### Modifiable Risk Factors
These are risk factors you can control:

**High Blood Pressure (Hypertension)** — Blood pressure above 130/80 mmHg strains your arteries and forces your heart to work harder. It is called the "silent killer" because it typically has no symptoms until damage has already occurred.

**Elevated Cholesterol** — LDL (bad) cholesterol deposits in artery walls, forming plaques that narrow and harden arteries. A total cholesterol above 200 mg/dL warrants careful monitoring.

**Smoking** — Smoking damages artery walls, reduces oxygen in the blood, and promotes clotting. Even second-hand smoke significantly raises cardiovascular risk.

**Obesity and Physical Inactivity** — A BMI over 30 and less than 150 minutes of moderate exercise per week independently double your risk of cardiovascular disease.

**Diabetes** — High blood sugar damages blood vessels and nerves that control the heart. People with diabetes are two to four times more likely to develop heart disease.

**Poor Diet** — Diets high in saturated fats, trans fats, sodium, and refined sugars directly contribute to high blood pressure and elevated cholesterol.

### Non-Modifiable Risk Factors
- **Age** — Risk increases after 45 for men and 55 for women
- **Family History** — First-degree relative with heart disease before 55 (male) or 65 (female)
- **Gender** — Men have higher risk earlier; women's risk rises after menopause

## Evidence-Based Prevention Strategies

### 1. Follow the Heart-Healthy Diet
The Mediterranean and DASH diets have the strongest evidence base for cardiovascular protection:
- Abundant fruits, vegetables, whole grains, and legumes
- Lean proteins: fish (especially fatty fish twice weekly), poultry, beans
- Healthy fats: olive oil, avocados, nuts
- Limit: red meat, processed foods, sodium, added sugars, alcohol

### 2. Exercise Regularly
The American Heart Association recommends:
- **150 minutes/week** of moderate-intensity aerobic exercise (brisk walking, cycling, swimming)
- **75 minutes/week** of vigorous-intensity exercise (running, HIIT)
- Resistance training **2 days/week**

Even breaking this into 10-minute sessions throughout the day provides benefit.

### 3. Maintain a Healthy Weight
Losing just 5–10% of body weight significantly reduces blood pressure, cholesterol, and blood sugar. Focus on sustainable lifestyle changes rather than crash diets.

### 4. Quit Smoking
Within 1 year of quitting, your risk of coronary heart disease drops by 50%. Within 15 years, it approaches that of a non-smoker. Speak with your doctor about nicotine replacement therapy or prescription medications.

### 5. Manage Stress
Chronic stress elevates cortisol and adrenaline, which raise blood pressure and promote inflammation. Evidence-based strategies include:
- Mindfulness-based stress reduction (MBSR)
- Regular physical activity
- Adequate sleep (7–9 hours per night)
- Social connection and support networks

### 6. Know Your Numbers
Annual health checks should include:
- Blood pressure
- Fasting cholesterol panel (LDL, HDL, triglycerides)
- Fasting blood glucose / HbA1c
- BMI and waist circumference
- Resting ECG after age 40

## When to See a Cardiologist

Seek urgent care if you experience:
- Chest pain, pressure, squeezing, or tightness — especially with exertion
- Shortness of breath at rest or with minimal activity
- Palpitations, irregular heartbeat, or sudden rapid heart rate
- Fainting or near-fainting
- Swelling of the legs and ankles
- Sudden severe headache or facial drooping (possible stroke)

Book a routine cardiology review if you have **two or more** modifiable risk factors, or any non-modifiable risk factor combined with a sedentary lifestyle.

## Our Recommendation at Nestiva

Our cardiology team takes a personalised approach to prevention. Using advanced risk calculators (SCORE2, ASCVD), we assess your 10-year cardiovascular event risk and create a tailored prevention plan — from lifestyle counselling to medication when needed.

Prevention is always better — and cheaper — than treatment. Book your cardiovascular health assessment today.`,
    coverImage: { src: "/assets/images/blog/blog-heart-health.jpg", alt: "Heart health and cardiovascular prevention", width: 1200, height: 630 },
    author: {
      id: "author-chen",
      name: "Dr. Amelia Chen",
      designation: "Senior Neurologist",
      avatar: { src: "/assets/images/doctors/dr-amelia-chen.jpg", alt: "Dr. Amelia Chen" },
      bio: "Board-certified neurologist with 15+ years of clinical experience in stroke and cerebrovascular medicine.",
    },
    category: { id: "cat-cardiology", slug: "cardiology", name: "Cardiology", color: "hsl(0, 84%, 60%)" },
    tags: [
      { id: "t1", slug: "heart-health", name: "Heart Health" },
      { id: "t2", slug: "prevention", name: "Prevention" },
      { id: "t7", slug: "lifestyle", name: "Lifestyle" },
    ],
    status: "published",
    featured: true,
    readingTime: 8,
    views: 4821,
    publishedAt: "2024-11-15T08:00:00Z",
    updatedAt: "2024-11-15T08:00:00Z",
  },
  {
    id: "blog-orthopaedic-2024",
    slug: "minimally-invasive-orthopaedic-surgery",
    title: "Minimally Invasive Orthopaedic Surgery: What Patients Need to Know",
    excerpt:
      "Modern orthopaedic techniques have revolutionised joint replacement and spine surgery. Smaller incisions mean faster recovery, less pain, and better outcomes — here's how we do it at Nestiva.",
    content: `## The Revolution in Orthopaedic Surgery

Orthopaedic surgery has undergone a transformation in the past two decades. What once required large incisions, weeks in hospital, and months of recovery can now often be achieved through small keyhole incisions, with patients walking the same day and home within 48 hours.

At Nestiva, over 70% of our elective orthopaedic procedures are now performed using minimally invasive techniques.

## What is Minimally Invasive Orthopaedic Surgery?

Minimally invasive surgery (MIS) uses small incisions — typically 2–4 cm compared to 15–30 cm in traditional open surgery — through which specialised instruments and a camera are inserted. The surgeon operates while viewing a high-definition video feed, often magnified to reveal structures not visible to the naked eye.

### Key Techniques We Use

**Arthroscopy** — A camera (arthroscope) is inserted into a joint through a small incision. Used for knee, shoulder, hip, ankle, and wrist procedures including:
- ACL and meniscus repair
- Rotator cuff repair
- Hip labral repair
- Removal of loose bodies

**Minimally Invasive Total Knee Replacement (MIS-TKR)** — Through a 10–12 cm incision (vs. 20–30 cm traditional), we perform complete knee replacement with significantly less muscle disruption.

**Minimally Invasive Hip Replacement (MIS-THR)** — Single or two-incision approaches that preserve the hip capsule and surrounding muscles, reducing dislocation risk and allowing same-day mobilisation.

**Robotic-Assisted Joint Replacement** — Our da Vinci and MAKO robotic systems provide:
- Pre-operative CT-based 3D planning
- Real-time bone cutting accuracy to within 1 mm
- Optimal implant positioning for each patient's anatomy

**Endoscopic Spine Surgery** — Disc herniations, spinal stenosis, and foraminal narrowing treated through 7–8 mm incisions under endoscopic visualisation.

## Benefits Compared to Traditional Open Surgery

| | Traditional Open | Minimally Invasive |
|---|---|---|
| Incision length | 20–30 cm | 3–12 cm |
| Hospital stay | 5–7 days | 1–2 days |
| Blood loss | 500–1000 mL | 100–250 mL |
| Return to work | 8–12 weeks | 3–6 weeks |
| Post-op pain | Significant | Moderate/Mild |
| Complication rate | Higher | Lower |

## Are You a Candidate?

Most patients with the following conditions are candidates for minimally invasive approaches:

**Knee:** Osteoarthritis, ACL tears, meniscus tears, patellar instability  
**Hip:** Osteoarthritis, labral tears, femoroacetabular impingement, avascular necrosis  
**Spine:** Disc herniation, spinal stenosis, spondylolisthesis, compression fractures  
**Shoulder:** Rotator cuff tears, shoulder impingement, SLAP tears, instability

Patients with severe deformity, revision surgery, or significant bone loss may still require traditional open approaches — our team will assess your suitability.

## What to Expect: The Nestiva Patient Journey

### Pre-operative
- Comprehensive assessment including X-ray, MRI, and CT planning
- Blood tests and anaesthetic review
- Physiotherapy pre-habilitation to strengthen surrounding muscles
- Medical optimisation (blood sugar, blood pressure, anticoagulation management)

### Day of Surgery
- Admission 2 hours before surgery
- Spinal or general anaesthesia (most joint replacements use spinal)
- Surgery: 60–90 minutes for knee/hip replacement
- Post-anaesthesia recovery: 1–2 hours

### Recovery
- **Day 1:** Walking with a frame, physiotherapy begins
- **Day 2–3:** Discharge home with exercise programme
- **Week 2–4:** Driving, light activities
- **Week 6–12:** Return to sport and full activities

## Our Enhanced Recovery After Surgery (ERAS) Programme

Nestiva's ERAS protocol systematically reduces complications and shortens recovery:
- **Pre-operative carbohydrate loading** rather than prolonged fasting
- **Multimodal pain management** combining regional nerve blocks, anti-inflammatory drugs, and targeted analgesics — minimising opioid use
- **Early mobilisation:** Patients are standing within 4 hours of surgery
- **Wound infiltration** with local anaesthetic for additional pain control
- **Nutritional support** and hydration optimisation

## Choosing the Right Surgeon

Ask your orthopaedic surgeon:
1. How many of these procedures have you performed?
2. Do you use robotic assistance? What is your alignment accuracy?
3. What is your hospital's infection rate and revision rate?
4. Will I participate in an ERAS programme?

At Nestiva, our orthopaedic team performs over 2,500 procedures annually with a 97.8% success rate and revision rate below 1%.`,
    coverImage: { src: "/assets/images/blog/blog-orthopaedic.jpg", alt: "Modern orthopaedic surgery techniques", width: 1200, height: 630 },
    author: {
      id: "author-reid",
      name: "Dr. Marcus Reid",
      designation: "Lead Orthopaedic Surgeon",
      avatar: { src: "/assets/images/doctors/dr-marcus-reid.jpg", alt: "Dr. Marcus Reid" },
      bio: "Fellowship-trained orthopaedic surgeon specialising in robotic-assisted joint replacement and sports medicine.",
    },
    category: { id: "cat-ortho", slug: "orthopaedics", name: "Orthopaedics", color: "hsl(210, 100%, 40%)" },
    tags: [
      { id: "t3", slug: "surgery", name: "Surgery" },
      { id: "t4", slug: "recovery", name: "Recovery" },
      { id: "t8", slug: "joints", name: "Joint Health" },
    ],
    status: "published",
    featured: true,
    readingTime: 6,
    views: 3156,
    publishedAt: "2024-10-28T09:00:00Z",
    updatedAt: "2024-10-28T09:00:00Z",
  },
  {
    id: "blog-pediatrics-2024",
    slug: "childhood-vaccinations-parents-guide",
    title: "Childhood Vaccinations: A Complete Parent's Guide for 2024",
    excerpt:
      "Vaccines are one of medicine's greatest achievements. Our paediatric team answers the most common parent questions about vaccine schedules, safety data, and what to expect at each visit.",
    content: `## Why Vaccines Are One of Medicine's Greatest Achievements

Vaccines have saved more lives than almost any other medical intervention in history. Diseases that once killed or disabled millions of children — smallpox, polio, measles — are now preventable or eliminated.

Yet despite overwhelming evidence, vaccine hesitancy remains a challenge. Our paediatric team at Nestiva answers the most common questions we hear from parents, based on the best available evidence.

## The UK / International Immunisation Schedule

### Birth
- **Hepatitis B** (if mother is hepatitis B positive)

### 8 Weeks
- **6-in-1** (DTaP/IPV/Hib/Hep B) — Diphtheria, tetanus, whooping cough, polio, Hib, hepatitis B
- **Rotavirus** (oral)
- **MenB** — Meningococcal B

### 12 Weeks
- **6-in-1** (2nd dose)
- **Rotavirus** (2nd dose, oral)
- **PCV** (Pneumococcal)

### 16 Weeks
- **6-in-1** (3rd dose)
- **MenB** (2nd dose)

### 12–13 Months
- **MMR** — Measles, mumps, rubella
- **MenB** (booster)
- **MenC**
- **Hib/MenC** (booster)
- **PCV** (booster)

### 2–3 Years Annually
- **Influenza** (nasal spray)

### 3 Years 4 Months
- **4-in-1 pre-school booster** (DTaP/IPV)
- **MMR** (2nd dose)

### 12–13 Years (Girls and Boys)
- **HPV** — Human papillomavirus (2 doses)

### 14 Years
- **3-in-1 teenage booster** (Td/IPV)
- **MenACWY**

## The Most Common Questions We Hear

### "Are vaccines safe?"

Vaccines are among the most rigorously tested medical products in history. Before licensing, each vaccine undergoes:
- Phase I, II, and III clinical trials involving tens of thousands of participants
- Review by independent safety committees
- Approval by regulatory bodies (MHRA, FDA, EMA)
- Ongoing post-marketing surveillance (Yellow Card scheme, VAERS)

Serious adverse events are rare — typically less than 1 in 100,000 doses. The risks of the diseases vaccines prevent are far greater.

### "Can my child receive multiple vaccines at once?"

Yes. A baby's immune system can respond to thousands of antigens simultaneously from birth. The combination vaccines in the schedule are carefully designed to maximise immunity while minimising the number of injections. Studies consistently show no evidence of "immune overload."

### "Do vaccines cause autism?"

No. This claim originates from a 1998 study that was later found to be fraudulent, resulting in the retraction of the paper and the author losing his medical licence. Since then, studies involving over 1.2 million children in multiple countries have found no link between any vaccine and autism.

### "What if my child has an egg allergy?"

Most vaccines are safe for egg-allergic children, including MMR. The influenza vaccine contains small amounts of egg protein — speak with your paediatrician, as most children with egg allergy can still receive it under observation.

### "Can I delay the schedule?"

We strongly recommend following the standard schedule. Delaying vaccines leaves children vulnerable to serious diseases during the period when they are most vulnerable. There is no scientific evidence that delayed or alternative schedules are safer.

### "Which vaccines might cause reactions?"

After any vaccine, children may experience:
- **Local reactions:** Redness, swelling, or tenderness at the injection site (common, resolves in 1–2 days)
- **Systemic reactions:** Low-grade fever, irritability, mild rash (common, resolves in 1–3 days)
- **Febrile convulsion:** Rare (1 in 3,000 MMR doses) — concerning but generally not harmful
- **Anaphylaxis:** Very rare (1–2 per million doses) — managed immediately in clinic

### "What should I do after vaccination?"

- **Stay for 15 minutes** after the injection for observation
- **Paracetamol/ibuprofen** for fever or discomfort (check age-appropriate dosing)
- **Breastfeed** if possible — this soothes babies
- **Watch for:** Fever above 39°C, persistent crying for more than 3 hours, rash, or any concerning symptoms — contact your doctor or NHS 111

## Our Paediatric Promise at Nestiva

We understand that watching your child receive injections is distressing. Our paediatric team makes the experience as gentle and calm as possible:

- **Distraction techniques** (bubbles, music, stories) during injections
- **Topical anaesthetic cream** (EMLA) available — ask your nurse in advance
- **Child-friendly consultation rooms** designed to reduce anxiety
- **Digital vaccine records** available immediately in our patient portal
- **Same-day callbacks** for any post-vaccine concerns

If you have questions about your child's vaccine schedule, our paediatric nurses run a weekly open clinic — no appointment needed.`,
    coverImage: { src: "/assets/images/blog/blog-pediatrics.jpg", alt: "Childhood vaccinations and pediatric care", width: 1200, height: 630 },
    author: {
      id: "author-hayes",
      name: "Dr. Oliver Hayes",
      designation: "Lead Paediatrician",
      avatar: { src: "/assets/images/doctors/dr-oliver-hayes.jpg", alt: "Dr. Oliver Hayes" },
      bio: "Specialist in neonatology and general paediatrics with 14 years of experience caring for children from birth to adolescence.",
    },
    category: { id: "cat-paediatrics", slug: "paediatrics", name: "Paediatrics", color: "hsl(174, 62%, 42%)" },
    tags: [
      { id: "t5", slug: "child-health", name: "Child Health" },
      { id: "t6", slug: "vaccines", name: "Vaccines" },
      { id: "t9", slug: "prevention", name: "Prevention" },
    ],
    status: "published",
    featured: true,
    readingTime: 9,
    views: 5892,
    publishedAt: "2024-10-05T10:00:00Z",
    updatedAt: "2024-10-05T10:00:00Z",
  },
  {
    id: "blog-neurology-2024",
    slug: "understanding-migraine-triggers-treatments",
    title: "Migraines Beyond the Headache: Triggers, Treatment & Prevention",
    excerpt:
      "Migraine affects 1 in 7 people and is the second most disabling neurological condition worldwide. Our neurologists explain the science behind migraines and the most effective modern treatments.",
    content: `## More Than Just a Headache

Migraine is frequently dismissed as "just a bad headache" — yet it is a complex neurological disorder that affects over 1 billion people worldwide, making it the second most disabling disease globally.

Migraine causes throbbing, usually one-sided head pain lasting 4–72 hours, often accompanied by nausea, vomiting, and extreme sensitivity to light and sound. For many patients, it means hours or days of lost productivity, missed family moments, and significant impact on mental health.

## The Neuroscience of Migraine

Migraine is caused by a cascade of neurological events beginning in the brainstem and cortex. Current understanding involves:

**Cortical spreading depression** — A wave of electrical activity that sweeps across the brain, followed by suppression. This is responsible for the aura phase.

**Trigeminovascular activation** — The trigeminal nerve releases inflammatory substances that dilate meningeal blood vessels and generate pain signals.

**CGRP (Calcitonin Gene-Related Peptide)** — A neuropeptide that plays a central role in migraine pain. The discovery of CGRP's role has led to the most significant advances in migraine treatment in 25 years.

## The Four Phases of Migraine

### Phase 1: Prodrome (hours to days before)
Many patients experience warning symptoms: mood changes, food cravings, neck stiffness, frequent yawning, or increased urination.

### Phase 2: Aura (30–60 minutes, in ~25% of patients)
Reversible neurological symptoms including:
- Visual disturbances (scintillating scotoma, zig-zag lines, blind spots)
- Sensory symptoms (tingling, numbness spreading up an arm or face)
- Speech difficulty
- Rarely: motor weakness (hemiplegic migraine)

### Phase 3: Headache (4–72 hours)
Moderate-to-severe throbbing pain, usually one-sided, worsened by movement, accompanied by nausea/vomiting and photophobia/phonophobia.

### Phase 4: Postdrome ("migraine hangover")
Fatigue, cognitive fog, and mood changes lasting 24–48 hours after the headache resolves.

## Common Triggers

Triggers do not cause migraine but may provoke an attack in susceptible individuals. Common ones include:

**Hormonal:** Oestrogen fluctuations (menstrual migraine affects 70% of women with migraine)  
**Dietary:** Alcohol (especially red wine), caffeine withdrawal, MSG, processed meats, skipping meals  
**Sleep:** Too much or too little sleep, jet lag, shift work  
**Environmental:** Bright or flickering lights, strong smells, weather changes, high altitude  
**Stress:** Both acute stress and the "let-down" after stress resolves  
**Medications:** Overuse of pain relievers (leading to medication overuse headache)

Keeping a headache diary for 4–8 weeks helps identify your personal triggers.

## Treatment: Acute (Abortive) Therapy

### First-Line for Mild-Moderate Attacks
- NSAIDs (ibuprofen 400–600 mg, naproxen 500 mg) — most effective when taken early
- Aspirin 1,000 mg + metoclopramide (for nausea)
- Paracetamol (less effective alone but combined with antiemetics)

### For Moderate-Severe Attacks: Triptans
Triptans (sumatriptan, rizatriptan, eletriptan, zolmitriptan) are serotonin agonists that constrict dilated blood vessels and block CGRP release. Effective in 60–70% of patients.

Available as: tablets, nasal sprays (faster onset), and subcutaneous injections (for severe attacks with vomiting).

### New: Gepants and Ditans
- **Gepants** (rimegepant, ubrogepant) — CGRP receptor antagonists. Effective without the cardiovascular restrictions of triptans.
- **Lasmiditan** — A selective serotonin agonist without vasoconstriction, safe in patients with heart disease.

## Treatment: Preventive Therapy

Consider prevention if you have **4+ migraine days/month**, attacks significantly impairing function, or medication overuse.

**Traditional preventives:** Beta-blockers (propranolol, metoprolol), topiramate, amitriptyline, valproate

**CGRP-targeted preventives (most significant advance in 25 years):**
- **Anti-CGRP monoclonal antibodies:** Erenumab (Aimovig), fremanezumab (Ajovy), galcanezumab (Emgality) — monthly or quarterly injections reducing migraine days by 50% in many patients
- **Atogepant** — Daily oral CGRP antagonist for prevention

## When to See a Neurologist Urgently

Seek emergency care if your headache:
- Is the worst headache of your life ("thunderclap")
- Begins after a head injury
- Is accompanied by fever, stiff neck, rash, or confusion
- Progressively worsens over days or weeks
- Is associated with new neurological symptoms (weakness, vision loss, speech problems)

Book a neurology appointment if:
- You have more than 4 headache days per month
- Your pain is not controlled by over-the-counter medications
- Migraine is significantly impacting your quality of life
- You are pregnant or planning pregnancy and need treatment advice`,
    coverImage: { src: "/assets/images/blog/blog-migraine.jpg", alt: "Migraine neurology treatment", width: 1200, height: 630 },
    author: {
      id: "author-amelia",
      name: "Dr. Amelia Chen",
      designation: "Senior Neurologist",
      avatar: { src: "/assets/images/doctors/dr-amelia-chen.jpg", alt: "Dr. Amelia Chen" },
      bio: "Board-certified neurologist specialising in headache disorders, stroke, and cerebrovascular disease.",
    },
    category: { id: "cat-neuro", slug: "neurology", name: "Neurology", color: "hsl(270, 70%, 55%)" },
    tags: [
      { id: "t10", slug: "migraine", name: "Migraine" },
      { id: "t11", slug: "neurology", name: "Neurology" },
      { id: "t2", slug: "prevention", name: "Prevention" },
    ],
    status: "published",
    featured: false,
    readingTime: 9,
    views: 2840,
    publishedAt: "2024-09-12T08:00:00Z",
    updatedAt: "2024-09-12T08:00:00Z",
  },
  {
    id: "blog-oncology-2024",
    slug: "cancer-early-detection-screening",
    title: "Cancer Early Detection: The Screening Tests That Could Save Your Life",
    excerpt:
      "When detected early, many cancers are curable. Our oncology team outlines the screening tests recommended by age, gender, and risk profile — and when to start.",
    content: `## Why Early Detection Saves Lives

The five-year survival rate for localised breast cancer is over 99%. For breast cancer detected at stage IV, it falls to 28%. This stark difference illustrates why cancer screening — finding cancer before symptoms develop — can be genuinely life-saving.

Screening detects cancer or precancerous changes in people with no symptoms, at a stage when treatment is most effective and often less aggressive.

## Breast Cancer Screening

**Who:** Women aged 50–70 (NHS); consider from 40–49 if family history  
**Test:** Mammography every 3 years (NHS) or annually (high-risk patients)  
**Additional tests for high-risk:** Breast MRI, genetic testing (BRCA1/2)

### Risk factors warranting earlier screening:
- Mother or sister with breast cancer before 50
- Confirmed BRCA1 or BRCA2 mutation
- Previous chest radiotherapy (e.g., for lymphoma)

## Cervical Cancer Screening

**Who:** Women/people with a cervix aged 25–64  
**Test:** Cervical screening (smear test) — now tests for HPV primary

- Ages 25–49: every 3 years
- Ages 50–64: every 5 years
- HPV-vaccinated individuals still require screening

## Bowel Cancer Screening

**Who:** Ages 50–74 (NHS programme expanding to 50)  
**Test:** Faecal Immunochemical Test (FIT) — home stool sample kit every 2 years  
**If FIT positive:** Colonoscopy

### High-risk groups (earlier/more frequent colonoscopy):
- Family history of bowel cancer
- Hereditary syndromes (Lynch syndrome, FAP)
- Personal history of adenomatous polyps
- Long-standing inflammatory bowel disease

## Lung Cancer Screening

**Who (high-risk targeted programme):** Ages 55–74 with significant smoking history  
**Test:** Low-dose CT (LDCT) of the chest annually

The UK Targeted Lung Health Check programme is rolling out nationally. Evidence shows LDCT screening reduces lung cancer mortality by 20%.

## Prostate Cancer Screening

**Situation:** No formal UK national screening programme currently  
**PSA test:** Available on request to men aged 50+ after informed discussion

Men with family history of prostate cancer or Black African/Caribbean ethnicity (higher risk) should discuss PSA testing with their GP from age 45.

## Skin Cancer

**Self-examination:** Monthly skin check using the ABCDE rule:
- **A**symmetry
- **B**order irregularity
- **C**olour variation
- **D**iameter > 6 mm
- **E**volving (any change)

See a dermatologist annually if you have: fair skin, many moles, family history of melanoma, or significant UV exposure history.

## When and How Often to See Our Oncology Team

If you have a significant family history of any cancer — particularly breast, ovarian, bowel, or prostate cancer — we offer:

**Family History Clinic:** Formal risk assessment, genetic counselling, and personalised surveillance plan

**Genetic Testing:** BRCA1/2, Lynch syndrome, and other hereditary cancer gene panels where clinically indicated

**CT Colonography:** Virtual colonoscopy for bowel assessment without sedation

Our multidisciplinary cancer team meets weekly to review complex cases and ensure every patient receives an evidence-based, personalised approach.

## The Bottom Line

Screening is not perfect — no test is. False positives lead to anxiety and sometimes unnecessary investigations. But for the cancers with established screening programmes, the evidence clearly shows more lives saved than harm caused.

Don't wait for symptoms. Book your age-appropriate screening today.`,
    coverImage: { src: "/assets/images/blog/blog-cancer.jpg", alt: "Cancer screening and early detection", width: 1200, height: 630 },
    author: {
      id: "author-sharma",
      name: "Dr. Priya Sharma",
      designation: "Senior Oncologist",
      avatar: { src: "/assets/images/doctors/dr-priya-sharma.jpg", alt: "Dr. Priya Sharma" },
      bio: "Haematology and medical oncology specialist focused on personalised cancer care and evidence-based prevention.",
    },
    category: { id: "cat-oncology", slug: "oncology", name: "Oncology", color: "hsl(15, 90%, 55%)" },
    tags: [
      { id: "t12", slug: "cancer", name: "Cancer" },
      { id: "t2", slug: "prevention", name: "Prevention" },
      { id: "t13", slug: "screening", name: "Screening" },
    ],
    status: "published",
    featured: false,
    readingTime: 7,
    views: 3620,
    publishedAt: "2024-08-20T10:00:00Z",
    updatedAt: "2024-08-20T10:00:00Z",
  },
];

export default blogs;
