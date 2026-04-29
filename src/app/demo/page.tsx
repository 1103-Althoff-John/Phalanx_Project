'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DemoPage() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleConnect() {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/User_llm/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to connect API key');
        return;
      }

      setMessage(data.message || 'API key saved successfully');
      setApiKey('');
    } catch (err) {
      setError('Something went wrong while connecting the API key');
    } finally {
      setLoading(false);
    }
  }

  function viewReport() {
    router.push('/report');
  }

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/" className="back-button" aria-label="Back to home">
          ←
        </Link>

        <div className="title-block">
          <h1 className="title">Add Model</h1>
          <p className="subtitle">API endpoint</p>
        </div>
      </header>

      <section className="content">
        <div className="card">
          <h2 className="card-title">Connect via API Endpoint</h2>

          <p className="card-description">
            Provide your API endpoint details to connect a remote model for
            analysis.
          </p>

          <p className="disclaimer">
            Disclaimer: Only Groq API keys are currently
            supported. Other provider keys will not work with Phalanx at this
            time.
          </p>

          <div className="field">
            <label className="label">
              API Key <span className="required">*</span>
            </label>

            <input
              className="input"
              type="text"
              placeholder="sk-xxxx"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="button-row">
            <button
              onClick={handleConnect}
              className="view-button"
              disabled={loading || reportLoading || !apiKey.trim()}
              type="button"
            >
              {loading ? 'Connecting...' : 'Save API Key'}
            </button>

            <button
              onClick={viewReport}
              className="view-button secondary-button"
              disabled={loading || reportLoading}
              type="button"
            >
              Review or Create Report
            </button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            sans-serif;
          background: #f5f5f7;
          color: #111827;
        }

        .page {
          min-height: 100vh;
          background: #f5f5f7;
        }

        .topbar {
          position: relative;
          width: 100%;
          padding: 36px 24px 28px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a.back-button {
          position: absolute;
          left: 32px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 40px;
          line-height: 1;
          text-decoration: none;
          color: #000 !important;
          background: transparent;
          border: none;
        }

        .title-block {
          text-align: center;
        }

        .title {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
          color: #000;
        }

        .subtitle {
          margin: 6px 0 0;
          font-size: 14px;
          color: #4b5563;
        }

        .content {
          max-width: 960px;
          margin: 0 auto;
          padding: 8px 24px 40px;
          box-sizing: border-box;
        }

        .card {
          background: #ffffff;
          border-radius: 20px;
          padding: 24px 24px 28px;
          box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
          border: 1px solid #f3f4f6;
        }

        .card-title {
          margin: 0 0 8px;
          font-size: 18px;
          font-weight: 600;
          color: #000;
        }

        .card-description {
          margin: 0 0 24px;
          font-size: 14px;
          color: #4b5563;
          line-height: 1.5;
        }

        .disclaimer {
          margin: -8px 0 20px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #fef3c7;
          border: 1px solid #fde68a;
          color: #92400e;
          font-size: 13px;
          line-height: 1.4;
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
          box-sizing: border-box;
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
          border-color: #000;
          background: #fff;
        }

        .button-row {
          margin-top: 30px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .view-button {
          flex: 1;
          text-align: center;
          padding: 12px 0;
          border-radius: 12px;
          border: 1px solid #000;
          background: #000;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }

        .view-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .secondary-button {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-message {
          margin-top: 16px;
          color: #166534;
          font-size: 14px;
        }

        .error-message {
          margin-top: 16px;
          color: #b91c1c;
          font-size: 14px;
        }

        @media (max-width: 640px) {
          .topbar {
            padding: 32px 56px 24px;
          }

          a.back-button {
            left: 18px;
            font-size: 34px;
          }

          .title {
            font-size: 24px;
          }

          .content {
            padding: 8px 16px 32px;
          }

          .button-row {
            flex-direction: column;
          }

          .view-button {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}