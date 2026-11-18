import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Calendar, MapPin, Award, BookOpen, Code, Sparkles, Server, Cpu, Database, Layout, Flame, Terminal, Activity, Github, Wind, FileCode } from 'lucide-react';
import { TIMELINE, SKILLS } from '../data';

const getSkillIcon = (iconName: string) => {
  const iconProps = { className: "w-5 h-5 text-cyan-400" };
  switch (iconName) {
    case 'Atom': return <Code {...iconProps} />;
    case 'FileCode': return <FileCode {...iconProps} />;
    case 'Wind': return <Wind {...iconProps} />;
    case 'Layout': return <Layout {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'Flame': return <Flame {...iconProps} />;
    case 'Server': return <Server {...iconProps} />;
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'Terminal': return <Terminal {...iconProps} />;
    case 'Activity': return <Activity {...iconProps} />;
    case 'Github': return <Github {...iconProps} />;
    default: return <Code {...iconProps} />;
  }
};

export default function AboutSection() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Frontend' | 'Backend' | 'AI & Tools'>('All');

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS
    : SKILLS.filter(skill => {
        if (selectedCategory === 'AI & Tools') {
          return skill.category === 'AI & Tools' || skill.category === 'Database/Cloud' || skill.category === 'Other';
        }
        return skill.category === selectedCategory;
      });

  return (
    <section id="about" className="relative py-24 px-4 overflow-hidden z-10 border-t border-slate-900/60 bg-slate-950/40">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
      
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">Aesthetic Profile</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            About My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Journey</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1 */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bio Glass Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 md:p-8 rounded-2xl border-slate-800/80"
            >
              <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                My Programming Story
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4 text-left">
                I am <strong className="text-white">Jihadul Islam Raiyan</strong>, a dedicated programmer and full-stack web developer based in Dhaka, Bangladesh. My development journey is fueled by a profound passion for solving complex architectural problems and crafting pixel-perfect, highly reactive user interfaces.
              </p>
              <p className="text-slate-300 leading-relaxed text-left">
                I deep-dive daily into modular software patterns, Firebase real-time sync systems, and algorithmic C optimizations. I am motivated to create purposeful projects like <span className="text-cyan-400 font-medium">Raiyan Clothing Elite</span>, <span className="text-purple-400 font-medium">SHM Gadget Store</span>, and spiritual tools, translating logical precision into beautiful web software.
              </p>

              {/* Bio Stats Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 mt-6 border-t border-slate-800/60 text-left font-mono text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Location: Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Academic Level: Class 10 Student</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Core: Full-Stack & Algorithms</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Slogan: Be a good human first</span>
                </div>
              </div>
            </motion.div>

            {/* Skills Category Grid */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl border-slate-800/80 space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-xl font-bold font-display text-white flex items-center gap-2 text-left">
                  <Code className="w-5 h-5 text-purple-400" />
                  Skills & Tech Matrix
                </h3>
                
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-1 bg-slate-900/60 p-1 rounded-lg border border-slate-800">
                  {(['All', 'Frontend', 'Backend', 'AI & Tools'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50 hover:border-cyan-500/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform duration-300">
                          {getSkillIcon(skill.icon)}
                        </div>
                        <span className="font-semibold text-slate-200 text-sm">{skill.name}</span>
                      </div>
                      <span className="font-mono text-xs text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 glow-cyan"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Column 2: Timeline */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-6 md:p-8 rounded-2xl border-slate-800/80 h-full">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-8 flex items-center gap-2 text-left">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Career Timeline
              </h3>

              <div className="relative border-l-2 border-slate-800 ml-3 md:ml-4 space-y-10 text-left">
                {TIMELINE.map((evt, idx) => (
                  <motion.div 
                    key={evt.id} 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative pl-6 md:pl-8 group"
                  >
                    {/* Bullet marker node */}
                    <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full border-2 border-slate-800 bg-slate-950 group-hover:border-cyan-400 transition-colors flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-cyan-400 transition-all duration-300" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-slate-900 text-cyan-400 border border-slate-800/80 uppercase">
                        {evt.year}
                      </span>
                      <h4 className="text-base md:text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                        {evt.role}
                      </h4>
                      <p className="text-xs font-mono text-slate-400 font-medium">{evt.company}</p>
                      <p className="text-sm text-slate-300 leading-relaxed font-sans pt-1">
                        {evt.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

