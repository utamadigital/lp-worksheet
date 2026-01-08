"use client";

import React from "react";
import { CheckCircle2, Sparkles, ShieldCheck, Printer, Zap } from "lucide-react";
import PdfFlipbook, { type FlipPage } from "./PdfFlipbook";


const WHATSAPP_NUMBER = "6289654543003";
const WHATSAPP_TEXT =
  "Assalamu’alaikum Admin 👋\n" +
  "Saya tertarik produk \"1000 Lembar Printable Anak Muslim\".\n\n" +
  "Boleh tanya:\n" +
  "1) Setelah bayar, link download muncul di mana?\n" +
  "2) Bisa print ulang kapan saja?\n\n" +
  "Terima kasih 🙏";

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12">{children}</div>;
}

function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}

const HERO_PREVIEW_PAGES: FlipPage[] = [
  { src: "/previews/1.jpg", alt: "Hijaiyah Tracing" },
  { src: "/previews/2.jpg", alt: "Latihan Harakat" },
  { src: "/previews/3.jpg", alt: "Doa Harian" },
  { src: "/previews/4.jpg", alt: "Langkah Wudhu" },
  { src: "/previews/5.jpg", alt: "Akhlak & Adab" },
  { src: "/previews/6.jpg", alt: "Akhlak & Adab" },
  { src: "/previews/7.jpg", alt: "Akhlak & Adab" },
];

export default function HeroSection({
  onPrimary,
  onSecondary,
}: {
  onPrimary: () => void;
  onSecondary: () => void;
}) {
  const promo = 69_000;
  const normal = 199_000;
  const perPage = Math.round(promo / 1000);

  return (
    <section className="pt-10 sm:pt-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                PDF • Siap Cetak A4
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                Checkout otomatis
              </span>
              <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                Print ulang
              </span>
			  <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                Gratis update
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Biar Anak Anteng Tanpa Gadget{" "}
              <span className="text-emerald-700">+ Aktivitas Islami Bertahap</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base">
              <span className="font-semibold text-slate-900">Bukan sekadar printable.</span>{" "}
              Ini paket aktivitas islami yang disusun bertahap supaya anak mudah mulai, dan orang tua nggak
              perlu cari ide lagi. Cocok untuk usia{" "}
              <span className="font-semibold">3–8 tahun</span>.
            </p>

            <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900 ring-1 ring-emerald-200">
              <Sparkles className="h-4 w-4" />
              <span>
                Normal <span className="line-through">Rp {formatIDR(normal)}</span> →{" "}
                <span className="font-extrabold">Promo Rp {formatIDR(promo)}</span>
              </span>
             
            </div>

            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {[
                "Dirancang untuk anak Indonesia (bahasa & konteks sehari-hari)",
                "Konten bertahap: mudah → naik level (nggak bikin anak ‘kaget’)",
                "Layout clean: hemat tinta & nyaman di printer rumahan",
                "Jika link bermasalah, kami bantu kirim ulang file sampai bisa diakses & diprint.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-[2px] h-5 w-5 text-emerald-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={onPrimary}
                className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] opacity-100 pointer-events-auto"
              >
                Checkout & Download Instan
              </button>

              <button
                onClick={onSecondary}
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
              >
                Lihat Contoh Halaman
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-600">
              Checkout otomatis — setelah bayar,{" "}
              <span className="font-semibold text-slate-800">link download langsung muncul</span>.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Akses instan",
                  desc: "Link download muncul otomatis",
                  icon: <Zap className="h-5 w-5 text-emerald-700" />,
                },
                {
                  title: "Print ulang",
                  desc: "Sekali beli, pakai berulang",
                  icon: <Printer className="h-5 w-5 text-emerald-700" />,
                },
                {
                  title: "Garansi aman",
                  desc: "Dibantu sampai berhasil",
                  icon: <ShieldCheck className="h-5 w-5 text-emerald-700" />,
                },
				
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                      {c.icon}
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">{c.title}</p>
                      <p className="mt-1 text-xs text-slate-600">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
			<div className="mt-4 rounded-2xl border border-slate-200 bg-sky-50 p-4 shadow-sm">
  <div className="flex items-start gap-3">
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-sky-200">
      <ShieldCheck className="h-5 w-5 text-sky-700" />
    </span>

    <div className="min-w-0">
      <p className="text-sm font-extrabold text-slate-900">Tenang, aman untuk produk digital</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-700">
        Setelah bayar, <span className="font-semibold">link download langsung muncul</span>. Kalau ada kendala,
        kami bantu sampai berhasil.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href="#faq"
          className="inline-flex items-center justify-center rounded-full bg-white px-3 py-2 text-xs font-bold text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50"
        >
          Lihat FAQ
        </a>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-emerald-700"
        >
          Chat Admin
        </a>
      </div>

      <p className="mt-2 text-[11px] text-slate-500">
        Respon cepat jam kerja • Garansi download 100%
      </p>
    </div>
  </div>
</div>

          </div>

          {/* RIGHT (FINAL, 1 CARD ONLY) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-500">Preview isi PDF</p>
                <h3 className="mt-1 text-sm font-extrabold text-slate-900">Yang kamu dapat</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Geser / klik untuk membalik beberapa contoh halaman.
                </p>
              </div>

              <a
  href="#pricing"
  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-2 text-xs font-extrabold text-slate-800 shadow-sm hover:bg-slate-50 sm:px-3"
  aria-label="Lihat Harga"
>
  {/* icon selalu tampil */}
  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
    <span className="text-[11px] text-emerald-800">Rp</span>
  </span>

  {/* teks pendek di mobile, teks normal di sm+ */}
  <span className="sm:hidden">Harga</span>
  <span className="hidden sm:inline">Lihat Harga</span>
</a>

            </div>

            {/* Flipbook area (single frame, gradient halus) */}
            <div className="mt-4 rounded-2xl bg-gradient-to-b from-slate-50 to-white p-3 ring-1 ring-slate-200">
              <PdfFlipbook
                pages={HERO_PREVIEW_PAGES}
                maxWidth={520}
                maxHeightMobile={360}
                maxHeightDesktop={620}
              />

              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Swipe untuk flip</span>
                <span>{HERO_PREVIEW_PAGES.length} contoh</span>
              </div>
            </div>

            {/* Proof chips (lebih estetik & rapat) */}
            <div className="mt-4 flex flex-wrap gap-2">
              {["✅ 1.000 lembar", "✅ A4 siap cetak", "✅ Download instan", "✅ Print ulang"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Category chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {["Hijaiyah", "Harakat", "Doa", "Wudhu", "Adab"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-slate-700 ring-1 ring-slate-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              Contoh preview. Setelah checkout, kamu dapat file lengkap + bisa print ulang seumur hidup.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}