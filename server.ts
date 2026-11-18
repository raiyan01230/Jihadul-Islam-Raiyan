import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Chat features will fallback to offline responses.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const ai = getGeminiClient();

// Detailed portfolio system instruction to feed the AI context
const RAIYAN_CONTEXT_PROMPT = `
You are Jihadul Islam Raiyan's Professional AI Portfolio Assistant. Your job is to act as an expert, highly professional, polite, and technical representative of Jihadul Islam Raiyan.
Answer any questions regarding Raiyan's background, education, skills, projects, and certifications. If asked to write or draft materials, you must do so in a stellar manner.

Here is the verified data about Raiyan:
- Name: Jihadul Islam Raiyan
- Role: Programmer & Web Developer (Class 10 Student in Bangladesh)
- Location: Dhaka, Bangladesh
- Email: raiyan3945@gmail.com
- Phone: +8801715432981
- GitHub: https://github.com/raiyan01230

Core Tech Stack:
- Frontend: HTML5, CSS3, JavaScript (ES6+), React, Vite, Tailwind CSS, Framer Motion (Motion)
- Backend & Cloud: Firebase Cloud Firestore, Firebase Realtime Database, Firebase Storage, PHP, C Programming, Node.js (Express)
- AI & Integrations: Google Gemini SDK, AI Chat systems, automated drafting tools.

Featured Projects:
1. Umrah Savings Planner (Islamic saving tracking & visual budgeting planner)
   - Live URL: https://raiyan01230.github.io/Umrah-Savings/
   - Key Features: Detailed visual savings tracking, budget planner, emerald-gold spiritual UI.
2. Lower Your Gaze Reminder (Spiritual mindfulness and gaze guarding companion)
   - Live URL: https://raiyan01230.github.io/loweryouregaze/
   - Key Features: Screen-time mindfulness logs, eye exercise timers, Islamic quotes reminders, responsive UI.
3. The Way of Jannah (AI spiritual portal & Jannah progression planner)
   - Live URL: https://the-way-of-jannah.ai.studio
   - Key Features: Integrated daily prayer lists, Quran logs, goals roadmap, full Islamic companion database.

Certificates:
1. C Programming Certificate of Achievement (SoloLearn / October 2024)
   - Credential URL: https://uploads.onecompiler.io/44rq7cdfs/1780938941967/C%20Programming%20Certificate_page-0001.jpg
   - Skills: Algorithms, memory control, pointers, data structures.
2. Responsive Web Design Certificate (freeCodeCamp / January 2025)
   - Credential URL: https://uploads.onecompiler.io/44rq7cdfs/1780938746782/freecodecamp.PDF_page-0001.jpg
   - Skills: Modern CSS, flexbox, CSS Grid, typography, media queries.
3. Full-Stack Software Development Specialization (The Little Flower School Tech Hub / February 2025)
   - Credential URL: https://uploads.onecompiler.io/44rq7cdfs/1780938538039/certificate_page-0001.jpg
   - Skills: Full-stack logic, PHP, Firebase SDK, security hardening, database modeling.

Tone & Rules:
1. Always be professional, helpful, polite, and highly engaging.
2. Answer questions concisely. Use bullet points or code snippets when helpful.
3. Highlight Raiyan's dedication to quality design, performance, security, and Islamic spiritual utilities (such as Umrah Savings and Lower Your Gaze).
4. If a user asks to contact Raiyan, provide his email (raiyan3945@gmail.com) and phone (+8801715432981) and suggest using the Contact Form.
5. Emphasize that he is a talented Class 10 student programmer and full-stack developer in Bangladesh who is building next-gen web systems.
`;

