"use client";

import { useState, useTransition } from "react";

import { subscribeEmail, updateSupporterInfo } from "@/app/actions/subscribe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type Stage = "step1" | "step2" | "done";

type EmailSignupProps = {
  onSignupComplete?: (email: string, name: string) => void;
};

export function EmailSignup({ onSignupComplete }: EmailSignupProps) {
  const [stage, setStage] = useState<Stage>("step1");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const onSubmitStep1 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await subscribeEmail({
        email,
      });

      if (!result.ok) {
        setError(result.error ?? "Something went wrong. Try again.");
        return;
      }

      setConfirmationMessage("Thanks! You're signed up for updates.");
      setStage("step2");
    });
  };

  const onSubmitStep2 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      if (!email) {
        setError("Email is missing from step 1.");
        return;
      }

      const result = await updateSupporterInfo({
        email,
        name,
      });

      if (!result.ok) {
        setError(result.error ?? "Unable to save details.");
        return;
      }

      setConfirmationMessage("Name saved! Thanks for joining.");
      setTimeout(() => {
        setConfirmationMessage(null);
        setStage("done");
        onSignupComplete?.(email, name);
      }, 2000);
    });
  };

  if (stage === "done") {
    return (
      <div className="rounded-3xl border border-primary/15 bg-section-tint p-6 shadow-elevated">
        <h3 className="text-xl font-semibold text-foreground">You&apos;re on the list</h3>
        <p className="text-muted-foreground">
          We&apos;ll be in touch when meetings come up and the occasional time we need a few hosts to weigh in.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-3xl border border-primary/15 bg-card card-surface shadow-elevated"
      id="email-signup"
    >
      <div className="mb-4 flex items-center justify-between gap-3 px-6 pt-6">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold">Stay in the loop</h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ll send a heads-up when meetings matter and the occasional ask between them.
          </p>
        </div>
      </div>

      {confirmationMessage && (
        <div className="px-6 pb-4">
          <p className="text-sm text-emerald-600 font-medium">{confirmationMessage}</p>
        </div>
      )}

      {stage === "step1" ? (
        <form className="space-y-4 px-6 pb-6" onSubmit={onSubmitStep1}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(error)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={pending} className="shadow-elevated">
              {pending ? "Submitting..." : "Stay informed"}
            </Button>
            <p className="text-xs text-muted-foreground">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </form>
      ) : (
        <>
          <Separator />
          <form className="space-y-4 px-6 pb-6 pt-4" onSubmit={onSubmitStep2}>
            <p className="text-sm text-muted-foreground">
              Optional: add your name to help us organize locally.
            </p>
            <div className="space-y-2">
              <Label htmlFor="name">Name (optional)</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={pending} className="shadow-elevated">
                {pending ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setStage("done");
                  onSignupComplete?.(email, name);
                }}
                disabled={pending}
              >
                Skip
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
