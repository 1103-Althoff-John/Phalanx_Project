'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="page">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <Link href="/" className="logo-link">
              <span className="logo-text">Phalanx</span>
            </Link>
          </div>

          <nav className="nav-links">
            <Link href="/about" className="nav-link active-link">
              About Us
            </Link>

            <Link href="/watermarking" className="nav-link">
              Watermarking
            </Link>
          </nav>

          <div className="account-wrapper">
            <Link href="/account" className="account-button">
              Account
            </Link>
          </div>
        </div>
      </header>

      <section className="about-hero">
        <p className="eyebrow">CS 426 Senior Project</p>
        <h1 className="about-title">
          Phalanx – LLM Jailbreak Evaluation Platform
        </h1>
        <p className="about-subtitle">
          Spring 2026 · University of Nevada, Reno · Computer Science &
          Engineering Department
        </p>
      </section>

      <section className="about-content">
        <div className="info-grid">
          <div className="info-card">
            <h2>Team Information</h2>
            <p>
              <strong>Team Number:</strong> 27
            </p>
            <p>
              <strong>Team Name:</strong> Phalanx
            </p>
          </div>

          <div className="info-card">
            <h2>Team Members</h2>
            <ul>
              <li>John Althoff</li>
              <li>Aiden Coss</li>
              <li>Karam Alkherej</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>Course Instructors</h2>
            <ul>
              <li>David Feil-Seifer, University of Nevada, Reno</li>
              <li>Vinh Le, University of Nevada, Reno</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>External Advisor</h2>
            <p>Zoey Hu, Lab Lead / Professor</p>
          </div>
        </div>

        <div className="section-card">
          <h2>Project Overview</h2>
          <p>
            Large Language Models (LLMs) are becoming increasingly common in
            real-world applications, but their growing use also raises major
            security concerns. One of the most important of these concerns is
            jailbreak vulnerability, where an attacker attempts to bypass a
            model’s safety protections through carefully crafted prompts.
          </p>

          <p>
            Phalanx is a web-based evaluation platform designed to test the
            security robustness of LLMs through automated jailbreak analysis.
            The platform allows users to securely submit API keys for their
            deployed models and run a set of
            benign and adversarial prompts against the selected model. The
            system then analyzes model behavior and generates structured reports
            that highlight vulnerabilities, attack success patterns, and
            safety-related outcomes.
          </p>

          <p>
            The goal of the project is to provide a practical framework for
            identifying weaknesses in LLM safety defenses and helping users
            better understand the risks associated with model deployment. By
            combining an accessible web interface with automated testing and
            reporting, Phalanx aims to make LLM security evaluation more usable,
            repeatable, and informative.
          </p>
        </div>

        <div className="section-card">
          <h2>Why This Project Matters</h2>
          <p>
            AI safety, model misuse, prompt injection, and jailbreak attacks are
            active areas of concern in both research and industry. As
            organizations continue adopting LLM-based systems, there is an
            increasing need for tools that evaluate model behavior and identify
            potential vulnerabilities.
          </p>

          <p>
            Phalanx contributes to this space by providing a structured and
            repeatable evaluation workflow for LLM jailbreak testing.
          </p>
        </div>

        <div className="section-card">
          <h2>Project Goals</h2>
          <p>The main goals of Phalanx are to:</p>

          <ul className="clean-list">
            <li>Provide a usable interface for evaluating LLM jailbreak resistance</li>
            <li>Allow users to securely submit and manage model API credentials</li>
            <li>Run automated prompt-based evaluations against deployed LLMs</li>
            <li>Generate structured reports summarizing vulnerabilities and behavior</li>
            <li>Support repeatable and informative security testing</li>
          </ul>
        </div>

        <div className="section-card">
          <h2>Technologies Used</h2>

          <div className="tech-grid">
            <div>
              <span className="tech-label">Frontend</span>
              <p>Next.js</p>
            </div>

            <div>
              <span className="tech-label">Backend</span>
              <p>FastAPI / Python</p>
            </div>

            <div>
              <span className="tech-label">Database</span>
              <p>MongoDB</p>
            </div>

            <div>
              <span className="tech-label">Authentication</span>
              <p>Secure login and credential handling</p>
            </div>

            <div>
              <span className="tech-label">Evaluation Focus</span>
              <p>
                Jailbreak testing, adversarial prompting, response analysis,
                reporting
              </p>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2>Accessibility</h2>
          <p>
            This project is being developed with accessibility in mind. The
            README and associated website are intended to follow
            accessibility-conscious design practices, including:
          </p>

          <ul className="clean-list">
            <li>Clear and consistent heading structure</li>
            <li>Readable formatting and spacing</li>
            <li>Descriptive link text</li>
            <li>Keyboard-accessible navigation for the web interface</li>
            <li>Alternative text for meaningful images when included</li>
            <li>Sufficient color contrast</li>
            <li>
              Content organization that supports screen-reader compatibility
              where applicable
            </li>
          </ul>
        </div>

        <div className="section-card">
          <h2>Current Project Status</h2>
          <p>
            Phalanx is currently in active development as part of the CS 426
            Senior Project course. The platform is being expanded over time
            with additional features, testing capabilities, and documentation.
          </p>
        </div>

        <div className="section-card">
          <h2>References</h2>

          <div className="reference-list">
            <div className="reference-item">
              <h3>Promptfoo</h3>
              <p>
                LLM evaluation and red-teaming framework relevant as a
                comparable benchmarking and testing tool for Phalanx.
              </p>
            </div>

            <div className="reference-item">
              <h3>TruLens</h3>
              <p>
                Framework for evaluating and tracking LLM application quality
                and behavior; relevant for comparison in evaluation workflow
                design.
              </p>
            </div>

            <div className="reference-item">
              <h3>DeepEval</h3>
              <p>
                Open-source LLM evaluation framework relevant to benchmarking,
                testing methodology, and report-oriented analysis.
              </p>
            </div>

            <div className="reference-item">
              <h3>Association for Computing Machinery</h3>
              <p>
                ACM Code of Ethics and Professional Conduct was used to support
                the legal and ethical discussion, especially professional
                responsibility for product quality, safety, security, and
                usability.
              </p>
            </div>
          </div>
        </div>

        <div className="section-card repository-card">
          <h2>Repository</h2>
          <div className="repo-links">
            <a
              href="https://github.com/1103-Althoff-John/Phalanx_Project"
              target="_blank"
              rel="noopener noreferrer"
              className="repo-button"
            >
              View the Phalanx Project on GitHub
            </a>

            <a
              href="https://github.com/1103-Althoff-John/Phalanx_Project"
              target="_blank"
              rel="noopener noreferrer"
              className="repo-button secondary-button"
            >
              View this README file directly
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">© 2025 Phalanx. All rights reserved.</footer>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            sans-serif;
          color: #111827;
          background: #ffffff;
        }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .header {
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
        }

        .header-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .logo-link {
          text-decoration: none;
          color: inherit;
        }

        .logo-text {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-left: 32px;
          margin-right: auto;
        }

        .nav-link {
          font-size: 14px;
          color: #111827;
          text-decoration: none;
          font-weight: 500;
        }

        .nav-link:hover,
        .active-link {
          color: #4b5563;
          text-decoration: underline;
        }

        .account-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .account-button {
          border-radius: 9999px;
          border: 1px solid #d1d5db;
          padding: 6px 14px;
          font-size: 14px;
          background: #f9fafb;
          color: #111827;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .account-button:hover {
          background: #f3f4f6;
        }

        .about-hero {
          max-width: 960px;
          margin: 0 auto;
          padding: 56px 24px 32px;
          text-align: center;
        }

        .eyebrow {
          margin: 0 0 10px;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #6b7280;
          font-weight: 600;
        }

        .about-title {
          font-size: 34px;
          line-height: 1.15;
          font-weight: 650;
          margin: 0 0 16px;
          color: #111827;
        }

        .about-subtitle {
          max-width: 700px;
          margin: 0 auto;
          font-size: 15px;
          line-height: 1.6;
          color: #4b5563;
        }

        .about-content {
          width: 100%;
          max-width: 960px;
          margin: 0 auto;
          padding: 16px 24px 56px;
          box-sizing: border-box;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .info-card,
        .section-card {
          border-radius: 16px;
          border: 1px solid #000000;
          background: #ffffff;
          padding: 24px 22px;
        }

        .section-card {
          margin-top: 16px;
        }

        .info-card h2,
        .section-card h2 {
          margin: 0 0 12px;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .info-card p,
        .section-card p {
          margin: 0 0 12px;
          font-size: 14px;
          line-height: 1.65;
          color: #4b5563;
        }

        .info-card p:last-child,
        .section-card p:last-child {
          margin-bottom: 0;
        }

        .info-card ul,
        .clean-list {
          margin: 0;
          padding-left: 20px;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.65;
        }

        .clean-list li {
          margin-bottom: 6px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .tech-grid div {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 14px 16px;
          background: #f9fafb;
        }

        .tech-label {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b7280;
          font-weight: 600;
        }

        .tech-grid p {
          margin: 0;
          color: #111827;
        }

        .reference-list {
          display: grid;
          gap: 12px;
        }

        .reference-item {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 14px 16px;
          background: #f9fafb;
        }

        .reference-item h3 {
          margin: 0 0 6px;
          font-size: 15px;
          color: #111827;
        }

        .reference-item p {
          margin: 0;
        }

        .repository-card {
          text-align: center;
        }

        .repo-links {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 16px;
        }

        .repo-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: 1px solid #111827;
          padding: 9px 16px;
          background: #111827;
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }

        .repo-button:hover {
          background: #374151;
        }

        .secondary-button {
          background: #ffffff;
          color: #111827;
        }

        .secondary-button:hover {
          background: #f3f4f6;
        }

        .footer {
          margin-top: auto;
          padding: 24px 16px 32px;
          font-size: 13px;
          text-align: center;
          color: #6b7280;
          border-top: 1px solid #f3f4f6;
        }

        @media (max-width: 768px) {
          .header-inner {
            flex-wrap: wrap;
            gap: 12px;
          }

          .nav-links {
            order: 3;
            width: 100%;
            margin-left: 0;
            margin-right: 0;
            justify-content: center;
          }

          .account-wrapper {
            margin-left: auto;
          }

          .about-title {
            font-size: 28px;
          }

          .info-grid,
          .tech-grid {
            grid-template-columns: 1fr;
          }

          .repo-links {
            flex-direction: column;
          }

          .repo-button {
            width: 100%;
            box-sizing: border-box;
          }
        }
      `}</style>
    </main>
  );
}