/* ==========================================================================
   PRIME PACKAGING - INTERACTIVE JAVASCRIPT & UI CONTROLS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Transparent Header on Scroll
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 1B. Automatic Dynamic Mobile Navigation Generator from Main Desktop Header (#mainNav)
  const mainNav = document.getElementById('mainNav');
  const mobileNavContent = document.getElementById('mobileNavContent');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  const closeMobileNav = () => {
    if (mobileNavOverlay && mobileNavDrawer) {
      mobileNavOverlay.classList.remove('active');
      mobileNavDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  const openMobileNav = () => {
    if (mobileNavOverlay && mobileNavDrawer) {
      mobileNavOverlay.classList.add('active');
      mobileNavDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  if (mainNav && mobileNavContent) {
    const buildMobileMenu = () => {
      mobileNavContent.innerHTML = '';
      
      Array.from(mainNav.children).forEach(child => {
        if (child.classList.contains('nav-link-custom') && !child.classList.contains('dropdown-toggle-custom')) {
          const link = document.createElement('a');
          link.href = child.href || '#';
          link.className = 'mobile-nav-link';
          link.innerText = child.innerText.trim();
          link.addEventListener('click', closeMobileNav);
          mobileNavContent.appendChild(link);
        }
        else if (child.classList.contains('nav-dropdown-group')) {
          const toggle = child.querySelector('.dropdown-toggle-custom');
          const menu = child.querySelector('.nav-dropdown-menu');
          if (toggle && menu) {
            const groupContainer = document.createElement('div');
            groupContainer.className = 'mobile-dropdown-section';
            
            const headerLink = document.createElement('div');
            headerLink.className = 'mobile-nav-link';
            headerLink.style.cursor = 'pointer';
            const toggleSpanText = toggle.querySelector('span') ? toggle.querySelector('span').innerText.trim() : toggle.innerText.trim();
            headerLink.innerHTML = `<span>${toggleSpanText}</span> <i class="bi bi-chevron-down fs-6"></i>`;
            
            const subMenuContainer = document.createElement('div');
            subMenuContainer.className = 'mobile-sub-menu';
            
            Array.from(menu.querySelectorAll('.dropdown-item-custom')).forEach(subItem => {
              const subLink = document.createElement('a');
              subLink.href = subItem.href || '#';
              subLink.className = 'mobile-sub-link';
              subLink.innerHTML = subItem.innerHTML;
              subLink.addEventListener('click', closeMobileNav);
              subMenuContainer.appendChild(subLink);
            });

            headerLink.addEventListener('click', () => {
              const isCollapsed = subMenuContainer.style.display === 'none';
              subMenuContainer.style.display = isCollapsed ? 'block' : 'none';
              const icon = headerLink.querySelector('.bi');
              if (icon) {
                icon.className = isCollapsed ? 'bi bi-chevron-up fs-6' : 'bi bi-chevron-down fs-6';
              }
            });
            
            groupContainer.appendChild(headerLink);
            groupContainer.appendChild(subMenuContainer);
            mobileNavContent.appendChild(groupContainer);
          }
        }
      });
    };

    buildMobileMenu();

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileNav);
    if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  // 2. Animated Counter for Trust Statistics Bar
  const statsSection = document.querySelector('.stats-bar-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      
      const timer = setInterval(() => {
        const increment = Math.ceil(target / 40);
        current += increment;
        if (current >= target) {
          stat.innerText = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          stat.innerText = current.toLocaleString() + suffix;
        }
      }, 40);
    });
  };

  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animateStats();
        animated = true;
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // 3. Product Customization Studio Interactive Preview
  const bagPreviewBox = document.getElementById('bag-visual-mock');
  const previewSize = document.getElementById('prev-size');
  const previewGsm = document.getElementById('prev-gsm');
  const previewColor = document.getElementById('prev-color');
  const previewPrint = document.getElementById('prev-print');
  const previewLiner = document.getElementById('prev-liner');
  const previewHandle = document.getElementById('prev-handle');
  const bagTitle = document.getElementById('bag-logo-title');
  const bagSubtitle = document.getElementById('bag-logo-subtitle');
  const estPrice = document.getElementById('est-price-val');

  const customState = {
    size: '50kg (24" x 36")',
    gsm: '80-120 GSM (Standard)',
    color: 'White',
    printing: 'BOPP Photo-Grade 8-Color',
    liner: 'With Inner PE Liner',
    handle: 'No Handle (Standard Sack)',
    valve: 'Open Mouth Top',
    logoText: 'PRIME AGRO GOLD',
    priceBase: 18.50
  };

  const updatePreview = () => {
    if (previewSize) previewSize.innerText = customState.size;
    if (previewGsm) previewGsm.innerText = customState.gsm;
    if (previewColor) previewColor.innerText = customState.color;
    if (previewPrint) previewPrint.innerText = customState.printing;
    if (previewLiner) previewLiner.innerText = customState.liner;
    if (previewHandle) previewHandle.innerText = customState.handle;
    if (bagTitle) bagTitle.innerText = customState.logoText || 'YOUR BRAND LOGO';
    
    // Update visual color class
    if (bagPreviewBox) {
      bagPreviewBox.className = 'bag-visual-mock';
      if (customState.color === 'Yellow') bagPreviewBox.classList.add('color-yellow');
      if (customState.color === 'Green') bagPreviewBox.classList.add('color-green');
      if (customState.color === 'Transparent') bagPreviewBox.classList.add('color-transparent');
      if (customState.color === 'Blue') bagPreviewBox.classList.add('color-blue');
    }

    // Dynamic Price estimate calculation
    let price = 15.0;
    if (customState.size.includes('50kg')) price += 4.5;
    if (customState.size.includes('Custom')) price += 6.0;
    if (customState.gsm.includes('120+')) price += 4.0;
    if (customState.printing.includes('BOPP')) price += 3.5;
    if (customState.liner.includes('With')) price += 2.0;
    if (estPrice) estPrice.innerText = `₹${price.toFixed(2)} / Bag`;
  };

  // Attach click listeners to option buttons inside custom studio
  document.querySelectorAll('.custom-option-group').forEach(group => {
    const optType = group.getAttribute('data-opt-type');
    group.querySelectorAll('.opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = btn.getAttribute('data-val');
        if (optType === 'size') customState.size = val;
        if (optType === 'gsm') customState.gsm = val;
        if (optType === 'color') customState.color = val;
        if (optType === 'printing') customState.printing = val;
        if (optType === 'liner') customState.liner = val;
        if (optType === 'handle') customState.handle = val;
        updatePreview();
      });
    });
  });

  const logoInput = document.getElementById('custom-logo-input');
  if (logoInput) {
    logoInput.addEventListener('input', (e) => {
      customState.logoText = e.target.value;
      updatePreview();
    });
  }

  // Initial call
  updatePreview();

  // 4. Gallery Filter & Masonry Layout
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });

  // Lightbox Modal for Gallery & Infrastructure
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const modalDesc = document.getElementById('lightbox-desc');
  const closeModalBtn = document.querySelector('.btn-close-modal');

  document.querySelectorAll('.open-lightbox').forEach(el => {
    el.addEventListener('click', () => {
      const imgSrc = el.getAttribute('data-img');
      const title = el.getAttribute('data-title');
      const desc = el.getAttribute('data-desc') || 'Advanced Manufacturing Infrastructure at Prime Packaging, Sardarshahar, Churu, Rajasthan.';
      
      if (modal && modalImg) {
        modalImg.src = imgSrc;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modal.classList.add('active');
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // 5. FAQ Accordion Toggle with Dynamic Height Calculation & Category Filtering
  const updateAccordionHeights = () => {
    document.querySelectorAll('.accordion-item-custom').forEach(item => {
      const body = item.querySelector('.accordion-body-custom');
      if (!body) return;
      if (item.classList.contains('active')) {
        body.style.maxHeight = (body.scrollHeight + 40) + 'px';
      } else {
        body.style.maxHeight = null;
      }
    });
  };

  document.querySelectorAll('.accordion-item-custom').forEach(item => {
    const btn = item.querySelector('.accordion-button-custom');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.accordion-item-custom').forEach(i => {
          i.classList.remove('active');
          const b = i.querySelector('.accordion-body-custom');
          if (b) b.style.maxHeight = null;
        });
        if (!isActive) {
          item.classList.add('active');
          const body = item.querySelector('.accordion-body-custom');
          if (body) body.style.maxHeight = (body.scrollHeight + 40) + 'px';
        }
      });
    }
  });

  // Initialize initial active height after brief delay
  setTimeout(updateAccordionHeights, 300);

  // FAQ Category Filter Tabs
  const faqFilterBtns = document.querySelectorAll('.faq-filter-btn');
  const faqItems = document.querySelectorAll('.accordion-item-custom');

  faqFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      faqFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'all';

      faqItems.forEach(item => {
        const cat = item.getAttribute('data-category') || 'general';
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.classList.remove('active');
          const b = item.querySelector('.accordion-body-custom');
          if (b) b.style.maxHeight = null;
        }
      });
    });
  });

  // 6. Quick Quote Modal Pre-fill & Toast
  const quoteModal = document.getElementById('quote-modal');
  const quoteModalTitle = document.getElementById('quote-modal-title');
  const quoteBagSelect = document.getElementById('quote-bag-type');

  document.querySelectorAll('.trigger-quote').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prodName = btn.getAttribute('data-product') || 'PP Woven Bags';
      if (quoteBagSelect) quoteBagSelect.value = prodName;
      if (quoteModal) quoteModal.classList.add('active');
    });
  });

  const closeQuoteBtn = document.getElementById('close-quote-modal');
  if (closeQuoteBtn) {
    closeQuoteBtn.addEventListener('click', () => {
      quoteModal.classList.remove('active');
    });
  }

  // Toast Notification on Form Submission
  const toast = document.getElementById('toast-success');
  const showToast = (msg) => {
    if (toast) {
      toast.querySelector('#toast-msg').innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4500);
    }
  };

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your quote request has been sent to our Sardarshahar factory team. We will call you within 30 minutes.');
      if (quoteModal) quoteModal.classList.remove('active');
      form.reset();
    });
  });

  // 7. Video Modal Triggers (.play-btn-circle & .trigger-video)
  const videoModal = document.getElementById('video-modal');
  const videoTriggers = document.querySelectorAll('.play-btn-circle, .trigger-video');
  videoTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (videoModal) videoModal.classList.add('active');
    });
  });

  const closeVideoBtn = document.getElementById('close-video-modal');
  if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', () => {
      if (videoModal) videoModal.classList.remove('active');
    });
  }

  // 8. Featured Products Carousel (Flagship Solutions) Controls & Auto-Play
  const carouselContainer = document.getElementById('featured-carousel-track');
  const prevSlideBtn = document.getElementById('prev-slide-btn');
  const nextSlideBtn = document.getElementById('next-slide-btn');

  if (carouselContainer) {
    const scrollAmount = 391; // Card width (365px) + gap (26px)
    let featuredAutoPlayInterval;

    const scrollNext = () => {
      // If we've reached near the end of the track, loop back smoothly to start
      if (carouselContainer.scrollLeft + carouselContainer.clientWidth >= carouselContainer.scrollWidth - 15) {
        carouselContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    const scrollPrev = () => {
      if (carouselContainer.scrollLeft <= 15) {
        carouselContainer.scrollTo({ left: carouselContainer.scrollWidth, behavior: 'smooth' });
      } else {
        carouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    };

    if (prevSlideBtn && nextSlideBtn) {
      prevSlideBtn.addEventListener('click', () => {
        scrollPrev();
        resetFeaturedTimer();
      });
      nextSlideBtn.addEventListener('click', () => {
        scrollNext();
        resetFeaturedTimer();
      });
    }

    const startFeaturedTimer = () => {
      featuredAutoPlayInterval = setInterval(scrollNext, 3800);
    };

    const resetFeaturedTimer = () => {
      clearInterval(featuredAutoPlayInterval);
      startFeaturedTimer();
    };

    // Pause auto-play when user hovers or touches the carousel
    carouselContainer.addEventListener('mouseenter', () => clearInterval(featuredAutoPlayInterval));
    carouselContainer.addEventListener('mouseleave', startFeaturedTimer);
    carouselContainer.addEventListener('touchstart', () => clearInterval(featuredAutoPlayInterval), { passive: true });
    carouselContainer.addEventListener('touchend', startFeaturedTimer, { passive: true });

    startFeaturedTimer();
  }

  // 8B. Full-Screen Banner Slider Section (Above Hero Section) with Auto-Play & Swipe
  const fsSlides = document.querySelectorAll('.fs-slide');
  const fsDots = document.querySelectorAll('.fs-dot');
  const fsPrevBtn = document.getElementById('fsPrevBtn');
  const fsNextBtn = document.getElementById('fsNextBtn');
  const fsContainer = document.getElementById('fsSliderContainer');

  if (fsSlides.length > 0) {
    let fsCurrent = 0;
    let fsInterval;
    const fsIntervalTime = 5500;

    const fsGoToSlide = (idx) => {
      fsSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
      fsDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
      fsCurrent = idx;
    };

    const fsNext = () => {
      const nextIdx = (fsCurrent + 1) % fsSlides.length;
      fsGoToSlide(nextIdx);
    };

    const fsPrev = () => {
      const prevIdx = (fsCurrent - 1 + fsSlides.length) % fsSlides.length;
      fsGoToSlide(prevIdx);
    };

    const fsStartTimer = () => {
      fsInterval = setInterval(fsNext, fsIntervalTime);
    };

    const fsResetTimer = () => {
      clearInterval(fsInterval);
      fsStartTimer();
    };

    if (fsNextBtn && fsPrevBtn) {
      fsNextBtn.addEventListener('click', () => {
        fsNext();
        fsResetTimer();
      });
      fsPrevBtn.addEventListener('click', () => {
        fsPrev();
        fsResetTimer();
      });
    }

    fsDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        fsGoToSlide(idx);
        fsResetTimer();
      });
    });

    if (fsContainer) {
      fsContainer.addEventListener('mouseenter', () => clearInterval(fsInterval));
      fsContainer.addEventListener('mouseleave', fsStartTimer);

      let fsTouchStartX = 0;
      let fsTouchEndX = 0;

      fsContainer.addEventListener('touchstart', (e) => {
        fsTouchStartX = e.changedTouches[0].screenX;
        clearInterval(fsInterval);
      }, { passive: true });

      fsContainer.addEventListener('touchend', (e) => {
        fsTouchEndX = e.changedTouches[0].screenX;
        const threshold = 40;
        if (fsTouchEndX < fsTouchStartX - threshold) {
          fsNext();
        } else if (fsTouchEndX > fsTouchStartX + threshold) {
          fsPrev();
        }
        fsStartTimer();
      }, { passive: true });
    }

    fsStartTimer();
  }

  // 9. Professional Banner Section Slider (Hero Carousel) with Touch/Swipe & Auto-Play
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const heroSliderTrack = document.getElementById('hero-slider');
  const heroCurrentNum = document.getElementById('heroCurrentNum');
  
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6500;

    const goToSlide = (index) => {
      heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      if (heroCurrentNum) {
        heroCurrentNum.innerText = (index + 1 < 10) ? `0${index + 1}` : `${index + 1}`;
      }
      currentSlide = index;
    };

    const nextSlide = () => {
      let nextIndex = (currentSlide + 1) % heroSlides.length;
      goToSlide(nextIndex);
    };

    const prevSlide = () => {
      let prevIndex = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      goToSlide(prevIndex);
    };

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetTimer();
      });
    });

    const startTimer = () => {
      slideInterval = setInterval(nextSlide, intervalTime);
    };

    const resetTimer = () => {
      clearInterval(slideInterval);
      startTimer();
    };

    // Pause auto-play when user hovers over the slider container
    if (heroSliderTrack) {
      heroSliderTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
      heroSliderTrack.addEventListener('mouseleave', startTimer);

      // Mobile Touch / Swipe Gesture Support
      let touchStartX = 0;
      let touchEndX = 0;

      heroSliderTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(slideInterval);
      }, { passive: true });

      heroSliderTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startTimer();
      }, { passive: true });

      const handleSwipe = () => {
        const threshold = 40; // minimum distance traveled to be considered swipe
        if (touchEndX < touchStartX - threshold) {
          nextSlide(); // swiped left
        }
        if (touchEndX > touchStartX + threshold) {
          prevSlide(); // swiped right
        }
      };
    }

    startTimer();
  }
});
