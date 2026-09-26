import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CapabilitiesMatrix from "@/components/CapabilitiesMatrix";
import PosDemo from "@/components/PosDemo";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import DocumentTitle from "@/components/DocumentTitle";
import { heroPhoto } from "@/lib/media";

export default function Home() {
  return (
    <>
      <DocumentTitle />
      <Navbar />
      <main>
        <Hero photo={heroPhoto("home")} />
        <PosDemo />
        <CapabilitiesMatrix />
        <UseCases />
        <Pricing />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
