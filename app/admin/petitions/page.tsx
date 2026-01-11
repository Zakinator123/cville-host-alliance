import { flags } from "@/lib/flags";
import { notFound } from "next/navigation";

export default function PetitionsAdminPage() {
  if (!flags.petitionEnabled) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-10">
      <h1 className="text-3xl font-semibold">Petition signatures</h1>
      <p className="text-muted-foreground">
        TODO: add protected table view and CSV export.
      </p>
    </div>
  );
}
