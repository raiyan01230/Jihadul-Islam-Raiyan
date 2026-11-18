import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, AlertCircle, Info, RefreshCw, Cpu, Flame, Phone, Mail, Github, Globe, ExternalLink, ShieldAlert, Clock, Layers } from 'lucide-react';
import ThreeDBackground from './components/ThreeDBackground';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import CertificateSection from './components/CertificateSection';
import InteractiveResume from './components/InteractiveResume';
import ContactSection from './components/ContactSection';
import AIChatBot from './components/AIChatBot';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [simulationMode, setSimulationMode] = useState<'normal' | '404' | '500'>('normal');
  const [chatBotOpen, setChatBotOpen] = useState(false);

  // Scroll spy effect to highlight navigation anchors
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'projects', 'certificates', 'resume', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNav(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(id);
      setMobileMenuOpen(false);
    }
  };

  // Open the AI chatbot by clicking on Hero button
  const triggerOpenChat = () => {
    // We will trigger a click event on the floating chat button
    const chatBtn = document.querySelector('button[title="Chat with Raiyan AI"]') as HTMLButtonElement;
    if (chatBtn) {
      chatBtn.click();
    } else {
      // If chatbot is already open, do nothing or force state
      setChatBotOpen(true);
    }
  };

  // Simulation handlers for custom 404/500 screens
  if (simulationMode === '404') {
    return (
      <div className="relative min-h-screen w-full bg-slate-950 flex flex-col justify-center items-center p-6 text-center z-10 font-sans">
        <ThreeDBackground />
        <div className="max-w-md p-8 glass-card border-red-500/20 glow-purple rounded-2xl space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
            <Cpu className="w-8 h-8 animate-spin" />
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold font-display text-white">404</h1>
            <p className="text-cyan-400 font-mono text-xs tracking-wider uppercase">Virtual Node Not Found</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            The resource coordinate you are seeking is either quarantined by safety proxies or does not exist inside Raiyan's portfolio database.
          </p>
          <button
            onClick={() => setSimulationMode('normal')}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-xs font-mono font-bold text-white rounded-xl shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Restore Core Operations
          </button>
        </div>
      </div>
    );
  }

  if (simulationMode === '500') {
    return (
      <div className="relative min-h-screen w-full bg-slate-950 flex flex-col justify-center items-center p-6 text-center z-10 font-sans">
        <ThreeDBackground />
        <div className="max-w-md p-8 glass-card border-red-500/20 glow-cyan rounded-2xl space-y-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
            <AlertCircle className="w-8 h-8 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold font-display text-white">500</h1>
            <p className="text-red-400 font-mono text-xs tracking-wider uppercase">Internal Cluster Error</p>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            We intercepted a simulated memory segmentation fault on core thread #0. Rest assured, our active Error Boundaries have successfully isolated this thread.
          </p>
          <button
            onClick={() => setSimulationMode('normal')}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-xs font-mono font-bold text-white rounded-xl shadow-lg cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Hot-Reboot Sandbox Environment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 selection:bg-cyan-500/30 selection:text-cyan-200 text-slate-200 overflow-x-hidden font-sans">
      
      {/* 3D dynamic mesh background particle scene */}
      <ThreeDBackground />

      {/* Advanced Custom cursor tracking element */}
      <CustomCursor />

      {/* Sleek Floating Glass Header Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white font-display font-extrabold text-sm shadow-md shadow-cyan-500/10">
              R
            </div>
            <div className="text-left font-display">
              <span className="font-extrabold text-white text-sm tracking-tight">Raiyan</span>
              <p className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Full-Stack Dev</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1.5 font-display text-xs">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'certificates', label: 'Credentials' },
              { id: 'resume', label: 'Resume' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-medium ${
                  activeNav === tab.id
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/15'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Special Sandbox Simulation Controllers (Floating) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setSimulationMode('404')}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono text-slate-400 cursor-pointer"
              title="Trigger simulated 404 screen"
            >
              Test 404
            </button>
            <button
              onClick={() => setSimulationMode('500')}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono text-slate-400 cursor-pointer"
              title="Trigger simulated 500 boundary error"
            >
              Test 500
            </button>
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950/95 border-b border-slate-900 p-4 space-y-2 animate-fade-in-up font-display text-sm text-left">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'certificates', label: 'Credentials' },
              { id: 'resume', label: 'Resume' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`w-full p-3 rounded-xl transition-all cursor-pointer font-semibold block text-left ${
                  activeNav === tab.id
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {/* Simulated Error triggers for mobile */}
            <div className="pt-4 border-t border-slate-900 flex items-center gap-3">
              <button
                onClick={() => setSimulationMode('404')}
                className="flex-1 p-2 bg-slate-900 border border-slate-800 text-xs font-mono rounded text-slate-400 text-center"
              >
                Trigger 404
              </button>
              <button
                onClick={() => setSimulationMode('500')}
                className="flex-1 p-2 bg-slate-900 border border-slate-800 text-xs font-mono rounded text-slate-400 text-center"
              >
                Trigger 500
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Sections Body */}
      <main className="relative">
        <HeroSection onNavigate={scrollToSection} onOpenChat={triggerOpenChat} />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <CertificateSection />
        <InteractiveResume />
        <ContactSection />
      </main>

      {/* Massive, Highly Polished Corporate Footer */}
      <footer className="relative pt-20 pb-12 px-4 border-t border-slate-900/80 bg-slate-950 z-10 text-slate-400">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Top Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 text-left">
            
            {/* Brand & Developer Bio (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-bold font-display text-white tracking-tight">
                  Jihadul Islam <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Raiyan</span>
                </span>
                <span className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Full-Stack Engineer</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Software engineer and student developer crafting production-grade Web Applications, e-commerce platforms, Firebase serverless backends, and responsive React interfaces in Dhaka, Bangladesh (1362).
              </p>
              
              {/* Social & Contact Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <a
                  href="https://github.com/raiyan01230"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:text-cyan-300 transition-all cursor-pointer"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                </a>
                <a
                  href="mailto:raiyan3945@gmail.com"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:text-cyan-300 transition-all cursor-pointer"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4 text-slate-300" />
                </a>
                <a
                  href="tel:+8801715432981"
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-300 transition-all cursor-pointer"
                  title="Direct Phone"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                </a>
                <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                  +8801715432981
                </span>
              </div>
            </div>

            {/* Quick Navigation Links (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">Navigation</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => scrollToSection('hero')} className="hover:text-cyan-300 transition-all font-medium text-slate-400 cursor-pointer text-left">
                    Home Base
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-cyan-300 transition-all font-medium text-slate-400 cursor-pointer text-left">
                    About Journey
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-cyan-300 transition-all font-medium text-slate-400 cursor-pointer text-left">
                    Services Matrix
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('projects')} className="hover:text-cyan-300 transition-all font-medium text-slate-400 cursor-pointer text-left">
                    All Projects
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('certificates')} className="hover:text-cyan-300 transition-all font-medium text-slate-400 cursor-pointer text-left">
                    Credentials
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-300 transition-all font-medium text-slate-400 cursor-pointer text-left">
                    Get In Touch
                  </button>
                </li>
              </ul>
            </div>

            {/* Featured E-Commerce Projects (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">Featured E-Commerce</h5>
              <div className="space-y-2">
                <a 
                  href="https://monirahman703-bot.github.io/Raiyan-clothing-Elite/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 group transition-all"
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                      Raiyan Clothing Elite <ExternalLink className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded font-bold">Fashion</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">Luxury e-commerce apparel storefront.</p>
                </a>

                <a 
                  href="https://raiyanusa20-dotcom.github.io/shm-gadget1/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/50 group transition-all"
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-purple-400 transition-colors flex items-center gap-1">
                      SHM Gadget Store <ExternalLink className="w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[9px] font-mono bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded font-bold">Gadgets</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">Tech electronics store & spec comparison.</p>
                </a>
              </div>
            </div>

            {/* Web Apps & Portfolios (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-200">Web Applications</h5>
              <div className="space-y-2">
                <a 
                  href="https://raiyan01230.github.io/Umrah-Savings/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 group transition-all"
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                      Umrah Savings Planner <ExternalLink className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold">FinTech</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">Pilgrimage budgeting tracker with offline cache.</p>
                </a>

                <a 
                  href="https://raiyan01230.github.io/loweryouregaze/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 group transition-all"
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                      Lower Your Gaze <ExternalLink className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[9px] font-mono bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded font-bold">Wellness</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-snug">Focus utility with strain exercises and notifications.</p>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Metadatas & Tech Stack badges */}
          <div className="pt-8 border-t border-slate-900/60 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-slate-500">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2.5">
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-[11px] text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                React 18 + Vite
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-[11px] text-slate-300">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Firebase Realtime & Firestore
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-[11px] text-slate-300">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Tailwind CSS 4.0
              </span>
            </div>
            
            <div className="text-center md:text-right space-y-1">
              <p>© {new Date().getFullYear()} Jihadul Islam Raiyan. All rights reserved.</p>
              <p className="text-[10px] text-slate-600">Dhaka, Bangladesh – 1362 | raiyan3945@gmail.com</p>
            </div>
          </div>
          
        </div>
      </footer>

      {/* Collapsible/Floating interactive AI Chat Companion */}
      <AIChatBot />

    </div>
  );
}
