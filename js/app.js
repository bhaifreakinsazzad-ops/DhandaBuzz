/* ================================================
   DhandaBuzz — Main Application
   Update WHATSAPP_NUMBER before going live
   ================================================ */

const WHATSAPP_NUMBER = '8801700000000'; // ⚠️ Replace with real number before publishing

/* -----------------------------------------------
   DATA — Dev Services
   ----------------------------------------------- */
const SERVICES = [
  { icon: '🌐', title: 'Business Website', desc: 'Professional corporate, portfolio বা landing page website।' },
  { icon: '🛒', title: 'Ecommerce Store', desc: 'Full-featured online shop with payment, inventory ও order management।' },
  { icon: '📱', title: 'Mobile App', desc: 'Android ও iOS-এর জন্য native বা cross-platform mobile app।' },
  { icon: '💻', title: 'Web Application', desc: 'Complex business logic সহ custom web-based application।' },
  { icon: '⚙️', title: 'Custom Software', desc: 'আপনার specific business process-এর জন্য tailor-made software।' },
  { icon: '📊', title: 'Admin Dashboard', desc: 'Business data manage করার জন্য powerful admin panel।' },
  { icon: '🏪', title: 'Multi-vendor Platform', desc: 'Daraz-এর মতো multiple seller manage করার marketplace।' },
  { icon: '🚚', title: 'Delivery Management', desc: 'Order tracking ও delivery management system।' },
  { icon: '📩', title: 'CRM System', desc: 'Customer relationship ও sales pipeline management।' },
  { icon: '🔗', title: 'API & Integration', desc: 'Third-party service integration ও custom API development।' },
  { icon: '🎨', title: 'UI/UX Design', desc: 'Figma-তে premium design — development-এর আগে দেখুন।' },
  { icon: '🔒', title: 'Maintenance & Support', desc: 'Launch-এর পরে ongoing support, update ও security।' },
];

/* -----------------------------------------------
   DATA — Dev Pricing
   ----------------------------------------------- */
const PRICING = {
  website: [
    {
      name: 'Starter', price: '৳4,999', period: 'একবার', highlight: false, tag: null,
      features: ['৫-পেজ Website', 'Mobile Responsive', 'Contact Form', 'SSL Certificate', 'Google Analytics', '১ বছর Hosting Free', '৭ দিনে Delivery'],
    },
    {
      name: 'Professional', price: '৳12,999', period: 'একবার', highlight: true, tag: 'সবচেয়ে জনপ্রিয়',
      features: ['১৫-পেজ Website', 'CMS/Blog সহ', 'SEO Optimized', 'Speed Optimized', 'WhatsApp Button', 'Admin Panel', '১ বছর Hosting Free', '১০ দিনে Delivery'],
    },
    {
      name: 'Premium', price: '৳24,999', period: 'একবার', highlight: false, tag: null,
      features: ['Unlimited পেজ', 'Custom Design', 'Advanced SEO', 'Multi-language', 'Newsletter Integration', 'Priority Support', '১ বছর Hosting Free', '১৫ দিনে Delivery'],
    },
  ],
  ecommerce: [
    {
      name: 'Basic Shop', price: '৳14,999', period: 'একবার', highlight: false, tag: null,
      features: ['৫০০ Product', 'bKash/Nagad Payment', 'Order Management', 'Inventory Tracking', 'Mobile App (Basic)', 'SMS Notification', '১৪ দিনে Delivery'],
    },
    {
      name: 'Power Store', price: '৳29,999', period: 'একবার', highlight: true, tag: 'Best Value',
      features: ['Unlimited Products', 'সব Payment Gateway', 'Advanced Analytics', 'Coupon & Discount', 'Multi-category', 'Delivery Integration', 'Mobile App সহ', '২১ দিনে Delivery'],
    },
    {
      name: 'Enterprise', price: '৳59,999', period: 'একবার', highlight: false, tag: null,
      features: ['Multi-vendor Support', 'Custom Checkout Flow', 'ERP Integration', 'Dedicated Server', 'White-label App', '১ বছর Support', 'Custom Timeline'],
    },
  ],
  app: [
    {
      name: 'MVP App', price: '৳34,999', period: 'একবার', highlight: false, tag: null,
      features: ['Android App', 'Core Features', 'Admin Panel', 'Push Notification', 'Play Store Publish', '৩০ দিনে Delivery'],
    },
    {
      name: 'Full App', price: '৳69,999', period: 'একবার', highlight: true, tag: 'সবচেয়ে জনপ্রিয়',
      features: ['Android + iOS', 'Custom UI/UX', 'Backend API', 'Analytics Dashboard', 'Payment Gateway', 'Play Store + App Store', '৪৫ দিনে Delivery'],
    },
    {
      name: 'Enterprise Software', price: 'Custom', period: 'আলোচনাসাপেক্ষ', highlight: false, tag: null,
      features: ['Complex Business Logic', 'Multi-platform', 'Dedicated Team', 'Agile Development', 'NDA সহ', 'Long-term Support', 'Custom Timeline'],
    },
  ],
};

