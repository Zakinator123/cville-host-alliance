import { RichText } from "@/components/sanity/RichText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFAQs } from "@/lib/sanity/queries";

export default async function FaqPage() {
  const faqs = await getFAQs();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">FAQ</p>
        <h1 className="text-3xl font-semibold">Answers to common questions</h1>
        <p className="text-muted-foreground">
          Learn how local hosts are organizing and how policy changes impact our community.
        </p>
      </div>
      <Accordion type="multiple" className="w-full">
        {(faqs ?? []).map((item) => (
          <AccordionItem value={item._id} key={item._id}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
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
                We’ll publish common questions and answers here soon.
              </p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
