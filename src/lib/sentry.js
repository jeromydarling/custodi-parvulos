/**
 * Sentry initialization — federation-aware error tracking.
 * Per CROS doctrine: app_slug tag, replays masked, media blocked, no PII.
 */
import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION ?? "unknown",
    initialScope: {
      tags: {
        app_slug: "custodi-parvulos",
        federation_phase: "adjacent",
      },
    },
    sendDefaultPii: false,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/[a-z]+\.lovable\.app/,
      /^https:\/\/[a-z]+\.supabase\.co/,
    ],
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
  });
}
