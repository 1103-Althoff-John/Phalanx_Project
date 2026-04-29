'use client';

import {
  Shield,
  AlertTriangle,
  Clock,
  Cpu,
  Activity,
  TrendingDown,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ReportData = {
  overall_attack_success_rate: string | number;
  total_runtime_seconds: string | number;
  false_positive_rate: string | number;
  average_gpu_memory: string | number;
};

export default function ReportPage() {
  const router = useRouter();

  const [reportData, setReportData] = useState<ReportData>({
    overall_attack_success_rate: 2.3,
    total_runtime_seconds: 14.2,
    false_positive_rate: 0.85,
    average_gpu_memory: 72,
  });

  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState('');

  function goHome() {
    router.push('/');
  }

  function downloadReport() {
    window.print();
  }

  async function handleCreateReport() {
    setReportLoading(true);
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

      const flaskReport = data.report ?? data;

      setReportData({
        overall_attack_success_rate:
          flaskReport.overall_attack_success_rate ?? 0,
        total_runtime_seconds:
          flaskReport.total_runtime_seconds ?? 0,
        false_positive_rate:
          flaskReport.false_positive_rate ?? 0,
        average_gpu_memory:
          flaskReport.average_gpu_memory ?? 0,
      });
    } catch (err) {
      console.error(err);
      setError('Something went wrong while creating the report');
    } finally {
      setReportLoading(false);
    }
  }

  const attackSuccessRate = Number(reportData.overall_attack_success_rate);
  const falsePositiveRate = Number(reportData.false_positive_rate);
  const latency = Number(reportData.total_runtime_seconds);
  const gpuUsage = Number(reportData.average_gpu_memory);

  const blockedRate = 100 - attackSuccessRate;

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Hide navigation when printing / exporting PDF */}
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

      {/* Top navigation */}
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
            <span className="text-green-600">System Active</span>
            <span className="text-slate-300 mx-2">•</span>
            <span className="text-slate-500">
              Last Updated: {new Date().toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardContent>
              <MetricHeader
                icon={<Shield className="h-5 w-5 text-red-600" />}
                title="Attack Success Rate"
                value={attackSuccessRate}
                unit="%"
                iconBox="bg-red-100"
                iconGraphic={<TrendingDown className="h-8 w-8 text-red-600" />}
              />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Threat Level</span>
                  <span className="text-green-600">
                    {attackSuccessRate <= 5
                      ? 'Low'
                      : attackSuccessRate <= 15
                        ? 'Medium'
                        : 'High'}
                  </span>
                </div>

                <Progress value={attackSuccessRate} />

                <p className="text-xs text-slate-500 mt-3">
                  {blockedRate.toFixed(1)}% of attacks successfully blocked
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <MetricHeader
                icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
                title="False Positive Rate"
                value={falsePositiveRate}
                unit="%"
                iconBox="bg-amber-100"
                iconGraphic={
                  <CheckCircle2 className="h-8 w-8 text-amber-600" />
                }
              />

              <div className="space-y-2">
                <Progress value={falsePositiveRate} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <MetricHeader
                icon={<Clock className="h-5 w-5 text-blue-600" />}
                title="Runtime / Latency"
                value={latency}
                unit="s"
                iconBox="bg-blue-100"
                iconGraphic={<Activity className="h-8 w-8 text-blue-600" />}
              />

              <div className="grid grid-cols-3 gap-2 mt-4">
                <StatBox label="Runtime" value={`${latency}s`} />
                <StatBox label="Source" value="Flask" />
                <StatBox label="Status" value={reportLoading ? 'Running' : 'Ready'} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <MetricHeader
                icon={<Cpu className="h-5 w-5 text-purple-600" />}
                title="GPU Memory Usage"
                value={gpuUsage}
                unit="%"
                iconBox="bg-purple-100"
                iconGraphic={<Cpu className="h-8 w-8 text-purple-600" />}
              />

              <Progress value={gpuUsage} />

              <div className="flex justify-between text-xs text-slate-500 mt-3">
                <span>{gpuUsage}% used</span>
                <span>100% total</span>
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
          <span className="text-3xl text-slate-500">{unit}</span>
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