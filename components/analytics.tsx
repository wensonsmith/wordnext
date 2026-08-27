import { GoogleAnalytics } from "@next/third-parties/google"

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  return gaId ? <GoogleAnalytics gaId={gaId} /> : null
}
