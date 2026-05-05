/* ================================================
   DhandaBuzz Development Department
   Main Application Script
   ================================================ */

const WHATSAPP_NUMBER = '8801700000000'; // Update with real number

/* ------------------------------------------------
   DATA — Services
   ------------------------------------------------ */
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

/* ------------------------------------------------
   DATA — Pricing
   ------------------------------------------------ */
const PRICING = {
  website: [
    {
      name: 'Starter', price: '৳4,999', period: 'একবার',
      highlight: false, tag: null,
      features: ['৫-পেজ Website', 'Mobile Responsive', 'Contact Form', 'SSL Certificate', 'Google Analytics', '১ বছর Hosting Free', '৭ দিনে Delivery'],
    },
    {
      name: 'Professional', price: '৳12,999', period: 'একবার',
      highlight: true, tag: 'সবচেয়ে জনপ্রিয়',
      features: ['১৫-পেজ Website', 'CMS/Blog সহ', 'SEO Optimized', 'Speed Optimized', 'WhatsApp Button', 'Admin Panel', '১ বছর Hosting Free', '১০ দিনে Delivery'],
    },
    {
      name: 'Premium', price: '৳24,999', period: 'একবার',
      highlight: false, tag: null,
      features: ['Unlimited পেজ', 'Custom Design', 'Advanced SEO', 'Multi-language', 'Newsletter Integration', 'Priority Support', '১ বছর Hosting Free', '১৫ দিনে Delivery'],
    },
  ],
  ecommerce: [
    {
      name: 'Basic Shop', price: '৳14,999', period: 'একবার',
      highlight: false, tag: null,
      features: ['৫০০ Product', 'bKash/Nagad Payment', 'Order Management', 'Inventory Tracking', 'Mobile App (Basic)', 'SMS Notification', '১৪ দিনে Delivery'],
    },
    {
      name: 'Power Store', price: '৳29,999', period: 'একবার',
      highlight: true, tag: 'Best Value',
      features: ['Unlimited Products', 'সব Payment Gateway', 'Advanced Analytics', 'Coupon & Discount', 'Multi-category', 'Delivery Integration', 'Mobile App সহ', '২১ দিনে Delivery'],
    },
    {
      name: 'Enterprise', price: '৳59,999', period: 'একবার',
      highlight: false, tag: null,
      features: ['Multi-vendor Support', 'Custom Checkout Flow', 'ERP Integration', 'Dedicated Server', 'White-label App', '১ বছর Support', 'Custom Timeline'],
    },
  ],
  app: [
    {
      name: 'MVP App', price: '৳34,999', period: 'একবার',
      highlight: false, tag: null,
      features: ['Android App', 'Core Features', 'Admin Panel', 'Push Notification', 'Play Store Publish', '৩০ দিনে Delivery'],
    },
    {
      name: 'Full App', price: '৳69,999', period: 'একবার',
      highlight: true, tag: 'সবচেয়ে জনপ্রিয়',
      features: ['Android + iOS', 'Custom UI/UX', 'Backend API', 'Analytics Dashboard', 'Payment Gateway', 'Play Store + App Store', '৪৫ দিনে Delivery'],
    },
    {
      name: 'Enterprise Software', price: 'Custom', period: 'আলোচনাসাপেক্ষ',
      highlight: false, tag: null,
      features: ['Complex Business Logic', 'Multi-platform', 'Dedicated Team', 'Agile Development', 'NDA সহ', 'Long-term Support', 'Custom Timeline'],
    },
  ],
};

/* ------------------------------------------------
   DATA — Preview Flow Steps
   ------------------------------------------------ */
const FLOW_STEPS = [
  { num: '০১', title: 'Requirement Submit', desc: 'নিচের ফর্মে আপনার project-এর বিস্তারিত জমা দিন।' },
  { num: '০২', title: 'Initial Consultation', desc: 'আমাদের team ২৪ ঘণ্টার মধ্যে WhatsApp-এ যোগাযোগ করবে।' },
  { num: '০৩', title: 'Requirement Analysis', desc: 'আপনার চাহিদা বিশ্লেষণ করে detailed scope তৈরি করা হবে।' },
  { num: '০৪', title: 'Design Mockup', desc: 'আপনার project-এর জন্য custom UI design তৈরি করব।' },
  { num: '০৫', title: 'Free Preview', desc: 'Design ও basic structure সহ একটি live preview দেখানো হবে।' },
  { num: '০৬', title: 'Feedback & Revision', desc: 'Preview দেখে feedback দিন, আমরা revise করব।' },
  { num: '০৭', title: 'Project Confirmation', desc: 'সন্তুষ্ট হলে project confirm করুন, তারপর advance নিই।' },
  { num: '০৮', title: 'Development & Delivery', desc: 'Agreed timeline-এ full project develop করে deliver করি।' },
];

/* ------------------------------------------------
   DATA — Why DhandaBuzz
   ------------------------------------------------ */
