import { RichText } from "@/components/sanity/RichText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPageBySlug, getFAQs } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  const [page, faqs] = await Promise.all([
    getPageBySlug("about"),
    getFAQs(),
  ]);

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

      {faqs && faqs.length > 0 && (
        <div id="faq" className="space-y-6 border-t pt-12">
          <div>
            <p className="text-sm font-medium text-primary">FAQ</p>
            <h2 className="text-2xl font-semibold">Common questions</h2>
            <p className="text-muted-foreground">
              Learn more about our organization and the issues we're addressing.
            </p>
          </div>
          <Accordion type="multiple" className="w-full">
            {faqs.map((item) => (
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
          </Accordion>
        </div>
      )}
    </div>
  );
}
