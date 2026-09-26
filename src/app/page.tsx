import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PosDemo from "@/components/PosDemo";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import DocumentTitle from "@/components/DocumentTitle";

export default function Home() {
  return (
    <>
      <DocumentTitle />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PosDemo />
        <UseCases />
        <Pricing />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
