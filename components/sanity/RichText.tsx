import { PortableText, type PortableTextBlock } from "@portabletext/react";

const components = {
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-foreground/80">{children}</em>
    ),
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value?: { href?: string };
    }) => (
      <a
        href={value?.href}
        className="text-primary underline-offset-4 hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
  block: {
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-base leading-7 text-muted-foreground">{children}</p>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold leading-tight">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-semibold leading-tight">{children}</h3>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-primary/50 pl-4 text-lg font-medium text-foreground">
        {children}
      </blockquote>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
