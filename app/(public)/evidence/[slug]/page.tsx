import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEvidenceBySlug } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";

export default async function EvidenceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const item = await getEvidenceBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">{item.category}</p>
        <h1 className="text-3xl font-semibold">{item.title}</h1>
        <p className="text-muted-foreground">{item.summary}</p>
      </div>

      {item.stats?.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {item.stats.map((stat: { _key: string; label?: string; value?: string }) => (
            <Card key={stat._key}>
              <CardHeader>
                <CardTitle>{stat.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">{stat.value}</CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {item.sourceUrl && (
        <Link
          href={item.sourceUrl}
          className="text-sm text-primary underline-offset-4 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          View original source
        </Link>
      )}
    </div>
  );
}
