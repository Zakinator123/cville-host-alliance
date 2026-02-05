import * as React from "react";

type PetitionEmailProps = {
  name?: string;
};

export function PetitionConfirmationEmail({ name }: PetitionEmailProps) {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", lineHeight: 1.6, color: "#333" }}>
      <h1 style={{ color: "#1a1a1a", fontSize: "24px", marginBottom: "16px" }}>
        Thanks for signing the petition
      </h1>
      <p>Hi {name ?? "there"},</p>
      <p>
        Your signature has been recorded. We appreciate your support for balanced STR
        policy in Charlottesville and Albemarle.
      </p>
      <p>We&apos;ll follow up with next steps and upcoming hearings.</p>
      <p style={{ marginTop: "24px" }}>— Cville STR Advocates</p>
      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "32px 0 16px" }} />
      <p style={{ fontSize: "12px", color: "#666" }}>
        Cville STR Advocates · Charlottesville, VA
        <br />
        You received this email because you signed the petition.
      </p>
    </div>
  );
}
