import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { TechnicalAnalysis } from '@/components/technical-analysis'

export default function AnalysisPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Technical Analysis</h1>
        </div>
        <TechnicalAnalysis />
      </div>
    </DashboardLayout>
  )
}


