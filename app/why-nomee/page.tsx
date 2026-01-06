import { Check, TrendingUp, Users, Shield, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"

export const metadata = {
  title: "Why Nomee - Reputation Marketing for Professionals",
  description:
    "Turn scattered feedback into verified social proof that wins deals, builds trust, and follows you throughout your career.",
}

export default function WhyNomeePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center pt-32">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full mb-8">
          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
          <span className="text-sm font-medium text-indigo-900">Trusted by 2,500+ professionals across industries</span>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Reputation marketing
          <br />
          isn&apos;t just for companies.
          <br />
          <span className="text-indigo-600">It&apos;s for you too.</span>
        </h1>

        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Every professional says &quot;trust me.&quot; You need to{" "}
          <span className="font-semibold text-gray-900">show them.</span>
        </p>

        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
          Nomee turns scattered feedback from clients, colleagues, and collaborators into verified social proof that
          wins deals, builds trust, and follows you throughout your career.
        </p>

        <div className="flex items-center justify-center space-x-4 mb-8">
          <Link href="/auth/signup">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Build My Reputation Profile
            </button>
          </Link>
          <Link href="/example">
            <button className="bg-white border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-medium hover:border-gray-400 transition-colors">
              See How It Works
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-600 mr-2" />
            Free to start
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-600 mr-2" />
            Setup in 5 minutes
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-600 mr-2" />
            No credit card required
          </div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-24">
          {/* Question 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Do you want to stand out in your industry?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                In a world where everyone has the same resume format and LinkedIn profile, your reputation is what sets
                you apart. Nomee gives you a living portfolio of verified feedback from real people you&apos;ve worked
                with—clients, colleagues, and collaborators who vouch for your work. This isn&apos;t just a profile.
                It&apos;s proof of your impact.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-900">Jake Martinez</div>
                  <div className="text-sm text-gray-600">VP of Marketing</div>
                </div>
              </div>
              <p className="text-gray-700 italic">&quot;Jordan completely transformed our brand strategy...&quot;</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                  Strategic
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                  Creative
                </span>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600 mb-2">Your reputation follows you</div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">Company A</div>
                    <ArrowRight className="w-5 h-5 text-indigo-600" />
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">Company B</div>
                    <ArrowRight className="w-5 h-5 text-indigo-600" />
                    <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">Company C</div>
                  </div>
                </div>
                <div className="text-center text-indigo-600 font-semibold">
                  One Nomee profile. Unlimited career moves.
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Do you want your reputation to follow you everywhere?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Your reputation shouldn&apos;t be locked to one company or platform. When you change jobs, your track
                record should travel with you. Nomee makes your professional reputation portable—collect feedback once,
                share it forever. Whether you&apos;re freelancing, consulting, or climbing the corporate ladder, your
                reputation moves with you.
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Do you want to build trust faster?</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Trust takes time to build—unless you can show it. Nomee lets potential clients, employers, and partners
                see what it&apos;s actually like to work with you through real testimonials from people in your network.
                No more hoping they&apos;ll take a chance. Show them the evidence. Close deals faster. Land better
                opportunities.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">3x</div>
                <div className="text-gray-600 mb-6">Faster trust building</div>
                <div className="bg-indigo-50 rounded-xl p-6">
                  <div className="text-sm text-indigo-900 font-medium mb-2">With Nomee</div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Verified social proof</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Instant credibility</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Question 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    Companies invest millions in reputation management.
                  </div>
                  <div className="text-lg text-gray-700 mb-6">Why shouldn&apos;t you?</div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="text-sm text-gray-600 mb-2">Your Nomee Profile</div>
                    <div className="font-semibold text-gray-900">Your career. Your story. Your reputation.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-rose-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Do you want control over your professional story?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Companies invest millions in reputation management. Why shouldn&apos;t you? Nomee puts you in control of
                your professional narrative. Collect feedback on your terms, showcase your best work, and build a
                reputation that accurately reflects who you are and what you deliver.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Difference Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Nomee Difference</h2>
            <p className="text-lg text-gray-600">
              We&apos;re the first platform built specifically for individual professionals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">For Individuals, Not Just Companies</h3>
              <p className="text-gray-600">
                We&apos;re the first platform built specifically for professionals who want to own their reputation, not
                rent it from an employer.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified & Authentic</h3>
              <p className="text-gray-600">
                Real feedback from real people, verified through LinkedIn and email. No fake reviews, no gaming the
                system.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Portable & Permanent</h3>
              <p className="text-gray-600">
                Your reputation follows you everywhere. One profile, unlimited opportunities across your entire career.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">2,500+</div>
            <div className="text-gray-600">Professionals Trust Nomee</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">12,000+</div>
            <div className="text-gray-600">Verified Contributions</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">95%</div>
            <div className="text-gray-600">Report Better Opportunities</div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to build your reputation?</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who are taking control of their reputation and opening doors to better
            opportunities.
          </p>
          <Link href="/auth/signup">
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center space-x-2 shadow-xl">
              <span>Start Building Your Nomee Profile</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-indigo-100">
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-1" />
              Free to start
            </span>
            <span>•</span>
            <span>Setup in 5 minutes</span>
            <span>•</span>
            <span>No credit card required</span>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </div>
  )
}
