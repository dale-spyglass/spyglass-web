'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import { CheckIcon } from '@heroicons/react/20/solid'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const tiers = [
  {
    name: 'Free Trial',
    id: 'tier-free',
    href: '#',
    price: { monthly: '$0' },
    description: 'Perfect for trying out Spyglass and understanding your monitoring needs.',
    features: [
      '14-day free trial',
      'Up to 1,000 traces per day',
      '3 team members',
      'Basic monitoring features',
      'Email support',
    ],
    cta: 'Start Free Trial',
    mostPopular: false,
  },
  {
    name: 'Standard',
    id: 'tier-standard',
    href: '#',
    price: { monthly: '$29' },
    description: 'For growing teams that need comprehensive monitoring.',
    features: [
      'Up to 10,000 traces per day',
      '10 team members',
      'Advanced monitoring features',
      'Priority support',
      'Custom dashboards',
      'API access',
    ],
    cta: 'Get Started',
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: 'Custom' },
    description: 'For organizations with custom monitoring needs.',
    features: [
      'Unlimited traces',
      'Unlimited team members',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantees',
      'Custom pricing based on usage',
    ],
    cta: 'Contact Sales',
    mostPopular: false,
  },
]

const metrics = [
  {
    name: 'Traces',
    description: 'A trace represents a single request or operation in your application. Each API call, database query, or external service call counts as a trace.',
    example: 'Example: A user login request that makes 3 API calls = 3 traces',
  },
  {
    name: 'Team Members',
    description: 'Users who can access your Spyglass dashboard and monitoring data.',
    example: 'Developers, DevOps engineers, and product managers who need to monitor the application',
  },
  {
    name: 'Support Level',
    description: 'The level of technical support and response time you can expect.',
    example: 'Email support (Free), Priority support (Standard), Dedicated support (Enterprise)',
  },
]

export default function PricingPage() {
  const { data: session } = useSession()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const handleSubscribe = async (priceId: string, isEnterprise: boolean = false) => {
    if (isEnterprise) {
      window.location.href = 'mailto:sales@spyglass.dev'
      return
    }

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      })

      const data = await response.json()

      if (data.error) {
        console.error('Error:', data.error)
        return
      }

      const stripe = await stripePromise
      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Transparent pricing with clear usage limits. Scale as you grow.
        </p>

        {/* Pricing Tiers */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                tierIdx === 0 ? 'lg:rounded-r-none' : '',
                tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
                'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10'
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h2
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h2>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
                  'mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Usage Metrics Explanation */}
        <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Understanding Your Usage</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe in transparent pricing and clear usage metrics. Here's what you need to know about how we measure your usage:
          </p>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {metrics.map((metric) => (
              <div key={metric.name} className="pt-6">
                <dt>
                  <div className="flex items-start">
                    <p className="text-lg font-semibold leading-7 text-gray-900">{metric.name}</p>
                  </div>
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  <p>{metric.description}</p>
                  <p className="mt-2 text-sm text-gray-500">{metric.example}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-16 max-w-2xl lg:mt-24">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Frequently Asked Questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <div className="pt-6">
              <dt>
                <div className="flex items-start">
                  <p className="text-lg font-semibold leading-7 text-gray-900">How are traces counted?</p>
                </div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Each API call, database query, or external service call in your application counts as one trace. We aggregate these traces to give you insights into your application's performance and behavior.
              </dd>
            </div>
            <div className="pt-6">
              <dt>
                <div className="flex items-start">
                  <p className="text-lg font-semibold leading-7 text-gray-900">Can I upgrade or downgrade my plan?</p>
                </div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the end of your billing cycle.
              </dd>
            </div>
            <div className="pt-6">
              <dt>
                <div className="flex items-start">
                  <p className="text-lg font-semibold leading-7 text-gray-900">What happens if I exceed my trace limit?</p>
                </div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                If you exceed your daily trace limit, we'll notify you and you'll have the option to upgrade your plan or purchase additional traces.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
} 