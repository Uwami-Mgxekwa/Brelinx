// ========================================
// Brelinx Chatbot — Knowledge Base & Responses
// ========================================

const knowledgeBase = {
    greetings:      ['hello', 'hi', 'hey', 'howzit', 'good morning', 'good afternoon', 'good evening', 'sup', 'hola', 'greetings', 'yo'],
    services:       ['service', 'services', 'what do you do', 'what do you offer', 'offerings', 'what can you do', 'capabilities', 'solutions'],
    website:        ['website', 'web development', 'web design', 'web app', 'site', 'online presence', 'landing page', 'ecommerce', 'e-commerce', 'online store', 'wordpress', 'responsive'],
    software:       ['software', 'custom software', 'system', 'enterprise', 'api', 'integration', 'automation', 'erp', 'crm', 'desktop app', 'electron'],
    mobile:         ['mobile', 'android', 'ios', 'iphone', 'app', 'mobile app', 'flutter', 'react native', 'hybrid', 'play store', 'app store'],
    coaching:       ['coaching', 'coach', 'learn', 'learning', 'teach', 'tutor', 'tutoring', 'programming', 'code', 'coding', 'training', 'lesson', 'lessons', 'course', 'python', 'javascript', 'java', 'react', 'html', 'css', 'sql', 'c++', 'student', 'beginner'],
    assignment:     ['assignment', 'homework', 'project help', 'university', 'college', 'varsity', 'stuck', 'deadline', 'submit', 'marks', 'grade', 'exam', 'test prep'],
    certificate:    ['certificate', 'certification', 'verify', 'verification', 'credential', 'proof', 'legit', 'authentic', 'fake'],
    cloud:          ['cloud', 'aws', 'azure', 'google cloud', 'hosting', 'server', 'vps', 'migration', 'infrastructure', 'devops', 'deployment', 'scalable'],
    security:       ['security', 'cybersecurity', 'cyber', 'protect', 'secure', 'hack', 'hacker', 'firewall', 'virus', 'malware', 'data breach', 'compliance', 'popia', 'gdpr', 'audit'],
    data:           ['data', 'analytics', 'database', 'backup', 'recovery', 'management', 'reporting', 'dashboard', 'bi', 'business intelligence'],
    support:        ['support', 'it support', 'help desk', 'maintenance', 'fix', 'broken', 'issue', 'problem', 'troubleshoot', '24/7', 'monitor'],
    contact:        ['contact', 'phone', 'call', 'email', 'reach', 'whatsapp', 'message', 'get in touch', 'talk', 'speak', 'number'],
    pricing:        ['price', 'prices', 'cost', 'costs', 'how much', 'pricing', 'rates', 'rate', 'fee', 'fees', 'quote', 'budget', 'affordable', 'cheap', 'expensive', 'payment'],
    location:       ['where', 'location', 'address', 'office', 'johannesburg', 'jozi', 'jhb', 'gauteng', 'south africa'],
    about:          ['about', 'who are you', 'who is brelinx', 'company', 'brelinx', 'team', 'experience', 'history', 'founded', 'background'],
    portfolio:      ['portfolio', 'projects', 'work', 'clients', 'examples', 'case study', 'previous', 'past work', 'kds', 'electrohome', 'learn', 'zilonews', 'move', 'lebo', 'gradient fashion', 'cosmos', 'galactic'],
    testimonials:   ['review', 'reviews', 'testimonial', 'testimonials', 'feedback', 'rating', 'recommend', 'trust', 'reputation'],
    faq:            ['faq', 'frequently asked', 'common questions', 'questions', 'how does it work', 'how long', 'timeline', 'process'],
    nationwide:     ['nationwide', 'cape town', 'durban', 'pretoria', 'all provinces', 'country', 'national', 'remote', 'online', 'anywhere'],
    thanks:         ['thank', 'thanks', 'thank you', 'thx', 'appreciate', 'cheers', 'great', 'awesome', 'perfect', 'nice'],
    bye:            ['bye', 'goodbye', 'see you', 'later', 'ciao', 'take care', 'done', 'exit', 'close']
};

