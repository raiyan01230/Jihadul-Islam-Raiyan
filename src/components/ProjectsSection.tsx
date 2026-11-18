import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Star, GitFork, Users, Eye, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data';

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<'All' | 'web' | 'islamic' | 'ai'>('All');

  const filteredProjects = activeTab === 'All'
    ? PROJECTS
    : PROJECTS.filter(proj => proj.category === activeTab);

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden z-10 border-t border-slate-900/60 bg-slate-950/40">
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">Software Directory</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Projects & Apps</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto rounded-full" />
        </motion.div>

        {/* Categories Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl gap-1 font-mono text-xs shadow-xl">
            {(['All', 'web', 'islamic', 'ai'] as const).map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/40 glow-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {tab === 'All' && `All Work (${PROJECTS.length})`}
                {tab === 'web' && 'E-Commerce & Web'}
                {tab === 'islamic' && 'Islamic Utilities'}
                {tab === 'ai' && 'AI Applications'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                key={proj.id}
                className="glass-card rounded-2xl overflow-hidden border-slate-800/80 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 group text-left h-full"
              >
                {/* Project Card Image & Cover */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[85%] group-hover:brightness-100"
                  />
                  
                  {/* Category Tags */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase font-bold tracking-wider border shadow-md backdrop-blur-md ${
                      proj.category === 'islamic'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : proj.category === 'web'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    }`}>
                      {proj.category === 'islamic' ? '🕋 Islamic Utility' : proj.category === 'web' ? '🛍️ E-Commerce & Web' : '🤖 AI Assisted'}
                    </span>
                  </div>

                  {/* Stars / Fork Badges if stats exist */}
                  {proj.stats && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-slate-950/80 border border-slate-800/80 p-1.5 rounded-lg backdrop-blur-sm text-[10px] font-mono text-slate-300">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {proj.stats.stars}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3 text-cyan-400" />
                        {proj.stats.forks}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Technology Tags Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions Bar */}
                    <div className="pt-3 border-t border-slate-900 flex justify-between items-center">
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 hover:text-cyan-200 group-hover:translate-x-0.5 transition-transform"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Launch Live App
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest group-hover:text-cyan-400/80 transition-colors">
                        Verified Build
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

