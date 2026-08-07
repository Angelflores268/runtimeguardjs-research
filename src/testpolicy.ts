import {
  evaluatePolicy,
  type SecurityAction,
} from "./policy";

const testActions: SecurityAction[] = [
  {
    type: "fetch",
    target: "https://api.example.com/users",
  },
  {
    type: "fetch",
    target: "https://evil.example.com/steal-data",
  },
  {
    type: "storage-read",
    target: "session-token",
  },
  {
    type: "storage-write",
    target: "theme",
  },
  {
    type: "fetch",
    target: "not-a-valid-url",
  },
];

for (const action of testActions) {
  const decision = evaluatePolicy(action);

  console.log("Attempted action:", action);
  console.log("Policy decision:", decision);
  console.log("--------------------");
}


