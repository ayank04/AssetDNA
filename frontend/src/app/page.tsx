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
        
        {/* Central UI Panel */}
        <div className="relative z-10 w-full max-w-2xl bg-black/60 border border-white/10 rounded-xl p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                <Box className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Pump PX-100</h3>
                <p className="text-xs text-muted-foreground">Primary Coolant Loop</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Critical Anomaly
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-purple-400" />
                <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Radial Vibration</span>
              </div>
              <div className="flex items-end gap-2 h-16">
                {[30, 45, 35, 60, 40, 85, 95].map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-sm transition-all duration-1000 ${h > 80 ? 'bg-red-500' : 'bg-primary'}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Network className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">AI Diagnosis</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mt-2">
                Sustained vibration above 4.0 mm/s detected. Cross-referencing CMMS history suggests high probability of <span className="text-primary font-semibold">mechanical seal degradation</span>. 
              </p>
            </div>
          </div>
        </div>

        {/* Floating Context Nodes */}
        <div className="absolute top-[15%] left-[10%] w-48 p-3 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md hidden md:block">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Database className="h-3 w-3" /> SCADA Ingestion
          </div>
          <div className="text-sm text-white font-medium truncate">Telemetry Synced: 2ms ago</div>
        </div>

        <div className="absolute bottom-[15%] right-[10%] w-56 p-3 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md hidden md:block">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <FileText className="h-3 w-3" /> Document Search
          </div>
          <div className="text-sm text-white font-medium truncate">Matched OEM Manual Section 4.2</div>
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
    <section id="features" className="py-24 px-6 relative z-10 border-t border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Engineered for the Enterprise.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Industrial operations generate millions of data points daily. AssetDNA is the only platform that merges structured telemetry with unstructured PDFs, logs, and human knowledge to form a complete understanding of your factory floor.
          </p>
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

function IntegrationData() {
  return (
    <section className="py-24 px-6 relative z-10 border-t border-white/5 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSlideUp className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-primary">
              Full Stack Knowledge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Everything connected. <br/> Nothing left behind.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When an alarm fires on the factory floor, your engineers shouldn't have to scramble through three different systems. Our AI autonomously aggregates the asset's live data alongside its entire historical context.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "SCADA & IoT Telemetry Streams",
                "OEM Manuals & Schematic PDFs",
                "CMMS Work Orders & Inspections",
                "Historical Engineering Changes"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSlideUp>
          
          <AnimatedSlideUp delay={0.2} className="relative">
            <div className="aspect-square rounded-full border border-white/10 bg-gradient-to-br from-primary/5 to-purple-600/5 absolute -inset-4 blur-3xl -z-10" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <Activity className="h-8 w-8 text-primary mb-4" />
                  <h4 className="font-semibold text-white mb-2">Live Telemetry</h4>
                  <p className="text-sm text-muted-foreground">Vibration, temperature, and pressure streaming in real-time.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <FileText className="h-8 w-8 text-purple-400 mb-4" />
                  <h4 className="font-semibold text-white mb-2">Documentation</h4>
                  <p className="text-sm text-muted-foreground">Vector-indexed OEM manuals and Standard Operating Procedures.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <Clock className="h-8 w-8 text-blue-400 mb-4" />
                  <h4 className="font-semibold text-white mb-2">Maintenance History</h4>
                  <p className="text-sm text-muted-foreground">Decades of work orders and inspection reports.</p>
                </div>
                <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/30 p-6 rounded-2xl">
                  <Search className="h-8 w-8 text-white mb-4" />
                  <h4 className="font-semibold text-white mb-2">AI Synthesizer</h4>
                  <p className="text-sm text-gray-300">Merges all inputs into immediate, actionable answers.</p>
                </div>
              </div>
            </div>
          </AnimatedSlideUp>
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
          <IntegrationData />
          <CTA />
        </main>
        <Footer />
      </AnimatedFade>
    </GuestRoute>
  )
}
