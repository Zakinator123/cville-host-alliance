import { getPetitionCount } from "@/app/actions/petition";
import { PetitionForm } from "@/components/forms/PetitionForm";

export default async function PetitionPage() {
  const count = await getPetitionCount();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Petition</p>
        <h1 className="text-3xl font-semibold">
          Keep fair rules for Charlottesville STR hosts
        </h1>
        <p className="text-muted-foreground">
          Add your name to show council and county leaders that balanced regulation matters.
        </p>
      </div>
      <PetitionForm initialCount={count} />
    </div>
  );
}
