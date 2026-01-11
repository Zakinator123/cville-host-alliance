"use client";

import { useState, useTransition } from "react";

import { subscribeEmail, updateSupporterInfo } from "@/app/actions/subscribe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Turnstile } from "@marsidev/react-turnstile";

type Stage = "step1" | "step2" | "done";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function EmailSignup() {
  const [stage, setStage] = useState<Stage>("step1");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [locality, setLocality] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const hasTurnstile = Boolean(siteKey);

  const onSubmitStep1 = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      if (!turnstileToken && hasTurnstile) {
        setError("Please complete the verification.");
        return;
      }

      const result = await subscribeEmail({
        email,
        turnstileToken: turnstileToken || "",
      });

      if (!result.ok) {
        setError(result.error ?? "Something went wrong. Try again.");
        return;
      }

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
        locality,
      });

      if (!result.ok) {
        setError(result.error ?? "Unable to save details.");
        return;
      }

      setStage("done");
    });
  };

  if (stage === "done") {
    return (
      <div className="rounded-2xl border bg-muted/40 p-6">
        <h3 className="text-lg font-semibold">Thank you for joining!</h3>
        <p className="text-muted-foreground">
          You’re on the list. We’ll keep you posted on key hearings and action alerts.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm" id="email-signup">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Stay informed</p>
          <h3 className="text-xl font-semibold">Join the movement</h3>
          <p className="text-sm text-muted-foreground">
            Get updates on hearings, votes, and ways to help.
          </p>
        </div>
      </div>

      {stage === "step1" ? (
        <form className="space-y-4" onSubmit={onSubmitStep1}>
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

          {hasTurnstile && (
            <Turnstile
              siteKey={siteKey!}
              options={{ size: "invisible" }}
              onSuccess={(token) => setTurnstileToken(token)}
            />
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={pending}>
              {pending ? "Submitting..." : "Join the movement"}
            </Button>
            <p className="text-xs text-muted-foreground">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </form>
      ) : (
        <>
          <Separator />
          <form className="space-y-4 pt-4" onSubmit={onSubmitStep2}>
            <p className="text-sm text-muted-foreground">
              Optional: add a name and locality to help us organize locally.
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
            <div className="space-y-2">
              <Label htmlFor="locality">Locality (optional)</Label>
              <Select value={locality} onValueChange={setLocality}>
                <SelectTrigger id="locality">
                  <SelectValue placeholder="Choose a locality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Charlottesville">Charlottesville</SelectItem>
                  <SelectItem value="Albemarle">Albemarle</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={pending}>
                {pending ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStage("done")}
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
