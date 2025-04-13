"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navItems = [
  { name: "Dashboard", href: "/Dashboard" },
  { name: "Journal", href: "/Journal" },
  { name: "Mood Tracker", href: "/MoodTracker" },
  { name: "Consultation", href: "/Consultation" },
  { name: "Recommendation", href: "/Recommendation" },
  { name: "Profile", href: "/Profile" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href="/">
              <span className="text-teal-600 dark:text-teal-300 text-xl font-bold">
                MindHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-12">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm font-medium">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      className={`${
                        pathname === item.href
                          ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                          : "text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                      }`}
                      href={item.href}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-white"></span>
                <UserButton afterSignOutUrl="/sign-in" />
              </div>
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
              >
                Sign In
              </Link>
            </SignedOut>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden rounded bg-gray-100 p-2 text-gray-600 hover:text-gray-700 dark:bg-gray-800 dark:text-white dark:hover:text-gray-300"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <ul className="px-4 py-4 space-y-2 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-2 py-1 rounded ${
                    pathname === item.href
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
