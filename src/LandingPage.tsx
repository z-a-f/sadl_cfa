'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle, MessageCircle, Users, Zap } from 'lucide-react'

const ChatMessage = ({ message, isUser }: { message: string; isUser: boolean }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
    <div className={`rounded-lg px-4 py-2 max-w-[80%] ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
      {message}
    </div>
  </div>
)

const AnimatedChat = ({ messages }: { messages: { text: string; isUser: boolean }[] }) => {
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if (visibleMessages.length < messages.length) {
        setVisibleMessages(prev => [...prev, messages[prev.length]])
      } else {
        clearInterval(timer)
      }
    }, 1500)

    return () => clearInterval(timer)
  }, [messages, visibleMessages])

  return (
    <div className="h-64 overflow-y-auto bg-gray-800 rounded-lg p-4">
      {visibleMessages.map((message, index) => (
        <ChatMessage key={index} message={message.text} isUser={message.isUser} />
      ))}
    </div>
  )
}

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting))
    })
    const currentElement = domRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [])

  return (
    <div
      className={`transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      ref={domRef}
    >
      {children}
    </div>
  )
}

export default function LandingPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [agreeComms, setAgreeComms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, company, role, agreeComms })
  }

  const projectChatMessages = [
    { text: "What's our project's current direction?", isUser: true },
    { text: "We're on track with the API integration. The frontend team is making good progress on the UI components.", isUser: false },
    { text: "Any obstacles on the horizon?", isUser: true },
    { text: "We're facing a minor delay with the user authentication module, but the team is working on a solution.", isUser: false },
  ]

  const teamChatMessages = [
    { text: "Where is Alex focusing their efforts today?", isUser: true },
    { text: "Alex is optimizing database queries to improve overall system performance.", isUser: false },
    { text: "What was Kat's progress last week?", isUser: true },
    { text: "Kat completed the user onboarding flow and started the dashboard redesign.", isUser: false },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/60">
        <div className="container mx-auto flex h-14 items-center px-4">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">SADL.AI</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <a className="transition-colors hover:text-gray-300 text-gray-400" href="#about">About</a>
              <a className="transition-colors hover:text-gray-300 text-gray-400" href="#features">Features</a>
              <a className="transition-colors hover:text-gray-300 text-gray-400" href="#how-it-works">How It Works</a>
              <a className="transition-colors hover:text-gray-300 text-gray-400" href="#contact">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Take the Reins with SADL.AI: Your AI-Powered Command Center
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Saddle up for a revolutionary ride where AI agents steer your projects and teamwork to success.
                </p>
              </div>
              <div className="space-x-4">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                  Mount Up for Early Access
                </button>
              </div>
            </div>
          </div>
        </section>

        <FadeInSection>
          <section id="about" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">What is SADL.AI?</h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
                SADL.AI is your AI-powered command center, giving you a bird's-eye view of your organization. Like a skilled rider in the saddle, you'll have complete control and awareness of your projects and teams, guided by our intelligent AI agents.
              </p>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Why SADL.AI?</h2>
              <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
                <div className="bg-gray-700 text-gray-100 rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Reins</h3>
                  <p className="text-sm text-gray-400">
                    Experience unparalleled control with our AI communication protocol, enhancing your ability to guide your organization.
                  </p>
                </div>
                <div className="bg-gray-700 text-gray-100 rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Customized Stirrups</h3>
                  <p className="text-sm text-gray-400">
                    Our AI agents adapt to your organization's unique structure, providing the perfect fit for your team's needs.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Navigate Your Organization</h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mb-8">
                Interact with AI agents to get a panoramic view of your projects and team, just like a rider surveying the landscape.
              </p>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-gray-700 text-gray-100 rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Survey Your Project Landscape</h3>
                  <AnimatedChat messages={projectChatMessages} />
                </div>
                <div className="bg-gray-700 text-gray-100 rounded-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">Guide Your Team</h3>
                  <AnimatedChat messages={teamChatMessages} />
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Empower Your Organization</h2>
              <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="mt-1 h-6 w-6 text-blue-400" />
                  <div>
                    <h3 className="font-bold">Chart Your Course</h3>
                    <p className="text-sm text-gray-400">Get real-time insights to navigate your projects with AI-powered analytics.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="mt-1 h-6 w-6 text-blue-400" />
                  <div>
                    <h3 className="font-bold">Synchronize Your Team</h3>
                    <p className="text-sm text-gray-400">Foster seamless coordination across your organization, moving as one.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MessageCircle className="mt-1 h-6 w-6 text-blue-400" />
                  <div>
                    <h3 className="font-bold">AI-Guided Insights</h3>
                    <p className="text-sm text-gray-400">Receive tailored recommendations and support from your AI co-pilot.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="mt-1 h-6 w-6 text-blue-400" />
                  <div>
                    <h3 className="font-bold">Accelerate Your Journey</h3>
                    <p className="text-sm text-gray-400">Unlock your team's potential with AI-driven workflows and insights.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <section id="sign-up" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Ready to Take the Reins?</h2>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center mb-8">
                Join SADL.AI today and experience the future of AI-powered organizational control.
              </p>
              <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company/Organization (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  
                  placeholder="Role/Position (optional)"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="agreeComms"
                    checked={agreeComms}
                    onChange={(e) => setAgreeComms(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <label
                    htmlFor="agreeComms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to receive communications from SADL.AI.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Saddle Up Now
                </button>
              </form>
            </div>
          </section>
        </FadeInSection>
      </main>

      <footer className="w-full border-t border-gray-700 bg-gray-800">
        <div className="container mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-400">© 2024 SADL.AI. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
              Terms of Service
            </a>
            <a className="text-xs hover:underline underline-offset-4 text-gray-400" href="#">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}