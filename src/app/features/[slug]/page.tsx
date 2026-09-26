import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import DocumentTitle from "@/components/DocumentTitle";
import FeaturePage from "@/components/showcase/FeaturePage";
import { getModule, moduleSlugs } from "@/lib/features";
import { en } from "@/lib/i18n/en";
import { site } from "@/lib/site";

type Params = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return moduleSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const mod = getModule(params.slug);
  if (!mod) return {};
  const copy = en.features.modules[mod.slug];
  return {
    title: `${copy.label} — ${site.name}`,
    description: copy.subtitle,
  };
}

export default function FeatureRoute({ params }: Params) {
  const mod = getModule(params.slug);
  if (!mod) notFound();
  return (
    <>
      <DocumentTitle slug={mod.slug} />
      <Navbar />
      <main>
        <FeaturePage slug={mod.slug} />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