const WHY_POINTS = [
  { icon: '🎯', title: 'আগে Preview, তারপর Advance', desc: 'কোনো টাকা না দিয়েই আপনার project-এর design দেখুন।' },
  { icon: '⚡', title: 'দ্রুত Delivery', desc: 'Basic website ৭ দিনে, complex project-ও agreed timeline-এ।' },
  { icon: '💰', title: '১১% Cashback অফার', desc: 'নির্দিষ্ট packages-এ ১১% cashback পাবেন — guaranteed।' },
  { icon: '🔒', title: 'Source Code আপনার', desc: 'Project শেষে সম্পূর্ণ source code আপনাকে দেওয়া হবে।' },
  { icon: '📱', title: 'Mobile-First Design', desc: 'সব project মোবাইলে perfect দেখায় — guaranteed।' },
  { icon: '🛡️', title: '১ বছর Free Maintenance', desc: 'Launch-এর পরে ১ বছর free bug fix ও minor update।' },
  { icon: '💬', title: '২৪/৭ Support', desc: 'যেকোনো সমস্যায় WhatsApp-এ সাথে সাথে response।' },
  { icon: '🏆', title: '৫০০+ সফল Project', desc: 'Bangladesh জুড়ে ৫০০-এর বেশি satisfied client।' },
  { icon: '🔧', title: 'Custom Solution', desc: 'আপনার business-এর জন্য specifically তৈরি solution।' },
  { icon: '📊', title: 'SEO Optimized', desc: 'Google-এ rank করার জন্য সব project SEO-ready।' },
  { icon: '🌐', title: 'Free Hosting & Domain', desc: 'প্রথম বছরে hosting ও domain cost আমাদের।' },
];

/* ------------------------------------------------
   DATA — Sales Guide
   ------------------------------------------------ */
const SALES_GUIDE = [
  {
    title: '🎯 Opening Script',
    type: 'script',
    content: `"ভাই/আপু, আমি DhandaBuzz Development Team থেকে বলছি। আপনি কি আপনার business-এর জন্য একটি website বা app নিয়ে ভাবছেন? আমরা একটি unique offer করছি — আগে Free Preview দেখুন, পছন্দ হলে তারপর কাজ শুরু করি।"`,
  },
  {
    title: '✅ Key Selling Points',
    type: 'list',
    items: [
      'আগে Free Preview — কোনো Advance ছাড়াই',
      'Ready Setup মাত্র ৳4,999 থেকে',
      '১১% Cashback নির্দিষ্ট packages-এ',
      '৭ দিনে Delivery guarantee',
      '১ বছর Free Maintenance',
      'Source code client-এর কাছে থাকবে',
    ],
  },
  {
    title: '❓ Common Objections & Responses',
    type: 'qa',
    items: [
      { q: '"দাম বেশি মনে হচ্ছে"', a: '"ভাই, আমরা first একটা free preview দেখাই। তারপর budget নিয়ে কথা বলি। অনেক সময় customized package করা যায়।"' },
      { q: '"আগে কাজ দেখতে চাই"', a: '"অবশ্যই! সেটার জন্যই আমাদের Free Preview — কোনো advance ছাড়াই আপনার project-এর design দেখব।"' },
      { q: '"অন্য agency আছে সস্তায়"', a: '"দেখুন, সস্তা মানেই ভালো না। আমাদের ৫০০+ satisfied client আছে, source code দিই, ১ বছর support দিই।"' },
      { q: '"এখন সময় নেই"', a: '"ঠিক আছে, requirement form-টা ৫ মিনিটে fill করুন। আমরা আপনার convenient time-এ contact করব।"' },
    ],
  },
  {
    title: '📋 Qualification Checklist',
    type: 'list',
    items: [
      'Business type ও industry জানুন',
      'Current digital presence (কি website আছে?)',
      'Budget range বুঝুন (direct বা indirect)',
      'Timeline জানুন (urgent নাকি planned)',
      'Decision maker কে? (তিনিই কথা বলছেন?)',
      'Main pain point কী? (speed, design, features?)',
    ],
  },
  {
    title: '💬 Closing Script',
    type: 'script',
    content: `"আচ্ছা ভাই/আপু, তাহলে আমি আপনার জন্য একটা free requirement analysis করি। আপনার WhatsApp number-এ আমি একটা form link পাঠাব — ৫ মিনিট সময় নিয়ে fill করলেই হবে। তারপর আমরা একটা free mockup তৈরি করে দেখাব। চলবে?"`,
  },
];

/* ================================================
   MAIN APP OBJECT
   ================================================ */
