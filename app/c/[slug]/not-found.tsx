import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-neutral-900">This collection link isn't active yet.</h1>
          <p className="text-lg text-neutral-600">
            Double-check the link, or ask the owner to confirm their Nomee URL.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/">Go to Nomee home</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/auth/signup">Create your Nomee</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
