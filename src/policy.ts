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

export type PolicyMode =
  | "permissive"
  | "balanced"
  | "strict";

let currentPolicyMode: PolicyMode = "balanced";

const ALLOWED_DOMAINS = [
  "api.example.com",
  "trusted.example.com",
  "localhost",
];

const PROTECTED_STORAGE_KEYS = [
  "session-token",
  "auth-token",
];

export function setPolicyMode(mode: PolicyMode) {
  currentPolicyMode = mode;
}

export function getPolicyMode(): PolicyMode {
  return currentPolicyMode;
}

export function evaluatePolicy(
  action: SecurityAction
): PolicyDecision {

  // PERMISSIVE POLICY
  if (currentPolicyMode === "permissive") {
    return {
      allowed: true,
      reason: `The permissive policy allows this ${action.type} action.`,
    };
  }

  // STRICT POLICY
  if (currentPolicyMode === "strict") {
    if (action.type === "fetch") {
      try {
        const url = new URL(action.target);

        if (url.hostname === "localhost") {
          return {
            allowed: true,
            reason:
              "The strict policy allows requests to localhost.",
          };
        }

        return {
          allowed: false,
          reason:
            "The strict policy blocks requests to external domains.",
        };
      } catch {
        return {
          allowed: false,
          reason: "The request target is not a valid URL.",
        };
      }
    }

    return {
      allowed: false,
      reason:
        "The strict policy blocks browser storage access.",
    };
  }

  // BALANCED POLICY
  if (action.type === "fetch") {
    try {
      const url = new URL(action.target);

      if (ALLOWED_DOMAINS.includes(url.hostname)) {
        return {
          allowed: true,
          reason: `Requests to ${url.hostname} are allowed by the balanced policy.`,
        };
      }

      return {
        allowed: false,
        reason: `Requests to ${url.hostname} are not allowed by the balanced policy.`,
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
      reason: `Access to "${action.target}" is allowed by the balanced policy.`,
    };
  }

  return {
    allowed: false,
    reason: "The action type is not recognized.",
  };
}
