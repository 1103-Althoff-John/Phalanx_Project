'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

type AttackType =
  | 'prompt-injection'
  | 'policy-override'
  | 'roleplay'
  | 'obfuscation'
  | 'fake-system'
  | 'fake-tool'
  | 'translation-code'
  | 'benign';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [attackType, setAttackType] =
    useState<AttackType>('prompt-injection');

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const attackDescription =
    attackType === 'prompt-injection'
      ? 'Attempts to override the model’s instructions by telling it to ignore prior rules, system messages, or developer directions.'
      : attackType === 'policy-override'
        ? 'Tells the model that its safety rules are disabled and asks it to behave like an unrestricted assistant.'
        : attackType === 'roleplay'
          ? 'Hides the unsafe request inside a fictional story, simulation, game, or pretend scenario.'
          : attackType === 'obfuscation'
            ? 'Disguises the harmful request using vague wording, encoded text, missing steps, or indirect instructions.'
            : attackType === 'fake-system'
              ? 'Makes the prompt look like it came from a system, developer, administrator, or internal safety message.'
              : attackType === 'fake-tool'
                ? 'Tries to convince the model that a safety check already passed or that restrictions were already removed.'
                : attackType === 'translation-code'
                  ? 'Hides unsafe instructions inside a normal-looking task like translating text, summarizing content, or reviewing code.'
                  : 'Uses harmless prompts to make sure the model still answers normal user requests correctly.';

  function handleLogout() {
    setMenuOpen(false);
    signOut({ callbackUrl: '/login' });
  }

  return (
    <main className="page">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-text">Phalanx</span>
          </div>

          <nav className="nav-links">
            <Link href="/about" className="nav-link">
              About Us
            </Link>

            <Link href="/watermarking" className="nav-link">
              Watermarking
            </Link>
          </nav>

          <div className="account-wrapper" ref={menuRef}>
            <button
              className="account-button"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              Account
              <span className={`chevron ${menuOpen ? 'chevron-open' : ''}`}>
                ▼
              </span>
            </button>

            {menuOpen && (
              <div className="dropdown">
                <Link
                  href="/login"
                  className="dropdown-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Log in/Sign up</span>
                </Link>

                <Link
                  href="/account"
                  className="dropdown-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <span>Account settings</span>
                </Link>

                <button
                  type="button"
                  className="dropdown-item logout-button"
                  onClick={handleLogout}
                >
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="hero">
        <h1 className="hero-title">Test Your AI Models</h1>

        <p className="hero-subtitle">
          Phalanx runs adversarial prompts against your language models to
          identify security vulnerabilities before malicious users exploit them.
        </p>

        <div className="hero-actions">
          <Link href="/login" className="primary-button">
            Login
          </Link>
        </div>
      </section>

      <section className="attack-preview-section">
        <div className="attack-preview-card">
          <h2 className="attack-preview-title">Attack Types We Test</h2>

          <p className="attack-preview-subtitle">
            Phalanx runs different categories of jailbreak prompts to measure
            how your model handles unsafe, misleading, or instruction-overriding
            requests.
          </p>

          <div className="attack-tabs">
            <button
              type="button"
              className={`attack-tab ${
                attackType === 'prompt-injection' ? 'attack-tab-active' : ''
              }`}
              onClick={() => setAttackType('prompt-injection')}
            >
              Prompt Injection
            </button>

            <button
              type="button"
              className={`attack-tab ${
                attackType === 'policy-override' ? 'attack-tab-active' : ''
              }`}
              onClick={() => setAttackType('policy-override')}
            >
              Policy Override
            </button>

            <button
              type="button"
              className={`attack-tab ${
                attackType === 'roleplay' ? 'attack-tab-active' : ''
              }`}
              onClick={() => setAttackType('roleplay')}
            >
              Roleplay
            </button>

            <button
              type="button"
              className={`attack-tab ${
                attackType === 'obfuscation' ? 'attack-tab-active' : ''
              }`}
              onClick={() => setAttackType('obfuscation')}
            >
              Obfuscation
            </button>

            <button
              type="button"
              className={`attack-tab ${
                attackType === 'fake-system' ? 'attack-tab-active' : ''
              }`}
              onClick={() => setAttackType('fake-system')}
            >
              Fake System
            </button>

            <button
              type="button"
              className={`attack-tab ${
                attackType === 'fake-tool' ? 'attack-tab-active' : ''
              }`}
              onClick={() => setAttackType('fake-tool')}
            >
              Fake Tool
            </button>

            <button
              type="button"
              className={`attack-tab ${
                attackType === 'translation-code' ? 'attack-tab-active' : ''
              }`}
              onClick={() => setAttackType('translation-code')}
            >
              Translation / Code
            </button>

            <button
              type="button"
              className={`attack-tab ${
                attackType === 'benign' ? 'attack-tab-active' : ''
              }`}
              onClick={() => setAttackType('benign')}
            >
              Benign Baseline
            </button>
          </div>

          <p className="attack-description">{attackDescription}</p>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="card">
            <h2 className="card-title">Reliable Testing</h2>
            <p className="card-text">
              Run the same jailbreak tests across models so results are easier
              to compare and reproduce.
            </p>
          </div>

          <div className="card">
            <h2 className="card-title">Clear Metrics</h2>
            <p className="card-text">
              Turn model responses into readable severity scores, runtime
              information, and report results.
            </p>
          </div>

          <div className="card">
            <h2 className="card-title">Safer Deployment</h2>
            <p className="card-text">
              Find weak spots before real users discover them and improve your
              model before release.
            </p>
          </div>
        </div>

        <div className="home-demo-panel">
          <div className="home-demo-content">
            <p className="home-demo-label">Live demo</p>

            <h2 className="home-demo-title">See Phalanx in action</h2>

            <p className="home-demo-text">
              Run a sample evaluation and view how Phalanx detects jailbreak
              attempts, scores responses, and generates a report.
            </p>

            <Link href="/demo" className="home-demo-button">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer">© 2025 Phalanx. All rights reserved.</footer>
    </main>
  );
}