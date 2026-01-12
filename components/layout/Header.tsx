"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { flags } from "@/lib/flags";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { MobileNav } from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  ...(flags.petitionEnabled ? [{ href: "/petition", label: "Petition" }] : []),
];

function scrollToEmailAndGlow() {
  const element = document.getElementById("email-signup");
  if (element) {
    // Add glow class
    element.classList.add("email-signup-glow");
    
    // Scroll smoothly to the element
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    
    // Remove glow class after animation completes
    setTimeout(() => {
      element.classList.remove("email-signup-glow");
    }, 1500);
  }
}

function ScrollToEmailButton() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Handle scroll and glow when hash is present after navigation
  useEffect(() => {
    if (pathname === "/" && window.location.hash === "#email-signup") {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        scrollToEmailAndGlow();
        // Remove hash from URL after scrolling
        window.history.replaceState(null, "", "/");
      }, 100);
    }
  }, [pathname]);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (pathname === "/") {
      // Already on homepage, just scroll and glow
      scrollToEmailAndGlow();
    } else {
      // Navigate to homepage with hash, then scroll/glow will happen via useEffect
      router.push("/#email-signup");
    }
  };

  return (
    <Button asChild size="sm">
      <Link href="/#email-signup" onClick={handleClick}>
        Stay informed
      </Link>
    </Button>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/cville-host-alliance-logo.png"
              alt="Cville Host Alliance logo"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
              priority
            />
            <span className="text-xl font-semibold tracking-tight">
              Charlottesville Host Alliance
            </span>
          </Link>
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className="text-base font-medium text-foreground/80 transition hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <ScrollToEmailButton />
        </div>
        <div className="md:hidden">
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
