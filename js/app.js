/* ========================================
   DhandaBuzz Portal - Main Application
   ======================================== */

const App = {
  currentPage: 'home',
  maalBalance: 500, // Default demo balance

  init() {
    this.bindNavigation();
    this.bindMobileMenu();
    this.showPage('home');
    CreativeEngine.init();
    WebLaunchLab.init();
    AdScaleEngine.init();
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
    if (toggle) {
      toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }
  },

  showPage(pageId) {
    // Close mobile menu
    document.querySelector('.navbar-nav')?.classList.remove('open');

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show target
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add('active');
      this.currentPage = pageId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update nav active
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
      if (!files.find(x => x.name === f.name)) {
        files.push(f);
      }
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
  selectedType: '',
  selectedQty: 0,
  cost: 0,

  pricing: {
    'ad-image': { name: 'Ad Image', prices: { 1: 10, 5: 45, 10: 80 } },
    'offer-poster': { name: 'Offer Poster', prices: { 1: 10, 5: 45, 10: 80 } },
    'social-media-post': { name: 'Social Media Post', prices: { 1: 10, 5: 45, 10: 80 } },
    'short-promo-video': { name: 'Short Promo Video', prices: { 1: 50 } },
    'caption-ad-copy': { name: 'Caption / Ad Copy', prices: { 1: 10, 5: 45, 10: 80 } },
  },

  init() {
    this.fileUpload = setupFileUpload('ce-upload-area', 'ce-file-list');

    // Creative type selection
    document.querySelectorAll('#creative-engine input[name="creative-type"]').forEach(el => {
      el.addEventListener('change', () => {
        this.selectedType = el.value;
        this.updateQuantityOptions();
        this.updateCost();
      });
    });

    // Form submit
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

    App.showSuccessModal('Creative Engine');
    form.reset();
    this.selectedType = '';
    this.selectedQty = 0;
    this.cost = 0;
    document.getElementById('ce-qty-options').innerHTML = '';
    document.getElementById('ce-file-list').innerHTML = '';
    this.updateCost();
  }
};

/* ========================================
   Web Launch Lab Module
   ======================================== */

const WebLaunchLab = {
  selectedType: '',
  cost: 0,

  pricing: {
    'landing-page': { name: 'Landing / Order Page', price: 300 },
    'portfolio-site': { name: 'Portfolio / Profile Site', price: 450 },
    'business-website': { name: 'Business Website', price: 700 },
    'ecommerce-starter': { name: 'E-commerce Starter', price: 1200 },
    'custom-web-app': { name: 'Custom Web App', price: 0 },
  },

  init() {
    this.fileUpload = setupFileUpload('wll-upload-area', 'wll-file-list');

    // Type selection via pricing items
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

    App.showSuccessModal('Web Launch Lab');
    form.reset();
    this.selectedType = '';
    this.cost = 0;
    document.querySelectorAll('#web-launch-lab .pricing-item').forEach(p => p.classList.remove('selected'));
    document.getElementById('wll-file-list').innerHTML = '';
    this.updateCost();
  }
};

/* ========================================
   AdScale Engine Module
   ======================================== */

const AdScaleEngine = {
  selectedPlan: '',
  cost: 0,

  pricing: {
    'ad-plan-unlock': { name: 'Ad Plan Unlock', price: 50 },
    'full-planning-bundle': { name: 'Full Planning Bundle', price: 100 },
    'campaign-setup': { name: 'Campaign Setup', price: 300 },
    'full-launch-support': { name: 'Full Launch Support', price: 700 },
  },

  init() {
    // Plan selection
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

    App.showSuccessModal('AdScale Engine');
    form.reset();
    this.selectedPlan = '';
    this.cost = 0;
    document.querySelectorAll('#adscale-engine .pricing-item').forEach(p => p.classList.remove('selected'));
    this.updateCost();
  }
};

/* ========================================
   Initialize on DOM ready
   ======================================== */

document.addEventListener('DOMContentLoaded', () => App.init());
