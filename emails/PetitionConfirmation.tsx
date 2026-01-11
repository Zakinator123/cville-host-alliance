import * as React from "react";

type PetitionEmailProps = {
  name?: string;
};

export function PetitionConfirmationEmail({ name }: PetitionEmailProps) {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", lineHeight: 1.6 }}>
      <h1>Thanks for signing the petition</h1>
      <p>Hi {name ?? "there"},</p>
      <p>
        Your signature has been recorded. We appreciate your support for balanced STR
        policy in Charlottesville and Albemarle.
      </p>
      <p>We’ll follow up with next steps and upcoming hearings.</p>
      <p>— The Charlottesville Host Alliance</p>
    </div>
  );
}