/* -----------------------------------------------
   DATA — Preview Flow
   ----------------------------------------------- */
const FLOW_STEPS = [
  { num: '০১', title: 'Requirement Submit', desc: 'ফর্মে আপনার project-এর বিস্তারিত জমা দিন।' },
  { num: '০২', title: 'Initial Consultation', desc: 'আমাদের team ২৪ ঘণ্টার মধ্যে WhatsApp-এ যোগাযোগ করবে।' },
  { num: '০৩', title: 'Requirement Analysis', desc: 'আপনার চাহিদা বিশ্লেষণ করে detailed scope তৈরি করা হবে।' },
  { num: '০৪', title: 'Design Mockup', desc: 'আপনার project-এর জন্য custom UI design তৈরি করব।' },
  { num: '০৫', title: 'Free Preview', desc: 'Design ও basic structure সহ live preview দেখানো হবে।' },
  { num: '০৬', title: 'Feedback & Revision', desc: 'Preview দেখে feedback দিন, আমরা revise করব।' },
  { num: '০৭', title: 'Project Confirmation', desc: 'সন্তুষ্ট হলে confirm করুন — তারপর advance নিই।' },
  { num: '০৮', title: 'Development & Delivery', desc: 'Agreed timeline-এ full project develop করে deliver করি।' },
];

/* -----------------------------------------------
   DATA — Why Points
   ----------------------------------------------- */
const WHY_POINTS = [
  { icon: '🎯', title: 'আগে Preview, তারপর Advance', desc: 'কোনো টাকা না দিয়েই আপনার project-এর design দেখুন।' },
  { icon: '⚡', title: 'দ্রুত Delivery', desc: 'Basic website ৭ দিনে, complex project-ও agreed timeline-এ।' },
  { icon: '💰', title: '১১% Cashback অফার', desc: 'নির্দিষ্ট packages-এ ১১% cashback — audit-এর পরে confirm হবে।' },
  { icon: '🔒', title: 'Source Code আপনার', desc: 'Project শেষে সম্পূর্ণ source code আপনাকে দেওয়া হবে।' },
  { icon: '📱', title: 'Mobile-First Design', desc: 'সব project মোবাইলে perfect দেখায়।' },
  { icon: '🛡️', title: '১ বছর Free Maintenance', desc: 'Launch-এর পরে ১ বছর free bug fix ও minor update।' },
  { icon: '💬', title: '২৪/৭ Support', desc: 'যেকোনো সমস্যায় WhatsApp-এ সাথে সাথে response।' },
  { icon: '🏆', title: '৫০০+ সফল Project', desc: 'Bangladesh জুড়ে ৫০০-এর বেশি satisfied client।' },
  { icon: '🔧', title: 'Custom Solution', desc: 'আপনার business-এর জন্য specifically তৈরি solution।' },
  { icon: '📊', title: 'SEO Optimized', desc: 'Google-এ rank করার জন্য সব project SEO-ready।' },
  { icon: '🌐', title: 'Free Hosting & Domain', desc: 'প্রথম বছরে hosting ও domain cost আমাদের।' },
];

/* -----------------------------------------------
   DATA — Digital Marketing Services
   ----------------------------------------------- */
