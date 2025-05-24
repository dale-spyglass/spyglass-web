import { CodeBracketIcon, CommandLineIcon, BeakerIcon } from '@heroicons/react/20/solid'

const sections = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Installation',
        description: 'Quick start guide to install and configure the Spyglass SDK.',
        code: 'npm install @spyglass/sdk',
        icon: CommandLineIcon,
      },
      {
        title: 'Basic Setup',
        description: 'Initialize the SDK with your API key and configure basic settings.',
        code: `import { Spyglass } from '@spyglass/sdk'

const spyglass = new Spyglass({
  apiKey: process.env.SPYGLASS_API_KEY,
  environment: 'production',
})`,
        icon: CodeBracketIcon,
      },
      {
        title: 'First Trace',
        description: 'Send your first trace to monitor an API endpoint.',
        code: `// Example: Monitoring an API endpoint
app.get('/api/users', async (req, res) => {
  const trace = spyglass.startTrace('get-users')
  
  try {
    const users = await db.users.findMany()
    trace.setAttribute('userCount', users.length)
    res.json(users)
  } catch (error) {
    trace.setError(error)
    res.status(500).json({ error: 'Internal server error' })
  } finally {
    trace.end()
  }
})`,
        icon: BeakerIcon,
      },
    ],
  },
  {
    title: 'Core Features',
    items: [
      {
        title: 'Custom Traces',
        description: 'Create custom traces for specific operations or business logic.',
        code: `// Example: Custom trace for a background job
const trace = spyglass.startTrace('process-payment', {
  attributes: {
    userId: '123',
    amount: 99.99,
    currency: 'USD'
  }
})

try {
  await processPayment()
  trace.setStatus('success')
} catch (error) {
  trace.setError(error)
} finally {
  trace.end()`,
        icon: CodeBracketIcon,
      },
      {
        title: 'Performance Monitoring',
        description: 'Monitor performance of critical operations.',
        code: `// Example: Performance monitoring
const trace = spyglass.startTrace('complex-calculation')
const startTime = performance.now()

// Your complex calculation here
await performComplexCalculation()

const duration = performance.now() - startTime
trace.setAttribute('duration_ms', duration)
trace.end()`,
        icon: BeakerIcon,
      },
      {
        title: 'Error Tracking',
        description: 'Track and analyze errors in your application.',
        code: `// Example: Error tracking
try {
  await riskyOperation()
} catch (error) {
  spyglass.captureError(error, {
    context: {
      userId: '123',
      operation: 'update-profile'
    }
  })
  throw error
}`,
        icon: CommandLineIcon,
      },
    ],
  },
  {
    title: 'Advanced Usage',
    items: [
      {
        title: 'Distributed Tracing',
        description: 'Track requests across multiple services.',
        code: `// Example: Distributed tracing
const trace = spyglass.startTrace('order-processing')
const span = trace.startSpan('payment-service')

try {
  await paymentService.processPayment()
  span.end()
  
  const shippingSpan = trace.startSpan('shipping-service')
  await shippingService.scheduleDelivery()
  shippingSpan.end()
} finally {
  trace.end()
}`,
        icon: CodeBracketIcon,
      },
      {
        title: 'Custom Metrics',
        description: 'Track custom business metrics.',
        code: `// Example: Custom metrics
spyglass.recordMetric('active_users', {
  value: 150,
  tags: {
    plan: 'premium',
    region: 'us-west'
  }
})`,
        icon: BeakerIcon,
      },
      {
        title: 'Context Propagation',
        description: 'Propagate context across async operations.',
        code: `// Example: Context propagation
const trace = spyglass.startTrace('background-job')
const context = trace.getContext()

// Pass context to async operation
await processInBackground(context, async () => {
  const childTrace = spyglass.startTrace('sub-task', { parent: context })
  // ... do work ...
  childTrace.end()
})

trace.end()`,
        icon: CommandLineIcon,
      },
    ],
  },
]

export default function SDKPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            SDK Documentation
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Integrate Spyglass into your application with our powerful SDK. Monitor, trace, and optimize your code with ease.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <dt className="text-2xl font-bold leading-7 text-gray-900">{section.title}</dt>
                <dd className="mt-4 flex flex-col gap-4">
                  {section.items.map((item) => (
                    <div key={item.title} className="relative flex flex-col gap-4">
                      <div className="flex items-center gap-x-4">
                        <item.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-6 text-gray-600">{item.description}</p>
                      <div className="relative rounded-lg bg-gray-900 p-4">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>{item.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Need Help?</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Our developer support team is here to help you integrate Spyglass into your application.
              Whether you need help with the SDK, have questions about best practices, or want to
              discuss custom integrations, we're here for you.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <a
                href="/support"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Contact Developer Support
              </a>
              <a href="/community" className="text-sm font-semibold leading-6 text-gray-900">
                Join our developer community <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 