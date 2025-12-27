"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RELATIONSHIP_OPTIONS, DURATION_OPTIONS } from "@/lib/nomee-enums"
import { TRAIT_CATEGORIES } from "@/lib/trait-categories"
import { VoiceRecorder } from "@/components/voice-recorder"

type ProfileData = {
  id: string
  full_name: string
  username: string
}

type StepName = "entry" | "relationship" | "duration" | "traits" | "message" | "identity" | "voice" | "submitted"

type ContributorFlowProps = {
  profile: ProfileData
}

export default function ContributorFlow({ profile }: ContributorFlowProps) {
  // Step management
  const [step, setStep] = useState<StepName>("entry")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form data
  const [relationship, setRelationship] = useState("")
  const [duration, setDuration] = useState("")
  const [selectedTraits, setSelectedTraits] = useState<Record<string, string[]>>({})
  const [message, setMessage] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastInitial, setLastInitial] = useState("")
  const [email, setEmail] = useState("")
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null)
  const [contributionId, setContributionId] = useState<string | null>(null)

  // Validation errors
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const firstNameValue = profile.full_name.split(" ")[0]

  const handleRecordingComplete = (blob: Blob) => {
    console.log("[v0] Received recording blob:", blob.size, "bytes")
    setVoiceBlob(blob)
  }

  // STEP 1: Emotional Entry
  if (step === "entry") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
        <div className="w-full max-w-2xl">
          <p className="mb-6 text-center text-sm text-neutral-600">⏱️ Takes about 2 minutes</p>
          <Card className="p-12 text-center">
            <h1 className="mb-4 text-4xl font-semibold text-neutral-900">
              What's it really like to work with {profile.full_name}?
            </h1>
            <p className="mb-8 text-lg text-neutral-600">
              Your words help capture what it genuinely felt like to work together.
            </p>
            <Button onClick={() => setStep("relationship")} size="lg" className="px-8">
              Start
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 2: Working Relationship
  if (step === "relationship") {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="mb-4 text-sm text-neutral-600">Step 1 of 6</p>
            <h1 className="mb-2 text-3xl font-semibold text-neutral-900">How did you work with {profile.full_name}?</h1>
          </div>

          <Card className="p-8">
            <Select
              value={relationship}
              onValueChange={(value) => {
                setRelationship(value)
                setValidationErrors((prev) => ({ ...prev, relationship: "" }))
              }}
            >
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                {RELATIONSHIP_OPTIONS.map((rel) => (
                  <SelectItem key={rel.value} value={rel.value}>
                    {rel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationErrors.relationship && (
              <p className="mt-2 text-sm text-red-600">{validationErrors.relationship}</p>
            )}

            <div className="mt-8 flex gap-4">
              <Button onClick={() => setStep("entry")} variant="outline" size="lg">
                Back
              </Button>
              <Button
                onClick={() => {
                  if (!relationship) {
                    setValidationErrors({ relationship: "Please select your relationship" })
                    return
                  }
                  setStep("duration")
                }}
                className="flex-1"
                size="lg"
              >
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 3: Time Context
  if (step === "duration") {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="mb-4 text-sm text-neutral-600">Step 2 of 6</p>
            <h1 className="mb-2 text-3xl font-semibold text-neutral-900">How long did you work with them?</h1>
          </div>

          <Card className="p-8">
            <Select
              value={duration}
              onValueChange={(value) => {
                setDuration(value)
                setValidationErrors((prev) => ({ ...prev, duration: "" }))
              }}
            >
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((dur) => (
                  <SelectItem key={dur.value} value={dur.value}>
                    {dur.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {validationErrors.duration && <p className="mt-2 text-sm text-red-600">{validationErrors.duration}</p>}

            <div className="mt-8 flex gap-4">
              <Button onClick={() => setStep("relationship")} variant="outline" size="lg">
                Back
              </Button>
              <Button
                onClick={() => {
                  if (!duration) {
                    setValidationErrors({ duration: "Please select a duration" })
                    return
                  }
                  setStep("traits")
                }}
                className="flex-1"
                size="lg"
              >
                Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 4: Traits
  if (step === "traits") {
    const totalSelected = Object.values(selectedTraits).flat().length

    const handleTraitToggle = (category: string, traitId: string) => {
      const currentSelected = selectedTraits[category] || []

      if (currentSelected.includes(traitId)) {
        setSelectedTraits({
          ...selectedTraits,
          [category]: currentSelected.filter((id) => id !== traitId),
        })
      } else if (currentSelected.length < 2) {
        setSelectedTraits({
          ...selectedTraits,
          [category]: [...currentSelected, traitId],
        })
      }
    }

    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="mb-4 text-sm text-neutral-600">Step 3 of 6</p>
            <h1 className="mb-2 text-3xl font-semibold text-neutral-900">
              Choose up to 2 traits per section that best reflect your experience
            </h1>
            <p className="text-neutral-600">
              At least 1 trait total is required. You can skip sections if nothing fits.
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(TRAIT_CATEGORIES).map(([categoryKey, category]) => {
              const selected = selectedTraits[categoryKey] || []

              return (
                <Card key={categoryKey} className="p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-neutral-900">{category.title}</h2>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-neutral-600">{selected.length} of 2 selected</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.traits.map((trait) => {
                      const isSelected = selected.includes(trait.id)
                      return (
                        <button
                          key={trait.id}
                          onClick={() => handleTraitToggle(categoryKey, trait.id)}
                          className={`rounded-full px-4 py-2 text-sm transition-all ${
                            isSelected
                              ? "bg-neutral-900 text-white ring-2 ring-neutral-900 ring-offset-2"
                              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                          }`}
                        >
                          {trait.label}
                        </button>
                      )
                    })}
                  </div>
                </Card>
              )
            })}
          </div>

          {validationErrors.traits && (
            <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
              {validationErrors.traits}
            </div>
          )}

          <div className="mt-8 flex gap-4">
            <Button onClick={() => setStep("duration")} variant="outline" size="lg">
              Back
            </Button>
            <Button
              onClick={() => {
                if (totalSelected < 1) {
                  setValidationErrors({ traits: "Please select at least 1 trait" })
                  return
                }
                setValidationErrors({})
                setStep("message")
              }}
              className="flex-1"
              size="lg"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // STEP 5: Written Message
  if (step === "message") {
    const charCount = message.length
    const maxChars = 1200

    const handleMessageSubmit = async () => {
      if (!message.trim()) {
        setValidationErrors({ message: "Please write a message" })
        return
      }

      setLoading(true)
      setError(null)
      setValidationErrors({})

      try {
        console.log("[v0] Creating contribution at message step")
        const allSelectedTraitIds = Object.values(selectedTraits).flat()

        const response = await fetch("/api/contributions/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profileId: profile.id,
            contributorName: "Pending", // Placeholder until identity step
            contributorEmail: "pending@nomee.app", // Placeholder
            companyOrOrg: "Unknown",
            relationship,
            duration,
            message: message.trim(),
            selectedTraitIds: allSelectedTraitIds,
          }),
        })

        const result = await response.json()

        if (response.status === 201 && result.success && result.contributionId) {
          console.log("[v0] ✅ Contribution created:", result.contributionId)
          setContributionId(result.contributionId)
          setLoading(false)
          setStep("identity")
          return
        }

        // Handle errors
        setError("Couldn't save right now. Please try again.")
        setLoading(false)
      } catch (err) {
        console.error("[v0] Network error creating contribution:", err)
        setError("Network error. Please check your connection and try again.")
        setLoading(false)
      }
    }

    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="mb-4 text-sm text-neutral-600">Step 4 of 6</p>
            <h1 className="mb-2 text-3xl font-semibold text-neutral-900">
              In 1–3 sentences, what stood out about working with {profile.full_name}?
            </h1>
            <p className="text-neutral-600">Think of a moment, behavior, or quality that made an impression.</p>
          </div>

          <Card className="p-8">
            <Textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value.slice(0, maxChars))
                setValidationErrors((prev) => ({ ...prev, message: "" }))
              }}
              placeholder={`Working with ${firstNameValue} felt like having someone who truly…`}
              className="min-h-[180px] text-base"
            />
            <p className="mt-2 text-right text-sm text-neutral-500">
              {charCount} / {maxChars}
            </p>

            {validationErrors.message && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                {validationErrors.message}
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <Button onClick={() => setStep("traits")} variant="outline" size="lg" disabled={loading}>
                Back
              </Button>
              <Button onClick={handleMessageSubmit} disabled={loading} className="flex-1" size="lg">
                {loading ? "Saving..." : "Continue"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 6: Identity
  if (step === "identity") {
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    const handleIdentityUpdate = async () => {
      // Validation
      const errors: Record<string, string> = {}
      if (!firstName.trim()) errors.firstName = "First name is required"
      if (!lastInitial.trim()) errors.lastInitial = "Last initial is required"
      if (!email.trim()) errors.email = "Email is required"
      else if (!isValidEmail(email.trim())) errors.email = "Please enter a valid email"

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors)
        return
      }

      if (!contributionId) {
        setError("Something went wrong. Please refresh and try again.")
        return
      }

      setLoading(true)
      setError(null)
      setValidationErrors({})

      try {
        console.log("[v0] Updating contribution with identity info")
        const response = await fetch("/api/contributions/update-identity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contributionId,
            contributorName: `${firstName.trim()} ${lastInitial.trim()}.`,
            contributorEmail: email.trim().toLowerCase(),
          }),
        })

        const result = await response.json()

        if (response.ok && result.success) {
          console.log("[v0] ✅ Identity updated successfully")
          setLoading(false)
          setStep("voice")
          return
        }

        // Handle errors
        let userMessage = "Couldn't update right now. Please try again."
        if (response.status === 429 || result.code === "RATE_LIMIT") {
          userMessage = result.error || "This email has reached its submission limit."
        } else if (response.status === 409 || result.code === "DUPLICATE_SUBMISSION") {
          userMessage = result.error || "This email has already submitted for this person."
        }

        setError(userMessage)
        setLoading(false)
      } catch (err) {
        console.error("[v0] Network error updating identity:", err)
        setError("Network error. Please check your connection and try again.")
        setLoading(false)
      }
    }

    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="mb-4 text-sm text-neutral-600">Step 5 of 6</p>
            <h1 className="mb-2 text-3xl font-semibold text-neutral-900">Who's this from?</h1>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="firstName" className="text-neutral-900">
                  First name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    setValidationErrors((prev) => ({ ...prev, firstName: "" }))
                  }}
                  className="mt-2"
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="lastInitial" className="text-neutral-900">
                  Last initial
                </Label>
                <Input
                  id="lastInitial"
                  type="text"
                  maxLength={1}
                  value={lastInitial}
                  onChange={(e) => {
                    setLastInitial(e.target.value.toUpperCase())
                    setValidationErrors((prev) => ({ ...prev, lastInitial: "" }))
                  }}
                  className="mt-2"
                />
                {validationErrors.lastInitial && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.lastInitial}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-neutral-900">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setValidationErrors((prev) => ({ ...prev, email: "" }))
                  }}
                  className="mt-2"
                />
                {validationErrors.email && <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>}
                <p className="mt-2 text-sm text-neutral-500">
                  Your email is only used to verify authenticity. It's never shown publicly.
                </p>
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <Button onClick={() => setStep("message")} variant="outline" size="lg" disabled={loading}>
                Back
              </Button>
              <Button onClick={handleIdentityUpdate} disabled={loading} className="flex-1" size="lg">
                {loading ? "Finishing..." : "Finish"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // STEP 7: Voice (Optional)
  if (step === "voice") {
    const handleSkip = () => {
      console.log("[v0] User skipped voice recording")
      setStep("submitted")
    }

    const handleUploadVoice = async () => {
      if (!voiceBlob || !contributionId) {
        console.log("[v0] No voice blob or contributionId, moving to submitted")
        setStep("submitted")
        return
      }

      setLoading(true)
      setError(null)

      try {
        console.log("[v0] Uploading voice recording, blob size:", voiceBlob.size)
        const formData = new FormData()
        formData.append("file", voiceBlob, `voice-${Date.now()}.webm`)
        formData.append("contributionId", contributionId)

        const response = await fetch("/api/contributions/attach-voice", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          console.log("[v0] Voice upload failed, but continuing anyway")
          setError("Voice upload failed, but your message was saved successfully")
        } else {
          console.log("[v0] ✅ Voice uploaded successfully")
        }
      } catch (err) {
        console.error("[v0] Voice upload error:", err)
        setError("Voice upload failed, but your message was saved successfully")
      }

      setLoading(false)
      setStep("submitted")
    }

    const handleContinue = () => {
      console.log("[v0] User chose to continue without voice")
      setStep("submitted")
    }

    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="mb-4 text-sm text-neutral-600">Step 6 of 6 (Optional)</p>
            <h1 className="mb-2 text-3xl font-semibold text-neutral-900">Want to read it in your own voice?</h1>
            <p className="text-neutral-600">Optional — adds authenticity, totally up to you.</p>
          </div>

          <VoiceRecorder quote={message} onRecordingComplete={handleRecordingComplete} />

          {error && (
            <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm text-amber-800">{error}</p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            {voiceBlob ? (
              <>
                <Button size="lg" onClick={handleUploadVoice} disabled={loading}>
                  {loading ? "Uploading..." : "Upload voice note"}
                </Button>
                <Button size="lg" variant="outline" onClick={handleContinue} disabled={loading}>
                  Continue without uploading
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" variant="outline" onClick={handleSkip}>
                  Skip — no voice note
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // STEP 8: Confirmation (ALWAYS SHOWS)
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <Card className="mx-auto max-w-2xl p-12 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-3xl font-semibold text-neutral-900">Your Nomee is complete</h1>
        <p className="mb-8 text-neutral-600">Thank you for taking the time — this really matters.</p>

        <Button variant="outline" size="lg" onClick={() => (window.location.href = "/")}>
          Create your own Nomee
        </Button>
      </Card>
    </div>
  )
}