const DM_SERVICES = [
  { icon: '📣', title: 'Facebook/Instagram Ads', desc: 'Targeted paid campaign — boosting নয়, real ad account থেকে।' },
  { icon: '🚀', title: 'Page Boosting Strategy', desc: 'Boost কখন, কতটুকু, কীভাবে দিতে হয় সেটার সঠিক strategy।' },
  { icon: '📅', title: 'Page Management', desc: 'Regular post, story, inbox reply ও engagement management।' },
  { icon: '🎨', title: 'Content Design', desc: 'Product post, offer banner, brand visual — premium design।' },
  { icon: '✍️', title: 'Caption & Copywriting', desc: 'Bangladeshi audience-কে connect করার জন্য compelling copy।' },
  { icon: '🎬', title: 'Reels Editing', desc: 'Product showcase, behind-the-scenes ও promotional reels।' },
  { icon: '💬', title: 'Messenger/WhatsApp Campaign', desc: 'Inbox থেকে sale করার জন্য targeted conversation campaign।' },
  { icon: '🛒', title: 'Ecommerce Sales Campaign', desc: 'Product listing, catalog ad, retargeting ও conversion campaign।' },
  { icon: '🔍', title: 'Google Ads', desc: 'Search ও display campaign — যখন মানুষ সরাসরি খুঁজছে।' },
  { icon: '📈', title: 'SEO', desc: 'Organic Google ranking-এর জন্য on-page ও off-page SEO।' },
  { icon: '📊', title: 'Monthly Marketing Management', desc: 'পুরো মাসের content, ads, reporting ও optimization।' },
  { icon: '💳', title: 'Media Payment / Dollar Support', desc: 'Card বা Dollar ছাড়াই Facebook/Google Ad account-এ payment।' },
];

/* -----------------------------------------------
   DATA — Audit Includes
   ----------------------------------------------- */
const AUDIT_INCLUDES = [
  'Business Audit (আপনার business পুরোটা বিশ্লেষণ)',
  'Facebook Page / Website Review',
  'Product/Service Positioning পরামর্শ',
  'Offer ও Conversion সমস্যা চিহ্নিতকরণ',
  'Content Quality Review',
  'Sales/Message Flow Review',
  'Growth Opportunity Suggestion',
  'Mini Marketing Strategy তৈরি',
  '৪টি Premium Branded Design',
  '৪টি Caption/Ad Copy Variation',
  'Product Title/Description Suggestion',
  'CTA + Hashtag Set',
  'BhaiSazzaD-led Expert Guidance',
];

/* -----------------------------------------------
   DATA — DM Packages
   ----------------------------------------------- */
const DM_PACKAGES = [
  {
    name: 'Starter', price: '৳4,999/মাস', highlight: false, tag: null,
    note: 'শুধু Management — Ad budget আলাদা',
    features: ['Page Management (15 পোস্ট)', '৮টি Design', 'Caption Writing', 'Monthly Report', 'WhatsApp Support'],
  },
  {
    name: 'Growth', price: '৳9,999/মাস', highlight: true, tag: 'সবচেয়ে জনপ্রিয়',
    note: 'Management + Campaign Setup — Ad budget আলাদা',
    features: ['Page Management (20 পোস্ট)', '12টি Design', 'Caption + Copywriting', '1 Facebook Campaign Setup', 'Audience Research', 'Monthly Report + Analysis'],
  },
  {
    name: 'Full Service', price: '৳19,999/মাস', highlight: false, tag: null,
    note: 'Full Management + Ads + Strategy — Ad budget আলাদা',
    features: ['Unlimited Posts', 'Reels Editing (4টি)', 'Multi-platform Campaigns', 'Weekly Optimization', 'Dedicated Account Manager', 'Detailed Monthly Report'],
  },
];

/* -----------------------------------------------
   DATA — Coming Soon
   ----------------------------------------------- */
const COMING_SOON = [
  {
    icon: '🤖', title: 'AI Inbox Moderation',
    desc: 'Facebook Messenger ও Instagram DM-এ AI দিয়ে auto-reply এবং smart filtering।',
  },
  {
    icon: '🔄', title: 'Hoopla Lead Follow-up',
    desc: 'New lead আসলে automatically follow-up message — কোনো manual কাজ ছাড়াই।',
  },
  {
    icon: '📅', title: 'Daily Posting Automation',
    desc: 'একবার schedule করুন — AI বাকি মাসের পোস্ট নিজেই handle করবে।',
  },
];

/* -----------------------------------------------
   DATA — FAQ
   ----------------------------------------------- */
