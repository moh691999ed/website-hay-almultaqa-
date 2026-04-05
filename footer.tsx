"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-20 border-t border-neutral/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p className="text-sm text-neutral/60">© حي الملتقى - جميع الحقوق محفوظة</p>

        <Link
          href="/admin/login"
          className="flex items-center gap-1 text-sm text-secondary opacity-40 transition-all duration-300 hover:scale-105 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          <LockIcon />
          Admin
        </Link>
      </div>
    </footer>
  );
}
