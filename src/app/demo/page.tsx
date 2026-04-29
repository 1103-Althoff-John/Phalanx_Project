'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DemoPage() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
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

  /*async function handleCreateReport() {
    setReportLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch('/api/jailbreak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create report');
        return;
      }

      setMessage('Report created successfully');
    } catch (err) {
      setError('Something went wrong while creating the report');
    } finally {
      setReportLoading(false);
    }
  }*/

  function handleCreateReport() {
    router.push('/report');
  }

  function viewReport() {
    router.push('/report');
  }

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/" className="back-button">
          ←
        </Link>

        <div className="title-block">
          <div>
            <h1 className="title">Add Model</h1>
            <p className="subtitle">Connect via API endpoint</p>
          </div>
        </div>
      </header>

      <section className="content">
        <div className="card">
        <h2 className="card-title">Connect via API Endpoint</h2>
        <p className="card-description">
          Provide your API endpoint details to connect a remote model for analysis.
        </p>

        <p className="disclaimer">
          Disclaimer: Only OpenAI API keys or Groq API keys are currently supported.
          Other provider keys will not work with Phalanx at this time.
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
            >
              {loading ? 'Connecting...' : 'Save API Key'}
            </button>

            <button
              onClick={viewReport}
              className="view-button secondary-button"
              disabled={loading || reportLoading}
            >
              View Report
            </button>
          </div>
        </div>
      </section>

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

        .title {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #000;
        }

        .subtitle {
          margin: 2px 0 0;
          font-size: 13px;
          color: #000;
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
          color: #000;
        }

        .card-description {
          margin: 0 0 24px;
          font-size: 14px;
          color: #4b5563;
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
      `}</style>
    </main>
  );
}