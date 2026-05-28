"use client";

import { Analytics } from "@vercel/analytics/react";

export default function AnalyticsProvider() {
  return (
    <Analytics
      beforeSend={(event) => {
        if (typeof window !== "undefined" && localStorage.getItem("va_exclude") === "true") {
          return null;
        }
        return event;
      }}
    />
  );
}
