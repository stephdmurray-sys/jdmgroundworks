"use client"

import { useState } from "react"
import { Check, ArrowRight, Mail, Mic, StopCircle, Sparkles } from "lucide-react"
import Link from "next/link"

interface ContributorFeedbackFormProps {
  profileName: string
  profileId: string
}

export default function ContributorFeedbackForm({ profileName, profileId }: ContributorFeedbackFormProps) {
  const [step, setStep] = useState(1)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [emailSent, setEmailSent] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    jobTitle: "",
    email: "",
    relationship: "",
    timeframe: "",
    project: "",
    feedbackText: "",
    voiceNote: null as Blob | null,
  })

  const startRecording = () => {
    setIsRecording(true)
    const interval = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= 60) {
          clearInterval(interval)
          setIsRecording(false)
          return 60
        }
        return prev + 1
      })
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    // In real implementation, save the actual Blob
    setFormData({ ...formData, voiceNote: new Blob() })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const sendVerificationEmail = () => {
    // TODO: Implement actual email sending via API
    setEmailSent(true)
    setStep(4)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Link href="/" className="inline-block">
              <img src="/images/nomee-20logo-20transparent.png" alt="Nomee" className="h-8 mx-auto" />
            </Link>
          </div>
          {step < 4 && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Share your experience</h1>
              <p className="text-gray-600">
                working with <span className="font-semibold text-gray-900">{profileName}</span>
              </p>
            </>
          )}
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      i === step
                        ? "bg-indigo-600 text-white"
                        : i < step
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-12 h-1 mx-1 rounded-full transition-all ${i < step ? "bg-green-500" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-xs text-gray-500 max-w-sm mx-auto px-4">
              <span className={step === 1 ? "text-indigo-600 font-semibold" : ""}>Your details</span>
              <span className={step === 2 ? "text-indigo-600 font-semibold" : ""}>Your feedback</span>
              <span className={step === 3 ? "text-indigo-600 font-semibold" : ""}>Verify</span>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* Step 1: Your Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Jake Martinez"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Stripe"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job title *</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="Software Engineer"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Work email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jake@stripe.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1.5">We'll send a verification link to this email</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your relationship *</label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors appearance-none cursor-pointer bg-white"
                >
                  <option value="">Select one...</option>
                  <option value="Candidate">Candidate — {profileName} helped place me</option>
                  <option value="Hiring Manager">Hiring Manager — {profileName} sourced candidates for me</option>
                  <option value="Colleague">Colleague — We worked together</option>
                  <option value="Client">Client — My company hired {profileName}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">When did you work together? *</label>
                <select
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors appearance-none cursor-pointer bg-white"
                >
                  <option value="">Select timeframe...</option>
                  <option value="last-30">Last 30 days</option>
                  <option value="1-3-months">1-3 months ago</option>
                  <option value="3-6-months">3-6 months ago</option>
                  <option value="6-12-months">6-12 months ago</option>
                  <option value="1-year-plus">1+ years ago</option>
                </select>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.fullName || !formData.email || !formData.relationship || !formData.timeframe}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-indigo-200"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Your Feedback */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What was it like working with {profileName}? *
                </label>
                <textarea
                  value={formData.feedbackText}
                  onChange={(e) => setFormData({ ...formData, feedbackText: e.target.value })}
                  placeholder="Be specific about what stood out. For example: 'Sarah was incredibly responsive - she replied to my texts within an hour every time. When I had concerns about the company culture, she was honest about what she knew and connected me with a current employee...'"
                  rows={10}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition-colors resize-none"
                />
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-xs ${formData.feedbackText.length < 50 ? "text-red-600" : "text-green-600"} font-medium`}
                  >
                    {formData.feedbackText.length < 50
                      ? `${50 - formData.feedbackText.length} more characters needed`
                      : "✓ Great!"}
                  </span>
                  <span className="text-xs text-gray-500">{formData.feedbackText.length} characters</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-100">
                <div className="flex items-start space-x-3 mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Add a voice note (optional)</div>
                    <p className="text-sm text-gray-600">
                      Voice notes are 3x more impactful than text. Record up to 60 seconds.
                    </p>
                  </div>
                </div>

                {!formData.voiceNote && !isRecording && (
                  <button
                    onClick={startRecording}
                    className="w-full bg-white border-2 border-indigo-200 text-indigo-700 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center space-x-2"
                  >
                    <Mic className="w-5 h-5" />
                    <span>Start Recording</span>
                  </button>
                )}

                {isRecording && (
                  <div className="text-center">
                    <div className="text-5xl font-bold text-indigo-600 mb-4 tabular-nums">
                      {formatTime(recordingTime)}
                    </div>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Recording...</span>
                    </div>
                    <button
                      onClick={stopRecording}
                      className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center space-x-2 mx-auto"
                    >
                      <StopCircle className="w-5 h-5" />
                      <span>Stop Recording</span>
                    </button>
                  </div>
                )}

                {formData.voiceNote && !isRecording && (
                  <div className="bg-white border-2 border-green-200 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Voice note recorded</div>
                        <div className="text-sm text-gray-600">{formatTime(recordingTime)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFormData({ ...formData, voiceNote: null })
                        setRecordingTime(0)
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Re-record
                    </button>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-4 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-gray-400 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={formData.feedbackText.length < 50}
                  className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-indigo-200"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Verify */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-4">Preview</div>
                <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl p-6 border-2 border-gray-200">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {formData.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-gray-900">{formData.fullName}</span>
                        <div className="flex items-center text-green-600 text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Verified
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">{formData.jobTitle}</div>
                      <div className="text-sm text-gray-600">{formData.company}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                          {formData.relationship}
                        </span>
                        <span className="text-xs text-gray-500">• {formData.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">"{formData.feedbackText}"</p>
                  {formData.voiceNote && (
                    <div className="flex items-center space-x-2 text-sm text-indigo-600">
                      <Mic className="w-4 h-4" />
                      <span>Includes voice note ({formatTime(recordingTime)})</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Mail className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">One last step</h3>
                <p className="text-indigo-100 text-center mb-1">We'll send a verification link to:</p>
                <p className="text-lg font-semibold text-center mb-6">{formData.email}</p>
                <button
                  onClick={sendVerificationEmail}
                  className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg"
                >
                  Send Verification Email
                </button>
                <p className="text-xs text-indigo-200 text-center mt-3">
                  This prevents fake reviews and keeps Nomee trustworthy
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                ← Back to edit
              </button>
            </div>
          )}

          {/* Step 4: Check Email */}
          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Check your email</h2>
              <p className="text-lg text-gray-600 mb-2">We just sent a verification link to:</p>
              <p className="text-xl font-semibold text-gray-900 mb-8">{formData.email}</p>

              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Click the link in your email to publish your feedback for {profileName}.
                </p>
                <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
                  Didn't receive it? Resend email
                </button>
              </div>

              <p className="text-xs text-gray-500">You can safely close this window</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 4 && (
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Powered by <span className="font-semibold text-gray-700">nomee</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
