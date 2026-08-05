import './App.css'

function App() {
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
              allowing users to see which actions were attempted and whether they were permitted

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
             Version 2 has been set up using React and TypeScript. My next step
             is to build the policy system that will define which browser actions
             are allowed or blocked before I rebuild the runtime monitor.
          </p>
        </section>
      </main>

      <footer>
        <p>
          Created by Angel Flores as an undergraduate browser security research
          project.
        </p>
      </footer>
    </div>
  )
}

export default App
