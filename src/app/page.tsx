import { About } from "@/components/sections/about";
import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { FeaturedProjects } from "@/components/sections/projects";
import { Tools } from "@/components/sections/tools";
import { TrueNorth } from "@/components/sections/truenorth";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <About />
      <TrueNorth />
      <Approach />
      <Tools />
      <Experience />
      <Philosophy />
      <Contact />
    </>
  );
}
