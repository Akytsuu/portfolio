document.addEventListener("DOMContentLoaded", function() {
    // Animation d'apparition des sections
    const sections = document.querySelectorAll(".section");
    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("show");
            }
        });
    }
    window.addEventListener("scroll", revealSections);
    revealSections();

    // Gestion de l'affichage du PDF en popup
    const pdfLinks = document.querySelectorAll(".pdf-thumbnail");
    const pdfPopup = document.createElement("div");
    pdfPopup.classList.add("pdf-popup");
    pdfPopup.innerHTML = `<div class="pdf-popup-content">
        <span class="close-btn">&times;</span>
        <iframe class="pdf-iframe"></iframe>
    </div>`;
    document.body.appendChild(pdfPopup);

    const pdfFrame = pdfPopup.querySelector(".pdf-iframe");
    pdfLinks.forEach(link => {
        link.addEventListener("click", function() {
            pdfFrame.src = this.dataset.pdf;
            pdfPopup.style.display = "flex";
        });
    });

    pdfPopup.querySelector(".close-btn").addEventListener("click", () => {
        pdfPopup.style.display = "none";
        pdfFrame.src = "";
    });

    window.addEventListener("click", (e) => {
        if (e.target === pdfPopup) {
            pdfPopup.style.display = "none";
            pdfFrame.src = "";
        }
    });

    // Gestion du formulaire de contact
    document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Votre message a bien été envoyé !");
        this.reset();
    });

    // Animation du carrousel
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const cardWidth = cards[0].offsetWidth + 20; // Largeur carte + marge
    
    // Clone les cartes pour une boucle parfaite
    const cloneCards = () => {
      const originalCards = Array.from(cards);
      originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        carousel.appendChild(clone);
      });
    };
    
    cloneCards();
    
    // Ajuste la vitesse en fonction du nombre de cartes
    const totalCards = document.querySelectorAll('.card').length;
    const duration = totalCards * 0.8; // 2s par carte
    
    carousel.style.animationDuration = `${duration}s`;

    // Animation des éléments de la timeline
    const items = document.querySelectorAll(".timeline-item");

    function checkScroll() {
        let triggerBottom = window.innerHeight * 0.8;
        items.forEach(item => {
            let itemTop = item.getBoundingClientRect().top;
            if (itemTop < triggerBottom) {
                item.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Vérifie au chargement

    // Menu responsive
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    menuToggle.addEventListener("click", function() {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    /*** Animation interactive du fond ***/
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let width, height, particles;
    const mouse = { x: null, y: null };

    function init() {
        canvas.width = width = window.innerWidth;
        canvas.height = height = window.innerHeight;

        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Dessine les lignes entre les particules proches
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Effet d'attraction de la souris
        if (mouse.x !== null && mouse.y !== null) {
            particles.forEach(p => {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(255, 0, 0, ${1 - distance / 150})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            });
        }

        requestAnimationFrame(draw);
    }

    // Met à jour la taille du canvas
    window.addEventListener("resize", init);

    // Capture la position de la souris
    window.addEventListener("mousemove", function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener("mouseout", function() {
        mouse.x = null;
        mouse.y = null;
    });

    init();
    draw();
});
