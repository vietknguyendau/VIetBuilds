import Link from "next/link";
import { profile } from "@/content/profile";
import { BrandMark } from "./brand-mark";
import { SocialLinks } from "./social-links";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <BrandMark />
          <p className="mt-3 max-w-sm text-sm text-fg-muted">
            I understand business problems, enjoy creating solutions, and turn ideas into working digital experiences.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:items-end">
          <nav aria-label="Footer" className="flex gap-5 text-sm text-fg-muted">
            <Link href="/projects" className="hover:text-fg">
              Projects
            </Link>
            <Link href="/#contact" className="hover:text-fg">
              Contact
            </Link>
          </nav>
          <SocialLinks />
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
