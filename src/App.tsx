import { useEffect, useState } from "react";
import "./App.css";

import {
  getEvents,
  subscribeToEvents,
  clearEvents,
  type MonitorEvent,
} from "./eventLogger";

function App() {
  const [events, setEvents] = useState<MonitorEvent[]>(
    getEvents()
  );

  useEffect(() => {
    const unsubscribe = subscribeToEvents((newEvents) => {
      setEvents(newEvents);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="app">
      <header className="hero">
        <p className="eyebrow">RuntimeGuardJS Version 2</p>

        <h1>A Runtime policy enforcement for third party JavaScript</h1>

        <p className="hero-description">
          This is a browser security research prototype and interactive learning tool
          created to study how selected JavaScript actions can be monitored,
          explained, allowed, or blocked at runtime.
        </p>

        <div className="hero-actions">
          <button className="primary-button">Explore the Project</button>
          <button className="secondary-button">View Research Plan</button>
        </div>
      </header>

      <main className="content">
        <section className="intro">
          <h2>Project Overview</h2>

          <p>
            One thing I have learned is that third party JavaScript can provide useful website features, but it
            may also receive access to browser data and network APIs. This project explores how a lightweight runtime
            monitor can enforce policies on selected actions.
          </p>
        </section>

        <section className="card-grid">
          <article className="info-card">
            <h3>What I am building</h3>
            <p>
              This browser based system checks selected actions made by third party JavaScript and allows or blocks them based on a set of security rules. It also records each decision,
              allowing users to see which actions were attempted and whether they were permitted.
            </p>
          </article>

          <article className="info-card">
            <h3>What I am researching</h3>
            <p>
              I am researching how effectively a lightweight JavaScript monitor can detect, block, and explain selected attempts by third party scripts to access or send browser data.
              As an undergraduate research project, this work is also helping me learn the fundamentals of browser security, runtime monitoring, and policy enforcement.
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
            browser storage actions and allow or block them based on security rules.
          </p>
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
                <article className="event-card" key={event.id}>
                  <div className="event-header">
                    <strong>
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
                    <strong>Reason:</strong> {event.reason}
                  </p>
                </article>
              ))
            )}
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