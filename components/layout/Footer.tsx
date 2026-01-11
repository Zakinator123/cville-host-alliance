import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/platform", label: "Platform" },
  { href: "/evidence", label: "Evidence" },
  { href: "/action-center", label: "Action Center" },
  { href: "/news", label: "News" },
  { href: "/faq", label: "FAQ" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">Charlottesville Host Alliance</p>
            <p className="text-sm text-muted-foreground">
              Advocating for fair rules for local hosts and guests.
            </p>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Charlottesville Host Alliance. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
