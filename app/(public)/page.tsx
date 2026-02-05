import Link from "next/link";

import { getPetitionCount } from "@/app/actions/petition";
import { ActionAlertCard } from "@/components/ActionAlertCard";
import { EmailSignup } from "@/components/forms/EmailSignup";
import { RichText } from "@/components/RichText";
import { ScrollToPlatformButton } from "@/components/ScrollToPlatformButton";
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
  getEvidenceItems,
  getSiteSettings,
  getActiveActions,
  getFAQs,
  getPageBySlug,
} from "@/lib/content";

export default async function HomePage() {
  const [siteSettings, evidence, actions, faqs, platformPage, petitionCount] = [
    getSiteSettings(),
    getEvidenceItems(),
    getActiveActions(),
    getFAQs(),
    getPageBySlug("platform"),
    await getPetitionCount(),
  ];

  const hero = siteSettings?.heroContent;
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
      <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-card shadow-elevated">
        <div className="relative grid gap-10 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-coral">
                Cville STR Advocates
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
              <ScrollToPlatformButton />
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-[30px] border border-border bg-card p-2 shadow-lg">
              <div className="rounded-[26px] bg-card">
                <EmailSignup />
              </div>
            </div>
          </div>
        </div>
        
      </section>

      <section className="-mt-12 mb-6 rounded-2xl border border-primary/15 bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">
          The City of Charlottesville is conducting a study of Homestay and Short-Term Rental regulations.{' '}
          <Link
            href="https://charlottesville.org/1935/Homestay-Short-Term-Regulations-Study"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Learn more about the official study
          </Link>
          .
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          id="timeline"
          className="relative space-y-6 overflow-hidden rounded-3xl border border-primary/15 bg-card p-6 shadow-sm lg:p-8"
        >
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary">Charlottesville STR Regulations Timeline</p>
          </div>
          <div className="rounded-2xl border-2 border-accent-coral bg-red-100 p-4 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black">
              Key concern
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Most of the <strong>529 STR operators</strong> weren't notified about the Dec. 3 meeting. Regulations are based on a survey of less than 1.3% of the population. No other public comment sessions are scheduled. <strong>This is not sufficient for public comment.</strong>
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
                  <div className="space-y-2 opacity-60">
                    <p
                      className={`text-sm font-semibold ${
                        item.emphasis ? "text-accent-coral/70" : "text-muted-foreground"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p className="text-base font-semibold text-muted-foreground/60 line-through decoration-muted-foreground/40">
                      {item.subtitle}
                    </p>
                    <p className="text-sm line-through text-muted-foreground/50">{item.description}</p>
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
          className="relative space-y-5 overflow-hidden rounded-3xl border border-accent-coral/25 bg-card p-6 shadow-sm lg:p-8"
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
        className="-mt-[56px] relative space-y-6 overflow-hidden rounded-3xl border border-primary/15 bg-card p-6 shadow-sm lg:p-8 scroll-mt-24"
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

      <section id="evidence" className="-mt-[56px] space-y-5 rounded-3xl border border-primary/20 bg-card p-6 shadow-sm lg:p-8">
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
                    {item.stats.slice(0, 3).map((stat, index) => (
                      <div key={stat.label || index} className="flex items-baseline justify-between gap-2">
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

      <section className="-mt-[56px] space-y-5 rounded-3xl border border-border/80 bg-card p-6 shadow-sm lg:p-8">
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
