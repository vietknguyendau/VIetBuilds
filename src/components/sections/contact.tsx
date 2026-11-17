import { MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { ContactForm } from "../contact-form";
import { SocialLinks } from "../social-links";
import { Section, SectionHeading } from "../ui";

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" className="bg-bg-muted/60">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Consulting & collaboration"
            title="Have a Problem Worth Solving?"
            intro="I enjoy working with people who have ideas, operational challenges, or workflows they believe could work better. Let's explore what technology could make possible."
          />
          <div className="mt-10 space-y-6" data-reveal>
            <p className="text-[15px] leading-relaxed text-fg-muted">
              Good fits include custom tools for a small business, an internal workflow that eats too much time, or an
              original idea you&apos;d like to see working. Recruiters are welcome too.
            </p>
            <p className="flex items-center gap-2 text-sm text-fg-muted">
              <MapPin className="size-4 text-accent" aria-hidden="true" /> {profile.location}
            </p>
            <SocialLinks showResume />
          </div>
        </div>

        <div className="relative rounded-3xl border border-line bg-bg-elevated p-6 shadow-[0_30px_60px_-40px_rgba(16,29,48,0.35)] sm:p-9" data-reveal>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
