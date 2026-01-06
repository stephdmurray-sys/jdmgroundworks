"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, X } from "lucide-react"

type TabType = "summary" | "patterns" | "contributions"

const feedbackItems = [
  {
    source: "Slack",
    sender: "Sarah Johnson",
    meta: "#project-launch · 2 days ago",
    text: "Amazing work on the redesign! Your attention to detail and responsiveness made all the difference.",
  },
  {
    source: "Email",
    sender: "Michael Chen",
    meta: "Re: Q4 Strategy Review · 1 week ago",
    text: "Just wanted to say thank you. The strategic clarity you brought to our planning session completely shifted how we approach our roadmap. Truly transformative thinking.",
  },
  {
    source: "Text Message",
    sender: "Alex Rivera",
    meta: "iMessage · 3 days ago",
    text: "You totally saved us yesterday. Your ability to see three steps ahead is exactly what we needed.",
  },
  {
    source: "LinkedIn",
    sender: "Priya Patel",
    meta: "Recommendation · 2 weeks ago",
    text: "I've worked with many consultants over my career, but Jordan stands out for their business acumen and follow-through. They don't just deliver advice—they ensure you succeed with it.",
  },
  {
    source: "Email",
    sender: "David Wu",
    meta: "Re: Client Presentation · 5 days ago",
    text: "The client was extremely impressed with your presentation. They mentioned multiple times how clear and thoughtful your approach was.",
  },
  {
    source: "Slack",
    sender: "Emma Thompson",
    meta: "#design-team · 1 day ago",
    text: "Thanks for jumping in so quickly on that issue. Your reliability is unmatched.",
  },
]

