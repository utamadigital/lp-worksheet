"use client";

import { useCheckoutModal } from "./CheckoutModalProvider";

export default function CheckoutCTA({
  checkoutUrl,
  className = "",
}: {
  checkoutUrl: string;
  className?: string;
}) {
  const { open } = useCheckoutModal();

  return (
    <button
      type="button"
      onClick={() => open(checkoutUrl)}
      className={[
        "inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]",
        className,
      ].join(" ")}
    >
      Checkout &amp; Download Instan
    </button>
  );
}
