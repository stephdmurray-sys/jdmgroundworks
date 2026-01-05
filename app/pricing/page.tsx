"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { useState } from "react"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="mb-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Simple pricing. No pressure.
          </h1>
          <p className="text-lg text-slate-600">Start saving feedback for free. Upgrade only when it matters to you.</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 bg-slate-100 rounded-full p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === "annual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Collect — Free */}
          <Card className="p-8 border-2 border-slate-200 flex flex-col">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-semibold text-slate-900">Collect</h3>
              <p className="text-sm text-slate-600 mb-4">Collect real feedback. See the patterns.</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-slate-900">$0</span>
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Personal Nomee page (public link)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Unlimited feedback requests</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Unlimited feedback collected</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Core trait & pattern recognition</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Control over what's visible and when</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-6">Always free.</p>

            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" size="lg" asChild>
              <Link href="/auth/signup">Start saving feedback</Link>
            </Button>
          </Card>

          {/* Maintain — $9/month (MOST POPULAR) */}
          <Card className="p-8 border-2 border-blue-500 bg-white flex flex-col relative shadow-lg scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full">Most popular</span>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-semibold text-slate-900">Maintain</h3>
              <p className="text-sm text-slate-600 mb-4">Keep feedback organized — ready when it matters.</p>
              <div className="mb-6">
                {billingPeriod === "monthly" ? (
                  <>
                    <span className="text-5xl font-bold text-slate-900">$9</span>
                    <span className="text-slate-600 ml-2">/ month</span>
                  </>
                ) : (
                  <>
                    <span className="text-5xl font-bold text-slate-900">$79</span>
                    <span className="text-slate-600 ml-2">/ year</span>
                    <div className="text-sm text-blue-600 mt-1">Save ~27%</div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-900 font-medium">Everything in Collect, plus:</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Upload existing feedback (emails, Slack, screenshots)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Secure long-term storage</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Pin, feature, or hide contributions</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">See recent vs long-term feedback patterns</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Monthly "what's changed" signal</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Clear, human summaries</span>
              </div>
            </div>

            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" size="lg" asChild>
              <Link href="/auth/signup?plan=maintain">Keep my feedback ready</Link>
            </Button>
          </Card>

          {/* Showcase — $19/month */}
          <Card className="p-8 border-2 border-slate-200 flex flex-col">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-semibold text-slate-900">Showcase</h3>
              <p className="text-sm text-slate-600 mb-4">Use feedback when decisions are being made.</p>
              <div className="mb-6">
                {billingPeriod === "monthly" ? (
                  <>
                    <span className="text-5xl font-bold text-slate-900">$19</span>
                    <span className="text-slate-600 ml-2">/ month</span>
                  </>
                ) : (
                  <>
                    <span className="text-5xl font-bold text-slate-900">$169</span>
                    <span className="text-slate-600 ml-2">/ year</span>
                    <div className="text-sm text-blue-600 mt-1">Save ~26%</div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-900 font-medium">Everything in Maintain, plus:</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Embeddable feedback tiles (scrolling cards)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Embed feedback on websites & portfolios</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Saved views (Hiring · Clients · Partnerships)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">One-page export (PDF)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Subtle branding control</span>
              </div>
            </div>

            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" size="lg" asChild>
              <Link href="/auth/signup?plan=showcase">Showcase my work</Link>
            </Button>
          </Card>
        </div>

        {/* Footer Copy */}
        <div className="text-center max-w-2xl mx-auto mb-20 py-8 border-t border-slate-200">
          <p className="text-slate-600 leading-relaxed">
            We don't charge for feedback or asking.
            <br />
            We charge for keeping it organized — ready when it matters.
          </p>
        </div>

        {/* Trust Section */}
        <div className="mb-20 max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-slate-700">No contracts</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-700">Cancel anytime</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-700">No credit card to start</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-700">No surprises</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-24 max-w-3xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Can I use Nomee without my company?</h3>
              <p className="text-slate-600">Yes. Nomee is personal. You decide if and when you share it.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Is this performance review software?</h3>
              <p className="text-slate-600">No. Nomee saves what people already say — it doesn't evaluate or score.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">When do people usually upgrade?</h3>
              <p className="text-slate-600">
                When something important is coming up and they want everything in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-2xl mx-auto py-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-6">When it matters, you'll be ready.</h2>
          <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white mb-4" asChild>
            <Link href="/auth/signup">Start your Nomee</Link>
          </Button>
          <p className="text-sm text-slate-500">Free to start. Upgrade only if you need more.</p>
        </div>
      </div>
    </div>
  )
}
