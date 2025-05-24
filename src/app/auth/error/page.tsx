'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    console.log('Auth error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error === 'Callback'
              ? 'There was a problem with the authentication callback. Please try again.'
              : 'An unexpected error occurred during authentication.'}
          </p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => window.location.href = '/auth/signin'}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
} 