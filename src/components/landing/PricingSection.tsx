"use client";

import { useMemo, useId, useState } from "react";
import { Check } from "lucide-react";
import BundleContentsBox from "./BundleContentsBox";
import BumpBox from "./BumpBox";


export type PlanId = "basic" | "bundle";

type Plan = {
  id: PlanId;
  name: string;
  price: number;
  desc: string;
  features: string[];
};

const PAGES: Record<PlanId, number> = {
  basic: 1000,
  bundle: 1000, // tetap konservatif untuk konsistensi di LP Islami
};

export const COMPARE_AT: Record<PlanId, number> = {
  basic: 149_000,
  bundle: 249_000,
};

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}

function percentOff(compareAt: number, price: number) {
  if (!compareAt || compareAt <= price) return 0;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

function planTitle(id: PlanId) {
  return id === "basic"
    ? "Basic - Paket Islami 1.000+ lembar"
    : "Bundle - 2 paket (paling hemat)";
}

function planDesc(id: PlanId) {
  return id === "basic"
    ? "Untuk mulai rutinitas belajar Islami harian di rumah (tanpa bingung cari ide)."
    : "Untuk yang ingin variasi aktivitas lebih banyak: Paket Islami + Worksheet Umum 12 seri dalam 1 checkout.";
}

function planFeatures(id: PlanId) {
  return id === "basic"
    ? [
        "Paket Islami 1.000+ lembar (PDF siap cetak A4)",
        "Hijaiyah + harakat + doa harian",
        "Wudhu + adab (kebiasaan baik)",
        "Akses instan + print ulang seumur hidup",
      ]
    : [
        "Paket Islami 1.000+ lembar & Worksheet Umum 1.200+ lembar",
        "Variasi aktivitas lebih banyak (anak tidak cepat bosan)",
        "Siap cetak A4 + print ulang seumur hidup",
        "Akses instan setelah bayar",
      ];
}

function RiskBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-200">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-emerald-700 ring-1 ring-emerald-200">
        ✓
      </span>
      {children}
    </span>
  );
}

function PriceLine({ price, compareAt }: { price: number; compareAt: number }) {
  const off = percentOff(compareAt, price);
  const save = Math.max(0, compareAt - price);

  return (
    <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
      <div className="text-2xl font-extrabold text-slate-900 md:text-3xl">
        Rp {formatIDR(price)}
      </div>

      <div className="text-sm font-semibold text-slate-500 line-through">
        Rp {formatIDR(compareAt)}
      </div>

      {off > 0 ? (
        <span className="inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-extrabold text-white">
          Hemat {off}%
        </span>
      ) : null}

      {save > 0 ? (
        <span className="text-xs font-semibold text-slate-700">
          (hemat Rp {formatIDR(save)})
        </span>
      ) : null}
    </div>
  );
}

