import { useEffect, useState } from "react";
import "./App.css";

import {
  getEvents,
  subscribeToEvents,
  clearEvents,
  type MonitorEvent,
} from "./eventLogger";

import {
  runNormalBehavior,
  runProtectedDataAccess,
  runDataExfiltration,
  runBeaconCoverageTest,
  runXHRcoverageTest,
} from "./securityScenarios";

import {
  getPolicyMode,
  setPolicyMode,
  type PolicyMode,
} from "./policy";

type Page = "research" | "prototype";

function App() {
  const [events, setEvents] = useState<MonitorEvent[]>(
    getEvents()
  );

  const [selectedPolicy, setSelectedPolicy] =
    useState<PolicyMode>(getPolicyMode());

  const [currentPage, setCurrentPage] =
    useState<Page>("research");

  const allowedCount = events.filter(
    (event) => event.allowed
  ).length;

  const blockedCount = events.filter(
    (event) => !event.allowed
  ).length;

  function changePolicy(mode: PolicyMode) {
    setPolicyMode(mode);
    setSelectedPolicy(mode);
    clearEvents();
  }

  function changePage(page: Page) {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const unsubscribe = subscribeToEvents((newEvents) => {
      setEvents(newEvents);
    });

    return unsubscribe;
  }, []);

  if (currentPage === "prototype") {
    return (
      <div className="app">
        <header className="hero">
          <p className="eyebrow">RuntimeGuardJS Version 2</p>

          <h1>Interactive RuntimeGuardJS Prototype</h1>

          <p className="hero-description">
            Use the interactive security lab to test how RuntimeGuardJS
            monitors selected JavaScript actions and applies different
            security policies at runtime.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => changePage("research")}
            >
              Back to Research
            </button>
          </div>
        </header>

        <main className="content">
          <section className="experiment-dashboard">
            <div>
              <p className="status-label">Live experiment</p>
              <h2>Experiment Dashboard</h2>

              <p>
                This dashboard updates as monitored actions are recorded
                during the experiment.
              </p>
            </div>

            <div className="experiment-summary">
              <article className="summary-card">
                <span>Current policy</span>
                <strong>{selectedPolicy}</strong>
              </article>

              <article className="summary-card">
                <span>Events</span>
                <strong>{events.length}</strong>
              </article>

              <article className="summary-card allowed-summary">
                <span>Allowed</span>
                <strong>{allowedCount}</strong>
              </article>

              <article className="summary-card blocked-summary">
                <span>Blocked</span>
                <strong>{blockedCount}</strong>
              </article>
            </div>
          </section>

          <section className="lab-section">
            <div>
              <p className="status-label">Interactive experiment</p>
              <h2>Security Lab</h2>

              <p>
                Run controlled JavaScript scenarios to see how RuntimeGuardJS
                detects, allows, or blocks different browser actions.
              </p>
            </div>

            <div className="policy-selector">
              <p>
                <strong>Current policy:</strong> {selectedPolicy}
              </p>

              <div className="lab-actions">
                <button
                  className={
                    selectedPolicy === "permissive"
                      ? "primary-button"
                      : "secondary-button"
                  }
                  onClick={() => changePolicy("permissive")}
                >
                  Permissive
                </button>

                <button
                  className={
                    selectedPolicy === "balanced"
                      ? "primary-button"
                      : "secondary-button"
                  }
                  onClick={() => changePolicy("balanced")}
                >
                  Balanced
                </button>

                <button
                  className={
                    selectedPolicy === "strict"
                      ? "primary-button"
                      : "secondary-button"
                  }
                  onClick={() => changePolicy("strict")}
                >
                  Strict
                </button>
              </div>
            </div>

            <div className="lab-actions">
              <button
                className="primary-button"
                onClick={runNormalBehavior}
              >
                Run normal behavior
              </button>

              <button
                className="secondary-button"
                onClick={runProtectedDataAccess}
              >
                Attempt protected data access
              </button>

              <button
                className="secondary-button"
                onClick={runDataExfiltration}
              >
                Attempt data exfiltration
              </button>

              <button
                className="secondary-button"
                onClick={runBeaconCoverageTest}
              >
                Test sendBeacon coverage
              </button>

              <button
                className="secondary-button"
                onClick={runXHRcoverageTest}
              >
                Test XMLHttpRequest coverage
              </button>
            </div>
          </section>

          <section className="event-section">
            <div>
              <p className="status-label">Runtime activity</p>
              <h2>Security event log</h2>

              <p>
                Actions monitored by RuntimeGuardJS appear here with the policy
                decision and explanation.
              </p>

              <button
                className="secondary-button"
                onClick={clearEvents}
              >
                Clear event log
              </button>
            </div>

            <div className="event-list">
              {events.length === 0 ? (
                <p>No monitored events yet.</p>
              ) : (
                events.map((event) => (
                  <article
                    className={
                      event.allowed
                        ? "event-card allowed-event"
                        : "event-card blocked-event"
                    }
                    key={event.id}
                  >
                    <div className="event-header">
                      <strong className="event-decision">
                        <span className="event-dot"></span>
                        {event.allowed ? "ALLOWED" : "BLOCKED"}
                      </strong>

                      <span>{event.timestamp}</span>
                    </div>

                    <p>
                      <strong>Action:</strong> {event.action}
                    </p>

                    <p>
                      <strong>Target:</strong> {event.target}
                    </p>

                    <p>
                      <strong>Matched rule:</strong> {event.rule}
                    </p>

                    <p>
                      <strong>Reason:</strong> {event.reason}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="experiment-guide">
            <div>
              <p className="status-label">Experiment guide</p>
              <h2>What Each Test Does</h2>

              <p>
                Each scenario represents a different type of browser
                activity used to evaluate the runtime monitor.
              </p>
            </div>

            <div className="guide-grid">
              <article className="guide-card">
                <h3>Normal behavior</h3>

                <p>
                  Tests ordinary browser storage activity and a local
                  network request.
                </p>
              </article>

              <article className="guide-card">
                <h3>Protected data access</h3>

                <p>
                  Attempts to read a browser storage key that is marked
                  as protected by the policy.
                </p>
              </article>

              <article className="guide-card">
                <h3>Data exfiltration</h3>

                <p>
                  Attempts to read stored data and send it to a
                  disallowed network destination.
                </p>
              </article>

              <article className="guide-card">
                <h3>Coverage tests</h3>

                <p>
                  Tests whether sendBeacon and XMLHttpRequest are
                  visible to the current RuntimeGuardJS monitor.
                </p>
              </article>
            </div>
          </section>

          <section className="coverage-section">
            <div>
              <p className="status-label">Research coverage</p>
              <h2>Coverage & Limitations</h2>

              <p>
                RuntimeGuardJS currently monitors selected browser APIs. The
                coverage experiments showed that actions using monitored APIs
                are evaluated by the policy system, while APIs that are not
                intercepted can operate outside the current monitor.
              </p>
            </div>

            <div className="coverage-grid">
              <article className="coverage-card">
                <h3>Currently monitored</h3>

                <p>✓ fetch()</p>
                <p>✓ Browser storage reads</p>
                <p>✓ Browser storage writes</p>
              </article>

              <article className="coverage-card">
                <h3>Outside current coverage</h3>

                <p>○ navigator.sendBeacon()</p>
                <p>○ XMLHttpRequest</p>
              </article>
            </div>

            <div className="coverage-finding">
              <h3>What the experiment showed</h3>

              <p>
                The sendBeacon and XMLHttpRequest tests did not generate
                RuntimeGuardJS security events. This shows that the current
                prototype only enforces policies on browser APIs that are
                explicitly intercepted. Expanding API coverage would therefore
                be necessary for stronger protection against alternative
                methods of sending data.
              </p>
            </div>
          </section>
        </main>

        <footer>
          <p>
            Created by Angel Flores as an undergraduate browser security
            research project.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">RuntimeGuardJS Version 2</p>

        <h1>A Runtime policy enforcement for third party JavaScript</h1>

        <p className="hero-description">
          This is a browser security research prototype and interactive learning
          tool created to study how selected JavaScript actions can be monitored,
          explained, allowed, or blocked at runtime.
        </p>

        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={() => changePage("prototype")}
          >
            Explore the Prototype
          </button>
        </div>
      </header>

      <main className="content">
        <section className="intro">
          <h2>Project Overview</h2>

          <p>
            One thing I have learned is that third party JavaScript can provide
            useful website features, but it may also receive access to browser
            data and network APIs. This project explores how a lightweight
            runtime monitor can enforce policies on selected actions.
          </p>
        </section>

        <section className="card-grid">
          <article className="info-card">
            <h3>What I am building</h3>

            <p>
              This browser based system checks selected actions made by third
              party JavaScript and allows or blocks them based on a set of
              security rules. It also records each decision, allowing users to
              see which actions were attempted and whether they were permitted.
            </p>
          </article>

          <article className="info-card">
            <h3>What I am researching</h3>

            <p>
              I am researching how effectively a lightweight JavaScript monitor
              can detect, block, and explain selected attempts by third party
              scripts to access or send browser data. As an undergraduate
              research project, this work is also helping me learn the
              fundamentals of browser security, runtime monitoring, and policy
              enforcement.
            </p>
          </article>

          <article className="info-card">
            <h3>What I am learning</h3>

            <p>
              Through this project, I am learning how to build with React and
              TypeScript, work with browser APIs, and create a runtime monitor
              that follows security policies. I am also gaining experience with
              research design, testing, and explaining technical work clearly.
            </p>
          </article>
        </section>

        <section className="status-section">
          <div>
            <p className="status-label">Current stage</p>
            <h2>Version 2 foundation</h2>
          </div>

          <p>
            Version 2 has been set up using React and TypeScript. The policy
            system and runtime monitor can now evaluate selected network and
            browser storage actions and allow or block them based on security
            rules.
          </p>
        </section>

        <section className="coverage-section">
          <div>
            <p className="status-label">Research study</p>
            <h2>Research Question</h2>

            <p>
              This project investigates how effectively a lightweight
              JavaScript runtime monitor can detect, block, and explain
              selected attempts by third party scripts to access browser data
              or send data through network APIs.
            </p>
          </div>

          <div className="coverage-finding">
            <h3>Methodology</h3>

            <p>
              To evaluate RuntimeGuardJS, I created controlled browser scenarios
              representing both normal and potentially risky JavaScript
              behavior. These scenarios included normal browser storage access,
              attempts to access a protected storage key, attempts to send data
              to a disallowed domain, and coverage tests using browser APIs
              that are not currently intercepted by the prototype.
            </p>

            <p>
              I tested the system using three policy modes: permissive,
              balanced, and strict. The permissive policy prioritizes
              functionality by allowing monitored actions. The balanced policy
              allows selected normal behavior while restricting protected
              storage keys and disallowed network destinations. The strict
              policy applies stronger restrictions by blocking browser storage
              access and limiting external network requests.
            </p>

            <p>
              During each experiment, I observed whether RuntimeGuardJS detected
              the action, whether it allowed or blocked the action, which policy
              rule was matched, and what explanation was displayed in the
              security event log.
            </p>
          </div>

          <div className="coverage-finding">
            <h3>Experimental Results</h3>

            <div className="results-table-wrapper">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Policy</th>
                    <th>Scenario</th>
                    <th>Observed Result</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Balanced</td>
                    <td>Normal behavior</td>
                    <td>Allowed</td>
                  </tr>

                  <tr>
                    <td>Balanced</td>
                    <td>Protected data access</td>
                    <td>Blocked</td>
                  </tr>

                  <tr>
                    <td>Balanced</td>
                    <td>Data exfiltration</td>
                    <td>Blocked at fetch</td>
                  </tr>

                  <tr>
                    <td>Strict</td>
                    <td>Browser storage access</td>
                    <td>Blocked</td>
                  </tr>

                  <tr>
                    <td>Coverage</td>
                    <td>sendBeacon</td>
                    <td>Not intercepted</td>
                  </tr>

                  <tr>
                    <td>Coverage</td>
                    <td>XMLHttpRequest</td>
                    <td>Not intercepted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="coverage-finding">
            <h3>Results Summary</h3>

            <p>
              In the controlled experiments, RuntimeGuardJS successfully
              detected and evaluated actions that used the browser APIs
              currently wrapped by the monitor. Under the balanced policy,
              normal theme storage and localhost network activity were
              permitted, while access to the protected session token key and a
              fetch request to a disallowed domain were blocked.
            </p>

            <p>
              The security event log also identified the policy rule
              responsible for each monitored decision and provided an
              explanation of why the action was allowed or blocked.
            </p>

            <p>
              The coverage experiments showed that navigator.sendBeacon() and
              XMLHttpRequest did not generate RuntimeGuardJS security events
              because those APIs are not currently intercepted. This
              demonstrates that the effectiveness of the monitor depends on
              which browser APIs it covers.
            </p>

            <p>
              These coverage experiments measure whether RuntimeGuardJS
              intercepted an action. They do not determine whether the network
              request itself successfully reached its destination.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <p>
          Created by Angel Flores as an undergraduate browser security research
          project.
        </p>
      </footer>
    </div>
  );
}

export default App;



