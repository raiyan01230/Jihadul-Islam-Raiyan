import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Github, Mail, FileText, ChevronDown, ArrowRight, Sparkles, MapPin, Phone, ShieldCheck, Flame } from 'lucide-react';
import { PROJECTS, CERTIFICATES, AVATAR_IMAGE } from '../data';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenChat: () => void;
}

export default function HeroSection({ onNavigate, onOpenChat }: HeroSectionProps) {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Programmer & Web Developer',
    'Class 10 Student Programmer',
    'Full-Stack Web Architect',
    'Firebase Specialist'
  ];

  useEffect(() => {
    const activeRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === activeRole.length) {
      typingSpeed = 2000; // Pause at full string
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    const timer = setTimeout(() => {
      setTypedText(
        isDeleting
          ? activeRole.substring(0, charIndex - 1)
          : activeRole.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden z-10">
      {/* Ambient Pulsing Aurora Radial Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.25, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -30, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
        >
          {/* Availability Status & Active Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 glow-cyan cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse" />
              Available for Freelance & Projects
            </motion.span>
            
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 glow-emerald cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-ping" />
              Location: Dhaka, Bangladesh (1362)
            </motion.span>
          </div>

          {/* Slogan & Greeting */}
          <div className="space-y-2">
            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              As-salamu alaykum / Welcome to My Portfolio
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 animate-border-glow">Jihadul Islam Raiyan</span>
            </h1>
          </div>

          {/* Typing Role Loop */}
          <div className="h-8 md:h-10 flex items-center">
            <p className="text-lg md:text-2xl font-mono text-slate-300">
              I build <span className="text-cyan-300 font-bold underline decoration-purple-500 decoration-2 underline-offset-4">{typedText}</span>
              <span className="w-1.5 h-6 ml-1 bg-cyan-400 inline-block animate-pulse align-middle" />
            </p>
          </div>

          {/* Story Hook */}
          <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
            Full-stack programmer and web developer based in Dhaka, Bangladesh. Specializing in high-performance React web applications, durable Firebase serverless architectures, responsive e-commerce platforms, and custom AI integrations.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('projects')}
              className="group relative inline-flex items-center justify-center px-6 py-3.5 overflow-hidden font-medium text-slate-950 transition duration-300 ease-out bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl hover:shadow-cyan-500/25 cursor-pointer z-10 font-display font-bold shadow-lg"
            >
              <span className="relative flex items-center gap-2">
                Explore Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 hover:border-cyan-400/50 bg-slate-900/60 hover:bg-slate-900 transition-all font-medium text-slate-200 hover:text-cyan-300 font-display cursor-pointer backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              Ask AI Assistant
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('resume')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-900/80 transition-all text-slate-300 font-medium font-display cursor-pointer"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              Interactive Resume
            </motion.button>
          </div>

          {/* Animated Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 w-full max-w-lg">
            <motion.div whileHover={{ y: -3 }}>
              <p className="text-2xl md:text-3xl font-extrabold font-display text-white">{PROJECTS.length}+</p>
              <p className="text-xs text-slate-400 font-mono">Live Web Apps</p>
            </motion.div>
            <motion.div whileHover={{ y: -3 }}>
              <p className="text-2xl md:text-3xl font-extrabold font-display text-cyan-400">{CERTIFICATES.length}</p>
              <p className="text-xs text-slate-400 font-mono">Certifications</p>
            </motion.div>
            <motion.div whileHover={{ y: -3 }}>
              <p className="text-2xl md:text-3xl font-extrabold font-display text-emerald-400">100%</p>
              <p className="text-xs text-slate-400 font-mono">Client Satisfaction</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Right Avatar Card with Floating Interactive Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <div className="relative group">
            {/* Rotating Cyber Ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-dashed border-cyan-500/30 opacity-70 pointer-events-none"
            />
            
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-dotted border-purple-500/20 opacity-50 pointer-events-none"
            />

            {/* Glowing Gradient Backdrop */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-purple-600 opacity-60 blur-xl group-hover:opacity-100 group-hover:blur-2xl transition duration-500" />
            
            {/* Picture Container */}
            <div className="relative w-72 h-72 md:w-85 md:h-85 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-950 p-2 shadow-2xl">
              <img
                src={AVATAR_IMAGE}
                alt="Raiyan"
                className="w-full h-full object-cover rounded-full filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Floating Floating Micro Badges with Framer Motion Spring */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-2 -right-2 bg-slate-900/95 border border-cyan-500/40 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 backdrop-blur-md glow-cyan"
            >
              <Flame className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono text-white font-bold">Firebase Specialist</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-4 -left-4 bg-slate-900/95 border border-emerald-500/40 px-3 py-1.5 rounded-xl shadow-xl flex items-center gap-2 backdrop-blur-md glow-emerald"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] font-mono text-white font-bold">React 18 & Full-Stack</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 hover:text-cyan-400 cursor-pointer transition-colors"
        onClick={() => onNavigate('about')}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}

