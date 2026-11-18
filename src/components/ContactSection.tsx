import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle, Flame, ShieldAlert } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaNum1] = useState(Math.floor(Math.random() * 9) + 1);
  const [captchaNum2] = useState(Math.floor(Math.random() * 9) + 1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [autoReply, setAutoReply] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Field check
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please complete all form fields.');
      return;
    }

    // Solve Captcha
    const expected = captchaNum1 + captchaNum2;
    if (parseInt(captchaAnswer) !== expected) {
      setError('Anti-Spam Verification: Captcha calculation is incorrect.');
      return;
    }

    setSubmitting(true);
    
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setSubmitting(false);
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          if (data.autoReply) {
            setAutoReply(data.autoReply);
          } else {
            setAutoReply({
              to: formData.email,
              subject: `Re: ${formData.subject} - Raiyan Portfolio Auto-Reply`,
              body: `As-salamu alaykum ${formData.name},\n\nThank you for reaching out to me via my website. Your message has been saved.\n\nBest Regards,\nRaiyan | Full-Stack Software Engineer`
            });
          }
          setFormData({ name: '', email: '', subject: '', message: '' });
          setCaptchaAnswer('');
        }
      })
      .catch(err => {
        console.error(err);
        setSubmitting(false);
        setError('Network response failed. Please try again or call +8801715432981 directly.');
      });
  };

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden z-10 border-t border-slate-900/40 bg-slate-950/20">
      <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Interactive Bridge</span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Connection</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Contact Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-6 md:p-8 rounded-2xl border-slate-800/80 text-left space-y-6">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white">Direct Information</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Have an active project proposition or want to hire a dedicated full-stack developer? Feel free to call or shoot over an email. Let's make it real.
              </p>

              <div className="space-y-4 pt-4 font-mono text-xs">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-cyan-500/30 transition-all">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-slate-400 font-semibold uppercase">Email Inbox</p>
                    <a href="mailto:raiyan3945@gmail.com" className="text-slate-100 hover:text-cyan-400 transition-colors">raiyan3945@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-purple-500/30 transition-all">
                  <Phone className="w-5 h-5 text-purple-400 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-slate-400 font-semibold uppercase">Direct Hot-line</p>
                    <a href="tel:+8801715432981" className="text-slate-100 hover:text-purple-400 transition-colors">+8801715432981</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-emerald-500/30 transition-all">
                  <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-slate-400 font-semibold uppercase">Workspace HQ</p>
                    <p className="text-slate-200">Dhaka, Bangladesh – 1362</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Auto-Reply Viewer (Spiritual/Engaging Touch) */}
            {autoReply && (
              <div className="glass-card p-6 rounded-2xl border-emerald-500/30 bg-emerald-950/5 text-left space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
                    Auto-Reply Dispatched
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">SMTP Server Status: OK</span>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 font-mono text-xs space-y-2 text-slate-300 select-all overflow-x-auto max-h-64 overflow-y-auto">
                  <p><span className="text-slate-500 font-bold">To:</span> {autoReply.to}</p>
                  <p><span className="text-slate-500 font-bold">Subject:</span> {autoReply.subject}</p>
                  <div className="h-px bg-slate-900 my-2" />
                  <pre className="whitespace-pre-wrap leading-relaxed">{autoReply.body}</pre>
                </div>
                <p className="text-[10px] font-mono text-slate-500">Check your email inbox! Our automated SMTP mail relays have dispatched this formal receipt to you.</p>
              </div>
            )}

          </div>

          {/* Column 2: Form (7 Cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-2xl border-slate-800/80 text-left space-y-5">
              <h3 className="text-xl md:text-2xl font-bold font-display text-white">Direct Message Portal</h3>

              {/* Status Alert Panels */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-emerald-400 text-xs font-mono">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message Lodged Successfully!</p>
                    <p className="text-slate-400 mt-1">Our backend API has logged your message safely. An auto-reply confirmation is shown on the left.</p>
                  </div>
                </div>
              )}

              {/* Input Form Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors"
                    placeholder="E.g., Brother Raihan"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Your Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors"
                    placeholder="brother@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Subject Context</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors"
                  placeholder="E.g., Consulting Proposition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Brief Message Context</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full h-32 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors resize-none"
                  placeholder="Describe your project, terms, or inquiry details..."
                />
              </div>

              {/* Secure Anti-Spam Simple Captcha */}
              <div className="pt-4 border-t border-slate-900/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Anti-Spam Verification</span>
                  </div>
                  <p className="text-sm text-slate-300 font-mono">Solve the puzzle: <span className="text-cyan-400 font-bold">{captchaNum1} + {captchaNum2} = ?</span></p>
                </div>

                <input
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                  className="w-full md:w-32 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-mono text-white text-center focus:outline-none transition-colors"
                  placeholder="Sum"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-90 transition-all font-semibold font-display text-white rounded-xl shadow-lg shadow-cyan-500/10 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Lodging message into database...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Secure Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
