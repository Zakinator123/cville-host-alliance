"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

function scrollToPlatform() {
  const element = document.getElementById("platform");
  if (element) {
    // Use scrollIntoView with scroll-margin-top CSS (set via scroll-mt-24 class)
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function ScrollToPlatformButton() {
  const pathname = usePathname();
  
  // Handle scroll when hash is present after navigation
  useEffect(() => {
    if (pathname === "/" && window.location.hash === "#platform") {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        scrollToPlatform();
        // Remove hash from URL after scrolling
        window.history.replaceState(null, "", "/");
      }, 100);
    }
  }, [pathname]);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToPlatform();
  };

  return (
    <Button asChild size="lg" variant="outline">
      <Link href="#platform" onClick={handleClick}>
        Read our platform
      </Link>
    </Button>
  );
}
