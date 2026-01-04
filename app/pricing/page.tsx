"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { useState } from "react"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly")

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <h1 className="mb-4 sm:mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Simple pricing. Real leverage.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            Start free. Upgrade only when your reputation starts working for you.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingPeriod === "monthly" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("annual")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              billingPeriod === "annual" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Annual
            <span className="ml-2 text-xs">Save ~27%</span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto mb-20">
          <Card className="p-6 sm:p-8 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col">
            <div className="mb-8">
              <h3 className="mb-3 text-2xl font-bold text-slate-900">Collect</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold text-slate-900">$0</span>
                <span className="text-slate-600 ml-2">forever</span>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">Collect real praise before it disappears.</p>
            </div>

            <div className="space-y-3 mb-8 flex-1">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Unlimited Nomee collection links</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Unlimited contributors</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">
                  Core AI summary: &quot;How it feels to work with you&quot;
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Highlighted traits & keywords</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Private storage of praise</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Shareable Nomee page (basic view)</span>
              </div>
            </div>

            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" size="lg" asChild>
              <Link href="/auth/signup">Create your Nomee</Link>
            </Button>
          </Card>

          <Card className="p-6 sm:p-8 border-2 border-slate-900 bg-slate-50 hover:shadow-xl transition-all duration-300 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-slate-900 text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
                MOST POPULAR
              </span>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-2xl font-bold text-slate-900">Maintain</h3>
              <div className="mb-2 flex items-baseline gap-3">
                <div>
                  <span className="text-5xl font-bold text-slate-900">${billingPeriod === "monthly" ? "9" : "79"}</span>
                  <span className="text-slate-600 ml-2">/ {billingPeriod === "monthly" ? "month" : "year"}</span>
                </div>
              </div>
              {billingPeriod === "annual" && (
                <p className="text-sm font-medium text-green-700 mb-3">Save ~27% — best value</p>
              )}
              <p className="text-base text-slate-900 font-medium leading-relaxed">
                Own and steward your reputation over time.
              </p>
            </div>

            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-900 font-medium">Everything in Collect, plus:</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">
                  Upload and store praise from Slack, email, LinkedIn, texts
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Advanced AI summaries and pattern recognition</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Timeline view of praise over time</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Freshness indicators (recent vs long-term signals)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Monthly &quot;What&apos;s changed&quot; insight digest</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Full control to pin, hide, or organize praise</span>
              </div>
            </div>

            {billingPeriod === "annual" && (
              <div className="mb-6">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Best for keeping your reputation current all year.
                </p>
              </div>
            )}

            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" size="lg" asChild>
              <Link href="/auth/signup?plan=maintain">Upgrade to Maintain</Link>
            </Button>
          </Card>

          <Card className="p-6 sm:p-8 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 flex flex-col">
            <div className="mb-8">
              <h3 className="mb-3 text-2xl font-bold text-slate-900">Showcase</h3>
              <div className="mb-2 flex items-baseline gap-3">
                <div>
                  <span className="text-5xl font-bold text-slate-900">
                    ${billingPeriod === "monthly" ? "19" : "169"}
                  </span>
                  <span className="text-slate-600 ml-2">/ {billingPeriod === "monthly" ? "month" : "year"}</span>
                </div>
              </div>
              {billingPeriod === "annual" && <p className="text-sm font-medium text-green-700 mb-3">Save ~26%</p>}
              <p className="text-base text-slate-900 font-medium leading-relaxed">
                Bring trusted proof wherever decisions are made.
              </p>
            </div>

            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-900 font-medium">Everything in Maintain, plus:</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">
                  Embed Nomee cards on websites, portfolios, and media kits
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Public-ready views for hiring, clients, or partnerships</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">One-page export (PDF / shareable link)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Custom URL</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">Subtle branding removal</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="text-sm text-slate-700">&quot;Verified praise&quot; visual treatment</span>
              </div>
            </div>

            {billingPeriod === "annual" && (
              <div className="mb-6">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ideal if you&apos;re actively pitching, applying, or partnering.
                </p>
              </div>
            )}

            <div className="mb-6">
              <p className="text-xs text-slate-500 leading-relaxed">
                One job, one client, or one deal pays for months.
              </p>
            </div>

            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" size="lg" asChild>
              <Link href="/auth/signup?plan=showcase">Unlock Showcase</Link>
            </Button>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto mb-24 text-center space-y-2">
          <p className="text-base text-slate-700 leading-relaxed">We don&apos;t charge for praise.</p>
          <p className="text-base text-slate-700 leading-relaxed">We don&apos;t charge for asking.</p>
          <p className="text-base text-slate-700 leading-relaxed">
            We charge for keeping it current — and using it when it matters.
          </p>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Your reputation already exists.
            <br />
            Nomee helps you own it.
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 sm:mb-10 leading-relaxed">
            Start free. Upgrade when it starts opening doors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 text-base px-8 py-6"
              asChild
            >
              <Link href="/auth/signup">
                Create your Nomee
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Link
              href="/maya-torres"
              className="text-white hover:text-slate-200 text-base font-medium transition-colors flex items-center gap-2"
            >
              See an example Nomee
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
