"use client"

/**
 * Hook that returns a function to scroll to the top of the page smoothly
 * Use this whenever a user clicks a tab, pill, or filter button to navigate to new content
 */
export function useScrollToTop() {
  return () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }
}
