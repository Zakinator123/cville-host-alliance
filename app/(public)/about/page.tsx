import { RichText } from "@/components/sanity/RichText";
import { getPageBySlug } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  const page = await getPageBySlug("about");

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">{page.title ?? "About"}</h1>
      {page.content ? (
        <RichText value={page.content} />
      ) : (
        <p className="text-muted-foreground">Content coming soon.</p>
      )}
    </div>
  );
}
