import * as React from "react";

type WelcomeEmailProps = {
  name?: string;
};

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", lineHeight: 1.6 }}>
      <h1>Welcome to the Charlottesville Host Alliance</h1>
      <p>Hi {name ?? "there"},</p>
      <p>
        Thanks for joining local hosts working toward fair rules in Charlottesville and
        Albemarle. We’ll keep you posted on hearings, votes, and ways to help.
      </p>
      <p>— The Charlottesville Host Alliance</p>
    </div>
  );
}
