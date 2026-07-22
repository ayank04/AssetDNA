import * as React from "react"
import Link from "next/link"
import { AnimatedFade, AnimatedSlideUp, AnimatedScale } from "@/components/animations/Motion"
import { Button } from "@/components/ui/Button"
import { Database, Search, Clock, FileText, Zap, ChevronRight, Cpu } from "lucide-react"
import { GuestRoute } from "@/features/auth/components/GuestRoute"

function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-border/50 h-16 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm">
          A
        </div>
        <span className="font-semibold text-lg tracking-tight">AssetDNA</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
        <a href="#features" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Features</a>
        <a href="#how-it-works" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">How it Works</a>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" tabIndex={-1}>
          <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
        </Link>
        <Link href="/login" tabIndex={-1}>
          <Button>Get Started</Button>
        </Link>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col items-center text-center overflow-hidden min-h-[90vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background -z-10" />
      <AnimatedSlideUp className="max-w-4xl space-y-6 z-10">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          <Zap className="mr-2 h-4 w-4" /> The future of industrial intelligence
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
          The Living Memory of <br className="hidden md:block" /> Every Industrial Asset
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
          An enterprise AI platform that seamlessly unifies maintenance history, engineering changes, and sensor data to instantly investigate and diagnose complex industrial assets.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link href="/login" tabIndex={-1}>
            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
              Start Investigating <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a href="#features" tabIndex={-1}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8 bg-background/50 backdrop-blur-md">
              Explore Platform
            </Button>
          </a>
        </div>
      </AnimatedSlideUp>

      <AnimatedScale className="mt-20 relative w-full max-w-5xl aspect-[21/9] rounded-2xl shadow-elevation-2 border border-border/50 flex items-center justify-center overflow-hidden group bg-background/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <img 
          src="/dashboard-mockup.png" 
          alt="AssetDNA Dashboard Interface" 
          className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
        />
        
        {/* Glow effect underneath */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
      </AnimatedScale>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Search, title: "AI Investigation", desc: "Ask complex questions in natural language. The AI reads thousands of manuals and logs instantly." },
    { icon: Clock, title: "Unified Timeline", desc: "Every maintenance record, inspection, and engineering change in one seamless historical view." },
    { icon: FileText, title: "Document Intelligence", desc: "Instantly cross-reference schematics and PDFs to diagnose physical anomalies." },
    { icon: Database, title: "Evidence Viewer", desc: "Never guess. Every AI insight comes with direct, clickable citations to the exact source manual." },
  ]

  return (
    <section id="features" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <AnimatedSlideUp className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Supercharge your engineers.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">AssetDNA connects siloed data sources into a single pane of glass, powered by state-of-the-art LLMs.</p>
        </AnimatedSlideUp>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, idx) => (
            <AnimatedSlideUp key={idx} className="glass p-8 rounded-2xl border hover:border-primary/50 transition-colors group shadow-sm hover:shadow-elevation-1">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </AnimatedSlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSlideUp className="space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How it works</h2>
        </AnimatedSlideUp>
        
        <div className="relative border-l-2 border-primary/20 ml-6 md:ml-0 md:border-l-0">
          {[
            { step: "1", title: "Select Asset", desc: "Choose the specific machinery or system you are investigating." },
            { step: "2", title: "Context Collection", desc: "AssetDNA automatically gathers maintenance logs, manuals, and timelines." },
            { step: "3", title: "AI Analysis", desc: "Groq-powered LLMs process the context against your specific question." },
            { step: "4", title: "Actionable Insights", desc: "Receive a deeply contextual answer with direct evidence citations." }
          ].map((item, idx) => (
            <AnimatedSlideUp key={idx} className="relative pl-12 md:pl-0 md:text-center md:flex md:flex-col md:items-center pb-12 last:pb-0">
              <div className="absolute left-0 md:relative md:left-auto md:mb-4 w-10 h-10 -ml-[21px] md:ml-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-background">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground max-w-sm">{item.desc}</p>
            </AnimatedSlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="max-w-4xl mx-auto relative z-10 glass-heavy border rounded-3xl p-12 text-center shadow-elevation-2">
        <AnimatedSlideUp className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to evolve your maintenance?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Join the elite engineering teams using AssetDNA to predict, diagnose, and resolve industrial issues faster than ever.</p>
          <Link href="/login" className="inline-block pt-4" tabIndex={-1}>
            <Button size="lg" className="h-12 px-8 text-base shadow-sm">
              Get Started Now
            </Button>
          </Link>
        </AnimatedSlideUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
            A
          </div>
          <span className="font-semibold text-sm">AssetDNA</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Built for the Enterprise AI Hackathon. v0.1.0
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; 2026 AssetDNA. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <GuestRoute>
      <AnimatedFade className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
        <LandingNavbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <CTA />
        </main>
        <Footer />
      </AnimatedFade>
    </GuestRoute>
  )
}
