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

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Background />
      <Cursor />
      <Navbar />
      <BackToTop />
      <ThemeSwitcher />

      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <SystemDesign />
        <GitHubStats />
        <Certifications />
        <Testimonials />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
