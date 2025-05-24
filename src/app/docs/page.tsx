import { CheckIcon } from '@heroicons/react/20/solid'

const sections = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Understanding Traces',
        description: 'Learn how traces work and what they represent in your application.',
        link: '/docs/traces',
      },
      {
        title: 'Setting Up Monitoring',
        description: 'Step-by-step guide to setting up monitoring for your application.',
        link: '/docs/setup',
      },
      {
        title: 'Dashboard Overview',
        description: 'Learn how to navigate and use the dashboard effectively.',
        link: '/docs/dashboard',
      },
    ],
  },
  {
    title: 'Monitoring Features',
    items: [
      {
        title: 'API Monitoring',
        description: 'Track and analyze your API calls and responses.',
        link: '/docs/api-monitoring',
      },
      {
        title: 'Performance Metrics',
        description: 'Understand and optimize your application performance.',
        link: '/docs/performance',
      },
      {
        title: 'Alert Configuration',
        description: 'Set up and manage alerts for important events.',
        link: '/docs/alerts',
      },
    ],
  },
  {
    title: 'Best Practices',
    items: [
      {
        title: 'Optimizing Trace Usage',
        description: 'Tips for efficient trace usage and cost optimization.',
        link: '/docs/optimization',
      },
      {
        title: 'Team Collaboration',
        description: 'Best practices for team collaboration and monitoring.',
        link: '/docs/collaboration',
      },
      {
        title: 'Security Guidelines',
        description: 'Security best practices for monitoring sensitive data.',
        link: '/docs/security',
      },
    ],
  },
]

export default function DocsPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Documentation
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Learn how to use Spyglass effectively to monitor and optimize your application.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <dt className="text-2xl font-bold leading-7 text-gray-900">{section.title}</dt>
                <dd className="mt-4 flex flex-col gap-4">
                  {section.items.map((item) => (
                    <div key={item.title} className="relative flex gap-x-4">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                        <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          <a href={item.link} className="hover:text-indigo-600">
                            {item.title}
                          </a>
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
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
              Our support team is here to help you get the most out of Spyglass. Whether you need
              help setting up monitoring, understanding metrics, or optimizing your usage, we're
              here for you.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <a
                href="/support"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Contact Support
              </a>
              <a href="/community" className="text-sm font-semibold leading-6 text-gray-900">
                Join our community <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 