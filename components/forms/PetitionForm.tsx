"use client";

import { useState, useTransition, useEffect, useRef } from "react";

import { submitPetition } from "@/app/actions/petition";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type PetitionFormProps = {
  initialCount: number;
  initialName?: string;
  initialEmail?: string;
  shouldPulsate?: boolean;
};

export function PetitionForm({ initialCount, initialName = "", initialEmail = "", shouldPulsate = false }: PetitionFormProps) {
  // Get email/name from sessionStorage if available (from email signup)
  const getStoredEmail = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("petition_email") || initialEmail;
    }
    return initialEmail;
  };
  
  const getStoredName = () => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("petition_name") || initialName;
    }
    return initialName;
  };

  const [name, setName] = useState(getStoredName());
  const [email, setEmail] = useState(getStoredEmail());
  const [locality, setLocality] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLDivElement>(null);

  // Update form fields when sessionStorage changes (from email signup)
  useEffect(() => {
    const handleStorageUpdate = () => {
      const storedEmail = sessionStorage.getItem("petition_email");
      const storedName = sessionStorage.getItem("petition_name");
      if (storedEmail) {
        setEmail(storedEmail);
      }
      if (storedName) {
        setName(storedName);
      }
    };

    // Listen for custom event from email signup
    window.addEventListener("petitionDataUpdated", handleStorageUpdate);
    
    // Check sessionStorage on mount (prioritize over initial props for autopopulation)
    handleStorageUpdate();
    
    // Only use initial props if sessionStorage doesn't have values
    if (!sessionStorage.getItem("petition_email") && initialEmail) {
      setEmail(initialEmail);
    }
    if (!sessionStorage.getItem("petition_name") && initialName) {
      setName(initialName);
    }

    return () => {
      window.removeEventListener("petitionDataUpdated", handleStorageUpdate);
    };
  }, [initialName, initialEmail]);

  useEffect(() => {
    if (shouldPulsate && formRef.current) {
      formRef.current.classList.add("email-signup-glow");
      const timer = setTimeout(() => {
        formRef.current?.classList.remove("email-signup-glow");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [shouldPulsate]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    startTransition(async () => {
      if (!consentGiven) {
        setError("Please confirm consent to record your signature.");
        return;
      }

      const result = await submitPetition({
        name,
        email,
        locality,
        isHost,
        consentGiven,
      });

      if (!result.ok) {
        setError(result.error ?? "Unable to submit right now.");
        return;
      }

      setMessage("Thanks! Your signature has been recorded.");
      setCount((prev) => prev + 1);
      setName("");
      setEmail("");
      setLocality("");
      setIsHost(false);
      setConsentGiven(false);
    });
  };

  return (
    <div ref={formRef} id="petition-form" className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Add your name</p>
          <h3 className="text-xl font-semibold">Demand a pause for open feedback</h3>
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
        <div className="space-y-2">
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
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="isHost" className="text-sm text-muted-foreground cursor-pointer">
            I am a short-term rental host
          </Label>
          <Switch
            id="isHost"
            checked={isHost}
            onCheckedChange={setIsHost}
          />
        </div>
        <div className="flex items-start gap-2">
          <Checkbox
            id="consent"
            checked={consentGiven}
            onCheckedChange={(checked) => setConsentGiven(Boolean(checked))}
          />
          <Label htmlFor="consent" className="text-sm text-muted-foreground">
            I consent to Cville STR Advocates storing my information for this petition.
          </Label>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-emerald-600">{message}</p>}

        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Sign petition"}
        </Button>
      </form>
    </div>
  );
}
