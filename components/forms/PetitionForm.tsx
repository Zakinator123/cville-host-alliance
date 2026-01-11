"use client";

import { useState, useTransition } from "react";

import { submitPetition } from "@/app/actions/petition";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Turnstile } from "@marsidev/react-turnstile";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type PetitionFormProps = {
  initialCount: number;
};

export function PetitionForm({ initialCount }: PetitionFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [locality, setLocality] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const hasTurnstile = Boolean(siteKey);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    startTransition(async () => {
      if (!consentGiven) {
        setError("Please confirm consent to record your signature.");
        return;
      }

      if (!turnstileToken && hasTurnstile) {
        setError("Please complete the verification.");
        return;
      }

      const result = await submitPetition({
        name,
        email,
        zip,
        locality,
        isHost,
        consentGiven,
        turnstileToken: turnstileToken || "",
      });

      if (!result.ok) {
        setError(result.error ?? "Unable to submit right now.");
        return;
      }

      setMessage("Thanks! Your signature has been recorded.");
      setCount((prev) => prev + 1);
      setName("");
      setEmail("");
      setZip("");
      setLocality("");
      setIsHost(false);
      setConsentGiven(false);
    });
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Add your name</p>
          <h3 className="text-xl font-semibold">Petition to protect STRs</h3>
          <p className="text-sm text-muted-foreground">
            {count.toLocaleString()} supporters have signed.
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="locality">Locality</Label>
            <Select value={locality} onValueChange={setLocality}>
              <SelectTrigger id="locality">
                <SelectValue placeholder="Select a locality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Charlottesville">Charlottesville</SelectItem>
                <SelectItem value="Albemarle">Albemarle</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP</Label>
            <Input
              id="zip"
              name="zip"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              inputMode="numeric"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="isHost"
            checked={isHost}
            onCheckedChange={(checked) => setIsHost(Boolean(checked))}
          />
          <Label htmlFor="isHost" className="text-sm text-muted-foreground">
            I am a short-term rental host
          </Label>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox
            id="consent"
            checked={consentGiven}
            onCheckedChange={(checked) => setConsentGiven(Boolean(checked))}
          />
          <Label htmlFor="consent" className="text-sm text-muted-foreground">
            I consent to the Charlottesville Host Alliance storing my information for this petition.
          </Label>
        </div>

        {hasTurnstile && (
          <Turnstile
            siteKey={siteKey!}
            options={{ size: "invisible" }}
            onSuccess={(token) => setTurnstileToken(token)}
          />
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-emerald-600">{message}</p>}

        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Sign petition"}
        </Button>
      </form>
    </div>
  );
}