function RiskReversalBox() {
  return (
    <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-extrabold text-slate-900">
        Garansi &amp; rasa aman untuk produk digital
      </p>

      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        <li className="flex items-start gap-2">
          <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-sky-200">
            <Check className="h-3.5 w-3.5 text-sky-700" strokeWidth={3} />
          </span>
          <span className="leading-relaxed">
            Setelah bayar,{" "}
            <span className="font-semibold text-slate-900">
              link download langsung muncul
            </span>
          </span>
        </li>

        <li className="flex items-start gap-2">
          <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-sky-200">
            <Check className="h-3.5 w-3.5 text-sky-700" strokeWidth={3} />
          </span>
          <span className="leading-relaxed">
            Jika ada kendala, kami bantu sampai{" "}
            <span className="font-semibold text-slate-900">berhasil</span>
          </span>
        </li>

        <li className="flex items-start gap-2">
          <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-sky-200">
            <Check className="h-3.5 w-3.5 text-sky-700" strokeWidth={3} />
          </span>
          <span className="leading-relaxed">
            <span className="font-semibold text-slate-900">
              Print ulang seumur hidup
            </span>{" "}
            (lifetime access)
          </span>
        </li>
      </ul>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={[
        "h-4 w-4 transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      ].join(" ")}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.19l3.71-3.96a.75.75 0 1 1 1.1 1.02l-4.25 4.53a.75.75 0 0 1-1.1 0L5.21 8.25a.75.75 0 0 1 .02-1.04Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/**
 * ✅ Tambahan: Detail file yang didapat untuk paket Basic
 * - Muncul di kartu Basic saat Basic dipilih
 * - Friendly, ringkas, konversi: "Yang kamu dapat" + detail topik (optional expand)
 */
function BasicContentsBox({ className }: { className?: string }) {
const modalTitleId = useId();
const [show, setShow] = useState(false);


  // ✅ 24 nama file persis seperti yang kamu kirim
  const files = [
    "Angka dalam Bahasa Arab.pdf",
    "Asmaul Husna.pdf",
    "Bulan Hijriyah.pdf",
    "Doa-doa Pendek.pdf",
    "Hadits-hadits Pendek.pdf",
    "Haji dan Umroh.pdf",
    "Hari Besar Islam.pdf",
    "Hari Kiamat.pdf",
    "Huruf Hijaiyah.pdf",
    "Kalimat Thayyibah.pdf",
    "Lain-lain.pdf",
    "Makanan Halal.pdf",
    "Mengenal Harakat.pdf",
    "Mewarnai.pdf",
    "Nabi dan Rasul.pdf",
    "Najis dalam Islam.pdf",
    "Nama Malaikat.pdf",
    "Perbuatan Terpuji.pdf",
    "Puasa.pdf",
    "Rukun Iman dan Islam.pdf",
    "Sholat dan Wudhu.pdf",
    "Sifat-sifat Allah.pdf",
    "Surat-surat Pendek.pdf",
    "Surga Neraka.pdf",
  ];

  return (
    <div
      className={[
        "rounded-2xl border border-sky-200 bg-sky-50 p-4",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-sky-700 px-3 py-1 text-[11px] font-extrabold text-white">
              ISI FILE BASIC
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-sky-800 ring-1 ring-sky-200">
              PDF • Siap cetak A4 • 1.000+ lembar
            </span>
          </div>

          <p className="mt-2 text-sm font-extrabold text-slate-900">
            Yang kamu dapat (file digital)
          </p>

          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-[2px]">📄</span>
              <span>
                <span className="font-semibold text-slate-900">File PDF</span>{" "}
                (siap cetak A4) berisi worksheet Islami
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px]">⚡</span>
              <span>
                <span className="font-semibold text-slate-900">Akses instan</span>{" "}
                setelah pembayaran berhasil
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-[2px]">♻️</span>
              <span>
                <span className="font-semibold text-slate-900">
                  Print ulang seumur hidup
                </span>{" "}
                (lifetime access)
              </span>
            </li>
          </ul>
        </div>

        <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  }}
  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-sky-800 shadow-sm ring-1 ring-sky-200 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-200"
>
  Detail
  <Chevron open={false} />
</button>

      </div>

      {show ? (
  <div className="fixed inset-0 z-[70]">
    <div
      className="absolute inset-0 bg-slate-900/40"
      onClick={() => setShow(false)}
      aria-hidden="true"
    />
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p id={modalTitleId} className="text-base font-extrabold text-slate-900">
              Isi File Basic (yang kamu dapat)
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Total: <span className="font-semibold text-slate-900">1.000+ lembar</span> • PDF siap cetak A4
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShow(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
          <p className="text-xs font-bold text-slate-700">Daftar file:</p>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800"
              >
                <span className="text-slate-500">📄</span>
                <span className="min-w-0 truncate">{name}</span>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShow(false)}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-extrabold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
) : null}

    </div>
  );
}


export default function PricingSection({
  plans,
  selectedId,
  onSelect,
  bumpSelected,
  onToggleBump,
  bumpPrice,
  checkoutUrl,
}: {
  plans: Plan[];
  selectedId: PlanId | null;
  onSelect: (id: PlanId) => void;
  bumpSelected: boolean;
  onToggleBump: (v: boolean) => void;
  bumpPrice: number;
  checkoutUrl: string;
}) {
  const selectedPlan = selectedId
    ? plans.find((p) => p.id === selectedId) ?? null
    : null;

  const compareAt = selectedId ? COMPARE_AT[selectedId] : 0;
  const pages = selectedId ? PAGES[selectedId] : 0;

  const perPage = useMemo(() => {
    if (!selectedPlan || pages <= 0) return 0;
    return Math.round(selectedPlan.price / pages);
  }, [selectedPlan, pages]);

  const total = (selectedPlan?.price ?? 0) + (selectedPlan && bumpSelected ? bumpPrice : 0);

  const canCheckout = !!selectedPlan && !!checkoutUrl;

  return (
    <section
      id="pricing"
      className="mx-auto max-w-screen-xl px-5 py-14 sm:px-6 lg:px-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">
            Pilih paket yang paling cocok
          </h2>
          
        </div>

        <div className="flex flex-wrap gap-2">
          <RiskBadge>Akses instan</RiskBadge>
          <RiskBadge>Garansi download 100%</RiskBadge>
          <RiskBadge>Print ulang seumur hidup</RiskBadge>
		  <RiskBadge>Gratis update worksheeet</RiskBadge>
        </div>
      </div>


      <p className="mt-4 text-sm font-semibold text-slate-700">
        <span className="font-extrabold text-slate-900">Langkah 1:</span> Tap salah satu kartu paket di bawah.
        <span className="ml-1 text-slate-600">Langkah 2: klik checkout.</span>
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {/* LEFT: Plans */}
        <div className="space-y-4" role="radiogroup" aria-label="Pilih paket">
          {plans.map((plan) => {
            const selected = plan.id === selectedId;
            const title = planTitle(plan.id);
            const desc = planDesc(plan.id);
            const features = planFeatures(plan.id);
            const planCompareAt = COMPARE_AT[plan.id];

            return (
              <div
                key={plan.id}
                role="radio"
                aria-checked={selected}
                tabIndex={0}
                onClick={() => onSelect(plan.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(plan.id);
                  }
                }}
                className={[
                  "w-full cursor-pointer rounded-2xl border bg-white p-5 text-left transition",
                  selected
                    ? "border-emerald-300 ring-2 ring-emerald-200 shadow-lg"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-sm",
                ].join(" ")}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {title}
                    </h3>

                    {plan.id === "basic" ? (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[12px] font-semibold text-amber-800 ring-1 ring-amber-200">
                        Cocok untuk mulai
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-1 text-[12px] font-extrabold text-white">
                        🔥 Direkomendasikan orang tua
                      </span>
                    )}
                  </div>

                  <PriceLine price={plan.price} compareAt={planCompareAt} />

<div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-slate-600">
  <span className="rounded-full bg-slate-100 px-2.5 py-1">
    Sekali beli • print ulang seumur hidup
  </span>
  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800 ring-1 ring-emerald-200">
    ≈ Rp {formatIDR(Math.round(plan.price / 1000))}/lembar
  </span>
</div>


                  

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {desc}
                  </p>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-[2px]">✅</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* ✅ Tambahan yang kamu minta: detail file untuk BASIC */}
                {plan.id === "basic" && selected ? (
                  <BasicContentsBox className="mt-4" />
                ) : null}

                {/* Existing: bundle detail (tetap) */}
                {plan.id === "bundle" && selected ? (
                  <BundleContentsBox className="mt-4" />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* RIGHT: Summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:sticky md:top-24 md:self-start">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-slate-900">Ringkasan</p>
              <p className="mt-1 text-xs text-slate-600">
                Pilihan kamu sekarang:{" "}
                <span className="font-semibold text-slate-900">
                  {selectedId ? (selectedId === "basic" ? "Basic" : "Bundle") : "—"}
                </span>
              </p>
              {selectedId ? (
                <div className="mt-2 text-xs text-slate-600">
                  Harga coret:{" "}
                  <span className="line-through">Rp {formatIDR(compareAt)}</span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Silakan pilih produk dulu</span> untuk melihat ringkasan harga.
                </div>
              )}
            </div>

            {perPage > 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
                <p className="text-[11px] font-semibold text-slate-600">
                  Estimasi per lembar
                </p>
                <p className="mt-0.5 text-sm font-extrabold text-slate-900">
                  Rp {formatIDR(perPage)}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  (berdasarkan {pages.toLocaleString("id-ID")} lembar)
                </p>
              </div>
            ) : null}
          </div>

          {/* Quick confidence box for Basic (ringkas, konversi) */}
          {selectedId === "basic" ? (
            <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
              <p className="text-sm font-extrabold text-slate-900">
                Termasuk di Basic
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-[2px]">✅</span>
                  <span>
                    PDF siap cetak A4 -{" "}
                    <span className="font-semibold text-slate-900">
                      1.000+ lembar
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[2px]">✅</span>
                  <span>Akses instan + bisa print ulang</span>
                </li>
              </ul>
            </div>
          ) : null}

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Paket</span>
              <span className="font-semibold text-slate-900">
                {selectedPlan ? `Rp ${formatIDR(selectedPlan.price)}` : "—"}
              </span>
            </div>

            {/* Order bump */}
            {/* Order bump (versi lebih menggodan) */}
<BumpBox
  enabled={!!selectedPlan}
  checked={!!selectedPlan && bumpSelected}
  onChange={(v) => onToggleBump(v)}
  bumpPrice={bumpPrice}
/>


            <div className="h-px w-full bg-slate-200" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                Total hari ini
              </span>
              <span className="text-lg font-extrabold text-slate-900">
                {selectedPlan ? `Rp ${formatIDR(total)}` : "—"}
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Setelah bayar,{" "}
              <span className="font-semibold text-slate-800">
                link download langsung muncul
              </span>
              .
            </p>
          </div>

          <button
            type="button"
            disabled={!canCheckout}
            onClick={() => {
              if (!canCheckout) return;
              window.location.href = checkoutUrl;
            }}
            className={[
              "mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-extrabold shadow-sm transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-200",
              !canCheckout
                ? "cursor-not-allowed bg-slate-200 text-slate-500"
                : "bg-emerald-600 text-white hover:bg-emerald-700",
            ].join(" ")}
          >
            {canCheckout ? "Checkout & Download Instan" : "Pilih produk dulu"}
          </button>

          {!selectedPlan ? (
            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-900">
                  ⚠️
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-amber-900">
                    Langkah 1: Pilih paket dulu untuk lanjut checkout
                  </p>
                  <p className="mt-1 text-xs font-semibold text-amber-800">
                    Tap salah satu kartu paket di atas. Setelah dipilih, tombol checkout akan aktif.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <RiskReversalBox />

          <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Catatan:</span>{" "}
              Produk ini file digital (PDF), bukan barang fisik.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}