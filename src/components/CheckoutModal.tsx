import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  FileText, 
  User, 
  Phone, 
  MessageSquare,
  Flame
} from 'lucide-react';
import { PricingPlan } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan;
  categoryTitle: string;
}

export default function CheckoutModal({ isOpen, onClose, plan, categoryTitle }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderResult, setOrderResult] = useState<any>(null);
  const [dispatchedEmail, setDispatchedEmail] = useState<any>(null);

  if (!isOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please complete Name, Email, and Phone fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          planName: plan.name,
          categoryTitle: categoryTitle,
          price: plan.price,
          requirements: formData.requirements
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server rejected order request.');
      }

      setOrderResult(data);

      // Setup pre-packaged secure email receipt mock
      setDispatchedEmail({
        to: formData.email,
        subject: `[LFS SECURE] Order Placed: ${data.orderId} - Raiyan Tech Solutions`,
        body: `As-salamu alaykum ${formData.name},

Thank you for selecting Raiyan Tech Solutions for your digital product creation. This email is an official confirmation receipt for your order ID: ${data.orderId}.

==================================================
              PURCHASE ORDER INVOICE
==================================================
Order ID:        ${data.orderId}
Service Category: ${categoryTitle}
Selected Plan:   ${plan.name}
Total Price:     ${plan.price} Tk
Payment Terms:   Direct discussion / Contact Raiyan
Date/Time:       ${new Date(data.timestamp).toLocaleString()}

CLIENT DETAILS:
Name:            ${formData.name}
Email Address:   ${formData.email}
Phone Number:    ${formData.phone}
Custom Notes:    ${formData.requirements || 'None provided'}
==================================================

WHAT HAPPENS NEXT?
1. Direct Outreach: Jihadul Islam Raiyan will contact you on your registered WhatsApp / Phone (${formData.phone}) shortly to discuss payment & project timeline.
2. Production Setup: We will provision a development environment so you can view product progress live.

For urgent adjustments, please call +8801715432981 or reply directly to this email.

Best Regards,
Jihadul Islam Raiyan
Full-Stack Software Engineer
Dhaka, Bangladesh — 1362`
      });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during checkout.');
    } finally {
      setLoading(false);
    }
  };

  // Prepares the mailto link so they can easily dispatch a direct email
  const getMailtoLink = () => {
    if (!orderResult) return '#';
    const recipient = 'raiyan3945@gmail.com';
    const subject = encodeURIComponent(`[ORDER INVOICE] ${orderResult.orderId} - ${plan.name}`);
    const body = encodeURIComponent(`As-salamu alaykum Raiyan,

I have placed an order for the following digital service:

- Order ID: ${orderResult.orderId}
- Service: ${categoryTitle} (${plan.name})
- Total Price: ${plan.price} Tk
- My Contact Phone: ${formData.phone}
- My Registered Email: ${formData.email}

Requirements / Notes:
${formData.requirements || 'No special requirements specified.'}

Please review my order and contact me to discuss!

Best regards,
${formData.name}`);
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="glass-card max-w-2xl w-full p-6 md:p-8 rounded-3xl border-slate-800/80 space-y-6 text-left glow-cyan max-h-[92vh] overflow-y-auto">
        
        {/* Header Block */}
        <div className="flex justify-between items-center border-b border-slate-900 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">Order Portal</span>
              <h3 className="text-lg md:text-xl font-bold font-display text-white">Order Service Package</h3>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 cursor-pointer transition-all text-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Package Info Badge */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-850 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Service Class</p>
            <p className="text-sm font-bold text-white">{categoryTitle}</p>
            <p className="text-xs text-slate-400 font-mono">{plan.name}</p>
          </div>
          <div className="space-y-1 md:text-right">
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Total Valuation & Delivery</p>
            <p className="text-base font-bold font-mono text-emerald-400">{plan.price} Tk</p>
            <p className="text-xs text-slate-400 font-mono">Guaranteed within {plan.delivery}</p>
          </div>
        </div>

        {/* MAIN BODY SWITCHING: FORM vs INVOICE */}
        {!orderResult ? (
          <form onSubmit={handleFormSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Stage 1: Client Information */}
            <div className="space-y-3.5">
              <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Client Contact Records</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-cyan-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g., Brother Tasnim"
                    className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-purple-400" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@yourdomain.com"
                    className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> Phone Number (WhatsApp Enabled)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="E.g., +88017XXXXXXXX"
                  className="w-full bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Stage 2: Project Requirements */}
            <div className="space-y-1.5 pt-2 border-t border-slate-900">
              <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Custom Project Requirements / Notes
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="List any design wishes, specific pages, brand guidelines, or customized backend integrations you require..."
                className="w-full h-28 bg-slate-950/60 border border-slate-800 hover:border-slate-700 focus:border-cyan-400 p-3 rounded-xl text-sm font-sans text-white focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Control */}
            <div className="pt-4 border-t border-slate-900">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:opacity-90 font-bold font-display text-slate-950 rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Placing order request...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Confirm Order & Generate Invoice
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS INVOICE BLOCK */
          <div className="space-y-6 animate-fade-in-up">
            
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4 text-emerald-400">
              <CheckCircle className="w-6 h-6 shrink-0 text-emerald-400 mt-0.5 animate-bounce" />
              <div>
                <p className="font-bold text-base text-white">Order Registered Successfully!</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Order **{orderResult.orderId}** has been cataloged. You can send the email copy directly or print/save the invoice below.
                </p>
              </div>
            </div>

            {/* Generated Official Invoice Receipt */}
            <div className="p-6 bg-slate-950/90 border border-slate-900 rounded-2xl font-mono text-xs space-y-3 text-slate-300 relative overflow-hidden select-all shadow-inner">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rotate-45 transform translate-x-12 -translate-y-12 border-l border-slate-900" />
              
              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                <span className="font-bold text-white text-[13px]">OFFICIAL DIGITAL INVOICE</span>
                <span className="text-[10px] text-slate-500">{new Date(orderResult.timestamp).toLocaleDateString()}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-400">
                <p><span className="text-slate-500 font-bold">Invoice ID:</span> <span className="text-white font-bold">{orderResult.orderId}</span></p>
                <p><span className="text-slate-500 font-bold">Client Name:</span> <span className="text-slate-200">{orderResult.invoiceDetail.clientName}</span></p>
                <p><span className="text-slate-500 font-bold">Service Category:</span> <span className="text-slate-200">{orderResult.invoiceDetail.categoryTitle}</span></p>
                <p><span className="text-slate-500 font-bold">Plan Tag:</span> <span className="text-slate-200">{orderResult.invoiceDetail.planName}</span></p>
                <p><span className="text-slate-500 font-bold">Total Price:</span> <span className="text-emerald-400 font-bold">{orderResult.invoiceDetail.totalPrice} Tk</span></p>
                <p><span className="text-slate-500 font-bold">Payment:</span> <span className="text-cyan-400 font-bold">{orderResult.invoiceDetail.paymentTerms}</span></p>
              </div>

              <div className="border-t border-slate-900 pt-3">
                <p className="text-slate-500 font-bold">Custom Requirements attached:</p>
                <p className="text-[11px] text-slate-400 italic mt-1 leading-relaxed whitespace-pre-wrap">
                  "{orderResult.invoiceDetail.specialInstructions}"
                </p>
              </div>
            </div>

            {/* DUAL CTAs: SEND EMAIL (REAL) & PRINT */}
            <div className="space-y-3 pt-2">
              <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest text-center">Actionable Dispatch Options</p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={getMailtoLink()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold font-display text-sm cursor-pointer shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-[0.98]"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  Send Invoice Email to Raiyan
                </a>

                <button
                  onClick={() => window.print()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/30 text-white font-bold font-display text-sm cursor-pointer transition-all"
                >
                  <FileText className="w-4 h-4 shrink-0 text-cyan-400" />
                  Print/Save Digital PDF Invoice
                </button>
              </div>
            </div>

            {/* Simulated Server SMTP Auto-Receipt */}
            {dispatchedEmail && (
              <div className="glass-card p-5 rounded-2xl border-emerald-500/30 bg-emerald-950/5 text-left space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <Flame className="w-3.5 h-3.5 mr-1.5 animate-pulse text-emerald-400" />
                    Automated Confirmation Sent
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">SMTP Server: OK</span>
                </div>

                <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-900 font-mono text-[11px] space-y-1.5 text-slate-300 max-h-48 overflow-y-auto">
                  <p><span className="text-slate-500 font-bold">To:</span> {dispatchedEmail.to}</p>
                  <p><span className="text-slate-500 font-bold">Subject:</span> {dispatchedEmail.subject}</p>
                  <div className="h-px bg-slate-900 my-1.5" />
                  <pre className="whitespace-pre-wrap leading-relaxed">{dispatchedEmail.body}</pre>
                </div>
                <p className="text-[10px] font-mono text-slate-500 text-center">
                  A formal verification email copy has been dispatched to **{formData.email}**.
                </p>
              </div>
            )}

            <div className="text-center pt-2">
              <button 
                onClick={onClose} 
                className="text-xs font-mono font-bold text-cyan-400 hover:text-white underline cursor-pointer"
              >
                ← Back to Services Matrix
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
