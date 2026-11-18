import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Layers, 
  Sparkles, 
  Wrench, 
  ShoppingCart, 
  Utensils, 
  Laptop, 
  Database, 
  Zap, 
  Code, 
  Smartphone, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  ShieldCheck, 
  Terminal, 
  Server, 
  HardDrive, 
  Share2, 
  ArrowUpRight, 
  HelpCircle, 
  Check, 
  Clock, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  Tag, 
  AlertCircle 
} from 'lucide-react';
import { SERVICES, PRICING_CATEGORIES } from '../data';
import { PricingPlan } from '../types';
import CheckoutModal from './CheckoutModal';

const getServiceIcon = (iconName: string) => {
  const iconProps = { className: "w-6 h-6 text-cyan-400" };
  switch (iconName) {
    case 'Globe': return <Globe {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Wrench': return <Wrench {...iconProps} />;
    case 'ShoppingCart': return <ShoppingCart {...iconProps} />;
    case 'Utensils': return <Utensils {...iconProps} />;
    case 'Laptop': return <Laptop {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'Zap': return <Zap {...iconProps} />;
    case 'Code': return <Code {...iconProps} />;
    case 'Smartphone': return <Smartphone {...iconProps} />;
    case 'BookOpen': return <BookOpen {...iconProps} />;
    case 'MessageSquare': return <MessageSquare {...iconProps} />;
    case 'FileText': return <FileText {...iconProps} />;
    case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
    case 'Terminal': return <Terminal {...iconProps} />;
    case 'Server': return <Server {...iconProps} />;
    case 'HardDrive': return <HardDrive {...iconProps} />;
    case 'Share2': return <Share2 {...iconProps} />;
    default: return <Globe {...iconProps} />;
  }
};

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'pricing'>('catalog');
  const [showAllServices, setShowAllServices] = useState(false);
  const [selectedPricingId, setSelectedPricingId] = useState('landing-page-packages');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<PricingPlan | null>(null);

  const visibleServices = showAllServices ? SERVICES : SERVICES.slice(0, 8);
  const currentPricingCategory = PRICING_CATEGORIES.find(cat => cat.id === selectedPricingId) || PRICING_CATEGORIES[0];

  return (
    <section id="services" className="relative py-24 px-4 overflow-hidden z-10 border-t border-slate-900/40 bg-slate-950/20">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold">Interactive Capabilities Hub</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Services & Pricing</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-sans max-w-xl mx-auto">
            Explore specialized service categories or select a ready-to-deploy, high-performance web development package tailored to your budget.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Master Navigation Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('catalog')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold font-display tracking-wide transition-all cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white shadow-inner shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              📋 Services Catalog ({SERVICES.length} Categories)
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('pricing')}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold font-display tracking-wide transition-all cursor-pointer ${
                activeTab === 'pricing'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white shadow-inner shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              ⚡ Ready Pricing Packages
            </motion.button>
          </div>
        </div>

        {/* TAB CONTENT: SERVICES DIRECTORY CATALOG */}
        {activeTab === 'catalog' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleServices.map((srv, index) => (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="glass-card p-6 rounded-2xl border-slate-800/80 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 group text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

                  <div className="space-y-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getServiceIcon(srv.icon)}
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">Category {String(index + 1).padStart(2, '0')}</span>
                      <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {srv.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-900/60 space-y-2">
                    <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase block">Deliverables include</span>
                    <ul className="space-y-1">
                      {srv.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-1.5 text-[11px] text-slate-300 font-sans">
                          <span className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Expand / Collapse Button */}
            <div className="flex justify-center pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllServices(!showAllServices)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 hover:text-white transition-all cursor-pointer shadow-md"
              >
                {showAllServices ? (
                  <>
                    Collapse Catalog <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Explore All {SERVICES.length} Categories <ChevronDown className="w-4 h-4 animate-bounce" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        )}

        {/* TAB CONTENT: READY PRICING PACKAGES */}
        {activeTab === 'pricing' && (
          <div className="space-y-8">
            
            {/* Category selection selector */}
            <div className="flex flex-wrap justify-center gap-3">
              {PRICING_CATEGORIES.map((cat) => {
                const isActive = cat.id === selectedPricingId;
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPricingId(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 border ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border-cyan-500/40 text-cyan-300 font-bold shadow-lg shadow-cyan-500/5'
                        : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>{cat.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 font-bold">
                      {cat.priceRange}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Selected pricing header */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 max-w-4xl mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <h3 className="text-lg md:text-xl font-bold font-display text-white flex items-center gap-2 justify-center md:justify-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">Featured Category</span>
                  {currentPricingCategory.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  {currentPricingCategory.description}
                </p>
              </div>
              <div className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-850 text-center shrink-0">
                <p className="text-[9px] uppercase font-mono tracking-wider text-slate-500">Price Range</p>
                <p className="text-sm font-bold font-mono text-emerald-400">{currentPricingCategory.priceRange}</p>
              </div>
            </div>

            {/* 4-Plan Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {currentPricingCategory.plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`glass-card p-6 rounded-3xl border-slate-800/80 flex flex-col justify-between transition-all duration-300 relative overflow-hidden text-left ${
                    plan.isPopular 
                      ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10 bg-slate-900/60 ring-1 ring-cyan-500/20' 
                      : 'hover:border-slate-700 hover:shadow-xl'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 text-[9px] font-bold font-mono uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow">
                        ⭐ Best Value
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                        Plan 0{index + 1}
                      </p>
                      <h4 className="text-lg font-bold font-display text-white">
                        {plan.name}
                      </h4>
                      <div className="flex items-baseline gap-1 pt-1">
                        <span className="text-3xl md:text-4xl font-extrabold font-mono text-white tracking-tight">
                          {plan.price}
                        </span>
                        <span className="text-sm font-bold text-slate-400 font-mono">
                          {plan.priceLabel || 'Tk'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono ml-1">/ One-time</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1 min-h-[48px]">
                        {plan.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 py-2.5 border-y border-slate-900/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        {plan.delivery}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-800" />
                      <span className="flex items-center gap-1">
                        <RefreshCw className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        {plan.revisions}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        Included Deliverables
                      </p>
                      <ul className="space-y-2">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPlanForCheckout(plan)}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold font-mono tracking-wider uppercase cursor-pointer transition-all duration-300 text-center ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 hover:from-cyan-400 hover:to-teal-400 shadow-lg shadow-cyan-500/20'
                          : 'bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/30 text-cyan-300 hover:text-white'
                      }`}
                    >
                      Buy {plan.name}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto p-4 rounded-xl bg-slate-900/40 border border-slate-900 flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-300">Looking for custom integration beyond these models?</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  These packages represent curated blueprints based on standard business constraints. For customized feature sets (such as AI chatbots, extensive database designs, or specific integrations), please state your parameters in the contact form or send a message directly.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Dynamic CTA Footer card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 glass-card rounded-2xl border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-left"
        >
          <div className="space-y-1.5">
            <h4 className="text-base font-bold font-display text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Need a completely custom web solution or C-program algorithm pipeline?
            </h4>
            <p className="text-xs text-slate-400">
              I specialize in rapid full-stack prototyping, Firebase real-time sync systems, and secure API integration.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-all shrink-0"
          >
            Request custom build
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

      </div>

      {selectedPlanForCheckout && (
        <CheckoutModal
          isOpen={!!selectedPlanForCheckout}
          onClose={() => setSelectedPlanForCheckout(null)}
          plan={selectedPlanForCheckout}
          categoryTitle={currentPricingCategory.title}
        />
      )}
    </section>
  );
}