const DB = {
  currentPricingTab: 'website',

  /* ------ INIT ------ */
  init() {
    this.renderServices();
    this.renderPricing('website');
    this.renderFlowSteps();
    this.renderWhyPoints();
    this.renderSalesGuide();
    this.initNavScroll();
    this.initNavToggle();
    this.showFabAfterDelay();
  },

  /* ------ NAVIGATION ------ */
  scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
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
    toggle.classList.toggle('open');
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
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        this.closeNav();
      }
    });
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

  /* ------ RENDERING ------ */
  renderServices() {
    const grid = document.getElementById('svcGrid');
    if (!grid) return;
    grid.innerHTML = SERVICES.map(s => `
      <div class="svc-card">
        <div class="svc-icon">${s.icon}</div>
        <h3 class="svc-title">${s.title}</h3>
        <p class="svc-desc">${s.desc}</p>
        <a href="#" class="svc-link" onclick="return DB.navTo('requirement-form')">জানতে চাই →</a>
      </div>
    `).join('');
  },

  renderPricing(tab) {
    const container = document.getElementById('pricingPanels');
    if (!container) return;
    const plans = PRICING[tab] || [];
    container.innerHTML = `<div class="p-panels">` + plans.map(p => `
      <div class="p-card${p.highlight ? ' highlighted' : ''}">
        ${p.tag ? `<div class="p-tag">${p.tag}</div>` : ''}
        <div class="p-name">${p.name}</div>
        <div class="p-price">${p.price}<span class="p-period"> / ${p.period}</span></div>
        <ul class="p-features">
          ${p.features.map(f => `<li><span class="p-check">✓</span>${f}</li>`).join('')}
        </ul>
        <a href="#" class="btn-primary${p.highlight ? '' : ' btn-outline'}"
           onclick="return DB.navTo('requirement-form')" data-event="pricing_cta_click">
          এই Package নিতে চাই
        </a>
      </div>
    `).join('') + `</div>`;
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
      </div>
    `).join('');
  },

  renderWhyPoints() {
    const grid = document.getElementById('whyGrid');
    if (!grid) return;
    grid.innerHTML = WHY_POINTS.map(p => `
      <div class="why-card">
        <div class="why-icon">${p.icon}</div>
        <div class="why-text">
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
        </div>
      </div>
    `).join('');
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
          </div>
        `).join('');
      }
      return `<div class="guide-block"><h3>${block.title}</h3>${content}</div>`;
    }).join('');
  },

  /* ------ WHATSAPP ------ */
  openWhatsApp(source) {
    const msg = encodeURIComponent('আস্সালামুআলাইকুম! DhandaBuzz Development Department-এর সাথে কথা বলতে চাই।');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    this.trackEvent('whatsapp_click', { source });
  },

  /* ------ FORM SUBMISSION ------ */
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

    if (!name || !phone) {
      this.toast('নাম ও WhatsApp নম্বর দিন।', 'error');
      return;
    }
    if (!projectType) {
      this.toast('Project type বেছে নিন।', 'error');
      return;
    }
    if (!details) {
      this.toast('Project-এর বিস্তারিত লিখুন।', 'error');
      return;
    }

    const btn = form.querySelector('[type="submit"]');
    const btnText = document.getElementById('submitBtnText');
    btn.disabled = true;
    btnText.textContent = 'পাঠানো হচ্ছে…';

    const waMsg = this.buildWhatsAppMessage({
      name, phone, businessName, projectType, budget, timeline,
      features, designStyle, details, refLink, source,
    });

    document.getElementById('modalWaBtn').href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`;

    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Free Preview Request পাঠান →';
      this.showModal();
      this.trackEvent('requirement_submit', { projectType, budget });
    }, 600);
  },

  buildWhatsAppMessage(d) {
    const featureStr = d.features.length ? d.features.join(', ') : 'উল্লেখ নেই';
    const msg = `🌟 *DhandaBuzz — নতুন Project Requirement*

👤 *নাম:* ${d.name}
📱 *WhatsApp:* ${d.phone}
🏢 *Business:* ${d.businessName || 'উল্লেখ নেই'}

📌 *Project Type:* ${d.projectType}
💰 *Budget:* ${d.budget}
⏱️ *Timeline:* ${d.timeline}
🎨 *Design Style:* ${d.designStyle || 'উল্লেখ নেই'}

⚙️ *Features চাই:* ${featureStr}

📝 *Details:*
${d.details}

🔗 *Reference:* ${d.refLink || 'নেই'}
📣 *কীভাবে পেলেন:* ${d.source}

_DhandaBuzz Development Department_`;
    return encodeURIComponent(msg);
  },

  /* ------ MODAL ------ */
  showModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  },

  /* ------ SALES GUIDE ------ */
  showSalesGuide() {
    const guide = document.getElementById('salesGuide');
    if (guide) {
      guide.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  },

  hideSalesGuide() {
    const guide = document.getElementById('salesGuide');
    if (guide) {
      guide.style.display = 'none';
      document.body.style.overflow = '';
    }
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

  /* ------ ANALYTICS STUB ------ */
  trackEvent(name, props = {}) {
    if (window.gtag) window.gtag('event', name, props);
    if (window.fbq) window.fbq('trackCustom', name, props);
  },
};

/* ------ Close modal on backdrop click ------ */
document.addEventListener('click', (e) => {
  if (e.target.id === 'successModal') DB.closeModal();
  if (e.target.id === 'salesGuide') DB.hideSalesGuide();
});

document.addEventListener('DOMContentLoaded', () => DB.init());
