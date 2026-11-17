import { MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { ContactForm } from "../contact-form";
import { SocialLinks } from "../social-links";
import { Bento, Section, Tile, TileHeading } from "../ui";

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" className="pt-16 sm:pt-24">
      <Bento>
        <Tile size="lg" tone="deep" className="flex flex-col justify-between gap-10 sm:col-span-6 lg:col-span-5 lg:p-12">
          <div>
            <p className="text-mist">Consulting and collaboration</p>
            <h2 id="contact-title" className="mt-3 text-[2.25rem] font-semibold text-balance sm:text-[3rem]">
              Have a problem worth solving?
            </h2>
            <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed text-mist">
              I enjoy working with people who have ideas, operational challenges, or workflows they believe could work better.
              Let&apos;s explore what technology could make possible.
            </p>
            <p className="mt-4 max-w-[44ch] text-[0.9875rem] leading-relaxed text-mist">
              Good fits: custom tools for a small business, an internal workflow that takes too much time, or an original idea
              you&apos;d like to see working. Recruiters are welcome too.
            </p>
          </div>
          <div className="space-y-5 text-frost">
            <p className="flex items-center gap-2 text-[0.9375rem]">
              <MapPin className="size-4 text-amber-400" aria-hidden="true" /> {profile.location}
            </p>
            <div className="[--hair:rgba(255,255,255,0.15)] [--ink-2:#d3dccf] [--ink:#ffffff]">
              <SocialLinks showResume />
            </div>
          </div>
        </Tile>
        <Tile size="lg" className="sm:col-span-6 lg:col-span-7 lg:p-12">
          <TileHeading id="contact-form-title" title={<span className="text-2xl sm:text-[1.75rem]">Send a message</span>} />
          <div className="mt-7">
            <ContactForm />
          </div>
        </Tile>
      </Bento>
    </Section>
  );
}
