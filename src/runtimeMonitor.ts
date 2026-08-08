import { evaluatePolicy } from "./policy";
import { recordEvent } from "./eventLogger";

const originalFetch = window.fetch.bind(window);

export function installFetchMonitor() {
  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit
  ): Promise<Response> => {
    const target =
      input instanceof Request
        ? input.url
        : input instanceof URL
        ? input.href
        : input;

    const decision = evaluatePolicy({
      type: "fetch",
      target,
    });

    recordEvent({
      action: "fetch",
      target,
      allowed: decision.allowed,
      reason: decision.reason,
      rule: decision.rule,
    });

    console.log("RuntimeGuardJS fetch attempt:", {
      target,
      allowed: decision.allowed,
      reason: decision.reason,
      rule: decision.rule,
    });

    if (!decision.allowed) {
      throw new Error(
        `RuntimeGuardJS blocked fetch: ${decision.reason}`
      );
    }

    return originalFetch(input, init);
  };
}

const originalGetItem = Storage.prototype.getItem;
const originalSetItem = Storage.prototype.setItem;

export function installStorageMonitor() {
  Storage.prototype.getItem = function (
    key: string
  ): string | null {
    const decision = evaluatePolicy({
      type: "storage-read",
      target: key,
    });

    recordEvent({
      action: "storage-read",
      target: key,
      allowed: decision.allowed,
      reason: decision.reason,
      rule: decision.rule,
    });

    console.log("RuntimeGuardJS storage read attempt:", {
      target: key,
      allowed: decision.allowed,
      reason: decision.reason,
      rule: decision.rule,
    });

    if (!decision.allowed) {
      throw new Error(
        `RuntimeGuardJS blocked storage read: ${decision.reason}`
      );
    }

    return originalGetItem.call(this, key);
  };

  Storage.prototype.setItem = function (
    key: string,
    value: string
  ): void {
    const decision = evaluatePolicy({
      type: "storage-write",
      target: key,
    });

    recordEvent({
      action: "storage-write",
      target: key,
      allowed: decision.allowed,
      reason: decision.reason,
      rule: decision.rule,
    });

    console.log("RuntimeGuardJS storage write attempt:", {
      target: key,
      allowed: decision.allowed,
      reason: decision.reason,
      rule: decision.rule,
    });

    if (!decision.allowed) {
      throw new Error(
        `RuntimeGuardJS blocked storage write: ${decision.reason}`
      );
    }

    originalSetItem.call(this, key, value);
  };
}
