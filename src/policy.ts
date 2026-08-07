export type ActionType =
  | "fetch"
  | "storage-read"
  | "storage-write";

export type SecurityAction = {
  type: ActionType;
  target: string;
};

export type PolicyDecision = {
  allowed: boolean;
  reason: string;
};

const ALLOWED_DOMAINS = [
  "api.example.com",
  "trusted.example.com",
];

const PROTECTED_STORAGE_KEYS = [
  "session-token",
  "auth-token",
];

export function evaluatePolicy(
  action: SecurityAction
): PolicyDecision {
  if (action.type === "fetch") {
    try {
      const url = new URL(action.target);

      if (ALLOWED_DOMAINS.includes(url.hostname)) {
        return {
          allowed: true,
          reason: `Requests to ${url.hostname} are allowed.`,
        };
      }

      return {
        allowed: false,
        reason: `Requests to ${url.hostname} are not allowed.`,
      };
    } catch {
      return {
        allowed: false,
        reason: "The request target is not a valid URL.",
      };
    }
  }

  if (
    action.type === "storage-read" ||
    action.type === "storage-write"
  ) {
    if (PROTECTED_STORAGE_KEYS.includes(action.target)) {
      return {
        allowed: false,
        reason: `Access to "${action.target}" is blocked because it is protected.`,
      };
    }

    return {
      allowed: true,
      reason: `Access to "${action.target}" is allowed.`,
    };
  }

  return {
    allowed: false,
    reason: "The action type is not recognized.",
  };
}

