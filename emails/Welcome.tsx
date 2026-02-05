import * as React from "react";

type WelcomeEmailProps = {
  name?: string;
};

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", lineHeight: 1.6, color: "#333" }}>
      <h1 style={{ color: "#1a1a1a", fontSize: "24px", marginBottom: "16px" }}>
        Welcome to Cville STR Advocates
      </h1>
      <p>Hi {name ?? "there"},</p>
      <p>
        Thanks for joining local hosts working toward fair rules in Charlottesville and
        Albemarle. We&apos;ll keep you posted on hearings, votes, and ways to help.
      </p>
      <p style={{ marginTop: "24px" }}>— Cville STR Advocates</p>
      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "32px 0 16px" }} />
      <p style={{ fontSize: "12px", color: "#666" }}>
        Cville STR Advocates · Charlottesville, VA
        <br />
        You received this email because you signed up for updates.
      </p>
    </div>
  );
}
