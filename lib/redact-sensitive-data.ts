export function redactSensitiveData(text: string): string {
  if (!text) return text

  let redacted = text

  // Redact email addresses
  redacted = redacted.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[email redacted]")

  // Redact phone numbers (various formats)
  redacted = redacted.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, "[phone redacted]")
  redacted = redacted.replace(/\b$$\d{3}$$\s*\d{3}[-.]?\d{4}\b/g, "[phone redacted]")
  redacted = redacted.replace(/\b\+\d{1,3}[-.\s]?\d{1,14}\b/g, "[phone redacted]")

  // Redact URLs
  redacted = redacted.replace(/https?:\/\/[^\s]+/g, "[URL redacted]")
  redacted = redacted.replace(/www\.[^\s]+/g, "[URL redacted]")

  // Redact common ID numbers (SSN-like patterns)
  redacted = redacted.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[ID redacted]")

  return redacted
}