const FAQ_ITEMS = [
  {
    q: 'Boosting আর Facebook Ads-এর মধ্যে পার্থক্য কী?',
    a: 'Boosting হলো শুধু post-টা বেশি মানুষকে দেখানো — কোনো targeting নেই, conversion tracking নেই। আসল Facebook Ads-এ specific audience target করা যায়, sales/lead track করা যায়, এবং budget অনেক বেশি efficiently কাজ করে।',
  },
  {
    q: 'Ad budget কি আলাদা দিতে হবে?',
    a: 'হ্যাঁ, DhandaBuzz-এর service fee এবং Facebook/Google-এর Ad budget সম্পূর্ণ আলাদা। আপনি নিজে দিতে পারেন বা DhandaBuzz-এর Media Payment Support নিতে পারেন (BDT-তে pay করে dollar-equivalent ad run করা যায়)।',
  },
  {
    q: 'Dollar বা Card ছাড়া কি Facebook Ads চালানো যায়?',
    a: 'হ্যাঁ, আমাদের Media Payment Support-এর মাধ্যমে BDT-তে payment করে আপনার ad account-এ budget add করা যায়। কোনো dollar বা international card লাগবে না।',
  },
  {
    q: 'Business Audit-এ কী হবে? কতক্ষণ লাগবে?',
    a: 'Audit-এ আপনার Facebook page, content, ad history, product positioning, sales flow — সব বিশ্লেষণ করা হবে। তারপর WhatsApp বা call-এ ৩০-৪৫ মিনিটের একটি session-এ সব findings ও recommendations জানানো হবে।',
  },
  {
    q: 'Result কি guarantee করা হয়?',
    a: 'Audit ও consultation-এর পরে, আপনার specific situation বুঝে realistic expectation জানানো হবে। কোনো fixed result publicly guarantee করা হয় না — কারণ result নির্ভর করে product, market, budget ও execution-এর উপর।',
  },
  {
    q: 'DhandaBuzz কি শুধু বড় Business-এর জন্য?',
    a: 'একদম না। আমাদের target হলো Bangladeshi small ও medium business — fashion, cosmetics, food, local shops, service providers। ৳499 Audit দিয়ে শুরু করুন, তারপর বুঝুন আপনার জন্য কোন plan সঠিক।',
  },
];

/* -----------------------------------------------
   DATA — Sales Guide
   ----------------------------------------------- */
const SALES_GUIDE = [
  {
    title: '🎯 Opening Script — Dev',
    type: 'script',
    content: '"ভাই/আপু, আমি DhandaBuzz Development Team থেকে বলছি। আপনার business-এর জন্য website বা app নিয়ে ভাবছেন? আমরা আগে Free Preview দেখাই — পছন্দ হলে তারপর কাজ শুরু।"',
  },
  {
    title: '📣 Opening Script — Digital Marketing',
    type: 'script',
    content: '"ভাই/আপু, আপনি কি Facebook-এ boosting দিচ্ছেন কিন্তু result পাচ্ছেন না? আমরা ৳499-তে আপনার পুরো business-টা audit করে real problem ধরিয়ে দিই এবং কী করলে sales বাড়বে বলি — আগ্রহী?"',
  },
  {
    title: '✅ Key Selling Points',
    type: 'list',
    items: [
      'আগে Free Preview — কোনো Advance ছাড়াই (Dev)',
      '৳499-তে Business Audit (DM) — launch offer',
      'Ad budget আলাদা, Dollar লাগবে না',
      'Media Payment Support available',
      '৭ দিনে Website Delivery',
      '১ বছর Free Maintenance',
      'Source code client-এর কাছে থাকবে',
    ],
  },
  {
    title: '❓ Common Objections & Responses',
    type: 'qa',
    items: [
      { q: '"Boosting দিয়ে কাজ হয় না"', a: '"ঠিকই বলেছেন — Boosting আর real Ad-এর পার্থক্য আছে। ৳499-তে Audit নিলে কোথায় সমস্যা সেটা ধরিয়ে দেব।"' },
      { q: '"Dollar নেই, Ad দিতে পারব না"', a: '"কোনো সমস্যা নেই — আমাদের Media Payment Support আছে। BDT-তে দিলেই হবে।"' },
      { q: '"দাম বেশি মনে হচ্ছে"', a: '"আমরা first একটা free dev preview বা ৳499 audit দেখাই। তারপর budget নিয়ে কথা বলি।"' },
      { q: '"অন্য agency সস্তায় দেয়"', a: '"সস্তা মানেই ভালো না। আমাদের ৫০০+ client আছে, source code দিই, ১ বছর support দিই।"' },
    ],
  },
  {
    title: '📋 Qualification Checklist',
    type: 'list',
    items: [
      'Business type ও industry জানুন',
      'Facebook page/website আছে কিনা',
      'আগে Ads দিয়েছে কিনা ও result কেমন',
      'Budget range বুঝুন (direct/indirect)',
      'Decision maker কে?',
      'Main pain point — Sales না Awareness না Reach?',
    ],
  },
  {
    title: '💬 Closing Script',
    type: 'script',
    content: '"আচ্ছা ভাই/আপু, তাহলে আমি আপনার জন্য একটা quick form পাঠাচ্ছি — ৫ মিনিটে fill করুন। আমরা ২৪ ঘণ্টায় WhatsApp-এ contact করব। একদম ঝামেলা নেই।"',
  },
];

