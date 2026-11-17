import Link from "next/link";
import { profile } from "@/content/profile";
import { BrandMark } from "./brand-mark";
import { SocialLinks } from "./social-links";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="pb-10 pt-16 sm:pt-24">
      <Container>
        <div className="flex flex-col gap-8 border-t border-hair px-1 pt-8 sm:flex-row sm:items-start sm:justify-between sm:px-2">
          <div>
            <BrandMark />
            <p className="mt-3 max-w-[40ch] text-[0.9375rem] text-ink-2">
              I understand business problems, enjoy creating solutions, and turn ideas into working digital experiences.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:items-end">
            <nav aria-label="Footer" className="flex gap-5 text-[0.9375rem] text-ink-2">
              <Link href="/projects" className="hover:text-ink">
                Projects
              </Link>
              <Link href="/#contact" className="hover:text-ink">
                Contact
              </Link>
            </nav>
            <SocialLinks />
            <p className="text-sm text-ink-3">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
