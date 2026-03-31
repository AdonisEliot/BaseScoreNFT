"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { href: "/", label: "Claim" },
  { href: "/badge", label: "Badge" },
  { href: "/about", label: "About" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="footer-nav" aria-label="Bottom navigation">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={`nav-item ${pathname === route.href ? "active" : ""}`}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