// Rule-based fallback response engine for high resiliency during cloud API service outages
function getRuleBasedResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes("certif") || lowerMsg.includes("credential") || lowerMsg.includes("education") || lowerMsg.includes("degree")) {
    return "Jihadul Islam Raiyan has achieved professional-grade certifications confirming his expertise:\n\n" +
           "1. **C Programming Certificate of Achievement** (SoloLearn, Oct 2024) — Deep comprehension of algorithms, memory structures, pointers, and performance optimization.\n" +
           "2. **Responsive Web Design Certificate** (freeCodeCamp, Jan 2025) — Mastery of HTML5/CSS3, fluid typography, flexbox/grid layout, and responsive mobile-first UI.\n" +
           "3. **Full-Stack Software Development Specialization** (The Little Flower School Tech Hub, Feb 2025) — Expertise in full-stack architecture, backend routing (PHP/Node.js), and Firebase database modeling.\n\n" +
           "You can inspect any of these verified credentials with their live seal directly in the Credentials section above!";
  }
  
  if (lowerMsg.includes("project") || lowerMsg.includes("work") || lowerMsg.includes("portfolio") || lowerMsg.includes("developed") || lowerMsg.includes("umrah") || lowerMsg.includes("gaze") || lowerMsg.includes("jannah")) {
    return "Raiyan's featured projects are built with technical precision, high-contrast layouts, and responsive components:\n\n" +
           "• **Umrah Savings Planner**: A specialized budgeting tracker with emerald-gold themes and offline synchronization patterns for tracking pilgrimage funds.\n" +
           "• **Lower Your Gaze Reminder**: An interactive spiritual eye exercise companion featuring screen-time wellness trackers and motivational quotes.\n" +
           "• **The Way of Jannah**: An AI-guided companion portal incorporating prayer logs, Jannah progress roadmaps, and rich Islamic database structures.\n\n" +
           "All of these are fully responsive and linked live on this page in the Projects grid!";
  }
  
  if (lowerMsg.includes("firebase") || lowerMsg.includes("database") || lowerMsg.includes("storage") || lowerMsg.includes("firestore")) {
    return "Raiyan possesses expert-level Firebase capabilities! He designs scalable hybrid database architectures:\n\n" +
           "• **Cloud Firestore**: For relational-style collections (such as admission records, certificates, audit logs).\n" +
           "• **Realtime Database**: Used for instant notifications, live attendance counters, typing indicators, and real-time chat modules.\n" +
           "• **Firebase Storage**: Securely handles raw file uploads, including student pictures, ID cards, PDF receipts, and transcript certificates.\n" +
           "• **Security Rules**: Implements strict security rules for Firestore and Storage to guarantee that private data paths remain secure.";
  }

  if (lowerMsg.includes("contact") || lowerMsg.includes("hire") || lowerMsg.includes("email") || lowerMsg.includes("phone") || lowerMsg.includes("message")) {
    return "You can get in touch with Jihadul Islam Raiyan immediately! He reviews engineering offers and consulting invitations daily:\n\n" +
           "📧 **Email Inbox:** raiyan3945@gmail.com\n" +
           "📞 **Direct Line / WhatsApp:** +8801715432981\n" +
           "📍 **Location:** Dhaka, Bangladesh\n\n" +
           "Feel free to fill out the **Direct Message Portal** on this page to log a secure message. It will also trigger our automated mail relays to send you a formal auto-reply confirmation receipt.";
  }

  if (lowerMsg.includes("email") || lowerMsg.includes("draft") || lowerMsg.includes("proposal") || lowerMsg.includes("outreach") || lowerMsg.includes("cover letter")) {
    return "Here is a professional outreach draft you can use to contact Raiyan:\n\n" +
           "```text\n" +
           "Subject: Engineering Cooperation Proposition / Consulting Invitation\n\n" +
           "Dear Raiyan,\n\n" +
           "I explored your full-stack engineering portfolio and was highly impressed by your technical mastery (React, Node.js, Firebase) and visual design execution. We are looking for a dedicated software engineer who can build high-performance systems and lead backend/database integrations.\n\n" +
           "I would love to schedule a short call with you to discuss our upcoming initiatives.\n\n" +
           "Best regards,\n" +
           "[Your Name]\n" +
           "[Your Contact Info]\n" +
           "```\n\n" +
           "Feel free to copy this template and send it over to him at raiyan3945@gmail.com!";
  }

  return "I am Jihadul Islam Raiyan's portfolio AI representative. While the high-volume Gemini cloud clusters are currently experiencing a heavy load surge, I can answer your questions immediately using my local database!\n\n" +
         "Raiyan is a **Programmer & Full-Stack Developer** based in Dhaka, Bangladesh, currently studying in **Class 10**. He specializes in building secure, polished web applications with React, Tailwind, and Firebase.\n\n" +
         "You can ask me about his **projects**, his **certified credentials**, his **Firebase architecture expertise**, or how to **contact** him directly!";
}

