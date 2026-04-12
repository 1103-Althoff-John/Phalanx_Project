'use client';

import { Shield, AlertTriangle, Clock, Cpu, Activity, TrendingDown, CheckCircle2 } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function ReportPage() {

  const router = useRouter();

  function goHome() {
    router.push("/");
  }

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

      </div>

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
              Last Updated: March 3, 2026 14:32 UTC
            </span>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <Card>
            <CardContent>

              <MetricHeader
                icon={<Shield className="h-5 w-5 text-red-600" />}
                title="Attack Success Rate"
                value="2.3"
                unit="%"
                iconBox="bg-red-100"
                iconGraphic={<TrendingDown className="h-8 w-8 text-red-600" />}
              />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Threat Level</span>
                  <span className="text-green-600">Low</span>
                </div>

                <Progress value={2.3} />

                <p className="text-xs text-slate-500 mt-3">
                  97.7% of attacks successfully blocked
                </p>
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardContent>

              <MetricHeader
                icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
                title="False Positive Rate"
                value="0.85"
                unit="%"
                iconBox="bg-amber-100"
                iconGraphic={<CheckCircle2 className="h-8 w-8 text-amber-600" />}
              />

              <div className="space-y-2">
                <Progress value={0.85} />
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardContent>

              <MetricHeader
                icon={<Clock className="h-5 w-5 text-blue-600" />}
                title="Runtime / Latency"
                value="14.2"
                unit="ms"
                iconBox="bg-blue-100"
                iconGraphic={<Activity className="h-8 w-8 text-blue-600" />}
              />

              <div className="grid grid-cols-3 gap-2 mt-4">
                <StatBox label="P50" value="12ms" />
                <StatBox label="P95" value="28ms" />
                <StatBox label="P99" value="45ms" />
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardContent>

              <MetricHeader
                icon={<Cpu className="h-5 w-5 text-purple-600" />}
                title="GPU Memory Usage"
                value="72"
                unit="%"
                iconBox="bg-purple-100"
                iconGraphic={<Cpu className="h-8 w-8 text-purple-600" />}
              />

              <Progress value={72} />

              <div className="flex justify-between text-xs text-slate-500 mt-3">
                <span>18.4 GB used</span>
                <span>25.6 GB total</span>
              </div>

            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}

function Card({ children }: any) {
  return (
    <div className="bg-white border-2 border-slate-200 rounded-lg">
      {children}
    </div>
  )
}

function CardContent({ children }: any) {
  return (
    <div className="p-8">
      {children}
    </div>
  )
}

function Progress({ value }: { value: number }) {
  return (
    <div className="w-full bg-slate-100 h-2 rounded">
      <div className="bg-black h-2 rounded" style={{ width: `${value}%` }} />
    </div>
  )
}

function MetricHeader({ icon, title, value, unit, iconBox, iconGraphic }: any) {

  return (
    <div className="flex items-start justify-between mb-6">

      <div>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <p className="text-slate-600 text-sm uppercase tracking-wider">{title}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <h2 className="text-6xl font-bold text-black">{value}</h2>
          <span className="text-3xl text-slate-500">{unit}</span>
        </div>
      </div>

      <div className={`${iconBox} p-3 rounded-lg`}>
        {iconGraphic}
      </div>

    </div>
  )
}

function StatBox({ label, value }: any) {
  return (
    <div className="bg-slate-100 p-3 rounded">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-black">{value}</p>
    </div>
  )
}