"use client"

import { useState } from "react"
import {
  Home,
  FileText,
  Upload,
  Users,
  BarChart3,
  Settings,
  Share2,
  Plus,
  Star,
  TrendingUp,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Bell,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import RequestFeedbackForm from "./request-feedback-form" // fixed import path to use kebab-case filename

interface DashboardLayoutProps {
  profile: any
  totalContributions: number
  thisMonthContributions: number
  lastContributionDays: number | null
  recentContributions: any[]
}

export default function DashboardLayout({
  profile,
  totalContributions,
  thisMonthContributions,
  lastContributionDays,
  recentContributions,
}: DashboardLayoutProps) {
  const [activePage, setActivePage] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  const stats = {
    total: totalContributions,
    thisMonth: thisMonthContributions,
    trustScore: "Verified Reputation",
    topTheme: "Responsive",
    themeCount: 31,
    lastContribution: lastContributionDays ? `${lastContributionDays} days ago` : "No contributions yet",
    profileViews: 142,
  }

  const copyNomeeLink = () => {
    const link = profile.slug ? `https://nomee.co/${profile.slug}` : ""
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const SidebarNav = () => (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white min-h-screen transition-all duration-300 flex flex-col`}
    >
      <div className="p-6 flex items-center justify-between">
        {sidebarOpen && (
          <Link href="/" className="text-2xl font-bold">
            Nomee
          </Link>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 px-3">
        {[
          { id: "home", icon: Home, label: "Dashboard" },
          { id: "request", icon: Plus, label: "Request Feedback" },
          { id: "saved", icon: Upload, label: "Saved Feedback" },
          { id: "contributors", icon: Users, label: "Contributors" },
          { id: "insights", icon: BarChart3, label: "Insights" },
          { id: "share", icon: Share2, label: "Share & Embed" },
          { id: "settings", icon: Settings, label: "Settings" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
              activePage === item.id ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        {sidebarOpen ? (
          <div>
            <div className="text-xs text-gray-500 mb-2">YOUR PLAN</div>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-3">
              <div className="text-sm font-semibold">Pro Plan</div>
              <div className="text-xs text-indigo-100">$29.99/month</div>
              <Link href="/pricing" className="text-xs underline mt-2 block">
                Manage billing
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarNav />

      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activePage === "home" && "Dashboard"}
                {activePage === "request" && "Request Feedback"}
                {activePage === "saved" && "Saved Feedback"}
                {activePage === "contributors" && "Contributors"}
                {activePage === "insights" && "Insights"}
                {activePage === "share" && "Share & Embed"}
                {activePage === "settings" && "Settings"}
              </h1>
              <p className="text-gray-600 text-sm">Welcome back, {profile.full_name?.split(" ")[0]}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {thisMonthContributions}
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-semibold">{profile.full_name}</div>
                  <div className="text-xs text-gray-500">{profile.company || "Professional"}</div>
                </div>
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-indigo-600">
                    {profile.full_name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activePage === "home" && (
          <div className="p-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">👋 Welcome back, {profile.full_name?.split(" ")[0]}!</h2>
                  <p className="text-indigo-100">You have {stats.thisMonth} new contributions and 2 pending requests</p>
                </div>
                {profile.slug && (
                  <Link
                    href={`/${profile.slug}`}
                    target="_blank"
                    className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50"
                  >
                    View Your Nomee Profile
                  </Link>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold text-green-600">+{stats.thisMonth} this month</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Contributions</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">{stats.trustScore}</div>
                <div className="text-sm text-gray-600">Trust Score</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">{stats.topTheme}</div>
                <div className="text-sm text-gray-600">Top Theme • {stats.themeCount} mentions</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">{stats.lastContribution}</div>
                <div className="text-sm text-gray-600">Last Contribution</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <button
                onClick={() => setActivePage("request")}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Request Feedback</h3>
                <p className="text-sm text-gray-600">Just made a placement? Request feedback in 30 seconds.</p>
              </button>

              <Link
                href="/dashboard/imported-feedback/upload"
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-left block"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Upload Saved Feedback</h3>
                <p className="text-sm text-gray-600">Have screenshots, texts, or emails? Upload them here.</p>
              </Link>

              <button
                onClick={() => setActivePage("share")}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-left"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Share Your Nomee</h3>
                <p className="text-sm text-gray-600">Copy your link or generate embed code.</p>
              </button>
            </div>

            {/* Your Nomee Link */}
            {profile.slug && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">Your Nomee Link</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 font-mono text-sm">
                    https://nomee.co/{profile.slug}
                  </div>
                  <button
                    onClick={copyNomeeLink}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                  <Link
                    href={`/${profile.slug}`}
                    target="_blank"
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Preview</span>
                  </Link>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Profile views this month: <span className="font-semibold">{stats.profileViews}</span>
                </div>
              </div>
            )}

            {/* Recent Contributions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Recent Contributions</h3>
              </div>

              {recentContributions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Relationship</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentContributions.map((contrib) => (
                        <tr key={contrib.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-semibold text-gray-900">{contrib.contributor_name || "Anonymous"}</div>
                            <div className="text-sm text-gray-500">{contrib.contributor_company || ""}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {contrib.relationship_type || "Colleague"}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {new Date(contrib.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <span className="flex items-center text-green-600 text-sm">
                              <Check className="w-4 h-4 mr-1" />
                              Published
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No contributions yet. Start requesting feedback!</p>
              )}
            </div>
          </div>
        )}

        {/* Request Feedback Page */}
        {activePage === "request" && (
          <div className="p-8">
            <RequestFeedbackForm recipientName={profile.full_name || "this person"} />
          </div>
        )}

        {/* Other pages placeholders */}
        {activePage === "settings" && (
          <div className="p-8">
            <Link
              href="/dashboard/settings"
              className="bg-white rounded-xl shadow-sm p-12 text-center block hover:shadow-md transition-shadow"
            >
              <div className="text-gray-400 mb-4">
                <Settings className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Settings</h3>
              <p className="text-gray-600">Click to go to your account settings</p>
            </Link>
          </div>
        )}

        {activePage !== "home" && activePage !== "request" && activePage !== "settings" && (
          <div className="p-8">
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {activePage.charAt(0).toUpperCase() + activePage.slice(1)} Page
              </h3>
              <p className="text-gray-600">This page would contain the {activePage} interface.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
