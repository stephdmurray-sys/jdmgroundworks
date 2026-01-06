"use client"

import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { ArrowRight, Sparkles, Check } from "lucide-react"
import { useState } from "react"
import { ModalSignup } from "@/components/modal-signup"
import Link from "next/link"

export default function PersonalReputationMarketingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-white">
        <SiteHeader onCreateClick={() => setIsModalOpen(true)} />

        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-50" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-indigo-200 px-4 py-2 rounded-full shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-900">The professional reputation platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold text-slate-900 leading-[1.1] tracking-tight"
            >
              Reputation used to be passive.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Now it's something you have to manage.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Great work doesn't automatically turn into trust. Feedback disappears unless you intentionally capture and
              use it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-indigo-300 transition-all transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Your Nomee
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <Link
                href="/example"
                className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl text-lg font-semibold hover:border-slate-300 hover:shadow-xl transition-all"
              >
                View Live Example
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section 1: The Problem */}
        <section className="py-32 px-6 bg-white relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900">Where your reputation actually lives</h2>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>Your reputation isn't missing — it's scattered.</p>

                <p>
                  It lives in Slack messages you'll never search again. Texts sent after projects end. Emails buried
                  three jobs ago. LinkedIn recommendations last updated in 2020.
                </p>

                <p>None of this compounds. None of this follows you. None of this helps when decisions are made.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Name the Category */}
        <section className="py-32 px-6 bg-slate-50 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900">
                This is called Personal Reputation Marketing
              </h2>

              <div className="space-y-8">
                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-8">
                  <p className="text-xl leading-relaxed text-slate-900">
                    <strong className="font-semibold">Personal Reputation Marketing</strong> is the practice of
                    intentionally collecting, organizing, and deploying real feedback from people you've worked with —
                    to earn trust faster and make your reputation portable.
                  </p>
                </div>

                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    This is already standard for businesses. They automatically request reviews, centralize reputation
                    in one place, and use proof strategically. It works because reputation compounds.
                  </p>

                  <p>
                    But individuals have been left behind. Most professionals rely on "trust me" statements and hope
                    feedback sticks. The gap is growing because careers are more distributed, roles change faster, and
                    trust decisions happen before the first conversation even starts.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Business vs People Comparison */}
        <section className="py-32 px-6 bg-white relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900">
                Businesses already do this. People don't.
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">Businesses</h3>
                  <div className="space-y-3">
                    {[
                      "Automatically request reviews",
                      "Centralize reputation in one place",
                      "Use proof in sales and marketing",
                      "Treat reputation as a growth asset",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">Professionals</h3>
                  <div className="space-y-3">
                    {[
                      "Hope feedback sticks",
                      "Lose proof when changing roles",
                      "Start from zero repeatedly",
                      "Rely on 'trust me' statements",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 mt-8">
                <p className="text-lg text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Businesses market their reputation to grow revenue.</strong>
                  <br />
                  <strong className="text-slate-900">Professionals need to market theirs to earn trust.</strong>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Why This Matters Now */}
        <section className="py-32 px-6 bg-slate-50 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900">Why this matters now</h2>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Work is more distributed. You're collaborating with people across companies, time zones, and
                  continents. Your best work happens with people who rarely see your full story.
                </p>

                <p>
                  Careers are less linear. You're not climbing a single ladder anymore. You're building a portable
                  reputation that needs to travel with you through different roles, companies, and industries.
                </p>

                <p>
                  Trust decisions happen before conversations start. Hiring managers, clients, and collaborators are
                  making up their minds before you ever meet. They're looking for proof.
                </p>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-8 mt-8">
                <p className="text-2xl font-bold text-slate-900 leading-relaxed">
                  If your reputation isn't visible, it's assumed not to exist.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Where Nomee Fits */}
        <section className="py-32 px-6 bg-white relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900">
                Nomee makes personal reputation marketing possible
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">Capture</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Automatically collect feedback while it's fresh and specific.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">Organize</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Turn scattered messages into clear, repeated signals about how you work.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">Deploy</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Share proof exactly where trust decisions are made — before interviews, deals, or hires.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 6: Trust & Verification */}
        <section className="py-32 px-6 bg-slate-50 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900">
                Why personal reputation needs verification
              </h2>

              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Testimonials are cherry-picked. You can highlight the five positive reviews and hide the rest. That
                  breaks trust.
                </p>

                <p>
                  Recommendations go stale. A LinkedIn recommendation from 2018 doesn't tell anyone anything about how
                  you work today.
                </p>

                <p>
                  Screenshots are easy to fake. Without verification, personal reputation becomes just another marketing
                  channel.
                </p>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-8 mt-8">
                <p className="text-xl text-slate-900 leading-relaxed mb-6">
                  <strong className="font-semibold">
                    Personal reputation marketing only works when the proof is trusted.
                  </strong>
                </p>
                <p className="text-lg text-slate-700 leading-relaxed">
                  Nomee verifies every contribution with identity confirmation, ensures one contribution per person,
                  surfaces recent feedback first, and preserves full context so reputation reflects how you actually
                  work.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Section: Close with Inevitability */}
        <section className="py-32 px-6 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-50" />

          <div className="max-w-5xl mx-auto text-center space-y-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-6xl md:text-8xl font-bold text-slate-900 leading-[1.1]">
                Reputation isn't what you say about yourself.
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  It's what people can see when it matters.
                </span>
              </h2>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-indigo-300 transition-all transform hover:scale-105 mx-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Start building reputation that follows you
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      <ModalSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
