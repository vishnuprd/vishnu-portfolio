import { Background } from "@/components/Background";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { SystemDesign } from "@/components/sections/SystemDesign";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { Certifications } from "@/components/sections/Certifications";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";

import { getSiteContent } from "@/lib/content";

// Admin saves revalidate this instantly; this is just a safety-net refresh
// for content changed directly in the Supabase dashboard.
export const revalidate = 3600;

export default async function Home() {
  const content = await getSiteContent();

  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Background />
      <Cursor />
      <Navbar navLinks={content.navLinks} profile={content.profile} />
      <BackToTop />
      <ThemeSwitcher />

      <main id="main" className="relative">
        <Hero profile={content.profile} />
        <About about={content.about} stats={content.stats} />
        <Skills skillGroups={content.skillGroups} />
        <Experience experience={content.experience} />
        <Projects projects={content.projects} />
        <SystemDesign
          architectureLayers={content.architectureLayers}
          designPillars={content.designPillars}
        />
        <GitHubStats profile={content.profile} />
        <Certifications certifications={content.certifications} />
        <Testimonials testimonials={content.testimonials} />
        <Blog blogPosts={content.blogPosts} />
        <Contact profile={content.profile} />
      </main>

      <Footer navLinks={content.navLinks} profile={content.profile} />
    </>
  );
}
