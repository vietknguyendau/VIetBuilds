import { Download } from "lucide-react";
import { profile } from "@/content/profile";
import { cn, isPublicUrl } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Todo } from "./ui";

/** LinkedIn / GitHub / résumé links. Each one only renders once its URL is set in profile.ts. */
export function SocialLinks({ className, showResume = false }: { className?: string; showResume?: boolean }) {
  const { linkedin, github, resume } = profile.links;
  const iconLink =
    "inline-flex size-11 items-center justify-center rounded-full border border-line bg-bg-elevated text-fg-muted transition-all hover:-translate-y-0.5 hover:border-accent-strong hover:text-fg";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {isPublicUrl(linkedin) ? (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" className={iconLink}>
          <LinkedInIcon className="size-[18px]" />
        </a>
      ) : (
        <Todo>Add your LinkedIn URL in src/content/profile.ts</Todo>
      )}
      {isPublicUrl(github) ? (
        <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)" className={iconLink}>
          <GitHubIcon className="size-[18px]" />
        </a>
      ) : null}
      {showResume && resume ? (
        <a
          href={resume}
          download
          className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-bg-elevated px-4 text-sm font-medium text-fg-muted transition-all hover:-translate-y-0.5 hover:border-accent-strong hover:text-fg"
        >
          <Download className="size-4" aria-hidden="true" /> Résumé
        </a>
      ) : null}
    </div>
  );
}
