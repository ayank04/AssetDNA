import * as React from "react"
import Link from "next/link"
import { AnimatedFade, AnimatedSlideUp } from "@/components/animations/Motion"
import { Button } from "@/components/ui/Button"
import { Database, Search, Clock, FileText, Zap, ChevronRight, Activity, ShieldCheck, Box, Network } from "lucide-react"
import { GuestRoute } from "@/features/auth/components/GuestRoute"

function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/10 bg-background/40 backdrop-blur-xl h-20 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-bold shadow-lg shadow-primary/20">
          A
        </div>
        <span className="font-bold text-xl tracking-tighter text-foreground">AssetDNA</span>
      </div>
      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-muted-foreground">
        <a href="#features" className="hover:text-primary transition-colors">Platform</a>
        <a href="#intelligence" className="hover:text-primary transition-colors">Intelligence</a>
        <a href="#security" className="hover:text-primary transition-colors">Security</a>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" tabIndex={-1}>
          <Button variant="ghost" className="hidden sm:inline-flex hover:bg-white/5">Sign In</Button>
        </Link>
        <Link href="/login" tabIndex={-1}>
          <Button className="rounded-full px-6 bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Deploy Now
          </Button>
        </Link>
      </div>
    </nav>
  )
}

function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]" />
      <div className="absolute right-[10%] top-[20%] -z-10 h-[250px] w-[250px] rounded-full bg-purple-600 opacity-20 blur-[100px]" />
    </div>
  )
}

function AbstractGraphic() {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-24 mb-12 perspective-[1000px]">
      <div className="relative w-full aspect-[21/9] rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden flex items-center justify-center group transform-gpu transition-transform duration-700 hover:rotate-x-2">
        {/* Decorative Grid inside */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Core Node */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 p-[2px] shadow-[0_0_40px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_80px_rgba(59,130,246,0.5)] transition-all duration-700">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Network className="h-10 w-10 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        {/* Floating Data Nodes */}
        <div className="absolute top-[20%] left-[15%] w-48 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hidden md:block">
          <div className="flex items-center gap-3 mb-3">
            <Database className="h-4 w-4 text-purple-400" />
            <div className="h-2 w-20 bg-white/20 rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400 w-[70%]" />
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400 w-[40%]" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-[20%] right-[15%] w-56 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hidden md:block">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="h-4 w-4 text-primary" />
            <div className="h-2 w-16 bg-white/20 rounded-full" />
          </div>
          <div className="flex items-end gap-1 h-8">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/50 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="absolute top-[40%] left-[30%] w-[20%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-primary/50 transform rotate-[15deg] hidden md:block" />
        <div className="absolute bottom-[40%] right-[30%] w-[20%] h-px bg-gradient-to-r from-primary/50 via-purple-500/50 to-transparent transform rotate-[15deg] hidden md:block" />
        
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 pb-12 md:pt-48 md:pb-20 px-6 flex flex-col items-center text-center overflow-hidden z-10">
      <AnimatedSlideUp className="max-w-5xl space-y-8 z-10 mt-8">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
          AssetDNA Architecture v2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-foreground leading-[1.1]">
          Industrial Intelligence, <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-purple-500">
            Synthesized.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
          The ultimate system of record for the physical world. AssetDNA unifies telemetry, maintenance logs, and schematics into a single AI-driven neural network.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/login" tabIndex={-1}>
            <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-full bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 transition-all duration-300">
              Initialize Platform
            </Button>
          </Link>
          <a href="#features" tabIndex={-1}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-full border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              View Architecture
            </Button>
          </a>
        </div>
      </AnimatedSlideUp>

      <AnimatedSlideUp delay={0.2} className="w-full">
        <AbstractGraphic />
      </AnimatedSlideUp>
    </section>
  )
}

function Features() {
  const features = [
    { icon: Search, title: "Cognitive Retrieval", desc: "Instantly query decades of maintenance records using natural language. No SQL required." },
    { icon: Box, title: "Digital Twins", desc: "Every physical asset represented as a unified digital entity with live health scoring." },
    { icon: ShieldCheck, title: "Deterministic Citations", desc: "AI insights are backed by rigid, clickable citations to your exact OEM manuals." },
    { icon: Clock, title: "Predictive Timelines", desc: "Visualize the entire lifecycle of an asset from commissioning to proposed decommissioning." },
  ]

  return (
    <section id="features" className="py-32 px-6 relative z-10 border-t border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 md:flex items-end justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Engineered for the Enterprise.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">Built from the ground up to handle massive, unstructured industrial datasets with millisecond latency.</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <AnimatedSlideUp key={idx} delay={idx * 0.1} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{f.desc}</p>
            </AnimatedSlideUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
      <div className="max-w-5xl mx-auto relative z-10 border border-white/10 rounded-[3rem] p-12 md:p-20 text-center bg-black/40 backdrop-blur-2xl overflow-hidden shadow-2xl">
        {/* Inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent -z-10" />
        
        <AnimatedSlideUp className="space-y-8 relative z-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Stop guessing. <br /> Start knowing.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deploy AssetDNA today and transform your static maintenance data into a living intelligence engine.
          </p>
          <div className="pt-8">
            <Link href="/login" tabIndex={-1}>
              <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Deploy AssetDNA
              </Button>
            </Link>
          </div>
        </AnimatedSlideUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 relative z-10 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 text-white flex items-center justify-center font-bold shadow-sm">
            A
          </div>
          <span className="font-bold tracking-tight">AssetDNA</span>
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          Enterprise AI Hackathon Build
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <GuestRoute>
      <AnimatedFade className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white relative">
        <GridBackground />
        <LandingNavbar />
        <main>
          <Hero />
          <Features />
          <CTA />
        </main>
        <Footer />
      </AnimatedFade>
    </GuestRoute>
  )
}
