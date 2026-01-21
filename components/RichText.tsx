// Simplified RichText component for plain text arrays with markdown-style formatting

import React from "react";

function parseText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    // Add bold text (remove ** markers)
    const boldText = match[0].slice(2, -2);
    parts.push(
      <strong key={match.index} className="font-semibold">
        {boldText}
      </strong>
    );
    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function RichText({ value }: { value: string[] }) {
  return (
    <div className="space-y-4">
      {value.map((paragraph, index) => {
        // Handle bullet points
        if (paragraph.trim().startsWith('•')) {
          return (
            <ul key={index} className="ml-6 list-disc space-y-2">
              <li className="text-base leading-7 text-muted-foreground">
                {parseText(paragraph.slice(1).trim())}
              </li>
            </ul>
          );
        }
        // Regular paragraph
        return (
          <p key={index} className="text-base leading-7 text-muted-foreground">
            {parseText(paragraph)}
          </p>
        );
      })}
    </div>
  );
}
