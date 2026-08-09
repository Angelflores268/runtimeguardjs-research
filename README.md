# RuntimeGuardJS

RuntimeGuardJS is a browser security research prototype that explores lightweight runtime policy enforcement for third party JavaScript.

The project monitors selected browser actions, evaluates them against security policies, records whether they are allowed or blocked, and explains which policy rule caused each decision.

## Live Project

https://runtimeguardjs.com

## Research Question

How effectively can a lightweight JavaScript runtime monitor detect, block, and explain selected attempts by third party scripts to access browser data or send data through network APIs?

## Project Overview

Third party JavaScript can provide useful website functionality, but it may also receive access to browser data and network APIs.

RuntimeGuardJS explores whether selected JavaScript actions can be intercepted at runtime and evaluated using simple security policies.

The final prototype includes both a research overview and an interactive Security Lab where controlled browser scenarios can be tested.

## Features

### Runtime Monitoring

RuntimeGuardJS currently monitors selected uses of:

* `fetch()`
* Browser storage reads
* Browser storage writes

Each monitored action is evaluated before it is allowed to continue.

### Policy Modes

The prototype includes three security policy modes.

**Permissive**

Allows monitored actions and prioritizes functionality.

**Balanced**

Allows selected normal behavior while restricting protected browser storage keys and disallowed network destinations.

**Strict**

Applies stronger restrictions by blocking browser storage access and limiting external network requests.

## Interactive Security Lab

The Security Lab provides controlled scenarios for testing the runtime monitor.

### Normal Behavior

Tests normal browser storage activity and a local network request.

### Protected Data Access

Attempts to read a browser storage key that has been marked as protected.

### Data Exfiltration

Attempts to read stored browser data and send it to a disallowed network destination.

### Coverage Tests

Tests whether `navigator.sendBeacon()` and `XMLHttpRequest` are visible to the current RuntimeGuardJS monitor.

## Security Event Log

Monitored actions are displayed in a live security event log.

Each event records:

* The action type
* The action target
* Whether the action was allowed or blocked
* The matched policy rule
* The explanation for the decision
* The event timestamp

The prototype also includes a live experiment dashboard that tracks:

* Current policy
* Total monitored events
* Allowed events
* Blocked events

## Experimental Results

Controlled testing showed that RuntimeGuardJS successfully detected and evaluated actions using the browser APIs currently intercepted by the monitor.

| Policy | Scenario | Observed Result |
| --- | --- | --- |
| Balanced | Normal behavior | Allowed |
| Balanced | Protected data access | Blocked |
| Balanced | Data exfiltration | Blocked at fetch |
| Strict | Browser storage access | Blocked |
| Coverage | `sendBeacon()` | Not intercepted |
| Coverage | `XMLHttpRequest` | Not intercepted |

The balanced policy preserved selected normal behavior while blocking protected storage access and requests to disallowed network destinations.

The strict policy provided stronger restrictions but could also interfere with normal browser functionality.

## Coverage and Limitations

RuntimeGuardJS is an API level prototype and only enforces policies on browser APIs that are explicitly intercepted.

The coverage experiments showed that:

**Currently monitored**

* `fetch()`
* Browser storage reads
* Browser storage writes

**Outside current coverage**

* `navigator.sendBeacon()`
* `XMLHttpRequest`

The `sendBeacon()` and `XMLHttpRequest` experiments did not generate RuntimeGuardJS security events.

This demonstrates an important limitation of the approach: the effectiveness of an API level runtime monitor depends on the browser APIs it covers.

The coverage experiments measure whether RuntimeGuardJS intercepted an action. They do not determine whether a network request successfully reached its destination.

## Technology

RuntimeGuardJS Version 2 was built with:

* React
* TypeScript
* Vite
* JavaScript browser APIs
* CSS
* Git and GitHub
* Vercel

## Project Structure

```text
src/
├── App.tsx
├── App.css
├── policy.ts
├── runtimeMonitor.ts
├── eventLogger.ts
├── securityScenarios.ts
└── main.tsx
```

### `policy.ts`

Defines security policies and evaluates whether monitored actions should be allowed or blocked.

### `runtimeMonitor.ts`

Intercepts selected browser APIs and applies policy decisions at runtime.

### `eventLogger.ts`

Records monitored actions and sends updated security events to the interface.

### `securityScenarios.ts`

Contains the controlled browser scenarios used to evaluate RuntimeGuardJS.

### `App.tsx`

Provides the research interface, Security Lab, experiment dashboard, event log, results, and coverage information.

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/Angelflores268/runtimeguardjs-research.git
```

Enter the project directory:

```bash
cd runtimeguardjs-research
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Research Context

RuntimeGuardJS was developed as an undergraduate browser security research project during the University of Dayton Dean's Summer Fellowship.

The project began as an exploration of web security and third party JavaScript before narrowing toward runtime policy enforcement and the design, usefulness, and limitations of a lightweight browser based monitor.

## Future Work

Future work could expand RuntimeGuardJS by monitoring additional browser APIs, developing more expressive policies, increasing the number of controlled security scenarios, and evaluating how the prototype behaves with more realistic third party scripts.

## Author

Angel Flores

Computer Science  
University of Dayton

## Links

Live Project: https://runtimeguardjs.com

GitHub: https://github.com/Angelflores268/runtimeguardjs-research
