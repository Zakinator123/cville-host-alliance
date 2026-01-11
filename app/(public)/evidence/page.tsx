import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEvidenceItems } from "@/lib/sanity/queries";

export default async function EvidencePage() {
  const items = await getEvidenceItems();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Evidence</p>
        <h1 className="text-3xl font-semibold">Data and research you can cite</h1>
        <p className="text-muted-foreground">
          Use these statistics in emails, public comment, and conversations with neighbors.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(items ?? []).map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{item.summary}</p>
              <div className="flex items-center justify-between">
                <Link
                  href={`/evidence/${item.slug}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  View details
                </Link>
                {item.source && item.sourceUrl && (
                  <Link
                    href={item.sourceUrl}
                    className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {(items ?? []).length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No evidence yet</CardTitle>
              <CardDescription>
                We’re collecting stats and studies to publish here.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
