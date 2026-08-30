import AptitudeTestPreview from "../Pages/landing/AptitudeTestPreview";
import CTASection from "../Pages/landing/CTASection";
import Features from "../Pages/landing/Features";
import Footer from "../Pages/landing/Footer";
import Hero from "../Pages/landing/Hero";
import HowItWorks from "../Pages/landing/HowItWorks";
import Navbar from "../Pages/landing/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AptitudeTestPreview />
      <CTASection />
      <Footer />
    </div>
  );
}
