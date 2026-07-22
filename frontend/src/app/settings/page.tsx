"use client"

import * as React from "react"
import { useAuth } from "@/features/auth/providers/AuthProvider"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun, User, LogOut, Info, Shield, Keyboard, Bell, Sparkles, Database } from "lucide-react"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (e) {
      console.error("Failed to sign out", e)
    }
  }

  return (
    <div className="flex-1 h-full overflow-y-auto bg-background/50 p-4 md:p-8 lg:p-12 smooth-scroll">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start">
          
          {/* Navigation/TOC (Optional for simple scrolling layout, but we'll just stack the cards for a clean look) */}
          <div className="hidden md:flex flex-col space-y-1 sticky top-8">
            <a href="#profile" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground flex items-center gap-2"><User className="h-4 w-4" /> Profile</a>
            <a href="#appearance" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground flex items-center gap-2"><Sun className="h-4 w-4" /> Appearance</a>
            <a href="#shortcuts" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground flex items-center gap-2"><Keyboard className="h-4 w-4" /> Shortcuts</a>
            <a href="#notifications" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</a>
            <a href="#ai" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground flex items-center gap-2"><Sparkles className="h-4 w-4" /> AI Preferences</a>
            <a href="#privacy" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground flex items-center gap-2"><Shield className="h-4 w-4" /> Privacy & Data</a>
            <a href="#about" className="px-3 py-2 text-sm font-medium rounded-md hover:bg-muted text-foreground flex items-center gap-2"><Info className="h-4 w-4" /> About</a>
          </div>

          <div className="space-y-10">
            {/* Profile Section */}
            <section id="profile" className="space-y-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-xl font-semibold tracking-tight">Profile & Account</h2>
              </div>
              <div className="glass bg-card/50 border border-border/50 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 shrink-0">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-medium">{user?.displayName || "Enterprise User"}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <div className="pt-2 flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success/10 text-success uppercase tracking-wider">
                        Authenticated
                      </span>
                      {user?.providerData?.[0]?.providerId && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground uppercase tracking-wider">
                          Provider: {user.providerData[0].providerId}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-destructive/50 bg-transparent shadow-sm hover:bg-destructive/10 hover:text-destructive text-destructive h-9 px-4 py-2 mt-4 sm:mt-0"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </section>

            {/* Appearance Section */}
            <section id="appearance" className="space-y-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-xl font-semibold tracking-tight">Appearance</h2>
              </div>
              <div className="glass bg-card/50 border border-border/50 rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50 bg-background'}`}
                  >
                    <Sun className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50 bg-background'}`}
                  >
                    <Moon className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50 bg-background'}`}
                  >
                    <Monitor className="h-6 w-6 mb-2" />
                    <span className="text-sm font-medium">System</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Keyboard Shortcuts Section */}
            <section id="shortcuts" className="space-y-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-xl font-semibold tracking-tight">Keyboard Shortcuts</h2>
              </div>
              <div className="glass bg-card/50 border border-border/50 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 border-b border-border/50">
                    <tr>
                      <th className="px-6 py-3 font-medium text-muted-foreground">Action</th>
                      <th className="px-6 py-3 font-medium text-muted-foreground text-right">Shortcut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    <tr>
                      <td className="px-6 py-4">Global Search / Command Palette</td>
                      <td className="px-6 py-4 text-right">
                        <kbd className="inline-flex items-center gap-1 rounded border border-border/50 bg-muted px-2 py-1 font-mono text-[11px] font-medium text-muted-foreground">Ctrl/Cmd + K</kbd>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Close Modals / Drawers</td>
                      <td className="px-6 py-4 text-right">
                        <kbd className="inline-flex items-center gap-1 rounded border border-border/50 bg-muted px-2 py-1 font-mono text-[11px] font-medium text-muted-foreground">Esc</kbd>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Navigate Lists</td>
                      <td className="px-6 py-4 text-right">
                        <kbd className="inline-flex items-center gap-1 rounded border border-border/50 bg-muted px-2 py-1 font-mono text-[11px] font-medium text-muted-foreground">↑</kbd>
                        <kbd className="inline-flex items-center gap-1 rounded border border-border/50 bg-muted px-2 py-1 font-mono text-[11px] font-medium text-muted-foreground ml-1">↓</kbd>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Select / Send Message</td>
                      <td className="px-6 py-4 text-right">
                        <kbd className="inline-flex items-center gap-1 rounded border border-border/50 bg-muted px-2 py-1 font-mono text-[11px] font-medium text-muted-foreground">Enter</kbd>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Notifications Section */}
            <section id="notifications" className="space-y-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-xl font-semibold tracking-tight">Notifications</h2>
              </div>
              <div className="glass bg-card/50 border border-border/50 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <Bell className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Notification preferences are not available in this version.</p>
                  <p className="text-sm text-muted-foreground mt-1">Check back later for push notifications and email alerts.</p>
                </div>
              </div>
            </section>

            {/* AI Preferences Section */}
            <section id="ai" className="space-y-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-xl font-semibold tracking-tight">AI Preferences</h2>
              </div>
              <div className="glass bg-card/50 border border-border/50 rounded-xl p-6 shadow-sm flex items-start gap-4">
                <Sparkles className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Managed by system defaults.</p>
                  <p className="text-sm text-muted-foreground mt-1">Temperature, prompt tuning, and model selection are currently controlled strictly by the AssetDNA backend infrastructure to ensure evidence grounding accuracy.</p>
                </div>
              </div>
            </section>

            {/* Privacy Section */}
            <section id="privacy" className="space-y-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-xl font-semibold tracking-tight">Privacy & Data Handling</h2>
              </div>
              <div className="glass bg-card/50 border border-border/50 rounded-xl p-6 shadow-sm space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Authentication:</strong> Your session is secured via Firebase Authentication using industry-standard JWTs. We do not store passwords on our servers.
                </p>
                <p>
                  <strong className="text-foreground">AI Processing & Evidence Grounding:</strong> AI queries are processed securely on the backend. Responses are strictly grounded in your operational evidence (Maintenance, Timelines, Documents). Model hallucination is minimized by strict context limits.
                </p>
                <p>
                  <strong className="text-foreground">Data Handling:</strong> All asset data remains encrypted in transit and at rest.
                </p>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="space-y-4">
              <div className="border-b border-border pb-2">
                <h2 className="text-xl font-semibold tracking-tight">About</h2>
              </div>
              <div className="glass bg-card/50 border border-border/50 rounded-xl p-6 shadow-sm flex flex-col items-center text-center space-y-2">
                <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-2 shadow-lg shadow-primary/20">
                  <Database className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold tracking-tight">AssetDNA</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  The Living Memory of Every Industrial Asset. A premium AI-powered contextual analysis and engineering investigation platform.
                </p>
                <div className="pt-4 flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  <span>Version 1.0.0</span>
                  <span>•</span>
                  <span>Enterprise Edition</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
