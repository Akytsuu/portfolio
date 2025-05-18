// Gestion des animations au scroll
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Gestion du menu burger
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
  });

  // Fermer le menu quand un lien est cliqué
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbarCollapse.classList.remove('show');
    });
  });
});
document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const popup = document.getElementById('projectPopup');
        popup.querySelector('#popupTitle').textContent = this.dataset.title;
        popup.querySelector('#popupDescription').innerHTML = this.dataset.description
            .split('\n').map(line => line.trim() ? `<p>${line}</p>` : '').join('');
        
        // Gestion des tags
        const tagsContainer = popup.querySelector('#popupTags');
        tagsContainer.innerHTML = this.dataset.technos.split(',')
            .map(tech => `<span class="tag">${tech}</span>`)
            .join('');
        
        // PDF
        popup.querySelector('#popupPdf').src = this.getAttribute('href');
        
        // Affichage
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Fermer en cliquant à l'extérieur
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('projectPopup')) {
        document.getElementById('projectPopup').style.display = 'none';
        document.getElementById('popupPdf').src = '';
        document.body.style.overflow = 'auto';
    }
});

// Carrousel Compétences
const carousel = document.getElementById('competences-carousel');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const skillCards = document.querySelectorAll('.skill-card');
const cardWidth = 250; // Largeur d'une carte + gap

let currentIndex = 0;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < skillCards.length - 3) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Défilement automatique sur mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, {passive: true});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, {passive: true});

function handleSwipe() {
    if (touchEndX < touchStartX && currentIndex < skillCards.length - 3) {
        currentIndex++;
    } else if (touchEndX > touchStartX && currentIndex > 0) {
        currentIndex--;
    }
    updateCarousel();
}

 window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 80) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });
