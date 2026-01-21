"use client";

import { RichText } from "@/components/RichText";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PetitionForm } from "@/components/forms/PetitionForm";

type ActionAlertCardProps = {
  item: {
    _id: string;
    title: string;
    urgency?: "low" | "medium" | "high";
    deadline?: string;
    description?: string[];
    emailTemplate?: string[];
    callScript?: string[];
  };
  petitionCount?: number;
};

export function ActionAlertCard({ item, petitionCount = 0 }: ActionAlertCardProps) {

  return (
    <Card variant="accent-coral" className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {item.description && (
          <div className="prose-sm">
            <RichText value={item.description} />
          </div>
        )}

        <PetitionForm initialCount={petitionCount} />

        {item.callScript && (
          <div className="rounded-xl border border-border/60 bg-background/60 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">Call Script</p>
            <div className="prose-sm">
              <RichText value={item.callScript} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
