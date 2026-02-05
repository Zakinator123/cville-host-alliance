import { Suspense } from "react";
import { UnsubscribeForm } from "@/components/forms/UnsubscribeForm";

export default function UnsubscribePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">Unsubscribe</p>
        <h1 className="text-3xl font-semibold">Manage your updates</h1>
        <p className="text-muted-foreground">
          Enter your email to stop receiving messages from Cville STR Advocates.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UnsubscribeForm />
      </Suspense>
    </div>
  );
}