/* ================================================
   MAIN APP
   ================================================ */
const DB = {
  currentPricingTab: 'website',

  init() {
    this.renderServices();
    this.renderPricing('website');
    this.renderFlowSteps();
    this.renderWhyPoints();
    this.renderDMServices();
    this.renderAuditIncludes();
    this.renderDMPackages();
    this.renderComingSoon();
    this.renderFAQ();
    this.renderSalesGuide();
    this.initNavScroll();
    this.initNavToggle();
    this.initStickyCta();
    this.showFabAfterDelay();
  },

  /* ------ NAVIGATION ------ */
  scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    return false;
  },

  navTo(id) {
    this.closeNav();
    this.scrollTo(id);
    return false;
  },

  toggleNav() {
    const links = document.getElementById('navLinks');
    const toggle = document.getElementById('navToggle');
    if (!links) return;
    links.classList.toggle('open');
    if (toggle) toggle.classList.toggle('open');
  },

  closeNav() {
    const links = document.getElementById('navLinks');
    const toggle = document.getElementById('navToggle');
    if (links) links.classList.remove('open');
    if (toggle) toggle.classList.remove('open');
  },

  initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  },

  initNavToggle() {
    document.addEventListener('click', (e) => {
      const nav = document.getElementById('navLinks');
      const toggle = document.getElementById('navToggle');
      if (!nav || !nav.classList.contains('open')) return;
      if (!nav.contains(e.target) && toggle && !toggle.contains(e.target)) {
        this.closeNav();
      }
    });
  },

  initStickyCta() {
    const bar = document.getElementById('stickyCta');
    if (!bar) return;
    let shown = false;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400 && !shown) {
        bar.classList.add('visible');
        shown = true;
      }
    }, { passive: true });
  },

  showFabAfterDelay() {
    const fab = document.getElementById('waFab');
    if (!fab) return;
    fab.style.opacity = '0';
    fab.style.transform = 'scale(0.5)';
    fab.style.transition = 'opacity 0.4s, transform 0.4s';
    setTimeout(() => {
      fab.style.opacity = '';
      fab.style.transform = '';
    }, 2000);
  },

  /* ------ RENDER — Dev ------ */
  renderServices() {
    const grid = document.getElementById('svcGrid');
    if (!grid) return;
    grid.innerHTML = SERVICES.map(s => `
      <div class="svc-card">
        <div class="svc-icon">${s.icon}</div>
        <h3 class="svc-title">${s.title}</h3>
        <p class="svc-desc">${s.desc}</p>
        <a href="#" class="svc-link" onclick="return DB.navTo('requirement-form')">জানতে চাই →</a>
      </div>`).join('');
  },

  renderPricing(tab) {
    const container = document.getElementById('pricingPanels');
    if (!container) return;
    const plans = PRICING[tab] || [];
    container.innerHTML = '<div class="p-panels">' + plans.map(p => `
      <div class="p-card${p.highlight ? ' highlighted' : ''}">
        ${p.tag ? `<div class="p-tag">${p.tag}</div>` : ''}
        <div class="p-name">${p.name}</div>
        <div class="p-price">${p.price}<span class="p-period"> / ${p.period}</span></div>
        <ul class="p-features">
          ${p.features.map(f => `<li><span class="p-check">✓</span>${f}</li>`).join('')}
        </ul>
        <a href="#" class="${p.highlight ? 'btn-primary' : 'btn-outline'}"
           onclick="return DB.navTo('requirement-form')" data-cta="pricing_cta">
          এই Package নিতে চাই
        </a>
      </div>`).join('') + '</div>';
  },

  switchPricingTab(el, tab) {
    document.querySelectorAll('.p-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    this.currentPricingTab = tab;
    this.renderPricing(tab);
  },

  renderFlowSteps() {
    const grid = document.getElementById('flowGrid');
    if (!grid) return;
    grid.innerHTML = FLOW_STEPS.map(s => `
      <div class="flow-step">
        <div class="flow-num">${s.num}</div>
        <h4 class="flow-title">${s.title}</h4>
        <p class="flow-desc">${s.desc}</p>
      </div>`).join('');
  },

  renderWhyPoints() {
    const grid = document.getElementById('whyGrid');
    if (!grid) return;
    grid.innerHTML = WHY_POINTS.map(p => `
      <div class="why-card">
        <div class="why-icon">${p.icon}</div>
        <div class="why-text"><h4>${p.title}</h4><p>${p.desc}</p></div>
      </div>`).join('');
  },

  /* ------ RENDER — DM ------ */
  renderDMServices() {
    const grid = document.getElementById('dmSvcGrid');
    if (!grid) return;
    grid.innerHTML = DM_SERVICES.map(s => `
      <div class="svc-card">
        <div class="svc-icon">${s.icon}</div>
        <h3 class="svc-title">${s.title}</h3>
        <p class="svc-desc">${s.desc}</p>
        <a href="#" class="svc-link" onclick="return DB.navTo('audit-form')">জানতে চাই →</a>
      </div>`).join('');
  },

  renderAuditIncludes() {
    const list = document.getElementById('auditIncludesList');
    if (!list) return;
    list.innerHTML = AUDIT_INCLUDES.map(item => `<li>${item}</li>`).join('');
  },

  renderDMPackages() {
    const container = document.getElementById('pkgCards');
    if (!container) return;
    container.innerHTML = DM_PACKAGES.map(p => `
      <div class="p-card${p.highlight ? ' highlighted' : ''}">
        ${p.tag ? `<div class="p-tag">${p.tag}</div>` : ''}
        <div class="p-name">${p.name}</div>
        <div class="p-price" style="font-size:1.5rem">${p.price}</div>
        <p class="p-note-small">${p.note}</p>
        <ul class="p-features">
          ${p.features.map(f => `<li><span class="p-check">✓</span>${f}</li>`).join('')}
        </ul>
        <a href="#" class="${p.highlight ? 'btn-primary' : 'btn-outline'}"
           onclick="return DB.navTo('audit-form')" data-cta="dm_pkg_cta">
          এই Package নিতে চাই
        </a>
      </div>`).join('');
  },

  renderComingSoon() {
    const grid = document.getElementById('comingSoonGrid');
    if (!grid) return;
    grid.innerHTML = COMING_SOON.map(c => `
      <div class="cs-card">
        <div class="cs-badge">Coming Soon</div>
        <div class="svc-icon">${c.icon}</div>
        <h3 class="svc-title">${c.title}</h3>
        <p class="svc-desc">${c.desc}</p>
      </div>`).join('');
  },

  renderFAQ() {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = FAQ_ITEMS.map((item, i) => `
      <div class="faq-item" id="faq-${i}">
        <button class="faq-q" onclick="DB.toggleFaq(${i})" aria-expanded="false">
          <span>${item.q}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-a" aria-hidden="true">${item.a}</div>
      </div>`).join('');
  },

  toggleFaq(i) {
    const item = document.getElementById(`faq-${i}`);
    if (!item) return;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      el.querySelector('.faq-icon').textContent = '+';
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-q').setAttribute('aria-expanded', 'true');
      item.querySelector('.faq-icon').textContent = '−';
    }
  },

  renderSalesGuide() {
    const body = document.getElementById('guideBody');
    if (!body) return;
    body.innerHTML = SALES_GUIDE.map(block => {
      let content = '';
      if (block.type === 'script') {
        content = `<div class="guide-script">${block.content}</div>`;
      } else if (block.type === 'list') {
        content = `<ul class="guide-list">${block.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      } else if (block.type === 'qa') {
        content = block.items.map(item => `
          <div class="guide-qa">
            <div class="guide-q">${item.q}</div>
            <div class="guide-a">${item.a}</div>
          </div>`).join('');
      }
      return `<div class="guide-block"><h3>${block.title}</h3>${content}</div>`;
    }).join('');
  },

  /* ------ WHATSAPP ------ */
  openWhatsApp(source) {
    const msg = encodeURIComponent('আস্সালামুআলাইকুম! DhandaBuzz-এর সাথে কথা বলতে চাই।');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    this.track('whatsapp_click', { source });
  },

  openWhatsAppAudit() {
    const msg = encodeURIComponent('আস্সালামুআলাইকুম! আমি DhandaBuzz-এর ৳499 Business Growth Audit সম্পর্কে জানতে চাই।');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    this.track('audit_whatsapp_click', {});
  },

  /* ------ FORM — Dev Requirement ------ */
  submitRequirement(e) {
    e.preventDefault();
    const form = e.target;
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const projectType = (form.querySelector('input[name="projectType"]:checked') || {}).value || '';
    const budget = (form.querySelector('input[name="budget"]:checked') || {}).value || '';
    const timeline = (form.querySelector('input[name="timeline"]:checked') || {}).value || '';
    const features = [...form.querySelectorAll('input[name="features"]:checked')].map(i => i.value);
    const designStyle = (form.querySelector('input[name="designStyle"]:checked') || {}).value || '';
    const details = document.getElementById('projectDetails').value.trim();
    const refLink = document.getElementById('referenceLink').value.trim();
    const businessName = document.getElementById('businessName').value.trim();
    const source = (form.querySelector('input[name="source"]:checked') || {}).value || 'উল্লেখ নেই';

    if (!name || !phone) { this.toast('নাম ও WhatsApp নম্বর দিন।', 'error'); return; }
    if (!projectType) { this.toast('Project type বেছে নিন।', 'error'); return; }
    if (!details) { this.toast('Project-এর বিস্তারিত লিখুন।', 'error'); return; }

    const btn = form.querySelector('[type="submit"]');
    const btnText = document.getElementById('submitBtnText');
    btn.disabled = true;
    btnText.textContent = 'পাঠানো হচ্ছে…';

    const waMsg = this.buildDevWaMsg({ name, phone, businessName, projectType, budget, timeline, features, designStyle, details, refLink, source });
    document.getElementById('modalWaBtn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
    document.getElementById('modalTitle').textContent = 'Preview Request পাঠানো হয়েছে! 🎉';
    document.getElementById('modalSub').textContent = 'আমরা ২৪ ঘণ্টার মধ্যে WhatsApp-এ Premium Preview সহ যোগাযোগ করব।';

    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Free Preview Request পাঠান →';
      this.showModal();
      this.track('dev_requirement_submit', { projectType, budget });
    }, 600);
  },

  buildDevWaMsg(d) {
    const featureStr = d.features.length ? d.features.join(', ') : 'উল্লেখ নেই';
    return encodeURIComponent(`🌟 *DhandaBuzz — Dev Requirement*

👤 *নাম:* ${d.name}
📱 *WhatsApp:* ${d.phone}
🏢 *Business:* ${d.businessName || 'উল্লেখ নেই'}

📌 *Project Type:* ${d.projectType}
💰 *Budget:* ${d.budget || 'উল্লেখ নেই'}
⏱️ *Timeline:* ${d.timeline || 'উল্লেখ নেই'}
🎨 *Design Style:* ${d.designStyle || 'উল্লেখ নেই'}
⚙️ *Features:* ${featureStr}

📝 *Details:*
${d.details}

🔗 *Reference:* ${d.refLink || 'নেই'}
📣 *কীভাবে পেলেন:* ${d.source}

_DhandaBuzz Development_`);
  },

  /* ------ FORM — Audit ------ */
  submitAudit(e) {
    e.preventDefault();
    const form = e.target;
    const bizName = document.getElementById('auditBizName').value.trim();
    const name = document.getElementById('auditName').value.trim();
    const phone = document.getElementById('auditPhone').value.trim();
    const fbPage = document.getElementById('auditFbPage').value.trim();
    const website = document.getElementById('auditWebsite').value.trim();
    const category = (form.querySelector('input[name="auditCategory"]:checked') || {}).value || 'উল্লেখ নেই';
    const product = document.getElementById('auditProduct').value.trim();
    const problem = document.getElementById('auditProblem').value.trim();
    const budget = (form.querySelector('input[name="auditBudget"]:checked') || {}).value || 'উল্লেখ নেই';
    const ranAds = (form.querySelector('input[name="auditRanAds"]:checked') || {}).value || 'উল্লেখ নেই';
    const goals = [...form.querySelectorAll('input[name="auditGoal"]:checked')].map(i => i.value);
    const mediaPay = (form.querySelector('input[name="auditMediaPay"]:checked') || {}).value || 'উল্লেখ নেই';
    const auto = (form.querySelector('input[name="auditAuto"]:checked') || {}).value || 'উল্লেখ নেই';
    const notes = document.getElementById('auditNotes').value.trim();

    if (!bizName || !name || !phone) { this.toast('Business নাম, আপনার নাম ও WhatsApp নম্বর দিন।', 'error'); return; }
    if (!fbPage) { this.toast('Facebook Page Link দিন।', 'error'); return; }
    if (!product) { this.toast('Product/Service বিস্তারিত লিখুন।', 'error'); return; }
    if (!problem) { this.toast('Current সমস্যাটা লিখুন।', 'error'); return; }

    const btn = form.querySelector('[type="submit"]');
    const btnText = document.getElementById('auditBtnText');
    btn.disabled = true;
    btnText.textContent = 'পাঠানো হচ্ছে…';

    const waMsg = this.buildAuditWaMsg({ bizName, name, phone, fbPage, website, category, product, problem, budget, ranAds, goals, mediaPay, auto, notes });
    document.getElementById('modalWaBtn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;
    document.getElementById('modalTitle').textContent = 'Audit Request পাঠানো হয়েছে! 🎉';
    document.getElementById('modalSub').textContent = 'আমরা ২৪ ঘণ্টার মধ্যে WhatsApp-এ যোগাযোগ করব এবং ৳499 Audit-এর পরবর্তী ধাপ জানাব।';

    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = '৳499-তে Audit Request পাঠান →';
      this.showModal();
      this.track('audit_submit', { category, budget });
    }, 600);
  },

  buildAuditWaMsg(d) {
    const goalStr = d.goals.length ? d.goals.join(', ') : 'উল্লেখ নেই';
    return encodeURIComponent(`📊 *DhandaBuzz — Business Audit Request (৳499)*

🏢 *Business:* ${d.bizName}
👤 *নাম:* ${d.name}
📱 *WhatsApp:* ${d.phone}
📘 *Facebook Page:* ${d.fbPage}
🌐 *Website:* ${d.website || 'নেই'}

🏷️ *Category:* ${d.category}
💼 *Product/Service:* ${d.product}
❗ *সমস্যা:* ${d.problem}

💰 *Ad Budget/মাস:* ${d.budget}
📣 *আগে Ads দিয়েছেন?* ${d.ranAds}
🎯 *লক্ষ্য:* ${goalStr}
💳 *Media Payment দরকার?* ${d.mediaPay}
🤖 *Automation আগ্রহী?* ${d.auto}
📝 *Notes:* ${d.notes || 'নেই'}

_DhandaBuzz Digital Marketing_`);
  },

  /* ------ MODAL ------ */
  showModal() {
    const modal = document.getElementById('successModal');
    if (modal) { modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  },

  closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
  },

  /* ------ SALES GUIDE ------ */
  showSalesGuide() {
    const guide = document.getElementById('salesGuide');
    if (guide) { guide.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  },

  hideSalesGuide() {
    const guide = document.getElementById('salesGuide');
    if (guide) { guide.style.display = 'none'; document.body.style.overflow = ''; }
  },

  /* ------ TOAST ------ */
  toast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add('toast-exit');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, duration);
  },

  /* ------ ANALYTICS ------ */
  track(name, props = {}) {
    if (window.gtag) window.gtag('event', name, props);
    if (window.fbq) window.fbq('trackCustom', name, props);
  },
};

/* Backdrop close */
document.addEventListener('click', (e) => {
  if (e.target.id === 'successModal') DB.closeModal();
  if (e.target.id === 'salesGuide') DB.hideSalesGuide();
});

document.addEventListener('DOMContentLoaded', () => DB.init());
