import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Calendar, ExternalLink, ShieldCheck, Sparkles, Image, CheckCircle, X } from 'lucide-react';
import { CERTIFICATES } from '../data';

export default function CertificateSection() {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  return (
    <section id="certificates" className="relative py-24 px-4 overflow-hidden z-10 border-t border-slate-900/40 bg-slate-950/20">
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-semibold">Verification Registry</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Credentials</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Certificate list layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl overflow-hidden border-slate-800/80 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/5 group text-left relative"
            >
              {/* Image box */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900 border-b border-slate-900">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[80%] group-hover:brightness-100 filter contrast-[95%]"
                />
                
                {/* Visual verified seal */}
                <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Seal
                </div>

                {/* Instant preview overlay button */}
                <button
                  onClick={() => setActivePreview(cert.imageUrl)}
                  className="absolute inset-0 bg-slate-950/75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs text-white gap-2 cursor-pointer"
                >
                  <Image className="w-4 h-4 text-cyan-400" />
                  Inspect Credential
                </button>
              </div>

              {/* Info section */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    Issued {cert.issueDate}
                  </span>
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 font-medium">Issuer: {cert.issuer}</p>
                </div>

                {/* Skills aligned with certificate */}
                <div className="space-y-4 pt-3 border-t border-slate-900/60">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[9px] font-mono text-slate-400 font-medium"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-all cursor-pointer"
                    >
                      Verify Registry
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <div className="flex items-center gap-1 font-mono text-[10px] text-slate-500">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Authentic PDF</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Credential Lightbox Overlay */}
        <AnimatePresence>
          {activePreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50"
              onClick={() => setActivePreview(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-2" 
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActivePreview(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 border border-slate-700/80 hover:border-red-500 hover:text-red-400 w-8 h-8 rounded-full flex items-center justify-center text-white font-mono cursor-pointer z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <img
                  src={activePreview}
                  alt="Certificate full inspect"
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                />
                <div className="p-4 flex justify-between items-center bg-slate-950/80 rounded-b-xl border-t border-slate-900 text-left font-mono text-xs text-slate-400">
                  <span>Raiyan Certificate Registry Database Portal</span>
                  <span>Click outside or press ✕ to close</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

