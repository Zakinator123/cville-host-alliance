import { RichText } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";

export default async function PlatformPage() {
  const page = await getPageBySlug("platform");

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">{page.title ?? "Platform"}</h1>
      {page.content ? (
        <RichText value={page.content} />
      ) : (
        <p className="text-muted-foreground">Content coming soon.</p>
      )}
    </div>
  );
}