const responses = {
    greetings: "Hello! 👋 Welcome to Brelinx!\n\nI'm your virtual assistant — here to help with anything about our IT services, coaching, pricing, or anything else.\n\nWhat can I help you with today?",

    services: "We offer a full range of IT services across South Africa:\n\n🌐 Website Development\n🖥️ Custom Software Development\n📱 Mobile App Development\n☁️ Cloud Solutions\n🔒 Cybersecurity\n💾 Data Management & Analytics\n🛠️ IT Support 24/7\n🔧 System Integration\n🎓 Programming Coaching\n📚 Assignment Help\n\nWhich one would you like to know more about?",

    website: "Our Website Development services include:\n\n🌐 Professional responsive websites\n🌐 E-commerce & online stores\n🌐 Landing pages & brand showcases\n🌐 SEO-optimised & mobile-first\n🌐 Fast loading & secure\n🌐 Custom design — no templates\n\nEvery site we build is tailored to your business goals. Ready to get started?\n\n💬 WhatsApp us: +27 78 500 2274",

    software: "Our Custom Software Development covers:\n\n🖥️ Business management systems\n🖥️ Web applications & portals\n🖥️ API development & integration\n🖥️ Desktop applications (Electron)\n🖥️ Enterprise & ERP solutions\n🖥️ Workflow automation\n\nWe build software that fits your exact needs — not off-the-shelf. Want to discuss your project?\n\n💬 WhatsApp: +27 78 500 2274",

    mobile: "We build powerful Mobile Applications:\n\n📱 Android & iOS apps\n📱 Cross-platform (hybrid) solutions\n📱 Web-based mobile apps\n📱 User-friendly UI/UX design\n📱 Performance optimised\n📱 Play Store & App Store ready\n\nLet's bring your app idea to life!\n\n💬 WhatsApp: +27 78 500 2274",

    coaching: "Our Programming Coaching is perfect for students and beginners:\n\n🎓 One-on-one online sessions\n🎓 Personalised to your pace & goals\n🎓 Languages: Python, JavaScript, Java, C++, SQL, HTML/CSS, React\n🎓 Beginner to advanced levels\n🎓 Real-world projects\n🎓 Flexible scheduling (evenings & weekends)\n🎓 WhatsApp support between sessions\n\nPricing is available upon request — we tailor packages to suit you.\n\n👉 Visit: brelinx.com/coaching.html\n💬 WhatsApp: +27 78 500 2274",

    assignment: "Struggling with a programming assignment? We've got you:\n\n📚 Code debugging & fixing\n📚 Concept explanation\n📚 Project guidance & support\n📚 Java, Python, C++, SQL, HTML/CSS & more\n📚 Quick turnaround\n📚 Learning-focused — we help YOU understand\n\nWe don't just give answers — we make sure you actually get it.\n\n💬 WhatsApp us now: +27 78 500 2274\n👉 brelinx.com/coaching.html",

    certificate: "You can verify any Brelinx certificate at:\n\n🔗 brelinx.com/verify\n\nYou'll need:\n✅ Certificate Number (top-right of the certificate)\n✅ Your ID Number\n✅ Your Full Name\n\nIf the details match our records, the certificate is confirmed as authentic. If you have trouble verifying, contact us on WhatsApp: +27 78 500 2274",

    cloud: "Our Cloud Solutions include:\n\n☁️ Cloud infrastructure setup & management\n☁️ Migration from on-premise to cloud\n☁️ AWS, Azure & Google Cloud\n☁️ Scalable & cost-optimised architecture\n☁️ DevOps & CI/CD pipelines\n☁️ Cloud security & compliance\n\nModernise your business with reliable cloud technology.\n\n💬 WhatsApp: +27 78 500 2274",

    security: "Our Cybersecurity Services protect your business:\n\n🔒 Security audits & vulnerability assessments\n🔒 Threat monitoring & incident response\n🔒 Data protection & encryption\n🔒 POPIA & GDPR compliance support\n🔒 Firewall & network security\n🔒 Staff security awareness training\n\nDon't wait for a breach — protect your business now.\n\n💬 WhatsApp: +27 78 500 2274",

    data: "Our Data Management & Analytics services:\n\n💾 Database design & optimisation\n💾 Data backup & disaster recovery\n💾 Business intelligence dashboards\n💾 Reporting & analytics\n💾 Data migration & integration\n💾 Real-time monitoring\n\nTurn your data into decisions.\n\n💬 WhatsApp: +27 78 500 2274",

    support: "Our IT Support is available 24/7:\n\n🛠️ Help desk & remote support\n🛠️ System monitoring & maintenance\n🛠️ Hardware & software troubleshooting\n🛠️ Network setup & management\n🛠️ Regular system health checks\n🛠️ Fast response times\n\nWe keep your business running smoothly around the clock.\n\n📞 +27 63 572 2080\n💬 WhatsApp: +27 78 500 2274",

    contact: "Here's how to reach us:\n\n📞 Phone: +27 63 572 2080\n💬 WhatsApp: +27 78 500 2274 (preferred — fastest response)\n📍 The Glen Road, Johannesburg, GP 2090\n🕐 Mon–Fri: 8AM–8PM | Sat: 9AM–5PM | Sun: 2PM–6PM (SAST)\n\nYou can also fill in the contact form on our website and we'll get back to you shortly.",

    pricing: "Our pricing is tailored to each project — no one-size-fits-all.\n\nFactors that affect pricing:\n💰 Project scope & complexity\n💰 Timeline & urgency\n💰 Ongoing support requirements\n💰 Technology stack\n\nFor coaching & assignment help, pricing is available upon request.\n\nThe best way to get a quote is a quick chat:\n💬 WhatsApp: +27 78 500 2274\n📞 +27 63 572 2080\n\nWe'll give you a fair, transparent quote — no hidden fees.",

    location: "We're based in Johannesburg:\n\n📍 The Glen Road\nJohannesburg, GP 2090\nSouth Africa 🇿🇦\n\nBut we work with clients everywhere — all our services are available online nationwide. Cape Town, Durban, Pretoria, anywhere in SA — we've got you covered.",

    about: "Brelinx is a South African IT company based in Johannesburg 🇿🇦\n\nWe specialise in building digital solutions for businesses and helping students master programming.\n\n📊 Our track record:\n✅ 53+ Projects Completed\n✅ 43+ Business Clients\n✅ 200+ Students Helped\n✅ 24/7 Support Available\n✅ 6+ Years Experience\n\nWe're passionate about technology that actually makes a difference — for businesses and for people learning to code.",

    portfolio: "Here are some of the projects we've delivered:\n\n🏗️ Move — Digital Platform\n⛏️ Lebo Mining — Corporate Website\n👗 Gradient Fashion — E-commerce Platform\n📰 Zilo News — News Platform\n🎓 LEARN — Education Platform\n🏠 KDS Appliances — E-commerce\n🏠 Electrohome International — Corporate Website\n🚀 Galactic Tech — Startup Platform\n💼 Cosmos Solutions — Business Management System\n\nWant to see more or discuss a similar project?\n💬 WhatsApp: +27 78 500 2274",

    testimonials: "Our clients love working with us! ⭐⭐⭐⭐⭐\n\nHere's what some of them say:\n\n💬 \"Delivered ahead of schedule and exceeded expectations\" — Sipho K.\n💬 \"Perfectly understood our vision\" — Mandla R.\n💬 \"Significantly improved our customer engagement\" — Sarah M.\n💬 \"Reduced IT costs by 40%\" — James L.\n💬 \"Increased online sales by 300%\" — Priya N.\n\nYou can read all reviews on our website.",

    faq: "Here are answers to common questions:\n\n❓ How do sessions work?\nAll coaching is done online via video call — you share your screen and we work through code together.\n\n❓ How long does a website take?\nTypically 1–3 weeks depending on complexity.\n\n❓ Do you work with beginners?\nAbsolutely — we love working with beginners!\n\n❓ Can you help with university assignments?\nYes — we guide you to understand and complete your own work.\n\n❓ Do you work outside Johannesburg?\nYes — all services are available online nationwide.\n\nHave a specific question? Just ask!",

    nationwide: "Yes — we serve clients all across South Africa! 🇿🇦\n\n📍 Johannesburg (HQ)\n📍 Cape Town\n📍 Durban\n📍 Pretoria\n📍 All other provinces\n\nAll our services are delivered online so location is never a barrier. Same quality, same support, wherever you are.",

    thanks: "You're welcome! 😊 Is there anything else I can help you with?\n\nFeel free to ask about our services, pricing, coaching, or anything else. We're always happy to help!",

    bye: "Thanks for chatting with us! 👋\n\nIf you ever need anything, we're always here. You can also reach us directly:\n\n💬 WhatsApp: +27 78 500 2274\n📞 +27 63 572 2080\n\nHave a great day! 🚀",

    default: "I'm not sure I understood that, but I'm here to help! 😊\n\nYou can ask me about:\n• Our services (websites, apps, software, cloud)\n• Programming coaching & assignment help\n• Certificate verification\n• Pricing & quotes\n• Our portfolio & clients\n• Contact details & location\n• How we work\n\nOr reach us directly:\n💬 WhatsApp: +27 78 500 2274"
};
