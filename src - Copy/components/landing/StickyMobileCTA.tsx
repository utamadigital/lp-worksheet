function formatIDR(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}

export default function StickyMobileCTA({
  planName,
  total,
  bumpSelected,
  href,
  isExternal = false,
}: {
  planName: string;
  total: number;
  bumpSelected: boolean;
  href: string;
  isExternal?: boolean;
}) {
  return (
/*     <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/90 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-screen-sm items-center gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-slate-800">
            {planName}
            {bumpSelected ? " + Bump" : ""}
          </p>
          <p className="truncate text-base font-extrabold text-slate-900">
            Total Rp {formatIDR(total)}
          </p>
        </div>

        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="ml-auto inline-flex h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm active:scale-[0.99]"
        >
          Checkout
        </a>
      </div>
    </div> */null
  );
}
