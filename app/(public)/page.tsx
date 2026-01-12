import Link from "next/link";

import { getPetitionCount } from "@/app/actions/petition";
import { ActionAlertCard } from "@/components/ActionAlertCard";
import { EmailSignup } from "@/components/forms/EmailSignup";
import { RichText } from "@/components/sanity/RichText";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  getActiveActions,
  getFAQs,
  getPageBySlug,
} from "@/lib/sanity/queries";

export default async function HomePage() {
  const [siteSettings, posts, evidence, actions, faqs, platformPage, petitionCount] = await Promise.all([
    getSiteSettings(),
    getAllPosts(),
    getEvidenceItems(),
    getActiveActions(),
    getFAQs(),
    getPageBySlug("platform"),
    getPetitionCount(),
  ]);

  const hero = siteSettings?.heroContent;
  type Post = Awaited<ReturnType<typeof getAllPosts>>[number];
  type EvidenceItem = Awaited<ReturnType<typeof getEvidenceItems>>[number];
  type ActionAlert = Awaited<ReturnType<typeof getActiveActions>>[number];
  type FAQ = Awaited<ReturnType<typeof getFAQs>>[number];

  const timelineItems = [
    {
      title: "Spring 2025",
      subtitle: "Study kickoff",
      description: "Project launch and initial background research.",
      status: "past",
    },
    {
      title: "Summer 2025",
      subtitle: "Peer city scan",
      description: "Early peer city comparisons and internal review.",
      status: "past",
    },
    {
      title: "Fall 2025",
      subtitle: "Drafting phase",
      description: "Staff prepares a proposed STR approach.",
      status: "past",
    },
    {
      title: "Dec. 3, 2025",
      subtitle: "First public comment opportunity",
      description: "Staff presented draft STR regulations to the public.",
      emphasis: true,
      status: "past",
    },
  ];

  const upcomingSteps = [
    {
      title: "Next (Date TBD)",
      subtitle: "Planning Commission",
      description: "Regulatory updates move to Planning Commission review.",
      status: "upcoming",
    },
    {
      title: "After that (Date TBD)",
      subtitle: "City Council",
      description: "Final consideration by City Council.",
      status: "upcoming",
    },
  ];

  return (
    <div className="space-y-20">
      <section
        className="relative overflow-hidden rounded-3xl border border-primary/15 shadow-elevated"
        style={{
          background:
            "radial-gradient(circle at 16% 12%, color-mix(in oklab, var(--accent-teal) 45%, white) 0%, transparent 42%), radial-gradient(circle at 86% 8%, color-mix(in oklab, var(--accent-coral) 38%, white) 0%, transparent 36%), linear-gradient(135deg, color-mix(in oklab, var(--surface-tinted) 70%, white) 0%, color-mix(in oklab, var(--primary-lighter) 35%, white) 45%, white 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 45%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 55%)",
          }}
        />
        <div className="relative grid gap-10 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-coral">
                Charlottesville Host Alliance
              </p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl text-primary">
                {hero?.headline ?? "Protect fair rules for local hosts and guests"}
              </h1>
              <p className="text-lg text-muted-foreground">
                {hero?.subheadline?.trim() ||
                  "We are a coalition of Charlottesville and Albemarle hosts standing up for balanced STR policy that protects housing, tourism, and neighborhood vitality."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#take-action">Join the petition</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Read our platform</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-10 rounded-[40px] opacity-100 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 18% 12%, rgba(255,111,97,0.7) 0%, transparent 50%), radial-gradient(circle at 85% 8%, rgba(80,200,200,0.75) 0%, transparent 45%), radial-gradient(circle at 50% 92%, rgba(70,110,255,0.55) 0%, transparent 55%)",
              }}
            />
            <div
              className="pointer-events-none absolute -inset-4 rounded-[36px] opacity-90 blur-xl"
              style={{
                background:
                  "conic-gradient(from 210deg, rgba(255,255,255,0.75), rgba(255,255,255,0), rgba(255,255,255,0.6))",
              }}
            />
            <div
              className="relative rounded-[30px] p-[2px] shadow-[0_25px_80px_rgba(37,70,120,0.25)]"
              style={{
                background:
                  "linear-gradient(130deg, rgba(255,111,97,0.55) 0%, rgba(255,255,255,0.7) 38%, rgba(80,200,200,0.5) 70%, rgba(120,140,255,0.55) 100%)",
              }}
            >
              <div className="rounded-[26px] bg-white/90 backdrop-blur-sm">
                <EmailSignup />
              </div>
            </div>
          </div>
        </div>
        
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          id="timeline"
          className="relative space-y-6 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-accent-teal/10 p-6 shadow-sm lg:p-8"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary">Charlottesville STR Regulations Timeline</p>
          </div>
          <div className="rounded-2xl border-2 border-accent-coral bg-red-100 p-4 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black">
              Key concern
            </p>
            <p className="mt-2 text-sm text-gray-700">
              The first public comment opportunity was Dec. 3 - this occurred with short notice and those who are most affected were not notified.
               No other public comment sessions have
              been scheduled, and the next steps move to Planning Commission and then City Council.
              <strong>This is not sufficient for public comment.</strong>
            </p>
          </div>
          <div className="relative space-y-6 border-l border-primary/20 pl-6">
            <ol className="space-y-6">
              {timelineItems.map((item) => (
                <li key={item.title} className="relative">
                  <span
                    className={`absolute -left-[30px] top-1.5 h-3 w-3 rounded-full border-2 ${
                      item.emphasis
                        ? "border-accent-coral bg-accent-coral/20"
                        : "border-primary/40 bg-white"
                    }`}
                  />
                  <div className="space-y-1">
                    <p
                      className={`text-sm font-semibold ${
                        item.emphasis ? "text-accent-coral" : "text-foreground"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-base font-semibold text-foreground/70 line-through decoration-foreground/30">
                      {item.subtitle}
                    </p>
                    <p className="text-sm line-through text-muted-foreground/80">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                What is scheduled next
              </p>

            </div>
            <ol className="space-y-4">
              {upcomingSteps.map((item: { title: string; subtitle: string; description: string; status: string }) => (
                <li key={item.subtitle} className="relative">
                  <span className="absolute -left-[30px] top-1.5 h-3 w-3 rounded-full bg-primary/40" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {item.title}
                    </p>
                    <p className="text-lg font-semibold text-foreground">{item.subtitle}</p>
                    <p className="text-sm text-foreground/80">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          id="take-action"
          className="relative space-y-5 overflow-hidden rounded-3xl border border-accent-coral/25 bg-gradient-to-br from-accent-coral/10 via-white to-accent-coral/5 p-6 shadow-sm lg:p-8"
        >
          <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 -translate-x-10 -translate-y-10 rounded-full bg-accent-coral/20 blur-2xl" />
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Petition City Council</h2>
          </div>
          <div className="grid gap-4">
            {(actions ?? []).map((item: ActionAlert) => (
              <ActionAlertCard key={item._id} item={item} petitionCount={petitionCount} />
            ))}
            {(actions ?? []).length === 0 && (
              <Card variant="tinted">
                <CardHeader>
                  <CardTitle>No active actions right now</CardTitle>
                  <CardDescription>
                    Check back soon for upcoming votes, hearings, and calls to action.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </section>
      </div>

      <section
        id="platform"
        className="relative space-y-6 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-white to-primary/5 p-6 shadow-sm lg:p-8"
      >
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl" />
        <div className="border-b border-primary/10 pb-4">
          <p className="text-sm font-semibold text-primary">Our Platform</p>
          <h2 className="text-3xl font-semibold text-foreground">
            {platformPage?.title ?? "What We're Asking For"}
          </h2>
        </div>
        {platformPage?.content ? (
          <div className="prose prose-lg max-w-none space-y-6 [&>p]:mb-6 [&>p]:leading-relaxed">
            <RichText value={platformPage.content} />
          </div>
        ) : (
          <p className="text-muted-foreground">Content coming soon.</p>
        )}
      </section>

      <section id="evidence" className="space-y-5 rounded-3xl border border-accent-teal/20 bg-gradient-to-br from-accent-teal/5 to-accent-teal/10 p-6 shadow-sm lg:p-8">
        <div>
          <h2 className="text-3xl font-semibold text-foreground">Data</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(evidence ?? []).map((item: EvidenceItem) => (
            <Card key={item._id} size="sm" variant="accent-teal" className="shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-snug">{item.title}</CardTitle>
                  {item.category && (
                    <span className="shrink-0 rounded-full bg-accent-teal/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-teal-foreground">
                      {item.category}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.summary}
                </p>
                {item.stats && item.stats.length > 0 && (
                  <div className="space-y-1.5 rounded-lg bg-accent-teal/5 p-3">
                    {item.stats.slice(0, 3).map((stat: { _key?: string; label?: string; value?: string }) => (
                      <div key={stat._key} className="flex items-baseline justify-between gap-2">
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                        <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {item.source && item.sourceUrl && item.sourceUrl !== '#' && (
                  <div className="pt-1">
                    <Link
                      href={item.sourceUrl}
                      className="text-xs text-primary underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View source →
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {(evidence ?? []).length === 0 && (
            <Card variant="tinted">
              <CardHeader>
                <CardTitle>Evidence coming soon</CardTitle>
                <CardDescription>
                  We're collecting studies and stats to share with council and neighbors.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-border/80 bg-section-tint p-6 shadow-sm lg:p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">Latest news</p>
            <h2 className="text-2xl font-semibold text-foreground">Updates from the campaign</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/news">View all</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {(posts ?? []).slice(0, 3).map((post: Post) => (
            <Card key={post._id} variant="accent-teal">
              <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2">
                  {post.title}
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                    News
                  </span>
                </CardTitle>
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
            <Card variant="tinted">
              <CardHeader>
                <CardTitle>News coming soon</CardTitle>
                <CardDescription>
                  We'll post hearing summaries and action updates here.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      <section className="space-y-5 rounded-3xl border border-border/80 bg-section-tint p-6 shadow-sm lg:p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">FAQ</p>
            <h2 className="text-2xl font-semibold text-foreground">Common questions</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/about#faq">View all</Link>
          </Button>
        </div>
        <Accordion type="multiple" className="w-full">
          {(faqs ?? []).slice(0, 3).map((item: FAQ) => (
            <AccordionItem value={item._id} key={item._id}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>
                {item.answer ? (
                  <RichText value={item.answer} />
                ) : (
                  <p className="text-muted-foreground">Answer coming soon.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
          {(faqs ?? []).length === 0 && (
            <AccordionItem value="empty">
              <AccordionTrigger>No questions yet</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We'll publish common questions and answers here soon.
                </p>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </section>
    </div>
  );
}
