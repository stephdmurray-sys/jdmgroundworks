"use client"

import { useState } from "react"
import { Star, Linkedin, Mail, MapPin, Play, ChevronDown, ChevronUp, X } from "lucide-react"
import Link from "next/link"

export default function NomeeProfilePage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("summary")
  const [expandedTranscript, setExpandedTranscript] = useState<number | null>(null)
  const [viewingScreenshot, setViewingScreenshot] = useState<any>(null)

  const contributions = [
    {
      id: 1,
      name: "Jake Martinez",
      title: "VP of Marketing",
      company: "BrandWorks",
      relationship: "Client",
      date: "May 2024",
      verified: true,
      text: "Jordan is one of the few consultants I've worked with who actually listened. They didn't pitch me 10 generic solutions. They found *the one* strategy that matched our goals. They guided us through every phase, sent detailed follow-ups, and checked in after launch. I'd work with them again in a heartbeat.",
      themes: ["Responsive", "Strategic", "Follow-through"],
    },
    {
      id: 2,
      name: "Robert Kim",
      title: "Chief Technology Officer",
      company: "TechCorp",
      relationship: "Collaborator",
      date: "April 2024",
      verified: true,
      text: "Jordan delivered 6 strategic recommendations for our platform redesign. All 6 were high-quality - technically sound and aligned with our vision. They clearly understand both business and technology and don't waste our time with surface-level advice. We implemented their plan and it's been excellent.",
      themes: ["Quality", "Technical Knowledge", "Efficient"],
    },
    {
      id: 3,
      name: "Amelia Foster",
      title: "Product Designer",
      company: "DesignCo",
      relationship: "Client",
      date: "March 2024",
      verified: false,
      text: "Working with Jordan was refreshing. They took time to understand what I was looking for in a creative partner, not just checking boxes. The collaboration was thorough and they negotiated a better outcome than I expected.",
      themes: ["Thoughtful", "Supportive", "Advocate"],
    },
    {
      id: 4,
      name: "Marcus Lee",
      title: "Senior Product Manager",
      company: "DataFlow",
      relationship: "Client",
      date: "February 2024",
      verified: true,
      text: "Jordan's responsiveness is unmatched. They replied to my messages within an hour every single time. When the proposal came in over budget, they went back to negotiate and saved us $15K. They're a true advocate.",
      themes: ["Responsive", "Advocate", "Negotiator"],
    },
    {
      id: 5,
      name: "Lisa Chen",
      title: "VP of Operations",
      company: "StartupHQ",
      relationship: "Client",
      date: "January 2024",
      verified: true,
      text: "We've worked with dozens of consultants. Jordan stands out because they actually understand our business needs. They evaluate options thoroughly so we're not wasting time on poor fits. Their quality bar is high.",
      themes: ["Business Knowledge", "Quality", "Efficient"],
    },
  ]

  const voiceNotes = [
    {
      id: 1,
      name: "Marcus Lee",
      title: "Client",
      company: "DataFlow",
      duration: "1:03",
      transcript:
        "Jordan is one of the few professionals who understood what I actually wanted. They didn't pitch me 10 random ideas - they found *the* solution. Responsive, honest, and didn't waste my time. When I had concerns about the approach, they were transparent about what they knew and what they didn't. That level of honesty is rare.",
      themes: ["Responsive", "Honest", "Transparent", "Strategic"],
    },
    {
      id: 2,
      name: "Amelia Foster",
      title: "Client",
      company: "DesignCo",
      duration: "0:47",
      transcript:
        "I was nervous about this project. Jordan made the whole process smooth. They prepared for every meeting, sent detailed notes afterward, and checked in regularly without being pushy. I genuinely felt like they cared about our success, not just completing the contract.",
      themes: ["Supportive", "Communicative", "Empathetic"],
    },
    {
      id: 3,
      name: "Robert Kim",
      title: "Collaborator",
      company: "TechCorp",
      duration: "0:52",
      transcript:
        "We work with a lot of consultants and Jordan is one of the few we trust. They don't send us generic recommendations hoping something sticks. They send us 3-4 highly relevant options that actually match our needs. Their expertise is better than most people we've worked with.",
      themes: ["Business Knowledge", "Quality", "Trustworthy"],
    },
  ]

  const screenshots = [
    {
      id: 1,
      type: "Slack",
      from: "Jake Martinez",
      text: "Thanks again Jordan! You totally saved us. Best collaboration we've ever had 🙏",
    },
    {
      id: 2,
      type: "Email",
      from: "Lisa Chen",
      text: "Jordan - just wanted to say the plan you created worked perfectly! Exactly what we needed. Really appreciate your partnership.",
    },
    {
      id: 3,
      type: "Text",
      from: "Marcus Lee",
      text: "You're one of the few who actually listened to what we wanted instead of just pitching solutions. Appreciate you!",
    },
    {
      id: 4,
      type: "LinkedIn",
      from: "Amelia Foster",
      text: "Jordan's strategic thinking and attention to detail made our project so much easier. Highly recommend working with them.",
    },
  ]

  const filteredContributions =
    activeFilter === "all" ? contributions : contributions.filter((c) => c.relationship === activeFilter)

  const stats = {
    total: 47,
    clients: 31,
    collaborators: 12,
    colleagues: 4,
    lastContribution: "6 days ago",
  }

  const topThemes = [
    { name: "Responsive", count: 31 },
    { name: "Strategic", count: 24 },
    { name: "Business Knowledge", count: 19 },
    { name: "Follow-through", count: 17 },
    { name: "Reliable", count: 14 },
    { name: "Advocate", count: 12 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/images/nomee-20logo-20transparent.png" alt="Nomee" className="h-7.5 w-auto" />
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Portable Partnership Proof</span>
            </Link>
            <Link
              href="/auth/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
            >
              Build Your Own
            </Link>
          </div>
        </div>
      </header>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("summary")}
              className={`py-4 border-b-2 font-medium ${
                activeTab === "summary"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab("voice")}
              className={`py-4 border-b-2 font-medium ${
                activeTab === "voice"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Voice Notes
            </button>
            <button
              onClick={() => setActiveTab("patterns")}
              className={`py-4 border-b-2 font-medium ${
                activeTab === "patterns"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Patterns
            </button>
            <button
              onClick={() => setActiveTab("screenshots")}
              className={`py-4 border-b-2 font-medium ${
                activeTab === "screenshots"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Screenshots
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-indigo-600">JM</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Jordan Mitchell</h1>
                <p className="text-lg text-gray-600 mb-3">Brand Consultant & Creative Strategist</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    San Francisco, CA
                  </div>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-700">
                    <Linkedin className="w-4 h-4 mr-1" />
                    LinkedIn
                  </a>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-700">
                    <Mail className="w-4 h-4 mr-1" />
                    Contact
                  </a>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-amber-500 mb-2">
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="text-sm font-semibold text-gray-900">Verified Reputation</div>
              <div className="text-xs text-gray-500">Based on {stats.total} contributions</div>
            </div>
          </div>
        </div>

        {activeTab === "summary" && (
          <>
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Contributions</div>
                <div className="text-xs text-gray-500 mt-2">5 Written · 3 Voice · 4 Uploads</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-sm font-semibold text-gray-900 mb-4">Relationship Breakdown</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{stats.clients} Clients</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{stats.collaborators} Collaborators</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{stats.colleagues} Colleagues</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-sm font-semibold text-gray-900 mb-2">Responsive</div>
                <div className="text-xs text-gray-600">Ray Pierce - Mentioned 3X</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-sm font-semibold text-gray-900 mb-2">Last Contribution</div>
                <div className="text-lg font-semibold text-gray-900">{stats.lastContribution}</div>
              </div>
            </div>

            {/* What it's like section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What it's like to work with Jordan</h2>
              <p className="text-gray-600 mb-6">
                Based on {stats.total} contributions from clients, collaborators, and colleagues, Jordan is consistently
                described as <strong>responsive</strong>, <strong>strategic</strong>, and <strong>knowledgeable</strong>
                . Contributors highlight their ability to match solutions with goals and their commitment to
                follow-through throughout the process.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {topThemes.map((theme) => (
                  <span
                    key={theme.name}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                  >
                    {theme.name} · {theme.count}
                  </span>
                ))}
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                <div className="text-sm font-semibold text-indigo-900 mb-1">
                  High Confidence · Updated automatically
                </div>
                <div className="text-xs text-indigo-700">
                  Generated from {stats.total} contributions. Updates as more people contribute.
                </div>
              </div>
            </div>

            {/* Featured Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Featured</h2>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                  Pro Feature
                </span>
              </div>
              <div className="space-y-6">
                {/* Written + Verified */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-indigo-600">JM</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Jake Martinez</div>
                        <div className="text-sm text-gray-600">VP of Marketing</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">Written</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">Verified</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Jordan is one of the few consultants I've worked with who actually listened. They didn't pitch me 10
                    generic solutions...
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Responsive</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Strategic</span>
                  </div>
                </div>

                {/* Voice Note */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-indigo-600">ML</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Marcus Lee</div>
                        <div className="text-sm text-gray-600">Client</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        Voice Note
                      </span>
                      <span className="text-xs text-gray-500">1:03</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "Jordan is one of the few professionals who understood what I actually wanted. They didn't pitch me
                    1..."
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Responsive</span>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Honest</span>
                  </div>
                </div>

                {/* Upload */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-indigo-600">JM</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Jake Martinez</div>
                        <div className="text-sm text-gray-600">Recent feedback &gt; Slack</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">Upload</span>
                      <button className="text-indigo-600 text-xs hover:text-indigo-700">View</button>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-700">
                    "Thanks again Jordan! You totally saved us. Best collaboration we've ever had 🙏"
                  </div>
                </div>
              </div>
            </div>

            {/* All Contributions */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Contributions (12)</h2>
                <div className="relative">
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All (12)</option>
                    <option value="Client">Clients</option>
                    <option value="Collaborator">Collaborators</option>
                    <option value="Colleague">Colleagues</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-6">
                {filteredContributions.map((contribution) => (
                  <div key={contribution.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-indigo-600">
                            {contribution.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{contribution.name}</div>
                          <div className="text-sm text-gray-600">
                            {contribution.title} | {contribution.company}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {contribution.relationship} · Contributed {contribution.date}
                          </div>
                        </div>
                      </div>
                      {contribution.verified && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium flex items-center">
                          <span className="mr-1">✓</span> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {contribution.text.split("*").map((part, i) =>
                        i % 2 === 0 ? (
                          part
                        ) : (
                          <span key={i} className="bg-yellow-200 px-1">
                            {part}
                          </span>
                        ),
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {contribution.themes.map((theme) => (
                        <span key={theme} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Voice Notes Tab */}
        {activeTab === "voice" && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Voice Notes ({voiceNotes.length})</h2>
            <div className="space-y-6">
              {voiceNotes.map((note) => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-indigo-600">
                          {note.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{note.name}</div>
                        <div className="text-sm text-gray-600">
                          {note.title} · {note.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </button>
                      <span className="text-xs text-gray-500">{note.duration}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed italic">
                      {expandedTranscript === note.id ? note.transcript : note.transcript.substring(0, 150) + "..."}
                    </p>
                    <button
                      onClick={() => setExpandedTranscript(expandedTranscript === note.id ? null : note.id)}
                      className="text-indigo-600 text-sm mt-2 hover:text-indigo-700 flex items-center"
                    >
                      {expandedTranscript === note.id ? (
                        <>
                          Show less <ChevronUp className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Read full transcript <ChevronDown className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {note.themes.map((theme) => (
                      <span key={theme} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patterns Tab */}
        {activeTab === "patterns" && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pattern Analysis</h2>
            <p className="text-gray-600 mb-8">
              Based on {stats.total} contributions, these themes appear most frequently in feedback about Jordan:
            </p>
            <div className="space-y-4">
              {topThemes.map((theme) => (
                <div key={theme.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{theme.name}</span>
                    <span className="text-sm text-gray-600">{theme.count} mentions</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-indigo-600 h-3 rounded-full"
                      style={{ width: `${(theme.count / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screenshots Tab */}
        {activeTab === "screenshots" && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Screenshots ({screenshots.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {screenshots.map((screenshot) => (
                <div
                  key={screenshot.id}
                  className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setViewingScreenshot(screenshot)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {screenshot.type}
                    </span>
                    <span className="text-xs text-gray-500">from {screenshot.from}</span>
                  </div>
                  <p className="text-gray-700">{screenshot.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Screenshot Modal */}
      {viewingScreenshot && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setViewingScreenshot(null)}
        >
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {viewingScreenshot.type}
                </span>
                <div className="text-sm text-gray-600 mt-2">from {viewingScreenshot.from}</div>
              </div>
              <button onClick={() => setViewingScreenshot(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-lg text-gray-900">{viewingScreenshot.text}</p>
          </div>
        </div>
      )}
    </div>
  )
}
