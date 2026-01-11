import Link from "next/link";

import { EmailSignup } from "@/components/forms/EmailSignup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { flags } from "@/lib/flags";
import {
  getAllPosts,
  getEvidenceItems,
  getSiteSettings,
} from "@/lib/sanity/queries";

export default async function HomePage() {
  const [siteSettings, posts, evidence] = await Promise.all([
    getSiteSettings(),
    getAllPosts(),
    getEvidenceItems(),
  ]);

  const hero = siteSettings?.heroContent;

  return (
    <div className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-medium text-primary">Charlottesville Host Alliance</p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            {hero?.headline ?? "Protect fair rules for local hosts and guests"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {hero?.subheadline ??
              "We are a coalition of Charlottesville and Albemarle hosts standing up for balanced STR policy that protects housing, tourism, and neighborhood vitality."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="#email-signup">{hero?.ctaLabel ?? "Join the movement"}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/action-center">See actions</Link>
            </Button>
            {flags.petitionEnabled && (
              <Button asChild variant="secondary">
                <Link href="/petition">Sign the petition</Link>
              </Button>
            )}
          </div>
        </div>
        <EmailSignup />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Latest news</p>
            <h2 className="text-xl font-semibold">Updates from the campaign</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/news">View all</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {(posts ?? []).slice(0, 3).map((post) => (
            <Card key={post._id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {post.excerpt ?? "Update from the alliance."}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : "Draft"}
                </p>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/news/${post.slug}`}>Read</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
          {(posts ?? []).length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>News coming soon</CardTitle>
                <CardDescription>
                  We’ll post hearing summaries and action updates here.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Evidence</p>
            <h2 className="text-xl font-semibold">Data you can cite</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/evidence">View library</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {(evidence ?? []).slice(0, 3).map((item) => (
            <Card key={item._id} size="sm">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.category}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {item.summary}
              </CardContent>
              <div className="flex items-center justify-between px-6 pb-4">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/evidence/${item.slug}`}>View</Link>
                </Button>
                {item.source && (
                  <Link
                    href={item.sourceUrl ?? "#"}
                    className="text-xs text-primary underline-offset-4 hover:underline"
                  >
                    Source
                  </Link>
                )}
              </div>
            </Card>
          ))}
          {(evidence ?? []).length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Evidence coming soon</CardTitle>
                <CardDescription>
                  We’re collecting studies and stats to share with council and neighbors.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
