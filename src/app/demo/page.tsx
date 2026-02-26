'use client';

import Link from 'next/link';

export default function DemoPage() {
  return (
    <main className="page">
      {/* HEADER */}
      <header className="topbar">
        <Link href="/" className="back-button">
          ←
        </Link>

        <div className="title-block">
          <div className="logo-icon">
            <span className="shield" />
          </div>
          <div>
            <h1 className="title">Add Model</h1>
            <p className="subtitle">Connect via API endpoint</p>
          </div>
        </div>
      </header>

      <section className="content">
        {/* API ONLY */}
        <div className="card">
          <h2 className="card-title">Connect via API Endpoint</h2>
          <p className="card-description">
            Provide your API endpoint details to connect a remote model for analysis.
          </p>

          <div className="field">
            <label className="label">
              Endpoint URL <span className="required">*</span>
            </label>
            <input
              className="input"
              type="text"
              placeholder="https://api.yourmodel.com/v1/generate"
            />
          </div>

          <div className="field">
            <label className="label">
              API Key <span className="required">*</span>
            </label>
            <input className="input" type="text" placeholder="sk-xxxx" />
          </div>

          <div className="field">
            <label className="label">Model Name (Optional)</label>
            <input className="input" type="text" placeholder="e.g., Custom-LLM" />
          </div>

          <Link href="/report" className="submit-button">
            Submit API Model
          </Link>
        </div>
      </section>

      {/* STYLES */}
      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui, sans-serif;
          background: #f5f5f7;
        }

        .page {
          min-height: 100vh;
        }

        .topbar {
          padding-left: 80px;
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        a.back-button {
          top: 30px;
          left: 16px;
          font-size: 40px;
          text-decoration: none;
          color: #000 !important;
          background: transparent;
          border: none;
        }

        .title-block {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shield {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #ffffffff;
        }

        .title {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #000000ff;
        }

        .subtitle {
          margin: 2px 0 0;
          font-size: 13px;
          color: #000000ff;
        }

        .content {
          max-width: 960px;
          margin: 0 auto;
          padding: 8px 24px 40px;
        }

        .card {
          background: #fff;
          border-radius: 20px;
          padding: 24px 24px 28px;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
          border: 1px solid #f3f4f6;
        }

        .card-title {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 600;
          color: #000000ff;
        }

        .card-description {
          margin: 0 0 24px;
          font-size: 14px;
          color: #4b5563;
        }

        .field {
          margin-top: 20px;
        }

        .label {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 6px;
          display: block;
          color: #111;
        }

        .required {
          color: red;
        }

        .input {
          color: #111;
          width: 100%;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          font-size: 14px;
          background: #f9fafb;
        }

        .input:focus {
          outline: none;
          border-color: #000000ff;
          background: #ffffffff;
        }

        a.submit-button {
          margin-top: 30px;
          display: block;
          width: 100%;
          text-align: center;
          padding: 12px 0;
          border-radius: 12px;
          border: 1px solid #000000;
          background: #000000;
          color: #ffffff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s ease;
        }
      `}</style>
    </main>
  );
}