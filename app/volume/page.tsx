import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { VolumeAnalysis } from '@/components/volume-analysis'

export default function VolumePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Volume Analysis</h1>
        </div>
        <VolumeAnalysis />
      </div>
    </DashboardLayout>
  )
}


