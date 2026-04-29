'use client';

import {
  Shield,
  AlertTriangle,
  Clock,
  Activity,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type ReportData = {
  attack_severity: string | number;
  total_runtime_seconds: string | number;
  num_samples: string | number;
  false_positive_rate: string | number;
};

export default function ReportPage() {
  const router = useRouter();

  const [reportData, setReportData] = useState<ReportData>({
    attack_severity: 0,
    total_runtime_seconds: 0,
    num_samples: 0,
    false_positive_rate: 0,
  });

  const [reportLoading, setReportLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [displayedAttacksRan, setDisplayedAttacksRan] = useState(0);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString());
  }, []);

  useEffect(() => {
    if (!reportLoading) {
      return;
    }

    setLoadingProgress(0);

    const totalDuration = 320000; // 320 seconds
    const updateInterval = 1000; // update every 1 second
    const progressPerTick = 100 / (totalDuration / updateInterval);

    const interval = setInterval(() => {
      setLoadingProgress((currentProgress) => {
        const nextProgress = currentProgress + progressPerTick;
        return Math.min(nextProgress, 100);
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [reportLoading]);

  useEffect(() => {
    if (!reportLoading) {
      return;
    }

    const attackInterval = setInterval(() => {
      setDisplayedAttacksRan((currentCount) => currentCount + 1);
    }, 15000);

    return () => clearInterval(attackInterval);
  }, [reportLoading]);

  function goHome() {
    router.push('/');
  }

  function downloadReport() {
    window.print();
  }

  async function handleCreateReport() {
    setReportLoading(true);
    setLoadingProgress(0);
    setDisplayedAttacksRan(0);
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
        const rawError = String(data.error || data.message || '');

        if (
          rawError.includes('rate_limit') ||
          rawError.includes('Rate limit') ||
          rawError.includes('rate limit') ||
          rawError.includes('tokens per minute')
        ) {
          setError(
            'The report could not be created because the model provider rate limit was reached. Please wait a minute and try again.'
          );
        } else if (
          rawError.includes('Unauthorized') ||
          rawError.includes('Invalid API key') ||
          rawError.includes('API key')
        ) {
          setError(
            'The report could not be created because the API key was missing or invalid. Please check your key and try again.'
          );
        } else {
          setError(
            'The report could not be created. Please try again later.'
          );
        }

        return;
      }

      const flaskReport = data.report ?? data;
      const finalAttackCount = Number(flaskReport.num_samples ?? 0);

      setReportData({
        attack_severity:
          flaskReport.attack_severity ??
          flaskReport.overall_average_score ??
          0,

        total_runtime_seconds:
          flaskReport.total_runtime_seconds ?? 0,

        num_samples:
          flaskReport.num_samples ?? 0,

        false_positive_rate:
          flaskReport.false_positive_rate ?? 0,
      });

      setDisplayedAttacksRan(finalAttackCount);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error(err);
      setError('Something went wrong while creating the report');
    } finally {
      setLoadingProgress(100);
      setReportLoading(false);
    }
  }

  const attackSeverity = Number(reportData.attack_severity);
  const attacksRan = reportLoading
    ? displayedAttacksRan
    : Number(reportData.num_samples);
  const falsePositiveRate = Number(reportData.false_positive_rate);
  const runtimeSeconds = Number(reportData.total_runtime_seconds);
  const runtimeMinutes = runtimeSeconds / 60;

  const safeSeverity = Math.max(0, Math.min(5, attackSeverity));
  const severityProgress = (safeSeverity / 5) * 100;

  const severityLabel =
    safeSeverity <= 1.5
      ? 'Low'
      : safeSeverity <= 3
        ? 'Moderate'
        : safeSeverity <= 4
          ? 'High'
          : 'Critical';

  return (
    <div className="min-h-screen bg-white p-8">
      <style jsx global>{`
        @media print {
          .ui-only {
            display: none !important;
          }

          body {
            background: white;
          }
        }
      `}</style>

      <div className="ui-only max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <button
          onClick={goHome}
          className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-slate-800"
        >
          ← Home
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleCreateReport}
            className="bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-slate-800 disabled:opacity-60"
            disabled={reportLoading}
          >
            {reportLoading ? 'Creating Report...' : 'Create Report'}
          </button>

          <button
            onClick={downloadReport}
            className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-md text-sm hover:bg-slate-800 disabled:opacity-60"
            disabled={reportLoading}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        </div>
      </div>

      {error && (
        <div className="ui-only max-w-7xl mx-auto mb-6">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {reportLoading && (
        <div className="ui-only max-w-7xl mx-auto mb-8">
          <div className="border-2 border-slate-200 rounded-lg p-5 bg-white">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm font-semibold text-black">
                Creating report...
              </p>

              <p className="text-sm text-slate-600">
                {Math.round(loadingProgress)}%
              </p>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded overflow-hidden">
              <div
                className="bg-black h-3 rounded transition-all duration-1000 ease-linear"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>
                Running jailbreak evaluation through Flask... {attacksRan}{' '}
                attack{attacksRan === 1 ? '' : 's'} completed
              </span>
              <span>Estimated runtime: about 4 minutes</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-5xl font-bold text-black">PHALANX</h1>
          </div>

          <p className="text-slate-600 text-lg">
            Advanced Security Analytics Dashboard
          </p>

          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-600">
              {reportLoading ? 'Evaluation Running' : 'System Active'}
            </span>
            <span className="text-slate-300 mx-2">•</span>
            <span className="text-slate-500">
              Last Updated: {lastUpdated || 'Loading...'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card>
            <CardContent>
              <MetricHeader
                icon={<Shield className="h-5 w-5 text-red-600" />}
                title="Attack Severity"
                value={safeSeverity.toFixed(1)}
                unit="/ 5"
                iconBox="bg-red-100"
                iconGraphic={<AlertTriangle className="h-8 w-8 text-red-600" />}
              />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Severity Level</span>
                  <span className="text-red-600">{severityLabel}</span>
                </div>

                <Progress value={severityProgress} />

                <p className="text-xs text-slate-500 mt-3">
                  Attack severity is measured on a scale from 1 to 5, where 1 is
                  low severity and 5 is critical severity.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    <p className="text-slate-600 text-sm uppercase tracking-wider">
                      Attacks Ran
                    </p>
                  </div>
                </div>

                <div className="bg-amber-100 p-3 rounded-lg">
                  <CheckCircle2 className="h-8 w-8 text-amber-600" />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center mt-4">
                <div className="w-28 h-28 rounded-full border-8 border-slate-200 flex items-center justify-center">
                  <span className="text-4xl font-bold text-black">
                    {attacksRan}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-4 text-center">
                  Jailbreak prompts executed against the target LLM.
                </p>

                <div className="grid grid-cols-1 gap-2 mt-4 w-full">
                  <StatBox
                    label="False Positive Rate"
                    value={`${falsePositiveRate}%`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <MetricHeader
                icon={<Clock className="h-5 w-5 text-blue-600" />}
                title="Runtime"
                value={runtimeMinutes.toFixed(1)}
                unit="min"
                iconBox="bg-blue-100"
                iconGraphic={<Activity className="h-8 w-8 text-blue-600" />}
              />

              <div className="grid grid-cols-3 gap-2 mt-4">
                <StatBox
                  label="Runtime"
                  value={`${runtimeMinutes.toFixed(2)} min`}
                />
                <StatBox label="Source" value="Flask" />
                <StatBox label="Status" value={reportLoading ? 'Running' : 'Ready'} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg">
      {children}
    </div>
  );
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-8">{children}</div>;
}

function Progress({ value }: { value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full bg-slate-100 h-2 rounded">
      <div className="bg-black h-2 rounded" style={{ width: `${safeValue}%` }} />
    </div>
  );
}

function MetricHeader({
  icon,
  title,
  value,
  unit,
  iconBox,
  iconGraphic,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  unit: string;
  iconBox: string;
  iconGraphic: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <p className="text-slate-600 text-sm uppercase tracking-wider">
            {title}
          </p>
        </div>

        <div className="flex items-baseline gap-2">
          <h2 className="text-6xl font-bold text-black">{value}</h2>
          {unit && <span className="text-3xl text-slate-500">{unit}</span>}
        </div>
      </div>

      <div className={`${iconBox} p-3 rounded-lg`}>{iconGraphic}</div>
    </div>
  );
}

function StatBox({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-slate-100 p-3 rounded">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-black">{value}</p>
    </div>
  );
}