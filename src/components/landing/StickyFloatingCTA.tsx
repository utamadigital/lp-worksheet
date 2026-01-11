"use client";

import { useEffect, useMemo, useState } from "react";

function formatIDR(n: number) {
  return `Rp ${Math.round(n).toLocaleString("id-ID")}`;
}

function scrollToPricingAndFocus() {
  const el = document.getElementById("pricing");
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // highlight section (sementara)
  el.classList.add("ud-highlight");
  window.setTimeout(() => el.classList.remove("ud-highlight"), 1400);

  // fokuskan kartu pertama
  window.setTimeout(() => {
    const firstCard = document.querySelector("#pricing [role='radio']") as
      | HTMLElement
      | null;
    firstCard?.focus?.();
  }, 450);
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
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // ✅ hanya aktif jika paket sudah dipilih
  const canCheckout = !!checkoutUrl && promoPrice > 0 && compareAtPrice > 0;

  const packNormal = compareAtPrice;
  const packPromo = promoPrice;

  const totalPrice = useMemo(
    () => packPromo + (bumpSelected ? bumpPrice : 0),
    [packPromo, bumpSelected, bumpPrice]
  );

  const savings = useMemo(() => Math.max(0, packNormal - packPromo), [packNormal, packPromo]);

  const savingsPct = useMemo(() => {
    if (packNormal <= 0) return 0;
    return Math.round((savings / packNormal) * 100);
  }, [savings, packNormal]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setShow(y > showAfterPx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPx]);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  }

  if (!show) return null;

  return (
    <>
      <style jsx global>{`
        .ud-highlight {
          outline: 4px solid rgba(251, 191, 36, 0.55);
          border-radius: 24px;
          box-shadow: 0 0 0 10px rgba(251, 191, 36, 0.15);
          animation: udPulse 1.2s ease-in-out 1;
        }
        @keyframes udPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.25);
          }
          50% {
            box-shadow: 0 0 0 14px rgba(251, 191, 36, 0.18);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
          }
        }
      `}</style>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[60] w-[92%] max-w-sm -translate-x-1/2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-[50] border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-slate-600">Checkout instan</p>

            {canCheckout ? (
              <>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-sm font-extrabold text-slate-900">
                    {formatIDR(totalPrice)}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 line-through">
                    {formatIDR(packNormal)}
                  </span>
                  {savingsPct > 0 ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700 ring-1 ring-emerald-200">
                      Hemat {savingsPct}%
                    </span>
                  ) : null}
                </div>

<p className="mt-1 text-[11px] font-semibold text-slate-600">Sekali beli • print ulang seumur hidup</p>
</>
            ) : (
              <p className="mt-0.5 text-sm font-extrabold text-slate-900">
                Pilih paket dulu
              </p>
            )}
          </div>

          <button
            type="button"
            aria-            onClick={() => {
              if (!canCheckout) {
                showToast("Pilih salah satu paket dulu ya 😊");
                scrollToPricingAndFocus();
                return;
              }
              // ✅ full page redirect (same tab)
              window.location.href = checkoutUrl;
            }}
            aria-
            className={[
              "inline-flex h-12 items-center justify-center rounded-2xl px-4 text-sm font-extrabold transition focus:outline-none focus:ring-2 focus:ring-emerald-200",
              canCheckout
                ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99]"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300",
            ].join(" ")}
          >
            {canCheckout ? "Lanjut Bayar" : "Pilih paket dulu"}
          </button>
        </div>

        {!canCheckout ? (
          <div className="mx-auto max-w-6xl px-4 pb-3">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
              Tap salah satu kartu paket di atas untuk mengaktifkan tombol bayar.
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
