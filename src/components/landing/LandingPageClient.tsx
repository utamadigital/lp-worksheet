"use client";

import { useMemo, useState } from "react";
import { track } from "@/lib/tracking";
import ContentIndexSection from "./ContentIndexSection";
import HeroSection from "./HeroSection";
import QuickPickSection from "./QuickPickSection";
import MiniProofStrip from "./MiniProofStrip";
import PricingSection, { type PlanId, COMPARE_AT } from "./PricingSection";
import SocialProofSection from "./SocialProofSection";
import PreviewSection from "./PreviewSection";
import HowItWorksSection from "./HowItWorksSection";
import BonusSection from "./BonusSection";
import FAQSection from "./FAQSection";
import GuaranteeSection from "./GuaranteeSection";
import StickyFloatingCTA from "./StickyFloatingCTA";
import CheckoutModalProvider from "./CheckoutModalProvider";

const PRICE_BASIC = 69_000;
const PRICE_BUNDLE = 99_000;
const BUMP_PRICE = 19_000;

/**
 * TODO: ganti dengan link checkout kamu masing-masing
 * basic = 69rb
 * bundle = 99rb
 * basic+bump = 69+19
 * bundle+bump = 99+19
 */
const CHECKOUT_LINKS: Record<PlanId, { noBump: string; bump: string }> = {
  basic: {
    noBump: "https://keyka.form.id/basic",
    bump: "https://keyka.form.id/basic-bump",
  },
  bundle: {
    noBump: "https://keyka.form.id/Bundle",
    bump: "https://keyka.form.id/bundle-bump",
  },
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LandingPageClient() {
  // ✅ default: user belum memilih paket
  const [selectedId, setSelectedId] = useState<PlanId | null>(null);
  const [bumpSelected, setBumpSelected] = useState(false);

  // ✅ AddToCart hanya saat user benar-benar memilih paket (bukan default)
  const handleSelectPlan = (id: PlanId) => {
    if (selectedId === id) return;

    const value = id === "basic" ? PRICE_BASIC : PRICE_BUNDLE;
    track("AddToCart", {
      content_type: "product",
      content_ids: [id],
      content_name: id === "basic" ? "Basic" : "Bundle",
      value,
      currency: "IDR",
    });

    setSelectedId(id);
  };

  const plans = useMemo(
    () => [
      { id: "basic" as const, name: "Basic", price: PRICE_BASIC, desc: "", features: [] },
      { id: "bundle" as const, name: "Bundle", price: PRICE_BUNDLE, desc: "", features: [] },
    ],
    []
  );

  const checkoutUrl = useMemo(() => {
    if (!selectedId) return "";
    const links = CHECKOUT_LINKS[selectedId];
    return bumpSelected ? links.bump : links.noBump;
  }, [selectedId, bumpSelected]);

  const promoPrice = selectedId
    ? plans.find((p) => p.id === selectedId)?.price ?? 0
    : 0;
  const compareAtPrice = selectedId ? COMPARE_AT[selectedId] : 0;


  const goToPricing = () => {
    scrollToId("pricing");

    // Kalau belum pilih paket, fokuskan kartu pertama.
    // Kalau sudah pilih, fokuskan tombol checkout.
    window.setTimeout(() => {
      if (!selectedId) {
        const firstCard = document.querySelector(
          "#pricing [role='radio']"
        ) as HTMLElement | null;
        firstCard?.focus?.();
        return;
      }

      const cta = document.querySelector(
        '#pricing [data-track="initiate_checkout"]'
      ) as HTMLElement | null;
      cta?.focus?.();
    }, 350);
  };

  const goToPreview = () => scrollToId("preview");

  return (
    <CheckoutModalProvider>
      <div className="bg-slate-50">
      {/* HERO */}
      <HeroSection onPrimary={goToPricing} onSecondary={goToPreview} />

      {/* 1) Quick pick (sekali saja) */}
      <div className="mt-6">
        <QuickPickSection selectedId={selectedId} onPick={handleSelectPlan} />
      </div>

      {/* 2) Mini proof strip SEBELUM pricing (lebih kebaca + bikin aman dulu) */}
      <div className="mt-4">
        <MiniProofStrip />
      </div>

      {/* 3) Pricing: keputusan beli lebih cepat */}
      <PricingSection
        plans={plans}
        selectedId={selectedId}
        onSelect={handleSelectPlan}
        bumpSelected={bumpSelected}
        onToggleBump={setBumpSelected}
        bumpPrice={BUMP_PRICE}
        checkoutUrl={checkoutUrl}
      />

      {/* Mini divider: transisi halus dari keputusan harga -> bukti sosial */}
      <div className="mx-auto max-w-screen-xl px-5 sm:px-6 lg:px-10">
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="shrink-0 text-xs font-extrabold text-slate-500">
            Dipakai &amp; disukai orang tua
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      </div>

      {/* sisanya: bukti + edukasi */}
      <SocialProofSection ctaHref="#pricing" />
      <PreviewSection />
<ContentIndexSection />
      <HowItWorksSection onCTA={goToPricing} />
      <BonusSection />
      <FAQSection />
      <GuaranteeSection />

      {/* Floating CTA (langsung ke link checkout sesuai paket terpilih) */}
      <StickyFloatingCTA
        checkoutUrl={checkoutUrl}
        promoPrice={promoPrice}
        compareAtPrice={compareAtPrice}
        bumpSelected={bumpSelected}
        bumpPrice={BUMP_PRICE}
      />
      </div>
    </CheckoutModalProvider>
  );
}
