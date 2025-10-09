/**
* Template Name: DevFolio
* (Modified by Nur Baishah's Final Code)
*/

(function() {
  "use strict";

  // --- STANDARD DEV-FOLIO FUNCTIONS (Kept as is) ---
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) { mobileNavToggleBtn.addEventListener('click', mobileNavToogle); }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => { if (document.querySelector('.mobile-nav-active')) { mobileNavToogle(); } });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => { preloader.remove(); });
  }

  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) { window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active'); }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() { AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false }); }
  window.addEventListener('load', aosInit);

  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', { strings: typed_strings, loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000 });
  }

  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => { el.style.width = el.getAttribute('aria-valuenow') + '%'; });
      }
    });
  });

  if (typeof PureCounter !== 'undefined') { new PureCounter(); }

  // --- CRITICAL GLIGHTBOX FIX & INITIALIZATION ---

  // Custom handler function to load external HTML into the modal
  function loadHtmlInModal(e) {
    e.preventDefault();
    e.stopPropagation();

    const htmlPageUrl = this.getAttribute('href');

    const instance = GLightbox({
        selector: false, // Use instance mode
        type: 'html', // Tell Glightbox to handle it as an HTML source
        width: '90vw',
        height: '90vh',
        elements: [{
            'content': `<iframe src="${htmlPageUrl}" style="width: 100%; height: 100%; border: none;"></iframe>`,
            'type': 'html', // Explicitly define type for the element
            'description': this.getAttribute('title')
        }]
    });
    instance.open();
  }

  // 1. Initiate global Glightbox for media (video/image) links
  const globalGlightbox = GLightbox({
    selector: '.glightbox'
  });

  // 2. Attach the custom handler to all detail links that point to HTML files
  document.querySelectorAll('.preview-link[href$=".html"]').forEach(link => {
    link.addEventListener('click', loadHtmlInModal);
  });
  
  // Also attach to the dedicated details-link chain icons if needed (optional based on your HTML)
  document.querySelectorAll('.details-link[href$=".html"]').forEach(link => {
      link.addEventListener('click', loadHtmlInModal);
  });
  
  // --- END GLIGHTBOX FIX ---


  // --- ISOTOPE LAYOUT INITIALIZATION (Standard DevFolio) ---
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
      imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
        initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });
    }

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        if (initIsotope) { initIsotope.arrange({ filter: this.getAttribute('data-filter') }); }
        if (typeof aosInit === 'function') { aosInit(); }
      }, false);
    });
  });

  // --- REMAINING DEV-FOLIO SCRIPTS (Standard) ---
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => { faqItem.parentNode.classList.toggle('faq-active'); });
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      if (swiperElement.classList.contains("swiper-tab")) { /* Custom function needed for tabs */ } 
      else { new Swiper(swiperElement, config); }
    });
  }
  window.addEventListener("load", initSwiper);

  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({ top: section.offsetTop - parseInt(scrollMarginTop), behavior: 'smooth' });
        }, 100);
      }
    }
  });

  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
