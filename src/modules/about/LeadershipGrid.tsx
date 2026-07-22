"use client";

/**
 * LeadershipGrid — Leadership team photo cards
 */

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { cn } from "@/utils";
import { useReducedMotion } from "@/hooks";
import type { LeadershipMember } from "@/types";

const GRADIENTS = [
  "from-blue-100 to-indigo-200",
  "from-teal-100 to-cyan-200",
  "from-violet-100 to-purple-200",
  "from-amber-100 to-orange-200",
  "from-rose-100 to-pink-200",
  "from-emerald-100 to-green-200",
];

interface LeadershipGridProps {
  members: LeadershipMember[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

function LeaderCard({ member, index }: { member: LeadershipMember; index: number }) {
  const [imgError, setImgError] = useState(false);
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const isReduced = useReducedMotion();

  return (
    <motion.article
      initial={isReduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={isReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      aria-label={`${member.name}, ${member.title}`}
    >
      {/* Photo */}
      <div className="relative h-56 overflow-hidden">
        {!imgError ? (
          <Image
            src={member.image.src}
            alt={member.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={cn("h-full w-full bg-gradient-to-br flex items-center justify-center", gradient)}>
            <span className="font-display text-5xl font-black text-foreground/20 select-none">
              {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
        )}
        {/* Bottom gradient overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
        {/* Qualifications tag */}
        {member.qualifications?.[0] && (
          <div className="absolute bottom-3 left-3 right-3">
            <span className="inline-flex rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-2.5 py-1 text-[10px] font-semibold text-white/90">
              {member.qualifications[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {member.department}
        </p>
        <h3 className="text-base font-bold leading-snug text-foreground">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3 border-t border-border pt-3">
          {member.bio}
        </p>
      </div>
    </motion.article>
  );
}

export function LeadershipGrid({ members, eyebrow = "Our Team", title = "Leadership Team", subtitle }: LeadershipGridProps) {
  return (
    <section className="bg-background py-16 md:py-20" aria-labelledby="leadership-heading">
      <Container className="flex flex-col gap-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          titleId="leadership-heading"
          subtitle={subtitle}
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <LeaderCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