export function DynamicMiniExample() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>("summary")
  const feedbackScrollRef = useRef<HTMLDivElement>(null)

  // Handle ESC key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isModalOpen])

  const handleModalOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false)
    }
  }

  const handleFeedbackStreamHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (feedbackScrollRef.current) {
      feedbackScrollRef.current.style.animationPlayState = e.type === "mouseenter" ? "paused" : "running"
    }
  }

  return (
    <>
      {/* Mini Example Container */}
      <div className="max-w-[600px] mx-auto bg-gray-50 rounded-2xl border border-gray-200 p-8 md:p-12">
        {/* Section Label */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-wider text-indigo-600 font-semibold">One Nomee Page</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-1">Jordan Mitchell</h3>
            <p className="text-base text-gray-600">Brand Consultant & Creative Strategist</p>
            <div className="flex items-center gap-2 mt-3 text-sm">
              <span className="bg-green-50 text-green-700 px-2 py-1 rounded font-semibold text-xs">✓ Verified</span>
              <span className="text-gray-600">Based on 47 contributions</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4 font-medium">
            What consistently shows up when people talk about working with Jordan:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">Responsive</span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              Strategic
            </span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              Business Knowledge
            </span>
          </div>
        </div>

        {/* Feedback Stream */}
        <div className="mb-8">
          <div className="text-center text-xs text-gray-600 mb-3 font-medium">Real feedback, collected over time</div>
          <div className="relative h-96 overflow-hidden rounded-xl bg-white border border-gray-200 mask-image-gradient">
            <style>{`
              @keyframes scroll {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }
              .mask-image-gradient {
                mask-image: linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent);
                -webkit-mask-image: linear-gradient(to bottom, transparent, black 40px, black calc(100% - 40px), transparent);
              }
              .feedback-scroll {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                animation: scroll 20s linear infinite;
              }
              .feedback-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div
              ref={feedbackScrollRef}
              className="feedback-scroll p-4"
              onMouseEnter={handleFeedbackStreamHover}
              onMouseLeave={handleFeedbackStreamHover}
            >
              {/* First set of feedback cards */}
              {feedbackItems.map((item, idx) => (
                <div
                  key={`first-${idx}`}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex-shrink-0 min-h-[100px]"
                >
                  <div className="text-xs uppercase text-gray-500 font-semibold mb-2">{item.source}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{item.sender}</div>
                  <div className="text-xs text-gray-600 mb-2">{item.meta}</div>
                  <div className="text-sm text-gray-800">{item.text}</div>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {feedbackItems.map((item, idx) => (
                <div
                  key={`second-${idx}`}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex-shrink-0 min-h-[100px]"
                >
                  <div className="text-xs uppercase text-gray-500 font-semibold mb-2">{item.source}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{item.sender}</div>
                  <div className="text-xs text-gray-600 mb-2">{item.meta}</div>
                  <div className="text-sm text-gray-800">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 min-h-[48px]"
        >
          <span>See Full Example</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
          onClick={handleModalOverlayClick}
        >
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="sticky top-0 right-0 bg-white border-b border-gray-200 px-6 py-4 text-right hover:text-gray-900 text-gray-600 z-10 w-full flex justify-end"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 md:p-12">
              {/* Modal Header */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Jordan Mitchell</h2>
                <p className="text-lg text-gray-600">Brand Consultant & Creative Strategist</p>
                <p className="text-sm text-gray-600 mb-3">San Francisco, CA</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="bg-green-50 text-green-700 px-2 py-1 rounded font-semibold text-xs">
                    ✓ Verified Reputation
                  </span>
                  <span className="text-gray-600">Based on 47 contributions</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-8">
                <div className="flex gap-8">
                  {(["summary", "patterns", "contributions"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 font-semibold transition-all ${
                        activeTab === tab
                          ? "text-gray-900 border-b-2 border-indigo-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab === "summary" ? "Summary" : tab === "patterns" ? "Patterns" : "All Contributions"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Tab */}
              {activeTab === "summary" && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="text-xs uppercase text-gray-600 font-semibold mb-3">Total Contributions</div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">47</div>
                      <p className="text-sm text-gray-600">5 Written · 3 Voice · 4 Uploads</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="text-xs uppercase text-gray-600 font-semibold mb-3">Relationship Breakdown</div>
                      <div className="space-y-1 text-sm">
                        <div className="font-semibold text-gray-900">31 Clients</div>
                        <div className="font-semibold text-gray-900">12 Collaborators</div>
                        <div className="font-semibold text-gray-900">4 Colleagues</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="text-xs uppercase text-gray-600 font-semibold mb-3">Last Contribution</div>
                      <div className="text-3xl font-bold text-gray-900">6 days ago</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What it's like to work with Jordan</h3>
                    <p className="text-base text-gray-800 leading-relaxed mb-6">
                      Based on 47 contributions from clients, collaborators, and colleagues, Jordan is consistently
                      described as <strong>responsive</strong>, <strong>strategic</strong>, and{" "}
                      <strong>knowledgeable</strong>. Contributors highlight their ability to match solutions with goals
                      and their commitment to follow-through throughout the process.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Responsive · 31
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Strategic · 24
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Business Knowledge · 19
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Follow-through · 17
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Contributions</h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex gap-4 mb-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700 flex-shrink-0">
                            JM
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Jake Martinez</h4>
                            <p className="text-sm text-gray-600">VP of Marketing · Client</p>
                          </div>
                        </div>
                        <p className="text-base text-gray-800 leading-relaxed mb-4">
                          Jordan is one of the few consultants I've worked with who actually listened. They didn't pitch
                          me 10 generic solutions. They found the one strategy that matched our goals. They guided us
                          through every phase, sent detailed follow-ups, and checked in after launch. I'd work with them
                          again in a heartbeat.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Responsive
                          </span>
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Strategic
                          </span>
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                            Follow-through
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Patterns Tab */}
              {activeTab === "patterns" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Common Themes</h3>
                  <p className="text-gray-600 mb-6">Patterns that emerge across multiple contributions</p>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-4 text-sm">
                      <strong className="text-gray-900">Responsive</strong>
                      <span className="text-gray-600 ml-2">Mentioned 31 times</span>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-sm">
                      <strong className="text-gray-900">Strategic</strong>
                      <span className="text-gray-600 ml-2">Mentioned 24 times</span>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-sm">
                      <strong className="text-gray-900">Business Knowledge</strong>
                      <span className="text-gray-600 ml-2">Mentioned 19 times</span>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 text-sm">
                      <strong className="text-gray-900">Follow-through</strong>
                      <span className="text-gray-600 ml-2">Mentioned 17 times</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Contributions Tab */}
              {activeTab === "contributions" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">All Contributions (47)</h3>
                  <div className="space-y-4">
                    {[
                      {
                        avatar: "JM",
                        name: "Jake Martinez",
                        role: "VP of Marketing, BrandWorks · Client · May 2024",
                        text: "Jordan is one of the few consultants I've worked with who actually listened. They didn't pitch me 10 generic solutions. They found the one strategy that matched our goals.",
                      },
                      {
                        avatar: "RK",
                        name: "Robert Kim",
                        role: "CTO, TechCorp · Collaborator · April 2024",
                        text: "Jordan delivered 6 strategic recommendations for our platform redesign. All 6 were high-quality - technically sound and aligned with our vision.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex gap-4 mb-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-700 flex-shrink-0">
                            {item.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.role}</p>
                          </div>
                        </div>
                        <p className="text-base text-gray-800 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
