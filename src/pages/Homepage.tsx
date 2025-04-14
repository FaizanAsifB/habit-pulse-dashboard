
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Check, 
  Clock, 
  BarChart, 
  Target, 
  Brain, 
  ChevronRight, 
  Star,
  ArrowRight,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Homepage = () => {
  const [isAnnualPricing, setIsAnnualPricing] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-32 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Build Better Habits.<br />Reach Your Goals.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                HabitPulse helps you create sustainable habits, track your progress, and achieve your goals with smart AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link to="/signup">
                  <Button size="lg" className="font-semibold">
                    Try it Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" size="lg">
                    See Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <img 
                src="/placeholder.svg" 
                alt="HabitPulse Dashboard Preview" 
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-white dark:bg-gray-950">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">How HabitPulse Works</h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Start building better habits in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Set Your Goals</h3>
                <p className="text-muted-foreground">
                  Define what matters to you. Create measurable goals that align with your vision.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Smart Schedules</h3>
                <p className="text-muted-foreground">
                  Our AI creates personalized routines based on your energy levels and availability.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Stay on Track</h3>
                <p className="text-muted-foreground">
                  Monitor progress, get insights, and adjust as needed to maintain momentum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Everything you need to transform your habits and achieve your goals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Scheduling</h3>
                <p className="text-muted-foreground">
                  Smart algorithms help you plan your days based on your peak productivity times.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <Calendar className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Habit Tracking</h3>
                <p className="text-muted-foreground">
                  Visualize your progress and build streaks to maintain motivation.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <Clock className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Energy-Based Planning</h3>
                <p className="text-muted-foreground">
                  Plan tasks according to your natural energy levels throughout the day.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <Target className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Goal Setting</h3>
                <p className="text-muted-foreground">
                  Create measurable goals with milestones and track your progress toward them.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <BarChart className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights about your habits and productivity patterns.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <Check className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-muted-foreground">
                  Organize your daily tasks and sync with your existing calendar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="py-20 px-4 bg-white dark:bg-gray-950">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">See HabitPulse in Action</h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Explore what makes HabitPulse the ultimate habit tracking solution
              </p>
            </div>
            
            <Carousel className="w-full max-w-3xl mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/placeholder.svg" 
                        alt="Dashboard Screenshot" 
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <div className="mt-4 text-center">
                        <h3 className="font-semibold">Intuitive Dashboard</h3>
                        <p className="text-sm text-muted-foreground">Get an overview of your habits and progress</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/placeholder.svg" 
                        alt="Habit Tracking Screenshot" 
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <div className="mt-4 text-center">
                        <h3 className="font-semibold">Habit Tracking</h3>
                        <p className="text-sm text-muted-foreground">Build streaks and visualize your consistency</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src="/placeholder.svg" 
                        alt="Goal Setting Screenshot" 
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <div className="mt-4 text-center">
                        <h3 className="font-semibold">Goal Setting</h3>
                        <p className="text-sm text-muted-foreground">Define and track your long-term objectives</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static translate-y-0" />
                <CarouselNext className="relative static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Users Say</h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Join thousands who have transformed their habits with HabitPulse
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                </div>
                <p className="text-muted-foreground mb-4">
                  "HabitPulse completely changed how I approach my daily routine. The AI suggestions are spot-on!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                  <div>
                    <p className="font-semibold">Sarah J.</p>
                    <p className="text-sm text-muted-foreground">Freelance Designer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                </div>
                <p className="text-muted-foreground mb-4">
                  "I've tried many habit trackers, but HabitPulse is in a league of its own. The energy-based planning is genius."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                  <div>
                    <p className="font-semibold">Michael T.</p>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                </div>
                <p className="text-muted-foreground mb-4">
                  "The insights and analytics have helped me understand my productivity patterns. Finally sticking to my goals!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                  <div>
                    <p className="font-semibold">Priya K.</p>
                    <p className="text-sm text-muted-foreground">Marketing Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-white dark:bg-gray-950">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Choose the plan that works best for you
              </p>
              
              <div className="flex items-center justify-center mt-8">
                <span className={`mr-2 ${!isAnnualPricing ? 'font-semibold' : ''}`}>Monthly</span>
                <button
                  onClick={() => setIsAnnualPricing(!isAnnualPricing)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isAnnualPricing ? 'bg-primary' : 'bg-input'
                  }`}
                >
                  <span
                    className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                      isAnnualPricing ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className={`ml-2 ${isAnnualPricing ? 'font-semibold' : ''}`}>
                  Annual <span className="text-xs text-primary">(Save 20%)</span>
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold mb-2">Free</h3>
                  <p className="text-muted-foreground mb-4">Perfect for getting started</p>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Basic habit tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Up to 3 goals</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Limited analytics</span>
                    </li>
                  </ul>
                  <Link to="/signup">
                    <Button variant="outline" className="w-full mt-6">Get Started</Button>
                  </Link>
                </div>
              </div>
              
              {/* Pro Plan */}
              <div className="bg-white dark:bg-gray-800 border border-primary rounded-lg overflow-hidden shadow-md relative">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold mb-2">Pro</h3>
                  <p className="text-muted-foreground mb-4">For committed habit builders</p>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">
                      ${isAnnualPricing ? '8' : '10'}
                    </span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                  {isAnnualPricing && (
                    <p className="text-xs text-muted-foreground mt-1">Billed annually (${8 * 12}/year)</p>
                  )}
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Everything in Free</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Unlimited habits & goals</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>AI-powered scheduling</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Calendar integrations</span>
                    </li>
                  </ul>
                  <Link to="/signup">
                    <Button className="w-full mt-6">Get Started</Button>
                  </Link>
                </div>
              </div>
              
              {/* Team Plan */}
              <div className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold mb-2">Team</h3>
                  <p className="text-muted-foreground mb-4">For groups & organizations</p>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">
                      ${isAnnualPricing ? '16' : '20'}
                    </span>
                    <span className="text-muted-foreground ml-2">/user/month</span>
                  </div>
                  {isAnnualPricing && (
                    <p className="text-xs text-muted-foreground mt-1">Billed annually (${16 * 12}/user/year)</p>
                  )}
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Team progress tracking</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Collaborative goals</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Admin controls</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Link to="/contact">
                    <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Find answers to common questions about HabitPulse
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What makes HabitPulse different from other habit trackers?</AccordionTrigger>
                <AccordionContent>
                  HabitPulse stands out with its AI-powered scheduling that adapts to your natural energy levels and preferences. 
                  Unlike traditional trackers, we focus on sustainable habit building by aligning tasks with your optimal times 
                  for productivity, making it easier to maintain consistency.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I sync HabitPulse with my calendar?</AccordionTrigger>
                <AccordionContent>
                  Yes! HabitPulse integrates with Google Calendar, Apple Calendar, and Outlook. This allows you to 
                  see all your appointments alongside your habits and tasks, creating a unified view of your day.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data private and secure?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. We take data privacy seriously. Your information is encrypted and securely stored. 
                  We never sell your data to third parties, and you can export or delete your data at any time 
                  from your account settings.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I use HabitPulse on multiple devices?</AccordionTrigger>
                <AccordionContent>
                  Yes, HabitPulse is available on web, iOS, and Android. Your data syncs automatically across all your 
                  devices, so you can track your habits wherever you are.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                <AccordionContent>
                  You can cancel your subscription at any time from your account settings. After cancellation, 
                  you'll continue to have access to your paid features until the end of your billing period.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your Habits?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-lg mx-auto">
              Join thousands of users who have already improved their productivity and achieved their goals with HabitPulse.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="font-semibold">
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-sm opacity-80">No credit card required</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="text-xl font-bold text-primary flex items-center mb-4">
                <Calendar className="mr-2 h-6 w-6" />
                HabitPulse
              </Link>
              <p className="text-sm text-muted-foreground">
                Building better habits, one day at a time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="/integrations" className="text-sm text-muted-foreground hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="/changelog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} HabitPulse. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
