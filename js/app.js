/* ========================================
   DhandaBuzz Portal - Main Application
   ======================================== */

const App = {
  currentPage: 'home',
  maalBalance: 500,
  orders: [],

  init() {
    this.bindNavigation();
    this.bindMobileMenu();
    this.showPage('home');
    CreativeEngine.init();
    WebLaunchLab.init();
    AdScaleEngine.init();
    this.initNewServices();
    this.loadOrders();
  },

  initNewServices() {
    ['branding', 'seo', 'whatsapp-automation', 'crm-setup', 'ecommerce-growth', 'consultation'].forEach(svc => {
      const form = document.getElementById(`${svc}-form`);
      if (form) form.addEventListener('submit', (e) => {
        e.preventDefault();
        const bizName = form.querySelector('[name="business-name"]')?.value.trim();
        if (!bizName) { alert('Please enter Business Name'); return; }
        if (!Services.selectedCosts[svc]) { alert('Please select a package'); return; }
        App.submitOrder(svc, Services.selectedCosts[svc]);
      });
    });
  },

  bindNavigation() {
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.showPage(el.dataset.page);
      });
    });
  },

  bindMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.navbar-nav');
    if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));
  },

  showPage(pageId) {
    document.querySelector('.navbar-nav')?.classList.remove('open');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
      this.currentPage = pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.querySelectorAll('.navbar-nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.page === pageId);
    });
  },

  updateMaalDisplay() {
    document.querySelectorAll('.maal-balance-value').forEach(el => {
      el.textContent = this.maalBalance;
    });
  },

  showSuccessModal(serviceName) {
    const modal = document.getElementById('successModal');
    const nameEl = modal.querySelector('.service-name');
    if (nameEl) nameEl.textContent = serviceName;
    modal.classList.add('show');
  },

  closeModal() {
    document.getElementById('successModal').classList.remove('show');
    this.showPage('home');
  },

  showMaalTopup() {
    document.getElementById('maalTopupModal').classList.add('show');
  },

  closeMaalModal() {
    document.getElementById('maalTopupModal').classList.remove('show');
  },

  addMaal(amount) {
    this.maalBalance += amount;
    this.updateMaalDisplay();
    this.closeMaalModal();
    alert(`✅ Added ${amount} Maal! New balance: ${this.maalBalance}`);
  },

  submitOrder(service, cost) {
    this.maalBalance -= cost;
    this.updateMaalDisplay();

    const serviceNames = {
      'branding': 'Branding', 'seo': 'SEO', 'whatsapp-automation': 'WhatsApp Automation',
      'crm-setup': 'CRM Setup', 'ecommerce-growth': 'E-commerce Growth', 'consultation': 'Consultation'
    };

    this.orders.unshift({
      id: 'ORD-' + Date.now(),
      service: serviceNames[service],
      cost, date: new Date().toLocaleDateString(),
      status: 'Pending Review'
    });
    localStorage.setItem('dhandabuzz_orders', JSON.stringify(this.orders));

    this.showSuccessModal(serviceNames[service]);
    document.getElementById(`${service}-form`)?.reset();
    Services.selectedCosts[service] = 0;
    const costEl = document.getElementById(`${service}-cost`);
    if (costEl) costEl.textContent = '-- Maal';
    document.getElementById(`${service}-remaining`)?.setAttribute('style', 'display: none;');
  },

  loadOrders() {
    this.orders = JSON.parse(localStorage.getItem('dhandabuzz_orders')) || [];
    this.updateDashboard();
  },

  updateDashboard() {
    const total = this.orders.length;
    const pending = this.orders.filter(o => o.status === 'Pending Review').length;
    const completed = this.orders.filter(o => o.status === 'Completed').length;

    document.getElementById('total-requests').textContent = total;
    document.getElementById('pending-requests').textContent = pending;
    document.getElementById('completed-requests').textContent = completed;

    const list = document.getElementById('orders-list');
    if (total === 0) {
      list.innerHTML = '<p style="color: var(--text-muted);">No requests yet. Start by ordering a service!</p>';
    } else {
      list.innerHTML = this.orders.map(o => `
        <div style="background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 12px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; color: var(--text-primary);">${o.service}</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">${o.date} • ${o.id}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 700; color: var(--gold);">${o.cost} Maal</div>
              <div style="font-size: 0.85rem; color: ${o.status === 'Completed' ? 'var(--success)' : 'var(--warning)'};">${o.status}</div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
};

/* ========================================
   Services Helper
   ======================================== */

const Services = {
  selectedCosts: {
    branding: 0, seo: 0, 'whatsapp-automation': 0, 'crm-setup': 0, 'ecommerce-growth': 0, consultation: 0
  },

  selectPackage(service, element, cost) {
    this.selectedCosts[service] = cost;
    document.querySelectorAll(`#${service} .pricing-item`).forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    const costEl = document.getElementById(`${service}-cost`);
    const remainEl = document.getElementById(`${service}-remaining`);
    if (costEl) {
      costEl.textContent = `${cost} Maal`;
      const remaining = App.maalBalance - cost;
      remainEl.textContent = `Remaining: ${remaining} Maal`;
      remainEl.className = 'remaining-balance' + (remaining < 0 ? ' negative' : '');
    }
  }
};

/* ========================================
   File Upload Helper
   ======================================== */

function setupFileUpload(areaId, listId) {
  const area = document.getElementById(areaId);
  const list = document.getElementById(listId);
  const input = area?.querySelector('input[type="file"]');
  const files = [];

  if (!area || !input) return { getFiles: () => files };

  input.addEventListener('change', () => {
    Array.from(input.files).forEach(f => {
      if (!files.find(x => x.name === f.name)) files.push(f);
    });
    renderFiles();
    input.value = '';
  });

  function renderFiles() {
    list.innerHTML = files.map((f, i) => `
      <span class="upload-file-item">
        ${f.name}
        <span class="remove-file" onclick="this.closest('.upload-file-item').remove(); window._uploads_${areaId}?.splice(${i}, 1);">&times;</span>
      </span>
    `).join('');
  }

  window[`_uploads_${areaId}`] = files;
  return { getFiles: () => files };
}

/* ========================================
   Creative Engine Module
   ======================================== */

const CreativeEngine = {
  selectedType: '', selectedQty: 0, cost: 0,
  pricing: {
    'ad-image': { name: 'Ad Image', prices: { 1: 10, 5: 45, 10: 80 } },
    'offer-poster': { name: 'Offer Poster', prices: { 1: 10, 5: 45, 10: 80 } },
    'social-media-post': { name: 'Social Media Post', prices: { 1: 10, 5: 45, 10: 80 } },
    'short-promo-video': { name: 'Short Promo Video', prices: { 1: 50 } },
    'caption-ad-copy': { name: 'Caption / Ad Copy', prices: { 1: 10, 5: 45, 10: 80 } },
  },

  init() {
    this.fileUpload = setupFileUpload('ce-upload-area', 'ce-file-list');
    document.querySelectorAll('#creative-engine input[name="creative-type"]').forEach(el => {
      el.addEventListener('change', () => {
        this.selectedType = el.value;
        this.updateQuantityOptions();
        this.updateCost();
      });
    });
    document.getElementById('ce-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  },

  updateQuantityOptions() {
    const container = document.getElementById('ce-qty-options');
    const info = this.pricing[this.selectedType];
    if (!info) { container.innerHTML = ''; return; }
    container.innerHTML = Object.entries(info.prices).map(([qty, price]) => `
      <div class="pricing-item" onclick="CreativeEngine.selectQty(${qty}, ${price})">
        <div class="item-name">${qty}x ${info.name}</div>
        <div class="item-price">${price} Maal</div>
        ${qty > 1 ? `<div class="item-price-sub">${(price/qty).toFixed(0)} Maal each</div>` : ''}
      </div>
    `).join('');
  },

  selectQty(qty, price) {
    this.selectedQty = qty;
    this.cost = price;
    document.querySelectorAll('#ce-qty-options .pricing-item').forEach(el => el.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
    this.updateCost();
  },

  updateCost() {
    const costEl = document.getElementById('ce-cost-value');
    const remainEl = document.getElementById('ce-remaining');
    if (!costEl) return;
    costEl.textContent = this.cost ? `${this.cost} Maal` : '-- Maal';
    if (this.cost) {
      const remaining = App.maalBalance - this.cost;
      remainEl.textContent = `Remaining: ${remaining} Maal`;
      remainEl.className = 'remaining-balance' + (remaining < 0 ? ' negative' : '');
    } else {
      remainEl.textContent = '';
    }
  },

  submit() {
    const form = document.getElementById('ce-form');
    const bizName = form.querySelector('[name="business-name"]').value.trim();
    if (!bizName) { alert('Please enter your Business Name'); return; }
    if (!this.selectedType) { alert('Please select a creative type'); return; }
    if (!this.cost) { alert('Please select a quantity/package'); return; }

    App.maalBalance -= this.cost;
    App.orders.unshift({
      id: 'ORD-' + Date.now(), service: 'Creative Engine', cost: this.cost,
      date: new Date().toLocaleDateString(), status: 'Pending Review'
    });
    localStorage.setItem('dhandabuzz_orders', JSON.stringify(App.orders));
    App.updateMaalDisplay();
    App.updateDashboard();

    App.showSuccessModal('Creative Engine');
    form.reset();
    this.selectedType = ''; this.selectedQty = 0; this.cost = 0;
    document.getElementById('ce-qty-options').innerHTML = '';
    document.getElementById('ce-file-list').innerHTML = '';
    this.updateCost();
  }
};

/* ========================================
   Web Launch Lab Module
   ======================================== */

const WebLaunchLab = {
  selectedType: '', cost: 0,
  pricing: {
    'landing-page': { name: 'Landing / Order Page', price: 300 },
    'portfolio-site': { name: 'Portfolio / Profile Site', price: 450 },
    'business-website': { name: 'Business Website', price: 700 },
    'ecommerce-starter': { name: 'E-commerce Starter', price: 1200 },
    'custom-web-app': { name: 'Custom Web App', price: 0 },
  },

  init() {
    this.fileUpload = setupFileUpload('wll-upload-area', 'wll-file-list');
    document.querySelectorAll('#web-launch-lab .pricing-item[data-type]').forEach(el => {
      el.addEventListener('click', () => {
        this.selectType(el.dataset.type);
        document.querySelectorAll('#web-launch-lab .pricing-item').forEach(p => p.classList.remove('selected'));
        el.classList.add('selected');
      });
    });
    document.getElementById('wll-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  },

  selectType(typeKey) {
    const info = this.pricing[typeKey];
    if (!info) return;
    this.selectedType = typeKey;
    this.cost = info.price;
    this.updateCost();
  },

  updateCost() {
    const costEl = document.getElementById('wll-cost-value');
    const remainEl = document.getElementById('wll-remaining');
    if (!costEl) return;
    if (this.selectedType === 'custom-web-app') {
      costEl.textContent = 'Custom Quote';
      remainEl.textContent = '';
    } else if (this.cost) {
      costEl.textContent = `${this.cost} Maal`;
      const remaining = App.maalBalance - this.cost;
      remainEl.textContent = `Remaining: ${remaining} Maal`;
      remainEl.className = 'remaining-balance' + (remaining < 0 ? ' negative' : '');
    } else {
      costEl.textContent = '-- Maal';
      remainEl.textContent = '';
    }
  },

  submit() {
    const form = document.getElementById('wll-form');
    const bizName = form.querySelector('[name="business-name"]').value.trim();
    if (!bizName) { alert('Please enter your Business Name'); return; }
    if (!this.selectedType) { alert('Please select a website type'); return; }

    App.maalBalance -= this.cost;
    App.orders.unshift({
      id: 'ORD-' + Date.now(), service: 'Web Launch Lab', cost: this.cost,
      date: new Date().toLocaleDateString(), status: 'Pending Review'
    });
    localStorage.setItem('dhandabuzz_orders', JSON.stringify(App.orders));
    App.updateMaalDisplay();
    App.updateDashboard();

    App.showSuccessModal('Web Launch Lab');
    form.reset();
    this.selectedType = ''; this.cost = 0;
    document.querySelectorAll('#web-launch-lab .pricing-item').forEach(p => p.classList.remove('selected'));
    document.getElementById('wll-file-list').innerHTML = '';
    this.updateCost();
  }
};

/* ========================================
   AdScale Engine Module
   ======================================== */

const AdScaleEngine = {
  selectedPlan: '', cost: 0,
  pricing: {
    'ad-plan-unlock': { name: 'Ad Plan Unlock', price: 50 },
    'full-planning-bundle': { name: 'Full Planning Bundle', price: 100 },
    'campaign-setup': { name: 'Campaign Setup', price: 300 },
    'full-launch-support': { name: 'Full Launch Support', price: 700 },
  },

  init() {
    document.querySelectorAll('#adscale-engine .pricing-item[data-plan]').forEach(el => {
      el.addEventListener('click', () => {
        this.selectPlan(el.dataset.plan);
        document.querySelectorAll('#adscale-engine .pricing-item').forEach(p => p.classList.remove('selected'));
        el.classList.add('selected');
      });
    });
    document.getElementById('as-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  },

  selectPlan(planKey) {
    const info = this.pricing[planKey];
    if (!info) return;
    this.selectedPlan = planKey;
    this.cost = info.price;
    this.updateCost();
  },

  updateCost() {
    const costEl = document.getElementById('as-cost-value');
    const remainEl = document.getElementById('as-remaining');
    if (!costEl) return;
    costEl.textContent = this.cost ? `${this.cost} Maal` : '-- Maal';
    if (this.cost) {
      const remaining = App.maalBalance - this.cost;
      remainEl.textContent = `Remaining: ${remaining} Maal`;
      remainEl.className = 'remaining-balance' + (remaining < 0 ? ' negative' : '');
    } else {
      remainEl.textContent = '';
    }
  },

  submit() {
    const form = document.getElementById('as-form');
    const bizName = form.querySelector('[name="business-name"]').value.trim();
    if (!bizName) { alert('Please enter your Business Name'); return; }
    if (!this.selectedPlan) { alert('Please select a plan'); return; }

    App.maalBalance -= this.cost;
    App.orders.unshift({
      id: 'ORD-' + Date.now(), service: 'AdScale Engine', cost: this.cost,
      date: new Date().toLocaleDateString(), status: 'Pending Review'
    });
    localStorage.setItem('dhandabuzz_orders', JSON.stringify(App.orders));
    App.updateMaalDisplay();
    App.updateDashboard();

    App.showSuccessModal('AdScale Engine');
    form.reset();
    this.selectedPlan = ''; this.cost = 0;
    document.querySelectorAll('#adscale-engine .pricing-item').forEach(p => p.classList.remove('selected'));
    this.updateCost();
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