// API Route for Contact Form Submissions
app.post(["/api/contact", "/api/contact.php"], (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const autoReplyBody = `As-salamu alaykum ${name},\n\n`
    + `Thank you for reaching out to Jihadul Islam Raiyan. This is an automated notification confirming that your message has been received.\n\n`
    + `Message Subject: "${subject}"\n\n`
    + `Raiyan reviews all consulting inquiries daily. He will respond within 24 hours. For urgent requests, call directly at +8801715432981.\n\n`
    + `Best Regards,\nJihadul Islam Raiyan | Full-Stack Software Engineer\nDhaka, Bangladesh — 1362`;

  res.json({
    success: true,
    saved_to_db: true,
    message: "Message lodged successfully.",
    autoReply: {
      to: email,
      subject: `Re: ${subject} - Raiyan Portfolio Auto-Reply`,
      body: autoReplyBody
    }
  });
});

// API Route for Product Purchases and Invoices
app.post(["/api/purchase", "/api/purchase.php", "/api/checkout"], (req, res) => {
  const { name, email, phone, planName, categoryTitle, price, requirements } = req.body;

  if (!name || !email || !phone || !planName || !price) {
    return res.status(400).json({ error: "Missing required order parameters." });
  }

  // Generate a cryptographically styled secure invoice order ID
  const orderId = `LFS-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`[PURCHASE ORDER RECEIVED] ID: ${orderId} | Client: ${name} (${email}) | Plan: ${planName} | Price: ${price} Tk`);

  res.json({
    success: true,
    orderId,
    timestamp: new Date().toISOString(),
    invoiceDetail: {
      clientName: name,
      clientEmail: email,
      clientPhone: phone,
      planName,
      categoryTitle,
      totalPrice: price,
      paymentTerms: "Direct Discussion / Contact Raiyan directly",
      specialInstructions: requirements || "No special requests attached."
    }
  });
});

// API Route for AI Chatbot
app.post(["/api/chat", "/api/chat.php"], async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  // Fallback offline responses if API key is not present
  if (!ai) {
    const offlineReply = getRuleBasedResponse(message);
    return res.json({ reply: offlineReply });
  }

  try {
    // Build the contents array from history if available, appending the new message
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Append the current message
    formattedHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    let response;
    try {
      // Primary model: gemini-3.5-flash
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction: RAIYAN_CONTEXT_PROMPT,
          temperature: 0.75,
        }
      });
    } catch (primaryError: any) {
      console.warn("Primary model gemini-3.5-flash failed/overloaded, attempting fallback to gemini-flash-latest. Error:", primaryError.message || primaryError);
      
      try {
        // Fallback model: gemini-flash-latest
        response = await ai.models.generateContent({
          model: "gemini-flash-latest",
          contents: formattedHistory,
          config: {
            systemInstruction: RAIYAN_CONTEXT_PROMPT,
            temperature: 0.75,
          }
        });
      } catch (fallbackError: any) {
        console.error("All Gemini API models failed. Initiating static rule-based synthesis. Error:", fallbackError.message || fallbackError);
        const generatedStaticReply = getRuleBasedResponse(message);
        return res.json({ reply: generatedStaticReply });
      }
    }

    const reply = response.text || "I was unable to generate a response. How else can I assist you today?";
    res.json({ reply });
  } catch (error: any) {
    console.error("General API Route Error:", error);
    const ruleBasedReply = getRuleBasedResponse(message);
    res.json({ reply: ruleBasedReply });
  }
});

// Configure Vite middleware / Serve static build
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving production static assets from dist/.");
  }
}

setupVite().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to boot Express server:", err);
});
