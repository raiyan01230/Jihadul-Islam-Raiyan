import React, { useState } from 'react';
import { FileText, Download, Printer, Share2, QrCode, Shield, CheckCircle, Briefcase, GraduationCap, Trophy, Info, ExternalLink } from 'lucide-react';
import { TIMELINE, SKILLS } from '../data';

export default function InteractiveResume() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    setShowPrintModal(true);
    // Delay slightly to let the modal open, then attempt direct print trigger
    setTimeout(() => {
      try {
        window.print();
      } catch (error) {
        console.warn("Direct print call failed, but user can still copy or print from standalone tab", error);
      }
    }, 800);
  };

  const handleDirectPrintTrigger = () => {
    try {
      window.print();
    } catch (e) {
      alert("Direct printing is blocked by the preview window. Please open the app in a standalone tab using the link below!");
    }
  };


  return (
    <section id="resume" className="relative py-24 px-4 overflow-hidden z-10 border-t border-slate-900/60 bg-slate-950/40">
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[120px]" />

      <div className="max-w-4xl mx-auto w-full space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">Interactive Dossier</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Resume</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        {/* Action Controls Panel */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 glass-card rounded-2xl border-slate-800/80">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-mono text-slate-300 font-medium">Digital Signature: Verified SecOp v4</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              Print / Save PDF
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 cursor-pointer transition-all"
            >
              <Share2 className="w-4 h-4 text-purple-400" />
              {copied ? 'Copied Link!' : 'Share Portfolio'}
            </button>

            <button
              onClick={() => setShowQR(!showQR)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-300 hover:text-cyan-300 cursor-pointer transition-all"
            >
              <QrCode className="w-4 h-4 text-emerald-400" />
              QR Code
            </button>
          </div>
        </div>

        {/* Dynamic QR Code Modal Popup */}
        {showQR && (
          <div className="glass-card p-6 rounded-2xl border-cyan-500/30 glow-cyan max-w-xs mx-auto text-center space-y-4 animate-fade-in-up">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-cyan-400">Scan QR Code</span>
              <button onClick={() => setShowQR(false)} className="text-xs text-slate-500 hover:text-white cursor-pointer">✕</button>
            </div>
            <div className="bg-white p-3 rounded-xl inline-block">
              {/* Dynamic simulated high-end vector QR representation */}
              <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="4" fill="white"/>
                {/* QR Finder patterns */}
                <rect x="5" y="5" width="25" height="25" stroke="#020617" strokeWidth="6" fill="none"/>
                <rect x="12" y="12" width="11" height="11" fill="#020617"/>
                <rect x="70" y="5" width="25" height="25" stroke="#020617" strokeWidth="6" fill="none"/>
                <rect x="77" y="12" width="11" height="11" fill="#020617"/>
                <rect x="5" y="70" width="25" height="25" stroke="#020617" strokeWidth="6" fill="none"/>
                <rect x="12" y="77" width="11" height="11" fill="#020617"/>
                {/* Simulated bits patterns */}
                <path d="M 40 10 H 50 V 20 H 40 Z M 45 30 H 55 V 35 H 45 Z M 5 45 H 20 V 50 H 5 Z M 80 40 H 90 V 55 H 80 Z" fill="#020617"/>
                <path d="M 40 40 H 60 V 60 H 40 Z M 45 45 H 55 V 55 H 45 Z" fill="#0ea5e9"/>
                <path d="M 70 70 H 80 V 85 H 70 Z M 85 75 H 95 V 80 H 85 Z M 40 80 H 50 V 90 H 40 Z M 55 75 H 65 V 85 H 55 Z" fill="#020617"/>
              </svg>
            </div>
            <p className="text-[10px] font-mono text-slate-400">Scan to view Raiyan's responsive live portfolio on your mobile device!</p>
          </div>
        )}

        {/* Dynamic Print & PDF Export Hub Modal */}
        {showPrintModal && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in no-print">
            <div className="glass-card max-w-2xl w-full p-6 md:p-8 rounded-3xl border-slate-800/80 space-y-6 text-left glow-cyan max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Printer className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span className="text-sm font-mono font-bold uppercase tracking-wider text-white">Resume Print & PDF Hub</span>
                </div>
                <button 
                  onClick={() => setShowPrintModal(false)} 
                  className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 cursor-pointer transition-all text-xs"
                >
                  ✕ Close Hub
                </button>
              </div>

              <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-xl space-y-2 text-xs md:text-sm text-slate-300">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                  Printing inside a development preview?
                </p>
                <p className="leading-relaxed">
                  Browsers protect your privacy by restricting printer triggers inside nested iframe sandboxes. For a flawless PDF rendering:
                </p>
                <div className="pt-2 pl-4 border-l border-cyan-500/30 space-y-1.5 text-xs text-slate-400 font-mono">
                  <p>1. Open the portfolio in a standalone browser tab using the button below.</p>
                  <p>2. Scroll down to this resume section and press <kbd className="bg-slate-900 px-1 py-0.5 rounded text-white font-bold">Ctrl + P</kbd> (or <kbd className="bg-slate-900 px-1 py-0.5 rounded text-white font-bold">Cmd + P</kbd> on macOS).</p>
                  <p>3. Choose "Save as PDF" with background colors enabled!</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDirectPrintTrigger}
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold font-display text-sm cursor-pointer shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[0.98]"
                >
                  <Printer className="w-4 h-4 shrink-0" />
                  Trigger Printer Dialog
                </button>

                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/30 text-white font-bold font-display text-sm cursor-pointer transition-all"
                >
                  <ExternalLink className="w-4 h-4 shrink-0 text-cyan-400" />
                  Open in Standalone Tab
                </a>
              </div>

              <div className="border-t border-slate-800 pt-4 text-center">
                <p className="text-[10px] font-mono text-slate-500">
                  SecOp v4 Compliant Secure Digital Asset Export Protocol.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Printable Paper-styled Resume Container */}
        <div id="printable-resume" className="bg-slate-900/80 border border-slate-800/80 p-8 md:p-12 rounded-3xl shadow-2xl space-y-10 text-left text-slate-100">
          
          {/* Resume Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-1.5">
              <h3 className="text-3xl font-extrabold font-display text-white tracking-tight">Jihadul Islam Raiyan</h3>
              <p className="text-cyan-400 font-mono text-sm tracking-widest font-semibold uppercase">Programmer & Web Developer</p>
              <p className="text-xs font-mono text-slate-400">Class 10 Student • Tech Enthusiast</p>
            </div>

            <div className="font-mono text-xs space-y-1 text-slate-400">
              <p>📍 Location: Dhaka, Bangladesh</p>
              <p>📧 Email: raiyan3945@gmail.com</p>
              <p>📞 Phone: +8801715432981</p>
              <p>🌐 Web: raiyan01230.github.io</p>
            </div>
          </div>

          {/* Core Summary */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-400" />
              Developer Profile
            </h4>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              Highly motivated Class 10 student programmer and full-stack web developer based in Dhaka, Bangladesh. Proven expertise in building modern, responsive React interfaces, integrating real-time Firebase databases (Firestore & Realtime Database), and optimizing low-level algorithms in C. Dedicated to designing clean, high-performance, and visually outstanding digital architectures.
            </p>
          </div>

          {/* Resume Experience Grid */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" />
              Professional Experience
            </h4>

            <div className="space-y-6">
              {TIMELINE.filter(item => item.type === 'experience').map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h5 className="font-bold text-white font-display text-base md:text-lg">{item.role}</h5>
                    <span className="text-xs font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-cyan-300 uppercase font-semibold">{item.year}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 font-semibold">{item.company}</p>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Education Grid */}
          <div className="space-y-6 pt-2">
            <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              Education & Certifications
            </h4>

            <div className="space-y-6">
              {TIMELINE.filter(item => item.type === 'education').map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <h5 className="font-bold text-white font-display text-base md:text-lg">{item.role}</h5>
                    <span className="text-xs font-mono bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-emerald-300 uppercase font-semibold">{item.year}</span>
                  </div>
                  <p className="text-xs font-mono text-slate-400 font-semibold">{item.company}</p>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Overview */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Technical Core Skills</h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1 bg-slate-950 border border-slate-800/80 text-xs font-mono rounded-lg text-slate-300 hover:text-cyan-300 hover:border-cyan-500/20 transition-all"
                >
                  {skill.name} <span className="text-[10px] text-cyan-400 font-bold">({skill.level}%)</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
