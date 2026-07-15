import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import TrustedStores from "../components/landing/TrustedStores";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import DashboardPreview from "../components/landing/DashboardPreview";
import Features from "../components/landing/Features";
import Workflow from "../components/landing/Workflow";
import Modules from "../components/landing/Modules";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#FAF9F7] text-zinc-950">
      <Navbar />
      <main>
        <Hero />
        <TrustedStores />
        <WhyChooseUs />
        <DashboardPreview />
        <Features />
        <Workflow />
        <Modules />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}