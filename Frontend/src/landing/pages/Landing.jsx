import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedStores from "../components/TrustedStores";
import WhyChooseUs from "../components/WhyChooseUs";
import DashboardPreview from "../components/DashboardPreview";
import Features from "../components/Features";
import Workflow from "../components/Workflow";
import Modules from "../components/Modules";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

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