"use client";

import { useEffect, useMemo, useState } from "react";
import { useCheckoutModal } from "./CheckoutModalProvider";

function formatIDR(n: number) {
  // Format: "Rp 69.000"
  return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
}

export default function StickyFloatingCTA({
  checkoutUrl,
  promoPrice,
  compareAtPrice,
  bumpSelected,
  bumpPrice,
  showAfterPx = 520,
}: {
  checkoutUrl: string;
  promoPrice: number;
  compareAtPrice: number;
  bumpSelected: boolean;
  bumpPrice: number;
  /** muncul setelah user scroll minimal sekian px */
  showAfterPx?: number;
}) {
  const { open } = useCheckoutModal();
  const [show, setShow] = useState(false);

  // ✅ jika user belum memilih paket, jangan tampilkan sticky CTA
  const canCheckout = !!checkoutUrl && promoPrice > 0 && compareAtPrice > 0;

  const packNormal = compareAtPrice;
  const packPromo = promoPrice;

  const totalPrice = useMemo(
    () => packPromo + (bumpSelected ? bumpPrice : 0),
    [packPromo, bumpSelected, bumpPrice]
  );

  const savings = useMemo(() => {
    // Savings hanya dari diskon paket (add-on tidak dianggap diskon)
    return Math.max(0, packNormal - packPromo);
  }, [packNormal, packPromo]);

  const savingsPct = useMemo(() => {
    if (!packNormal) return 0;
    return Math.round((savings / packNormal) * 100);
  }, [savings, packNormal]);

  useEffect(() => {
    if (!canCheckout) {
      setShow(false);
      return;
    }

    let ctaInView = false;

    const pricingCta = document.querySelector(
      '#pricing [data-track="initiate_checkout"]'
    ) as HTMLElement | null;

    const observer =
      pricingCta &&
      new IntersectionObserver(
        ([entry]) => {
          ctaInView = !!entry?.isIntersecting;
          update();
        },
        {
          root: null,
          threshold: 0.12,
        }
      );

    if (pricingCta && observer) observer.observe(pricingCta);

    function update() {
      const y = window.scrollY || 0;

      // jangan ganggu kalau udah mendekati bawah (Guarantee/FAQ/footer)
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 220;

      const visible = y > showAfterPx && !nearBottom && !ctaInView;
      setShow(visible);
    }

    function onScroll() {
      update();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAfterPx, canCheckout]);

  if (!show || !canCheckout) return null;

  return (
    <div className="fixed left-1/2 z-50 w-[min(760px,calc(100%-1.5rem))] -translate-x-1/2 bottom-[calc(env(safe-area-inset-bottom)+1rem)]">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:px-5">
        <div className="min-w-0">
          <div className="text-[11px] leading-tight text-slate-600 sm:text-sm whitespace-normal">
            Normal{" "}
            <span className="line-through">{formatIDR(packNormal)}</span>{" "}
            <span className="mx-1">→</span>
            <span className="text-emerald-700">
              Promo {formatIDR(packPromo)}
            </span>{" "}
            <span className="text-emerald-700/90">(Hemat {savingsPct}%)</span>

            {bumpSelected ? (
              <span className="mt-1 block w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 sm:mt-0 sm:ml-2 sm:inline-flex sm:text-xs">
                + Add-on {formatIDR(bumpPrice)}
              </span>
            ) : null}
          </div>

          <div className="mt-0.5 text-base font-extrabold leading-tight text-slate-900 sm:text-lg">
            Total: {formatIDR(totalPrice)}
          </div>

          <div className="mt-0.5 text-xs leading-tight text-slate-600 sm:text-sm whitespace-normal">
            {bumpSelected ? (
              <>
                Termasuk add-on{" "}
                <span className="font-semibold">{formatIDR(bumpPrice)}</span>. Hemat{" "}
                <span className="font-semibold">{formatIDR(savings)}</span> dari harga normal.
              </>
            ) : (
              <>
                Hemat <span className="font-semibold">{formatIDR(savings)}</span> dari harga normal.
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          data-track="initiate_checkout"
          onClick={() => {
            if (!checkoutUrl) return;
            open(checkoutUrl);
          }}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200 sm:h-12 sm:px-7"
          aria-label="Checkout"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
