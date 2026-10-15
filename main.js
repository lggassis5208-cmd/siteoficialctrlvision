/**
 * CTRL VISION • Product Interaction Engine
 * Interatividade direta da UI do App Mobile, Modal de Demonstração e FAQ
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. STATE & CLINICAL PRESCRIPTION MANAGEMENT
  // =========================================================================
  const appState = {
    od: { esf: -1.75, cil: -0.50, eixo: 180 },
    oe: { esf: -2.00, cil: -0.75, eixo: 175 }
  };

  function formatDiopter(val) {
    const num = Number(val);
    if (num > 0) return `+${num.toFixed(2)}`;
    if (num === 0) return `0.00`;
    return num.toFixed(2);
  }

  // =========================================================================
  // 2. INTERACTIVE MOBILE APP MOCKUP & MODAL
  // =========================================================================
  const appModal = document.getElementById('app-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');

  function openModal() {
    if (appModal) {
      appModal.classList.add('open');
      appModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (appModal) {
      appModal.classList.remove('open');
      appModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Triggers for opening the modal
  document.querySelectorAll('.open-app-mockup').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  const exploreStamp = document.getElementById('btn-explore-stamp');
  if (exploreStamp) exploreStamp.addEventListener('click', openModal);

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  if (appModal) {
    appModal.addEventListener('click', (e) => {
      if (e.target === appModal) closeModal();
    });
  }

  // App Tabs (Dashboard | Refração | Receita)
  const segTabs = document.querySelectorAll('.seg-tab');
  const appViews = document.querySelectorAll('.app-view');

  function switchAppTab(tabName) {
    segTabs.forEach(t => {
      if (t.getAttribute('data-app-tab') === tabName) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    appViews.forEach(v => {
      if (v.id === `view-${tabName}`) {
        v.classList.add('active');
      } else {
        v.classList.remove('active');
      }
    });
  }

  segTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-app-tab');
      switchAppTab(tabName);
    });
  });

  const btnModalGoRef = document.getElementById('btn-modal-go-ref');
  if (btnModalGoRef) {
    btnModalGoRef.addEventListener('click', () => switchAppTab('refracao'));
  }

  const btnModalGoRecipe = document.getElementById('btn-modal-go-recipe');
  if (btnModalGoRecipe) {
    btnModalGoRecipe.addEventListener('click', () => switchAppTab('receita'));
  }

  // Steppers for Diopter Adjustment (+ and - 0.25D)
  function updateAppScreen() {
    // OD
    const odEsf = document.getElementById('app-od-esf');
    const odCil = document.getElementById('app-od-cil');
    const odEixo = document.getElementById('app-od-eixo');
    if (odEsf) odEsf.textContent = formatDiopter(appState.od.esf);
    if (odCil) odCil.textContent = formatDiopter(appState.od.cil);
    if (odEixo) odEixo.textContent = `${appState.od.eixo}°`;

    // OE
    const oeEsf = document.getElementById('app-oe-esf');
    const oeCil = document.getElementById('app-oe-cil');
    const oeEixo = document.getElementById('app-oe-eixo');
    if (oeEsf) oeEsf.textContent = formatDiopter(appState.oe.esf);
    if (oeCil) oeCil.textContent = formatDiopter(appState.oe.cil);
    if (oeEixo) oeEixo.textContent = `${appState.oe.eixo}°`;

    // Recipe Sheet
    const sOdEsf = document.getElementById('sheet-od-esf');
    const sOdCil = document.getElementById('sheet-od-cil');
    const sOdEixo = document.getElementById('sheet-od-eixo');
    const sOeEsf = document.getElementById('sheet-oe-esf');
    const sOeCil = document.getElementById('sheet-oe-cil');
    const sOeEixo = document.getElementById('sheet-oe-eixo');

    if (sOdEsf) sOdEsf.textContent = formatDiopter(appState.od.esf);
    if (sOdCil) sOdCil.textContent = formatDiopter(appState.od.cil);
    if (sOdEixo) sOdEixo.textContent = `${appState.od.eixo}°`;
    if (sOeEsf) sOeEsf.textContent = formatDiopter(appState.oe.esf);
    if (sOeCil) sOeCil.textContent = formatDiopter(appState.oe.cil);
    if (sOeEixo) sOeEixo.textContent = `${appState.oe.eixo}°`;
  }

  document.querySelectorAll('.btn-st-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const eye = btn.getAttribute('data-eye');
      const param = btn.getAttribute('data-param');
      const isPlus = btn.classList.contains('plus');
      const step = (param === 'eixo') ? 5 : 0.25;

      if (isPlus) {
        appState[eye][param] += step;
      } else {
        appState[eye][param] -= step;
      }

      // Constraints
      if (param === 'eixo') {
        if (appState[eye].eixo > 180) appState[eye].eixo = 5;
        if (appState[eye].eixo < 0) appState[eye].eixo = 180;
      }

      updateAppScreen();
    });
  });

  // Test WhatsApp Send button in modal
  const btnTestSendWpp = document.getElementById('btn-test-send-wpp');
  if (btnTestSendWpp) {
    btnTestSendWpp.addEventListener('click', () => {
      const originalText = btnTestSendWpp.innerHTML;
      btnTestSendWpp.innerHTML = '<span>✓ Receita Enviada com Sucesso!</span>';
      btnTestSendWpp.style.backgroundColor = '#15803D';
      
      setTimeout(() => {
        btnTestSendWpp.innerHTML = originalText;
        btnTestSendWpp.style.backgroundColor = '#25D366';
      }, 3000);
    });
  }

  // =========================================================================
  // 3. FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // =========================================================================
  // 4. FAVORITE BUTTONS TOGGLE
  // =========================================================================
  document.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      if (btn.classList.contains('active')) {
        btn.style.color = '#EF4444';
      } else {
        btn.style.color = '';
      }
    });
  });

  // Initial UI refresh
  updateAppScreen();
});
