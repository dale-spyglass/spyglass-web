'use client'

import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useSession } from 'next-auth/react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const metrics = [
  {
    name: 'Daily Traces',
    value: '2,345',
    limit: '10,000',
    percentage: 23.45,
    description: 'API calls and operations tracked today',
  },
  {
    name: 'Team Members',
    value: '5',
    limit: '10',
    percentage: 50,
    description: 'Active team members with access',
  },
  {
    name: 'Storage Used',
    value: '45.2 GB',
    limit: '100 GB',
    percentage: 45.2,
    description: 'Monitoring data storage used',
  },
]

const recentActivity = [
  {
    id: 1,
    type: 'API Call',
    description: 'User authentication request',
    timestamp: '2 minutes ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'Database Query',
    description: 'Fetch user profile data',
    timestamp: '5 minutes ago',
    status: 'success',
  },
  {
    id: 3,
    type: 'External Service',
    description: 'Payment processing',
    timestamp: '10 minutes ago',
    status: 'warning',
  },
]

export default function DashboardPage() {
  const { data: session } = useSession()
  const [timeRange, setTimeRange] = useState('24h')

  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Response Time (ms)',
        data: [150, 230, 180, 400, 280, 220],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back, {session?.user?.name}. Here's an overview of your monitoring activity.
          </p>
        </div>

        {/* Usage Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.name} className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
                <span className="text-sm text-gray-500">
                  {metric.value} / {metric.limit}
                </span>
              </div>
              <div className="mt-4">
                <Progress value={metric.percentage} className="h-2" />
                <p className="mt-2 text-sm text-gray-500">{metric.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
            <ul role="list" className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            activity.status === 'success'
                              ? 'bg-green-400'
                              : activity.status === 'warning'
                              ? 'bg-yellow-400'
                              : 'bg-red-400'
                          }`}
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              View Detailed Metrics
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Set Up Alerts
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Invite Team Members
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Response Time Trend</h3>
              <div className="h-80">
                <Line data={chartData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 