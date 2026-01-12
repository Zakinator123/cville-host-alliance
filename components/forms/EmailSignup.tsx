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

      // Store email in sessionStorage for petition autopopulation
      if (typeof window !== "undefined") {
        sessionStorage.setItem("petition_email", email);
        // Dispatch custom event to notify petition form
        window.dispatchEvent(new CustomEvent("petitionDataUpdated"));
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

      // Store email/name in sessionStorage for petition autopopulation
      if (typeof window !== "undefined") {
        sessionStorage.setItem("petition_email", email);
        if (name) {
          sessionStorage.setItem("petition_name", name);
        }
        // Dispatch custom event to notify petition form
        window.dispatchEvent(new CustomEvent("petitionDataUpdated"));
      }
      setConfirmationMessage("Name saved! Thanks for joining.");
      setTimeout(() => {
        setConfirmationMessage(null);
        setStage("done");
        onSignupComplete?.(email, name);
      }, 2000);
    });
  };

  const scrollToPetition = () => {
    // Try to find petition form in ActionAlertCard first
    const petitionForm = document.getElementById("petition-form");
    if (petitionForm) {
      petitionForm.scrollIntoView({ behavior: "smooth", block: "center" });
      // Trigger pulsate effect
      petitionForm.classList.add("email-signup-glow");
      setTimeout(() => {
        petitionForm.classList.remove("email-signup-glow");
      }, 3000);
    } else {
      // Fallback: scroll to take-action section
      const takeAction = document.getElementById("take-action");
      if (takeAction) {
        takeAction.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (stage === "done") {
    return (
      <div className="rounded-3xl border border-primary/15 bg-section-tint p-6 shadow-elevated">
        <h3 className="text-xl font-semibold text-foreground">Thank you for joining!</h3>
        <p className="text-muted-foreground mb-4">
          You're on the list. We'll keep you posted on key hearings and action alerts.
        </p>
        <Button onClick={scrollToPetition} className="w-full">
          Sign the petition too
        </Button>
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
          <h3 className="text-xl font-semibold">Get updates</h3>
          <p className="text-sm text-muted-foreground">
            Get updates on hearings, votes, and ways to help.
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
                  // Store email in sessionStorage for petition autopopulation
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("petition_email", email);
                    if (name) {
                      sessionStorage.setItem("petition_name", name);
                    }
                    // Dispatch custom event to notify petition form
                    window.dispatchEvent(new CustomEvent("petitionDataUpdated"));
                  }
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
