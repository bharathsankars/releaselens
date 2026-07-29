export const RELEASE_RISK_LEVELS = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type ReleaseRiskLevel =
  (typeof RELEASE_RISK_LEVELS)[keyof typeof RELEASE_RISK_LEVELS];