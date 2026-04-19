import { RichText } from "@/components/RichText";
import { getPageBySlug } from "@/lib/content";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  const page = getPageBySlug("about");

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">{page.title ?? "About"}</h1>
        {page.content ? (
          <div className="prose max-w-none">
            <RichText value={page.content} />
          </div>
        ) : (
          <p className="text-muted-foreground">Content coming soon.</p>
        )}
      </div>
    </div>
  );
}
