"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { ArrowRight, Mail, MessageSquare, Linkedin, Send, Check, Shield, Sparkles } from "lucide-react"
import { useState, useRef } from "react"
import { ModalSignup } from "@/components/modal-signup"
import Link from "next/link"

export default function WhatIsNomeePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  return (
    <>
      <div className="min-h-screen bg-white">
        <SiteHeader onCreateClick={() => setIsModalOpen(true)} />

        {/* Hero Section with Animated Typography */}
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
              Feedback disappears.
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Nomee keeps it forever.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-light"
            >
              Turn scattered feedback from <strong className="font-semibold text-slate-900">every platform</strong> into
              one verified reputation profile that follows you{" "}
              <strong className="font-semibold text-slate-900">throughout your career</strong>.
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

        {/* Animated Flow Section - The Transformation */}
        <section
          ref={containerRef}
          className="py-32 px-6 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.05),transparent_50%)]" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                From scattered chaos to organized proof
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Watch how feedback from Slack, email, texts, and LinkedIn transforms into your professional reputation
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-[1.2fr_auto_1fr] gap-12 items-center">
              {/* Left: Scattered Feedback with Staggered Animation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <p className="text-sm uppercase tracking-widest text-slate-400 font-bold">Before Nomee</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">Scattered everywhere</p>
                </div>

                {/* Slack Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-purple-900 px-4 py-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <span className="text-white text-sm font-semibold">#product-team</span>
                    <MessageSquare className="w-4 h-4 text-white/70 ml-auto" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">AS</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-sm">Aisha Singh</span>
                          <span className="text-xs text-slate-400">11:23 AM</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          Just wrapped the client call — they were <strong>so impressed</strong> by how you handled
                          their questions. That's exactly the kind of thinking we need. 💯
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-slate-900">Marcus Kim</div>
                      <div className="text-xs text-slate-500">Re: Q4 Strategy Review</div>
                    </div>
                    <div className="text-xs text-slate-400">2:14 PM</div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mt-4">
                    The way you <strong>reframed our approach</strong> completely shifted the conversation. I've worked
                    with a lot of consultants, and your <strong>clarity</strong> stands out.
                  </p>
                </motion.div>

                {/* LinkedIn DM */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">Taylor Rodriguez</div>
                      <div className="text-xs text-slate-500">via LinkedIn</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Your presentation yesterday was <strong>incredible</strong>. The way you broke down complex data
                    into actionable insights — that's a rare skill. Would love to work together again.
                  </p>
                </motion.div>

                {/* Text Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">Jessica Liu</div>
                      <div className="text-xs text-slate-500">iMessage • 3:45 PM</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 inline-block text-sm max-w-xs ml-auto">
                      Thanks again for yesterday! 🙌
                    </div>
                    <div className="bg-slate-100 text-slate-900 rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-sm">
                      You totally <strong>saved us</strong>. Your ability to see three steps ahead is exactly what we
                      needed.
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Center: Animated Flow Arrows */}
              <div className="hidden lg:flex flex-col items-center justify-center space-y-8 px-4">
                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
                    <ArrowRight className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-1 h-16 bg-gradient-to-b from-indigo-400 to-transparent mt-2" />
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="text-center px-6 py-3 bg-white rounded-full shadow-lg border-2 border-indigo-200"
                >
                  <span className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Nomee organizes
                  </span>
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="flex flex-col items-center"
                >
                  <div className="w-1 h-16 bg-gradient-to-b from-transparent to-indigo-400 mb-2" />
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                    <ArrowRight className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Right: Nomee Profile - The Result */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <p className="text-sm uppercase tracking-widest text-indigo-600 font-bold">After Nomee</p>
                  <p className="text-2xl font-bold text-slate-900 mt-2">One powerful profile</p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl border-2 border-indigo-200 p-10 relative overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl opacity-20" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-400 to-purple-600 rounded-full blur-3xl opacity-20" />

                  <div className="relative z-10">
                    {/* Profile Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-4xl font-bold text-slate-900">Maya Torres</h3>
                        <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">Verified</span>
                        </div>
                      </div>
                      <p className="text-lg text-slate-600">Product Designer • San Francisco</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                        <span>47 contributions</span>
                        <span>•</span>
                        <span>12 years experience</span>
                      </div>
                    </div>

                    {/* Patterns Section */}
                    <div className="mb-8">
                      <p className="text-sm font-semibold text-slate-700 mb-4">What consistently shows up:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-blue-200">
                          Strategic thinker
                        </span>
                        <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-purple-200">
                          Problem solver
                        </span>
                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-green-200">
                          Clear communicator
                        </span>
                      </div>
                    </div>

                    {/* Featured Quote */}
                    <div className="bg-white rounded-2xl border-2 border-indigo-200 p-6 shadow-xl">
                      <div className="flex items-start gap-2 mb-3">
                        <span className="text-5xl text-indigo-300 leading-none">"</span>
                        <p className="text-slate-700 italic leading-relaxed pt-2">
                          Maya brings{" "}
                          <mark className="bg-yellow-200/60 px-1 rounded font-semibold text-slate-900">
                            incredible strategic clarity
                          </mark>{" "}
                          to complex projects. She helped us restructure our product roadmap and the results were{" "}
                          <mark className="bg-yellow-200/60 px-1 rounded font-semibold text-slate-900">
                            transformative
                          </mark>
                          .
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div>
                          <div className="font-semibold text-sm text-slate-900">Alex Rivera</div>
                          <div className="text-xs text-slate-500">VP Product, TechCorp</div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-indigo-100">
                        <div className="text-2xl font-bold text-indigo-600">47</div>
                        <div className="text-xs text-slate-600">Contributions</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-100">
                        <div className="text-2xl font-bold text-purple-600">23</div>
                        <div className="text-xs text-slate-600">Clients</div>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-pink-100">
                        <div className="text-2xl font-bold text-pink-600">100%</div>
                        <div className="text-xs text-slate-600">Verified</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                      <Link
                        href="/example"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-indigo-300 transition-all transform hover:scale-105"
                      >
                        <span>View Full Profile</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mobile Flow Indicator */}
        <div className="lg:hidden py-8 px-6 bg-slate-50">
          <div className="max-w-md mx-auto text-center">
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-indigo-600"
              >
                <ArrowRight className="w-8 h-8 rotate-90" />
              </motion.div>
            </div>
            <p className="text-sm font-semibold text-slate-600">All feedback becomes one profile</p>
          </div>
        </div>

        {/* How It Actually Works */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-slate-900 mb-6">Three ways to build your Nomee</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Every path leads to the same place: verified proof of your professional reputation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-100"
              >
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Send className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Request feedback</h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  After every project, send a quick request. Your clients get a simple form, you get verified
                  testimonials. Takes 30 seconds.
                </p>
                <div className="bg-white rounded-xl p-4 text-sm text-slate-600">
                  Perfect for: New projects, ongoing work, finishing deliverables
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-100"
              >
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Upload screenshots</h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Got a great Slack message or email? Screenshot it and upload. Nomee extracts the feedback
                  automatically and organizes it by theme.
                </p>
                <div className="bg-white rounded-xl p-4 text-sm text-slate-600">
                  Perfect for: Slack DMs, email threads, LinkedIn messages, texts
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8 border-2 border-pink-100"
              >
                <div className="w-14 h-14 bg-pink-600 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Invite contributors</h3>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Send your personal Nomee link to past colleagues or clients. They submit feedback directly, you
                  approve what goes live.
                </p>
                <div className="bg-white rounded-xl p-4 text-sm text-slate-600">
                  Perfect for: Building your initial profile, past projects, references
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Nomee Is (and Isn't) */}
        <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-slate-900 mb-6">So, what is Nomee?</h2>
              <div className="space-y-4 text-xl text-slate-700">
                <p>Nomee saves feedback as you receive it.</p>
                <p>It helps you see patterns over time.</p>
                <p>It gives you one link when you need to show your work.</p>
              </div>
              <p className="text-2xl text-slate-600 font-light mt-8">That's it.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl border-2 border-slate-200 p-10 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-slate-900 mb-6 text-center">Nomee is not:</h3>
              <div className="space-y-4 text-lg text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-slate-400">✕</span>
                  </div>
                  <p>Not a performance review</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-slate-400">✕</span>
                  </div>
                  <p>Not a testimonial page written after the fact</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-slate-400">✕</span>
                  </div>
                  <p>Not another place to manage your "brand"</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-200 text-center">
                <p className="text-xl font-semibold text-slate-900">
                  It's what people actually say about you — saved as it happens.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Stop losing your reputation.
              <br />
              Start building your Nomee.
            </h2>
            <p className="text-2xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of professionals who have one place for their professional reputation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group px-10 py-5 bg-white text-indigo-600 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <span className="flex items-center justify-center gap-2">
                  Create Your Nomee — Free
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <Link
                href="/example"
                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl text-xl font-bold hover:bg-white/10 transition-all"
              >
                See a Live Example
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-indigo-100">
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                Free to start
              </span>
              <span>•</span>
              <span>Setup in 5 minutes</span>
              <span>•</span>
              <span>No credit card</span>
            </div>
          </motion.div>
        </section>
      </div>

      <ModalSignup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
