document.addEventListener('DOMContentLoaded', function() {

  // Бургер
  const burgerBtn = document.querySelector("header button.burger");
  if (burgerBtn) {
    const burgerImgs = document.querySelectorAll("header button.burger img");
    const nav = document.querySelector("header .mobile-menu .nav");

    burgerBtn.addEventListener("click", function() {
      burgerImgs.forEach(img => img.classList.toggle("hidden"));
      if (nav) nav.classList.toggle("visible");
    });
  }

  // Пошук
  const searchBtn = document.querySelector("header button.search-btn");
  const searchBlock = document.querySelector("header .mobile-menu .features .search");
  if (searchBtn && searchBlock) {
    searchBtn.addEventListener("click", function() {
      searchBlock.classList.toggle("expanded");
    });
  }

  // Модалки
  const btnIdsToOpenModal = ['sec-8-card-1-btn', 'sec-8-card-2-btn'];
  const modalWrapper = document.querySelector('.modals-wrapper');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');

  if (modalWrapper) {
    btnIdsToOpenModal.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        const modalId = btn.getAttribute('data-modal-id');
        const modal = document.getElementById(modalId);
        if (modal) {
          btn.addEventListener('click', function() {
            modalWrapper.classList.add('visible');
            modal.classList.add('visible');
            document.body.classList.add('overflow');
          });
        }
      }
    });

    closeModalBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        modalWrapper.classList.remove('visible');
        if (this.parentElement) this.parentElement.classList.remove('visible');
        document.body.classList.remove('overflow');
      });
    });
  }

  // Load More
  const loadMoreBtn = document.getElementById('load-more-cards');
  const productCards = document.querySelectorAll('.sec-4-card');
  if (loadMoreBtn && productCards.length) {
    let visibleCards = Array.from(productCards).filter(c => getComputedStyle(c).display !== 'none').length;
    let activeVisibleCards = visibleCards;
    let cardToOpen = visibleCards / 2;

    const showCards = () => {
      const remaining = productCards.length - activeVisibleCards;
      const toShow = Math.min(cardToOpen, remaining);
      for (let i = activeVisibleCards; i < activeVisibleCards + toShow; i++) {
        productCards[i].style.display = 'block';
      }
      activeVisibleCards += toShow;
      if (activeVisibleCards >= productCards.length) loadMoreBtn.querySelector('span').textContent = 'Load Less';
    }

    const hideCards = () => {
      activeVisibleCards = visibleCards;
      for (let i = productCards.length - 1; i >= visibleCards; i--) {
        productCards[i].style.display = 'none';
      }
      loadMoreBtn.querySelector('span').textContent = 'Load More';
      const section = document.querySelector('.sec-4');
      if (section) {
        window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + 60, behavior: 'smooth' });
      }
    }

    loadMoreBtn.addEventListener('click', () => {
      if (activeVisibleCards < productCards.length) showCards();
      else hideCards();
    });

    window.addEventListener('resize', (() => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          visibleCards = Array.from(productCards).filter(c => getComputedStyle(c).display !== 'none').length;
          activeVisibleCards = visibleCards;
          cardToOpen = visibleCards / 2;
        }, 200);
      };
    })());
  }

  // EmailJS
  const formBtn = document.getElementById('form-submit');
  const emailField = document.getElementById('email-input');
  if (formBtn && emailField) {
    emailjs.init({ publicKey: "nJqjKYE3F_7GJUDJ3" });

    formBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const email = emailField.value;
      const valid = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email);
      if (valid) {
        emailjs.send("service_te4dxie","template_kdz8ey9",{user_email: email});
        emailField.value = '';
      } else console.log('Please type correct email adress!');
    });
  }

  // Glide Carousel
  if (document.querySelector('.sec5-cards')) {
    new Glide('.sec5-cards', { type: 'carousel', startAt: 0, perView: 1, gap: 30 }).mount();
  }

});
