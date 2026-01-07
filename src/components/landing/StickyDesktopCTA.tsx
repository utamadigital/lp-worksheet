"use client";

import { useCheckoutModal } from "./CheckoutModalProvider";

export default function StickyDesktopCTA({ href }: { href: string }) {
  const { open } = useCheckoutModal();
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <button
        type="button"
        data-track="initiate_checkout"
        onClick={() => open(href)}
        className="flex items-center gap-3 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700"
      >
        Checkout
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
          Rp 69rb+
        </span>
      </button>
    </div>
  );
}
