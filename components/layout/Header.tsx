import Link from "next/link";

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
  { href: "/platform", label: "Platform" },
  { href: "/evidence", label: "Evidence" },
  { href: "/action-center", label: "Action Center" },
  { href: "/news", label: "News" },
  { href: "/faq", label: "FAQ" },
  ...(flags.petitionEnabled ? [{ href: "/petition", label: "Petition" }] : []),
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Charlottesville Host Alliance
          </Link>
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-foreground/80 transition hover:text-foreground"
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
          <Button asChild size="sm">
            <Link href="#email-signup">Join the movement</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <MobileNav links={navLinks} />
        </div>
      </div>
    </header>
  );
}
