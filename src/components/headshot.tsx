import Image from "next/image";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

/** Shows the headshot from profile.ts, or a tasteful monogram placeholder until one is added. */
export function Headshot({ className, size = 96 }: { className?: string; size?: number }) {
  const { src, alt } = profile.headshot;
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full p-[2px]",
        "bg-[conic-gradient(from_200deg,var(--color-amber-400),var(--color-spruce-600),var(--color-moss),var(--color-amber-400))]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <div className="relative size-full overflow-hidden rounded-full bg-spruce-800">
        {src ? (
          <Image src={src} alt={alt} fill sizes={`${size}px`} className="object-cover" priority />
        ) : (
          <div
            role="img"
            aria-label="Headshot placeholder"
            className="flex size-full items-center justify-center bg-gradient-to-br from-spruce-700 to-spruce-950 font-display font-semibold text-amber-300"
            style={{ fontSize: size * 0.3 }}
          >
            VN
          </div>
        )}
      </div>
    </div>
  );
}
