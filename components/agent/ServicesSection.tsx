import Link from "next/link"
import {
  BarChart3,
  Camera,
  CheckCircle2,
  FileText,
  Handshake,
  KeyRound,
  LineChart,
  Megaphone,
  Search,
  ShieldCheck,
} from "lucide-react"

const GOLD = "#D4AF37"

type Service = {
  title: string
  description: string
  icon: React.ReactNode
}

function ServiceCard({ title, description, icon }: Service) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 transition-colors"
          style={{ color: GOLD }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{title}</div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const buyerServices: Service[] = [
    {
      title: "Property Search",
      description: "Access exclusive listings and the right tower/view for your lifestyle.",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "Market Analysis",
      description: "Know what units are worth with floor-by-floor, view-aware comps.",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: "Negotiation",
      description: "Protect your interests and secure the best terms possible.",
      icon: <Handshake className="h-5 w-5" />,
    },
    {
      title: "Transaction Management",
      description: "From offer to keys, every detail handled and communicated clearly.",
      icon: <KeyRound className="h-5 w-5" />,
    },
  ]

  const sellerServices: Service[] = [
    {
      title: "Pricing Strategy",
      description: "Data-driven pricing to attract qualified buyers fast.",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Professional Marketing",
      description: "Photos, video, and exposure designed for luxury condo buyers.",
      icon: <Camera className="h-5 w-5" />,
    },
    {
      title: "Buyer Qualification",
      description: "Only serious buyers — stronger offers, smoother closings.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      title: "Closing Support",
      description: "Contract to keys with proactive guidance and clear timelines.",
      icon: <FileText className="h-5 w-5" />,
    },
  ]

  return (
    <section className="bg-gray-50 py-16 lg:py-24" aria-label="Services">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900">
            Buyer & Seller Services — Built for Turnberry Place
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Clean, high-touch service with clear next steps — no walls of text.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">For Buyers</h3>
              <Link
                href="/available-condos"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#111827" }}
                aria-label="View available condos"
              >
                <CheckCircle2 className="h-4 w-4" style={{ color: GOLD }} aria-hidden="true" />
                View Available Condos
              </Link>
            </div>
            <div className="mt-4 grid gap-4">
              {buyerServices.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">For Sellers</h3>
              <Link
                href="/request-details"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#111827" }}
              >
                <Megaphone className="h-4 w-4" style={{ color: GOLD }} aria-hidden="true" />
                Get a Pricing Plan
              </Link>
            </div>
            <div className="mt-4 grid gap-4">
              {sellerServices.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

