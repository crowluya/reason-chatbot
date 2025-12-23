"use client";

import { ArrowRight, Brain, Image as ImageIcon, Sparkles } from "lucide-react";
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Powered by OpenRouter & kie.ai</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Advanced AI Reasoning
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              At Your Fingertips
            </span>
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Experience cutting-edge AI chat with advanced reasoning capabilities 
            and image generation. Built with the latest models from OpenRouter.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/api/auth/guest"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-8 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
            Powerful Features
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <Brain className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Advanced Reasoning</h3>
              <p className="text-muted-foreground">
                Powered by OpenAI o1-mini for complex problem-solving with 
                chain-of-thought reasoning capabilities.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                <Sparkles className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Multimodal Chat</h3>
              <p className="text-muted-foreground">
                Chat with Claude 3.5 Sonnet - advanced AI with vision and 
                text capabilities for rich conversations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <ImageIcon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Image Generation</h3>
              <p className="text-muted-foreground">
                Create stunning images with kie.ai nano-banana model - 
                bring your ideas to life with AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of users leveraging advanced AI for their projects.
          </p>
          <Link
            href="/api/auth/guest"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Chatting Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>Built with Next.js, AI SDK, OpenRouter, and kie.ai</p>
      </footer>
    </div>
  );
}
