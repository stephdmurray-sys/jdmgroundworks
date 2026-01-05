import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Why Nomee",
  description: "Feedback fades. Not because it's bad — because it's casual.",
}

export default function WhyNomeePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F7FAFF] to-white">
      <SiteHeader />

      <section className="relative pt-28 md:pt-36 pb-20 md:pb-24 px-4 md:px-6 bg-white">
        {/* Ambient glow behind headline */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(90, 152, 255, 0.15) 0%, transparent 70%)",
            filter: "blur(140px)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-slate-900 leading-[1.08] tracking-tight mb-7">
            Feedback fades.
            <br />
            Not because it&apos;s bad —
            <br />
            because it&apos;s casual.
          </h1>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-3xl mx-auto">
            The most important feedback isn&apos;t scheduled — and it&apos;s gone before you realize you&apos;ll need
            it.
          </p>
        </div>
      </section>

      {/* HOW FEEDBACK SHOWS UP — Compressed to ONE compact block */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-[#F6F9FF] border-y border-slate-100/60">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-2xl md:text-3xl text-slate-700 leading-relaxed">
            Feedback shows up casually —<br />
            after meetings, in messages, in moments that don&apos;t feel important yet.
          </p>
        </div>
      </section>

      {/* THE CORE TRUTH — Made unmissable with bold anchoring sentence */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
            The problem isn&apos;t feedback.{" "}
            <span className="relative inline-block">
              <span className="relative z-10">It&apos;s timing.</span>
              <span
                className="absolute inset-0 -mx-2 -my-1 rounded-lg"
                style={{ background: "rgba(90, 152, 255, 0.16)" }}
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-slate-900 leading-relaxed">
            Nomee exists so you don&apos;t have to reconstruct your impact from memory.
          </p>
        </div>
      </section>

      {/* WITHOUT / WITH — Rewritten to be consequence-driven */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-[#F6F9FF] border-y border-slate-100/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
            {/* Left: Without Nomee */}
            <div className="space-y-6 p-8">
              <h3 className="text-xl md:text-2xl font-medium text-slate-400 mb-10">Without Nomee</h3>
              <div className="space-y-5 text-base md:text-lg text-slate-500 leading-relaxed">
                <p>• You rely on memory</p>
                <p>• You search old messages</p>
                <p>• You paraphrase what people said</p>
                <p>• You infer patterns instead of showing them</p>
              </div>
            </div>

            {/* Right: With Nomee - subtle highlight background */}
            <div className="space-y-6 bg-white/50 rounded-2xl p-8 border border-slate-100/60">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-10">With Nomee</h3>
              <div className="space-y-5 text-base md:text-lg text-slate-900 font-medium leading-relaxed">
                <p>• Feedback is saved when it happens</p>
                <p>• Patterns surface naturally</p>
                <p>• Exact words are preserved</p>
                <p>• One link shows the truth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION SECTION — Framed Maya example as a reveal */}
      <section className="relative py-20 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Fragmented feedback */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">Fragmented feedback</h2>
            <p className="text-base text-slate-600">Separate moments, easily lost.</p>
          </div>

          {/* Scattered feedback cards */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-6">
            {/* iMessage */}
            <div className="space-y-3 flex flex-col">
              <div
                className="bg-white rounded-2xl p-5 border border-slate-200 flex-1 flex flex-col"
                style={{ boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#F2F6FF] flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jessica Liu</p>
                    <p className="text-xs text-slate-500">iMessage</p>
                  </div>
                </div>
                <div className="bg-blue-500 text-white rounded-2xl rounded-tl-sm p-3 inline-block">
                  <p className="text-sm">Thanks again for yesterday!</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3 flex flex-col">
              <div
                className="bg-white rounded-2xl p-5 border border-slate-200 flex-1 flex flex-col"
                style={{ boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)" }}
              >
                <div className="mb-3 bg-[#F2F6FF] rounded-lg px-3 py-2 inline-block">
                  <p className="text-sm font-medium">Re: Q4 Strategy Review</p>
                  <p className="text-xs text-slate-500">marcus.kim@company.com</p>
                </div>
                <p className="text-sm text-slate-700">
                  The way you reframed our approach completely shifted the conversation...
                </p>
              </div>
            </div>

            {/* Slack */}
            <div className="space-y-3 flex flex-col">
              <div
                className="bg-white rounded-2xl p-5 border border-slate-200 flex-1 flex flex-col"
                style={{ boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)" }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded bg-[#F2F6FF] flex items-center justify-center">
                    <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      AS
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Aisha Singh</p>
                    <p className="text-xs text-slate-500">#project-team</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700">Just wrapped the client call — they were so impressed...</p>
              </div>
            </div>
          </div>

          {/* Arrow indicator */}
          <div className="relative flex justify-center py-10 md:py-12">
            <div className="text-slate-300">
              <svg className="w-10 h-20" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6">
                <line x1="20" y1="0" x2="20" y2="80" />
                <polyline points="10,60 20,80 30,60" strokeWidth="3" />
              </svg>
            </div>
            {/* Subtle glow at arrow end */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(90, 152, 255, 0.15) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              aria-hidden="true"
            />
          </div>

          {/* What those moments become */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
              What those moments become in Nomee
            </h2>
          </div>

          <p className="text-lg md:text-xl text-slate-700 font-medium text-center max-w-2xl mx-auto mb-10">
            Saved over time, casual feedback becomes a clear signal.
          </p>

          {/* Maya Torres card */}
          <div className="max-w-2xl mx-auto relative">
            {/* Focus ring glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(90, 152, 255, 0.16) 0%, transparent 70%)",
                filter: "blur(130px)",
              }}
              aria-hidden="true"
            />
            <div
              className="relative bg-slate-50 rounded-2xl p-8 md:p-10"
              style={{
                border: "1px solid rgba(90, 152, 255, 0.20)",
                boxShadow: "0 20px 60px rgba(15, 23, 42, 0.12), 0 10px 25px rgba(90, 152, 255, 0.10)",
              }}
            >
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">Maya Torres</h3>
                <p className="text-sm text-slate-500">Product Leader</p>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-4">What consistently shows up</p>
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-300">
                    Strategic thinker
                  </span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-300">
                    Calm under pressure
                  </span>
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-300">
                    Clear communicator
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                  "The way you{" "}
                  <span className="bg-yellow-200/50 px-1.5 py-0.5 rounded font-medium">reframed our approach</span>{" "}
                  completely shifted the conversation. Your clarity helped us make the right call."
                </p>
                <p className="text-xs text-slate-500 mt-3 font-medium">— Marcus Kim, Colleague</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY — Removed softness, made it one sentence */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white border-t border-slate-100/60">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight">
            Nomee saves what already happens — so nothing important disappears.
          </h2>
        </div>
      </section>

      {/* FINAL CTA — Strong, quiet, confident with exact copy */}
      <section className="relative py-20 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-[#F6F9FF]">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-[1.1]">
              When it matters,{" "}
              <span className="relative inline-block">
                <span className="relative z-10">you&apos;ll be ready.</span>
                <span
                  className="absolute inset-0 -mx-2 -my-1 rounded-lg"
                  style={{ background: "rgba(90, 152, 255, 0.16)" }}
                  aria-hidden="true"
                />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-700 font-medium">
              Everything you&apos;ve saved is already there — in one place.
            </p>
          </div>

          <div className="relative inline-block pt-4">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(90, 152, 255, 0.12) 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
              aria-hidden="true"
            />
            <Button
              asChild
              className="relative bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 h-14 text-base font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <Link href="/auth/signup">Create my Nomee link</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-20" />
    </div>
  )
}
