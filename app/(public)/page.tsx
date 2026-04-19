import Link from "next/link";

import { EmailSignup } from "@/components/forms/EmailSignup";
import { RichText } from "@/components/RichText";
import { ScrollToPlatformButton } from "@/components/ScrollToPlatformButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getEvidenceItems,
  getSiteSettings,
  getPageBySlug,
} from "@/lib/content";

export default async function HomePage() {
  const [siteSettings, evidence, platformPage] = [
    getSiteSettings(),
    getEvidenceItems(),
    getPageBySlug("platform"),
  ];

  const hero = siteSettings?.heroContent;
  type EvidenceItem = Awaited<ReturnType<typeof getEvidenceItems>>[number];

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
    {
      title: "March 24, 2026",
      subtitle: "Planning Commission Work Session",
      description:
        "NDS staff recommended NO amendments to the homestay ordinance at this time, focusing instead on stronger monitoring, permitting, and education. Proposed changes — including the $500 permit, mandatory pre-permit inspection, and affidavit requirement — are off the table for now. The Planning Commission was generally supportive.",
      emphasis: true,
      status: "past",
    },
  ];

  const upcomingSteps = [
    {
      title: "Early May 2026 (tentatively)",
      subtitle: "City Council Work Session",
      description:
        "Council deliberation incorporating Planning Commission input and updated materials. Written comments to Council ahead of the session can still carry weight.",
      status: "upcoming",
    },
    {
      title: "Spring through Summer 2026",
      subtitle: "Planning Commission & City Council Public Hearings",
      description:
        "Anticipated public hearings for any proposed ordinance changes. Specific dates have not yet been published; we'll send them out the moment they are.",
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

      <section
        id="timeline"
        className="relative space-y-6 overflow-hidden rounded-3xl border border-primary/15 bg-card p-6 shadow-sm lg:p-8"
      >
        <div className="space-y-2">
          <p className="text-sm font-semibold text-primary">Charlottesville STR Regulations Timeline</p>
        </div>
        <div className="rounded-2xl border-2 border-accent-coral bg-red-100 p-4 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black">
            Latest update
          </p>
          <p className="mt-2 text-sm text-gray-700">
            On <strong>March 24, 2026</strong>, NDS recommended <strong>no amendments</strong> to the homestay ordinance — the $500 permit, mandatory inspections, and affidavit requirement are all off the table for now. Council discusses staff&apos;s recommendation at a work session tentatively in early May, and public hearings on any ordinance changes are anticipated through summer 2026 — dates haven&apos;t been published yet. Sign up below and we&apos;ll send them when they are. Going forward, we&apos;re focused on heading off new restrictions <em>and</em> pushing to improve parts of the current code where it could work better for residents.
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

    </div>
  );
}
